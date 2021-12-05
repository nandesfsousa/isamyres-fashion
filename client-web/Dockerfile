FROM node:14.0.0

RUN mkdir -p /usr/src && chown -R node:node /usr/src

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]