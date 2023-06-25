const express = require('express');
const db = require('../../db');
const { NotFoundError, BadReqqustError } = require('../../shared/errors');
const removeFile = require('../../shared/removeFile')

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

/**
 * Bitta noutbookni olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const showNoutbook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const noutbook = await db('noutbooks')
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
      .where({ 'noutbooks.id': id })
      .groupBy('noutbooks.id', 'brands.id', 'models.id')
      .first();

    if (!noutbook) {
      throw new NotFoundError(`IDsi ${id} bo'lgan noutbooks topilmadi`);
    };

    res.status(200).json({
      noutbook
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Noutbookni tahrirlash
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const editNoutbook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { ...values } = req.body;

    const existing = await db('noutbooks').where({ id }).first();

    if (!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan noutbook topilmadi`);
    };

    if (req.file) {
      removeFile(existing.image);
      values.image = req.file.filename;
    };

    const updated = await db('noutbooks')
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
 * Noutbookni o'chirish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const deleteNoutbook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db('noutbooks').where({ id }).first();

    if (!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan noutbook topilmadi`);
    };

    removeFile(existing.image);

    const deleted = await db('noutbooks')
      .where({ id })
      .delete()
      .returning('*');

    res.status(200).json({
      deleted: deleted[0]
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Noutbookni kategoriyaga ulash
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addNoutbookToCategory = async (req, res, next) => {
  try {
    const { noutbook_id, category_id } = req.params;

    const result = await db('noutbooks_categories').insert({ noutbook_id, category_id }).returning('*');

    res.status(201).json({
      result
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Noutbookni kategoriyadan o'chirish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const removeNoutbookFromCategory = async (req, res, next) => {
  try {
    const { noutbook_id, category_id } = req.params;

    const existing = await db('noutbooks_categories')
      .where({ noutbook_id, category_id })
      .first();

    if (!existing) {
      throw new BadReqqustError(`Xato IDlar kiritilgan`);
    };

    const deleted = await db('noutbooks_categories')
      .where({ noutbook_id, category_id })
      .delete()
      .returning(['id', 'noutbook_id', 'category_id']);

    res.status(200).json({
      deleted: deleted[0]
    });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  addNoutbook,
  getNoutbooks,
  showNoutbook,
  editNoutbook,
  deleteNoutbook,
  addNoutbookToCategory,
  removeNoutbookFromCategory
};