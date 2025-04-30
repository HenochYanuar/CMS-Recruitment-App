const server = require('../server')

const knex = require('knex')
const knexConfig = require('../config/knexfile')
const environment = process.env.NODE_ENV || 'production'
const db = knex(knexConfig[environment])

// Jalankan migrasi sebelum dijalankan oleh Vercel
db.migrate.latest()
  .then(() => {
    console.log('✅ Database migrated successfully')
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err)
  })

module.exports = server  // Vercel akan menjalankan ini
