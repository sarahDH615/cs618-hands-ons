# build
FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# start the server
CMD ["npm", "start"]