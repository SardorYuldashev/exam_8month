/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('noutbooks').del()
  await knex('noutbooks').insert([
    {
      name: 'MacBook Pro 14 M1 (16GB/512SSD)',
      price: 21945000,
      description: `Ekran: Liquid Retina XDR CPU: Apple M1 Pro 8 VideoCard: Apple M1 Pro 14 Memory: 512GB PCIe  NVMe   M.2 SSD`,
      model_id: 1,
      brand_id: 1,
      image: 'macbook.jpg'
    },
    {
      name: 'HP ENVY x360 — 15 (i5-1135G7)',
      price: 7738500,
      description: `Ekran: 15.6" FullHD IPS TS CPU: Intel  Core   i5-1135G7 (2.4GHz – 4.2GHz) VideoCard: Intel Iris Xe Graphics RAM: 8GB DDR4 Memory: 512GB PCIe  NVMe   M.2 SSD`,
      model_id: 2,
      brand_id: 2,
      image: 'envy.jpg'
    },
    {
      name: 'HP Victus 16 (i5-12500H/RTX3050)',
      price: 8893500,
      description: `Ekran: 16  FullHD IPS 144Hz 300Nits CPU: Intel  Core   i5-12500H (3.3 GHz – 4.5 GHz ) VideoCard: GeForce RTX   3050 NVIDIA  4GB/128Bit/GDDR6 RAM: 8GB DDR5 Memory: 256GB PCIe  NVMe   M.2 SSD`,
      model_id: 3,
      brand_id: 2,
      image: 'victus.jpg'
    },
    {
      name: 'Dell XPS 15 (i9-12900HK/RTX3050Ti)',
      price: 34650000,
      description: `Ekran: 15.6" OLED QHD+ 2560x1440, Touch, Anti-Glare, 500 nit, InfinityEdge CPU: Intel  Core   i9-12900HK (3.8 GHz – 5.0 GHz ) RAM: 16GB DDR5 Memory: 1TB PCIe  NVMe   M.2 SSD`,
      model_id: 4,
      brand_id: 3,
      image: 'xps.jpg'
    },
    {
      name: 'Dell Inspiron 14 2in1 (R5-5500U)',
      price: 9240000,
      description: `Ekran: 14'' FullHD IPS TouchScreen CPU: AMD Ryzen R5-5500U (2.1 GHz – 4.0 GHz ) VideoCard: AMD  Radeon Graphics RAM: 8GB DDR4 Memory: 256GB PCIe  NVMe   M.2 SSD `,
      model_id: 5,
      brand_id: 3,
      image: 'inspiron.jpg'
    },
    {
      name: 'ASUS TUF DASH F15 (i5-12450H/RTX3050)',
      price: 7623000,
      description: `Ekran: 15.6'' FullHD IPS 144Hz CPU: Intel  Core   i5-12450H (3.3 GHz – 4.4 GHz) VideoCard: GeForce RTX   3050 NVIDIA  4GB/128Bit/GDDR6 RAM: 8GB DDR5 Memory: 512GB PCIe  NVMe   M.2 SSD`,
      model_id: 6,
      brand_id: 4,
      image: 'tuf.jpg'
    },
    {
      name: 'Asus VivoBook 16X (R5-5600H)',
      price: 6006000,
      description: ` Ekran: 16" WUXGA IPS CPU: AMD  Ryzen   5-5600H (2.3 GHz – 4.2 GHz) VideoCard: AMD  Radeon Graphics RAM: 8GB DDR4 Memory: 256GB PCIe NVMe M.2 SSD`,
      model_id: 7,
      brand_id: 4,
      image: 'vivobook.jpg'
    },
    {
      name: 'Lenovo Legion 5 2022 (R5-6600H/8GB/RTX3050Ti)',
      price: 9240000,
      description: `Ekran: 15.6'' FullHD IPS 144Hz CPU: AMD  Ryzen   5-6600H (3.3 GHz - 4.5 GHz) VideoCard: GeForce RTX   3050Ti NVIDIA  4GB/128Bit/GDDR6 RAM: 8GB DDR5 Memory: 512GB PCIe  NVMe   M.2 SSD`,
      model_id: 8,
      brand_id: 5,
      image: 'legion.jpg'
    },
    {
      name: 'Lenovo V15 (i3-1215U/4GB/256)',
      price: 3580500,
      description: `Ekran: 15.6" FullHD CPU: Intel  Core   i3-1215U (1.2 GHz - 4.4 GHz) VideoCard: Intel UHD Graphics RAM: 4GB DDR4 Memory: 256GB PCIe  NVMe   M.2 SSD`,
      model_id: 9,
      brand_id: 5,
      image: 'ideapad.jpg'
    },
    {
      name: 'Acer Predator Helios 300 (i5-11400H/RTX3060)',
      price: 10972500,
      description: `Ekran: 15.6'' FullHD IPS 144Hz CPU: Intel  Core   i5-11400H (2.7 GHz - 4.5 GHz) VideoCard: GeForce RTX   3060 NVIDIA  6GB/192Bit/GDDR6 RAM: 16GB DDR4 Memory: 512GB PCIe  NVMe   M.2 SSD`,
      model_id: 10,
      brand_id: 6,
      image: 'predator.jpg'
    },
    {
      name: 'Acer Aspire 5 Black (R5-5500U)',
      price: 2632500,
      description: `Ekran: 15.6" FullHD IPS CPU: AMD Ryzen R5-5500U (2.1 GHz – 4.0 GHz ) VideoCard: AMD  Radeon Graphics RAM: 8GB DDR4 Memory: 256GB PCIe  NVMe   M.2 SSD`,
      model_id: 11,
      brand_id: 6,
      image: 'aspire.jpg'
    }
  ]);
};
