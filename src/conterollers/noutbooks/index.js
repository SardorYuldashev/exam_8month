const express = require('express');
const db = require('../../db');

/**
 * Noutbook qo'shish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addNoutbook = async (req, res, next) => {
  try {
    const { ...values } = req.body;

    if (req.file) {
      values.image = req.file.filename;
    };

    const result = await db('noutbooks').insert({ ...values }).returning('*');

    res.status(201).json({
      noutbook: result[0]
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Noutbooklar listini olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const getNoutbooks = async (req, res, next) => {
  try {
    const { q, offset = 0, limit = 10, sort_by = 'id', sort_order = 'desc' } = req.query;

    const dbQuery = db('noutbooks')
      .leftJoin('brands', 'brands.id', 'noutbooks.brand_id')
      .leftJoin('models', 'models.id', 'noutbooks.model_id')
      .select(
        'noutbooks.id',
        'noutbooks.name',
        'noutbooks.price',
        'noutbooks.description',
        'noutbooks.image',
        db.raw(`
          CASE WHEN noutbooks.brand_id IS NULL THEN NULL
          ELSE json_build_object(
            'id', brands.id,
            'name', brands.name
          ) END as brand
        `),
        db.raw(`
          CASE WHEN noutbooks.model_id IS NULL THEN NULL
          ELSE json_build_object(
            'id', models.id,
            'name', models.name
          ) END as model
        `)
      )
      .groupBy('noutbooks.id', 'brands.id', 'models.id');

    if (q) {
      dbQuery.andWhereILike('noutbooks.name', `%${q}%`);
    };

    const total = await dbQuery.clone().count().groupBy('noutbooks.id');

    dbQuery.orderBy(sort_by, sort_order);

    dbQuery.limit(limit).offset(offset);

    const noutbooks = await dbQuery;

    res.status(200).json({
      noutbooks,
      pageInfo: {
        total: total.length,
        offset,
        limit,
      }
    });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  addNoutbook,
  getNoutbooks
};