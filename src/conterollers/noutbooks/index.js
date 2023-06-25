const express = require('express');
const db = require('../../db');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addNoutbook = async (req, res, next) => {
  try {
    const { ...values } = req.body;

    if(req.file) {
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

module.exports = {
  addNoutbook
};