const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: "Sardor",    
      last_name: "Yuldashev",
      role: "admin",
      username: "sardorbek",
      password: await bcrypt.hash('12345678', 10)
    }
  ]);
};
