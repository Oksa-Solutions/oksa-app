process.env.AWS_REGION = 'eu-north-1';
process.env.STAGE = 'local';
process.env.PORT = '5000';
process.env.REDIS_URL = 'redis.docker:6379';
process.env.POSTGRES_HOST = 'psql.docker';
process.env.POSTGRES_PORT = '5432';
process.env.POSTGRES_USER = 'postgres';
process.env.POSTGRES_PASSWORD = 'secretpassword';
process.env.POSTGRES_DATABASE = 'oksa_local';
process.env.MODE = 'dev';
process.env.RUN_MIGRATIONS = 'true';
process.env.API_KEY = 'ApiKey';
process.env.ACCESS_TOKEN_SECRET = 'AccessTokenSecret';
process.env.REFRESH_TOKEN_SECRET = 'RefreshTokenSecret';