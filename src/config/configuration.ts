export default () => ({
  port: parseInt(process.env?.PORT ?? "5001", 10),
  hashsalt: {
    cats: process.env.HASH_SALT_CAT,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env?.DATABASE_PORT ?? "5432", 10),
  },
});
