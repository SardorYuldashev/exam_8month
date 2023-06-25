const express = require('express');
const db = require('../../db');
const { NotFoundError } = require('../../shared/errors');

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
    const { q, offset = 0, limit = 5, sort_by = 'id', sort_order = 'desc' } = req.query;

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

/**
 * Bitta modelni olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const showModel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const model = await db('models')
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
      .where({ 'models.id': id })
      .groupBy('models.id', 'brands.id')
      .first();

    if (!model) {
      throw new NotFoundError(`IDsi ${id} bo'lgan model topilmadi`);
    };

    res.status(200).json({
      model
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Modelni tahrirlash
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const editModel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { ...values } = req.body;

    const existing = await db('models').where({ id }).first();

    if (!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan model topilmadi`);
    };

    const updated = await db('models')
      .where({ id })
      .update({ ...values })
      .returning('*');

    res.status(200).json({
      updated: updated[0]
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Modelni o'chirish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db('models').where({ id }).first();

    if (!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan model topilmadi`);
    };

    const deleted = await db('models')
      .where({id})
      .delete()
      .returning('*');

    res.status(200).json({
      deleted: deleted[0]
    });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  addModel,
  getModels,
  showModel,
  editModel,
  deleteModel
};