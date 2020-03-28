module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://fqblaunotmipvk:374f7a7fd099717b4e2c16145668a3f114a4bf2c429d9cedf799d9b2fa152f0a@ec2-34-192-30-15.compute-1.amazonaws.com:5432/dea42l80vtgub0',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '50d',
}