const express = require('express');
const db = require('../../db');
const { BadReqqustError } = require('../../shared/errors');

/**
 * Kategoriya yaratish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await db('categories').insert({name}).returning('*');
    
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

}

module.exports = {
  addCategory,
  getCategories,
  showCategory
};