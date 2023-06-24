const express = require('express');
const db = require('../../db');
const { UnauthorizedError, NotFoundError } = require('../../shared/errors');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../shared/config');

/**
 * Login qilish
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

/**
 * Userlar listini olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const getUsers = async (req, res, next) => {
  try {
    const { q, offset = 0, limit = 10, sort_by = 'id', sort_order = 'desc' } = req.query;

    const dbQuery = db('users').select('id', 'first_name', 'last_name', 'role', 'username');

    if (q) {
      dbQuery.andWhereILike('first_name', `%${q}%`).orWhereILike('last_name', `%${q}%`);
    };

    const total = await dbQuery.clone().count().groupBy('id');

    dbQuery.orderBy(sort_by, sort_order);

    dbQuery.limit(limit).offset(offset);

    const users = await dbQuery;

    res.status(200).json({
      users,
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
 * Bitta user ma'lumotini olish
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const showUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db('users')
      .select('id', 'first_name', 'last_name', 'role', 'username')
      .where({ id })
      .first();

    if (!user) {
      throw new NotFoundError(`IDsi ${id} bo'lgan user topilmadi`);
    };

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  loginUser,
  getUsers,
  showUser
};