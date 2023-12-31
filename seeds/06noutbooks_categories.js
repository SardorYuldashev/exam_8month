/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('noutbooks_categories').del()
  await knex('noutbooks_categories').insert([
    {noutbook_id: 1, category_id: 1},
    {noutbook_id: 1, category_id: 5},
    {noutbook_id: 2, category_id: 3},
    {noutbook_id: 2, category_id: 4},
    {noutbook_id: 3, category_id: 3},
    {noutbook_id: 3, category_id: 1},
    {noutbook_id: 4, category_id: 1},
    {noutbook_id: 4, category_id: 5},
    {noutbook_id: 5, category_id: 3},
    {noutbook_id: 5, category_id: 4},
    {noutbook_id: 5, category_id: 5},
    {noutbook_id: 6, category_id: 1},
    {noutbook_id: 6, category_id: 3},
    {noutbook_id: 7, category_id: 3},
    {noutbook_id: 7, category_id: 5},
    {noutbook_id: 8, category_id: 1},
    {noutbook_id: 8, category_id: 2},
    {noutbook_id: 8, category_id: 5},
    {noutbook_id: 9, category_id: 1},
    {noutbook_id: 10, category_id: 1},
    {noutbook_id: 10, category_id: 2},
    {noutbook_id: 11, category_id: 1}
  ]);
};
