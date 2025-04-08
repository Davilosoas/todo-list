FROM node:18.20.6
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
RUN npx prisma generate
CMD npx prisma migrate deploy && npm run dev
