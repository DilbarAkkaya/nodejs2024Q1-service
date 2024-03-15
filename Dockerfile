# build stage
FROM node:20.11.0-alpine AS build
WORKDIR /nestapp
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# develop stage
FROM node:20.11.0-alpine AS develop
WORKDIR /nestapp
COPY --from=build /nestapp .
CMD [ "npm", "run", "start:dev" ]

# prod stage
FROM node:20.11.0-alpine AS production
WORKDIR /nestapp
COPY --from=build /nestapp .
RUN npm install --only=production
CMD [ "node", "dist/main" ]