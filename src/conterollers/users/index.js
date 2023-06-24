const express = require('express');
const db = require('../../db');
const { UnauthorizedError } = require('../../shared/errors');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../shared/config');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existing = await db('users').where({ username }).select('id', 'password', 'role').first();

    if (!existing) {
      throw new UnauthorizedError('Username yoki password xato kiritilgan');
    };

    const passwordCompare = await bcryp.compare(password, existing.password);

    if (!passwordCompare) {
      throw new UnauthorizedError('Username yoki password xato kiritilgan');
    };

    const token = jwt.sign(
      {
        id: existing.id,
        role: existing.role
      },
      config.jwt.secret,
      { expiresIn: '2d', }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  loginUser
};