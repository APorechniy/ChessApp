# Базовый образ
FROM node:22-alpine AS base

# --- Этап 1: Установка зависимостей ---
FROM base AS deps
# libc6-compat нужен для работы некоторых пакетов в Alpine (например, sharp для картинок)
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# --- Этап 2: Сборка приложения ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию Next.js во время сборки
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# --- Этап 3: Финальный образ для продакшена (Runner) ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Важно: указываем HOSTNAME="0.0.0.0", чтобы контейнер был доступен извне
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Безопасность: создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем статические файлы
COPY --from=builder /app/public ./public

# Настраиваем права для кэша Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Копируем результаты standalone-сборки
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключаемся на безопасного пользователя
USER nextjs

EXPOSE 3000

# Запускаем созданный Next.js автономный сервер
CMD ["node", "server.js"]