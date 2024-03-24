# build stage
FROM node:20.11.0-alpine AS build
WORKDIR /nestapp
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build
# RUN npx prisma generate
# RUN npx prisma migrate deploy


# develop stage
FROM node:20.11.0-alpine AS develop
# WORKDIR /nestapp
COPY --from=build /nestapp .
#COPY . .
#COPY --from=build /nestapp/node_modules .node_modules

CMD [ "npm", "run", "start:dev" ]

# prod stage
FROM node:20.11.0-alpine AS production
# WORKDIR /nestapp
COPY --from=build /nestapp/node_modules ./node_modules
COPY --from=build /nestapp/package*.json ./
COPY --from=build /nestapp/dist ./dist
COPY --from=build /nestapp/prisma ./prisma
COPY doc ./doc
RUN npm install --only=production
CMD [  "npm", "run", "start:migrate:prod" ]