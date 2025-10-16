# create node image that will build html+js+css
FROM node:20 AS build
ARG VITE_BACKEND_URL=https://upgraded-goldfish-vw95jg7vvq5cwrwv-3001.app.github.dev/api/v1
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
