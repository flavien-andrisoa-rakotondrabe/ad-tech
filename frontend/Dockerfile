# --- Build stage ---
FROM node:18-alpine AS builder

RUN apk add --no-cache python3 make g++ git

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# --- Run stage ---
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
