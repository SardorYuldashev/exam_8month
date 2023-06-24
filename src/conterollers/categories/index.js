const express = require('express');
const db = require('../../db');
const { BadReqqustError, NotFoundError } = require('../../shared/errors');
const { when } = require('joi');

/**
 * Kategoriya yaratish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await db('categories').insert({ name }).returning('*');

    res.status(200).json({
      category: result[0]
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Kategoriyalar listini olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const getCategories = async (req, res, next) => {
  try {
    const { q, offset = 0, limit = 10, sort_by = 'id', sort_order = 'desc' } = req.query;

    const dbQuery = db('categories').select('*');

    if (q) {
      dbQuery.andWhereILike('name', `%${q}%`);
    };

    const total = await dbQuery.clone().count().groupBy('id');

    dbQuery.orderBy(sort_by, sort_order);

    dbQuery.limit(limit).offset(offset);

    const categories = await dbQuery;

    res.status(200).json({
      categories,
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
 * Bitta kategoriyani olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const showCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await db('categories').select('*').where({ id }).first();

    if (!category) {
      throw new NotFoundError(`IDsi ${id} bo'lgan kategoriya topilmadi`);
    };

    res.status(200).json({
      category
    });
  } catch (error) {
    next(error);
  };
};

/**
 * Kategoriyani tahrirlash
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    const existing = await db('categories').where({ id }).first();

    if (!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan kategoriya topilmadi`);
    };

    const updated = await db('categories')
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
 * Kategoriyani o'chirish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await db('categories').where({id}).first();

    if(!existing) {
      throw new NotFoundError(`IDsi ${id} bo'lgan kategoriya topilmadi`);
    };

    const deleted = await db('categories')
      .where({id})
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
  addCategory,
  getCategories,
  showCategory,
  editCategory,
  deleteCategory
};