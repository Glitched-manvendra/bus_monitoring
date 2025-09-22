const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
};