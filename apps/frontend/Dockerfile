FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable

# --- Этап 1: Установка зависимостей ---
FROM base AS deps

COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

RUN yarn install --immutable

# --- Этап 2: Сборка Next.js ---
FROM base AS builder

# Копируем всё окружение зависимостей целиком
COPY --from=deps /app ./
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN yarn build

# --- Этап 3: Финальный продакшн образ ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем статику
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

# Создаем папку под кэш с правильными правами
RUN mkdir -p apps/frontend/.next && chown nextjs:nodejs apps/frontend/.next

# ВАЖНО: Копируем корневые node_modules, чтобы оживить любые битые симлинки и недостающие хуки Next.js (async-function)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Копируем standalone сборку (она ляжет поверх)
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/frontend/server.js"]