FROM node:current
WORKDIR /image_viewer
COPY package.json .
RUN npm install
EXPOSE 3030
CMD node server/server.js
COPY . .