# Stage 1: Install dependencies and build
FROM node:18-alpine AS builder
RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
RUN apk add --no-cache curl

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]

HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1