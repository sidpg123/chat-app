FROM node:20

RUN npm install -g typescript ts-node

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["ts-node", "src/index.ts"]
        