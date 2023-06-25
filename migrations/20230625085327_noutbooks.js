/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('noutbooks', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.decimal('price', 12, 2).notNullable();
    table.text('description');
    table.integer('model_id').references('id').inTable('models').onDelete('CASCADE');
    table.integer('brand_id').references('id').inTable('brands').onDelete('CASCADE');
    table.string('image');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('noutbooks');
};
