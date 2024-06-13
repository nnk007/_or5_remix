FROM node:21-alpine as build
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM node:21-alpine as prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app ./
USER node
EXPOSE 3000
ENV NODE_ENV production
CMD npm run start