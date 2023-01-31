FROM node:16.13
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "node", "./server/server.js" ]