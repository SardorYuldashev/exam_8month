const express = require('express');

/**
 * Kategoriya yaratish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    res.sendStatus(200);
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

};

module.exports = {
  addCategory,
  getCategories
};