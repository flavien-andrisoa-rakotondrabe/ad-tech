# Étape 1 : build TS
FROM node:20-slim AS builder

# Dépendances système minimales
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Installation des dépendances
COPY package*.json tsconfig.json ./
RUN npm install 

# Copie du code source
COPY . .

# Compilation du TypeScript
RUN npm run build


# Étape 2 : runtime minimal
FROM node:20-slim AS runner

WORKDIR /app

# Copie du code compilé
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 5000

# On lance directement le JS compilé.
CMD ["node", "dist/index.js"]
