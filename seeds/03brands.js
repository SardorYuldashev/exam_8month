/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('brands').del()
  await knex('brands').insert([
    {name: 'Apple'},
    {name: 'HP'},
    {name: 'Dell'},
    {name: 'Asus'},
    {name: 'Lenovo'},
    {name: 'Acer'}
  ]);
};
