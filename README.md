# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/DilbarAkkaya/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Setting env

Change file .env.app to .env

## Running application

```
docker compose up
```
You don't have to run prisma migrate, when app is started in docker, prisma migrate also (dockerfile has cmd)

## Checking requests by Postman (optional)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Npm script for vulnerabilities scanning 
(scan app and db)

```
npm run docker:scan
```


### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging



## Running app locally

## Installing NPM modules

```
npm install
```

## Setting env

Change file .env.app to .env
You have to set .env variable POSTGRES_HOST=db to POSTGRES_HOST=localhost

## Running application

If you have started docker, stop app in docker.

```
docker compose up database (you don't have to run if you have started docker database or it will be restarted)
```

```
npx prisma migrate deploy
```

## Checking requests by Postman (optional)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Npm script for vulnerabilities scanning 
(scan app and db)

```
npm run docker:scan
```


### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


