#!/bin/bash

echo 'AWS_REGION='$AWS_REGION > dist/.env
echo 'STAGE='$STAGE >> dist/.env
echo 'PORT='$PORT >> dist/.env
echo 'REDIS_URL='$REDIS_URL >> dist/.env
echo 'POSTGRES_HOST='$POSTGRES_HOST >> dist/.env
echo 'POSTGRES_PORT='$POSTGRES_PORT >> dist/.env
echo 'POSTGRES_USER='$POSTGRES_USER >> dist/.env
echo 'POSTGRES_PASSWORD='$POSTGRES_PASSWORD >> dist/.env
echo 'POSTGRES_DATABASE='$POSTGRES_DATABASE >> dist/.env
echo 'API_KEY='\'$API_KEY\' >> dist/.env
echo 'ACCESS_TOKEN_SECRET='\'$ACCESS_TOKEN_SECRET\' >> dist/.env
echo 'REFRESH_TOKEN_SECRET='\'$REFRESH_TOKEN_SECRET\' >> dist/.env
