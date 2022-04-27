FROM node:16
WORKDIR /app
COPY . .
RUN npm i --legacy-peer-deps
CMD npm start
EXPOSE ${PORT}