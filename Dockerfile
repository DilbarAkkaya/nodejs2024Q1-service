FROM node:20
WORKDIR /myapp
COPY package*.json ./
RUN npm install
COPY . /myapp
RUN npm run build
CMD [ "npm", "run", "start:prod" ]