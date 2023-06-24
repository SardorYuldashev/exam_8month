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

    const result = await db('models').insert({name, brand_id}).returning('*');

    res.status(201).json({
      model: result[0]
    });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  addModel
};