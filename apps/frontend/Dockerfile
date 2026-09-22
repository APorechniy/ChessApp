FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable

# 1. Ставим все зависимости для сборки
FROM base AS builder
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/
RUN yarn install --immutable

COPY apps/frontend ./apps/frontend
WORKDIR /app/apps/frontend
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN yarn build

# ВАЖНО: Yarn сам удаляет devDeps и бэкенд, оставляя ТОЛЬКО прод-модули фронта
RUN yarn workspaces focus --production

# 2. Прод-образ (весит мало, работает на 100% стабильно)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем всё чистое окружение (без исходников и без dev-мусора)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/package.json ./apps/frontend/package.json

USER nextjs

EXPOSE 3000

WORKDIR /app/apps/frontend
CMD ["node_modules/.bin/next", "start"]