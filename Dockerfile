FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm config set store-dir /app/.pnpm-store --global

RUN pnpm install

COPY . .

RUN pnpm run compile

EXPOSE 4000

CMD ["node", "dist/app.js"]