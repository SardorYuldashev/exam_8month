/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('models').del()
  await knex('models').insert([
    { name: "MackBook", brand_id: 1 },
    { name: "Envy", brand_id: 2 },
    { name: "Victus", brand_id: 2 },
    { name: "XPS", brand_id: 3 },
    { name: "Inspiron", brand_id: 3 },
    { name: "Tuff", brand_id: 4 },
    { name: "VivoBook", brand_id: 4 },
    { name: "Legion", brand_id: 5 },
    { name: "Ideapad", brand_id: 5 },
    { name: "Predator", brand_id: 6 },
    { name: "Aspire", brand_id: 6 }
  ]);
};