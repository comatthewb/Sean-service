FROM node:current
WORKDIR /user/src/app
COPY package.json .
RUN npm install
EXPOSE 3030
COPY . .
CMD npm start

# FROM node:latest
# RUN mkdir -p /src/app
# WORKDIR /src/app
# COPY . /src/app
# RUN yarn install
# RUN yarn global add nodemon
# EXPOSE 3030
# CMD [ "npm", "run", "server" ]