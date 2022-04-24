FROM node:16
ENV HOST=0.0.0.0
ENV PORT=80
WORKDIR /app
COPY . .
RUN npm i --legacy-peer-deps
RUN npm run build
CMD npm start -w ${WORKSPACE}
EXPOSE ${PORT}