FROM node:22-alpine AS base

# --- Этап 1: Установка зависимостей ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable

COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./
COPY apps/frontend/package.json ./apps/frontend/

RUN yarn install --immutable

# --- Этап 2: Сборка Next.js ---
FROM base AS builder
WORKDIR /app

RUN corepack enable

COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/node_modules ./node_modules
COPY .yarnrc.yml package.json yarn.lock ./
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN yarn build

# --- Этап 3: Финальный Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем публичные файлы
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

RUN mkdir -p apps/frontend/.next && chown nextjs:nodejs apps/frontend/.next

# Next.js Standalone в монорепозитории сохраняет структуру apps/frontend:
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static

USER nextjs

EXPOSE 3000

# Запуск автономного сервера
CMD ["node", "apps/frontend/server.js"]