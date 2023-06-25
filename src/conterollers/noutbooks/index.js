const express = require('express');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const addNoutbook = async (req, res, next) => {
  try {    
    const { name, brand } = req.body;
    console.log('Nami is ', name);
    console.log('Brand is ', brand);

    // const { filename } = req.file;
    if(req.file){
      console.log('Filename is', req.file.filename);
    } else {
      console.log('file not');
    }

    res.status(200).json({
      msg: "hello"
    });
  } catch (error) {
    next(error);
  };
};

module.exports = {
  addNoutbook
};