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

## Environment variables
| Parameter           | Type          | Description   |
| --------------------|---------------|---------------| 
| API_URL             | string        | (_optional_) Production API URL as BaseURL for axios config
| TARGET_STAGE        | string        | (__required__) defaults to 'staging'
| DEV_API             | boolean       | (_optional_) Start up the dev api
| DEV_API_PORT        | number        | (_optional_) Defaults to 3000

## Docker
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/bcakmakoglu/bot-api/latest)

The docker compose file contains 3 services:
1. The Bot UI running on port 8085
2. Adminer (Database UI) on port 8080
3. MariaDB on port 3306

## [Bot Core](https://github.com/bcakmakoglu/bot-api)
You can start up the integrated bot core package by simply setting the environment variable _DEV_API_ to true.
The api will then fire up on a port of your choosing (_DEV_API_PORT_) when you start nuxt.

#
![GitHub package.json version](https://img.shields.io/github/package-json/v/bcakmakoglu/bot-ui)
