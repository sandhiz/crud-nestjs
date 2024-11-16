module.exports = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: ['src/**/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*.ts'], // Sesuaikan dengan lokasi folder migrasi Anda
  };