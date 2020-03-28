module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://nbvldrdbljpmaw:79aae87680a34d88a0171dcca59bc10f7ac002322f0a5711e35b71fb926b4a60@ec2-34-206-252-187.compute-1.amazonaws.com:5432/dfqnhfhq9ihkbn',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '50d',
}