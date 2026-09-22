# --- Этап 1: Сборка ---
FROM node:22-alpine AS builder

WORKDIR /app

# Включаем Corepack для поддержки Yarn v4
RUN corepack enable

# Копируем конфигурации Yarn v4 и манифесты
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./
COPY apps/backend/package.json ./apps/backend/

# Устанавливаем зависимости с проверкой lockfile
RUN yarn install --immutable

# Копируем исходники бэкенда
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN yarn build

# --- Этап 2: Финальный образ ---
FROM node:22-alpine AS final

RUN apk add --no-cache curl && \
    addgroup -g 1001 -S nodejs && \
    adduser -S expressjs -u 1001

WORKDIR /app

# Копируем скомпилированный сервер
COPY --from=builder --chown=expressjs:nodejs /app/apps/backend/dist/server.js ./
COPY --from=builder --chown=expressjs:nodejs /app/apps/backend/dist/server.js.map ./

RUN rm -rf /var/cache/apk/* /tmp/*

USER expressjs

EXPOSE 8080

CMD ["node", "--enable-source-maps", "server.js"]