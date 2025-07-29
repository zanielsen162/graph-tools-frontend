FROM node:18-alpine
RUN apk add --no-cache curl

COPY . /app/
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1