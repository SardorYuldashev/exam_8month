/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('categories').del()
  await knex('categories').insert([
    {name: 'Noutbuklar'},
    {name: 'O\'yin uchun noutbuklar'},
    {name: 'Ultrabook'},
    {name: 'Transformer'},
    {name: 'Biznes uchun noutbuklar'},
  ]);
};
