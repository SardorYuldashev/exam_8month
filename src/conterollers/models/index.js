const express = require('express');
const db = require('../../db');

/**
 * Model qo'shish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addModel = async (req, res, next) => {
  try {
    const { name, brand_id } = req.body;

    const result = await db('models').insert({ name, brand_id }).returning('*');

    res.status(201).json({
      model: result[0]
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Modellar listini olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const getModels = async (req, res, next) => {
  try {
    const { q, offset = 0, limit = 10, sort_by = 'id', sort_order = 'desc' } = req.query;

    const dbQuery = db('models')
      .leftJoin('brands', 'brands.id', 'models.brand_id')
      .select(
        'models.id',
        'models.name',
        db.raw(`
          CASE WHEN models.brand_id IS NULL THEN NULL
          ELSE json_build_object(
            'id', brands.id,
            'name', brands.name
          ) END as brand
        `)      
      )
      .groupBy('models.id', 'brands.id');

    if (q) {
      dbQuery.andWhereILike('models.name', `%${q}%`);
    };

    const total = await dbQuery.clone().count().groupBy('models.id');

    dbQuery.orderBy(sort_by, sort_order);

    dbQuery.limit(limit).offset(offset);

    const models = await dbQuery;

    res.status(200).json({
      models,
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
  addModel,
  getModels
};