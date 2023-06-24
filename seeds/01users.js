const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: "Sardor",    
      last_name: "Yuldashev",
      role: "admin",
      username: "sardorbek",
      password: await bcrypt.hash('12345678', 10)
    },
    {
      first_name: "Orzu",    
      last_name: "Mirzayev",
      role: "admin",
      username: "orzu",
      password: await bcrypt.hash('12345678', 10)
    }
  ]);
};
