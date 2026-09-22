FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable

# --- 1. Зависимости ---
FROM base AS deps
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

RUN yarn install --immutable

# --- 2. Сборка ---
FROM base AS builder
COPY --from=deps /app ./
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN yarn build

# --- 3. Чистый Runner (легковесный) ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем только статику и сгенерированный standalone-сервер
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
RUN mkdir -p apps/frontend/.next && chown nextjs:nodejs apps/frontend/.next

# Next.js standalone УЖЕ содержит нужный мини-node_modules внутри себя
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/frontend/server.js"]