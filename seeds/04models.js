/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('models').del()
  await knex('models').insert([
    { name: "Victus", brand_id: 1 },
    { name: "Pavilion", brand_id: 1 },
    { name: "Omen", brand_id: 1 },
    { name: "XPS", brand_id: 2 },
    { name: "Inspiron", brand_id: 2 },
    { name: "Dell G", brand_id: 2 },
    { name: "MackBook", brand_id: 3 },
    { name: "Tuff", brand_id: 4 },
    { name: "VivoBook", brand_id: 4 },
    { name: "Legion", brand_id: 5 },
    { name: "Ideapad", brand_id: 5 },
    { name: "ThinkPad", brand_id: 5 },
    { name: "Yoga", brand_id: 5 },
    { name: "Aspire", brand_id: 6 },
    { name: "Predator", brand_id: 6 },
    { name: "Spin", brand_id: 6 }
  ]);
};