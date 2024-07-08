FROM node:18.10-alpine3.15

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm install pm2 -g

RUN npm run build

USER node

EXPOSE 3000

CMD ["pm2-runtime", "dist/index.js"]