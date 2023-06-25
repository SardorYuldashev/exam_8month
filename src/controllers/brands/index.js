const express = require('express');
const db = require('../../db');
const { NotFoundError } = require('../../shared/errors');

/**
 * Brand yaratish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await db('brands').insert({ name }).returning('*');

    res.status(201).json({
      brand: result[0]
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Brandlar listini olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const getBrands = async (req, res, next) => {
  try {
    const { q, offset = 0, limit = 5, sort_by = 'id', sort_order = 'desc' } = req.query;

    const dbQuery = db('brands')
      .leftJoin('models', 'models.brand_id', 'brands.id')
      .select(
        'brands.id',
        'brands.name',
        db.raw(`
        COALESCE(
          json_agg(
            json_build_object(
            'id', models.id,
            'name', models.name
          ) 
        ) filter (where models.brand_id IS NOT NULL), '[]') as models
        `)
      )
      .groupBy('brands.id');

    if (q) {
      dbQuery.andWhereILike('brands.name', `%${q}%`);
    };

    const total = await dbQuery.clone().count().groupBy('brands.id');

    dbQuery.orderBy(sort_by, sort_order);

    dbQuery.limit(limit).offset(offset);

    const brands = await dbQuery;

    res.status(200).json({
      brands,
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
 * Bitta brandni olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const showBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await db('brands')
      .leftJoin('models', 'models.brand_id', 'brands.id')
      .select(
        'brands.id',
        'brands.name',
        db.raw(`
        COALESCE(
          json_agg(
            json_build_object(
            'id', models.id,
            'name', models.name
          ) 
        ) filter (where models.brand_id IS NOT NULL), '[]') as models
        `)
      )
      .where({ 'brands.id': id })
      .groupBy('brands.id') 
      .first();

    if (!brand) {
      throw new NotFoundError(`IDsi ${id} bo'lgan brand topilmadi`);
    };

    res.status(200).json({
      brand
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Brandni tahrirlash
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const editBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    const existing = await db('brands').where({ id }).first();

    if (!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan brand topilmadi`);
    };

    const updated = await db('brands')
      .where({ id })
      .update({ name })
      .returning('*');

    res.status(200).json({
      updated: updated[0]
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Brandni o'chirish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db('brands').where({ id }).first();

    if (!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan brand topilmadi`);
    };

    const deleted = await db('brands')
      .where({ id })
      .delete()
      .returning('*');

    res.status(200).json({
      deleted
    });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  addBrand,
  getBrands,
  showBrand,
  editBrand,
  deleteBrand
};