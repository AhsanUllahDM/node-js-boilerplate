FROM node:16.14.2
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm i 
COPY . /app