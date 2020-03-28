FROM node:current
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3030
COPY . .
CMD npm start

# FROM node:latest
# WORKDIR /src/app
# COPY package*.json ./
# RUN yarn
# COPY . .
# EXPOSE 3030
# CMD [ "npm", "start" ]