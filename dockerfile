FROM node:16
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN npm i --legacy-peer-deps
CMD npm start
EXPOSE ${PORT}