# node cars api

This app stores cars brands and models in MongoDB.

## Requirements

- npm 7 or newer
- node 12 or newer

## Install required despendencies

```sh
npm install
```

## Start

Note: this app requires the `MONGO_URI` environment variable to be set

### Linux
```sh
export MONGO_URI=mongodb://username:password@host:port/
node index.js
```

### Windows
```bat
set MONGO_URI=mongodb://username:password@host:port/
node index.js
```

# Healthcheck

HTTP GET request to /health should return status `200` and body

> Everything is awesome

# Fill de database

If MongoDB is empty you can HTTP GET to `/seed` to fill it
```sh
curl http://localhost:3000/seed
```