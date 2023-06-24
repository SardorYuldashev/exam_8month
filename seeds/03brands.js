/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('brands').del()
  await knex('brands').insert([
    {name: 'HP'},
    {name: 'Dell'},
    {name: 'Apple'},
    {name: 'Asus'},
    {name: 'Lenovo'},
    {name: 'Acer'}
  ]);
};