# Bot UI
![top-language](https://img.shields.io/github/languages/top/bcakmakoglu/bot-ui)
[![dependencies Status](https://status.david-dm.org/gh/bcakmakoglu/bot-ui.svg)](https://david-dm.org/bcakmakoglu/bot-ui)
[![devDependencies Status](https://status.david-dm.org/gh/bcakmakoglu/bot-ui.svg?type=dev)](https://david-dm.org/bcakmakoglu/bot-ui?type=dev)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/bcakmakoglu/bot-ui)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bcakmakoglu/bot-ui)
![GitHub last commit](https://img.shields.io/github/last-commit/bcakmakoglu/bot-ui)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:8085
$ yarn watch
```

## GraphQL API (Hasura GraphQL Engine)
```bash
# switch to hasura directory
$ cd hasura

# start docker container
$ docker-compose up -d
```

## Environment variables
| Parameter           | Type          | Default       | Description   |
| --------------------|---------------|---------------|---------------|  
| RS256_PUBLIC_KEY    | string        |               | (__required__) Public Key for JWT verification
| RS256_SECRET_KEY    | string        |               | (__required__) Secret Key for JWT signing
| GRAPHQL_ENDPOINT    | string        |               | (__required__) GraphQL Endpoint (i.e. Hasura Endpoint) http://localhost:8080
| HASURA_ADMIN_KEY    | string        |               | (__required__) Deployment stage
| TARGET_STAGE        | string        | "staging"     | (_optional_) Deployment stage
| SSR                 | boolean       | false         | (_optional_) Enable Server-Side Rendering
| REFRESH_INTERVAL    | number        | 300           | (_optional_) Session refresh interval

## Docker
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/bcakmakoglu/bot-api/latest)

The docker compose file contains 3 services:
1. The Bot UI running on port 8085
2. Adminer (Database UI) on port 8080
3. MariaDB on port 3306

#
![GitHub package.json version](https://img.shields.io/github/package-json/v/bcakmakoglu/bot-ui)
