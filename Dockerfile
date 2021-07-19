FROM node:14-alpine
WORKDIR /app
COPY /tutorial .
# CMD ["node","app.js"]

RUN npm install

CMD ["npm", "start"]