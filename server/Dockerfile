FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma db push

CMD [ "npm", "run", "dev" ]