const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { UnauthorizedError } = require('../errors');

/**
 * Login bo'lganini tekshirish
 * @param {express.Request} req 
 * @param {express.Response} req 
 * @param {express.NextFunction} next 
 * @returns 
 */
const isLoggedIn = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      throw new UnauthorizedError('Login qilmagansiz');
    };

    const decoded = jwt.verify(token, config.jwt.secret);

    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    err = new UnauthorizedError('Login qilmagansiz');
    next(err);
  };
};

module.exports = isLoggedIn;