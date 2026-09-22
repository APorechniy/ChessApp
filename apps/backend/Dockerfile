FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.ts ./

RUN npm ci && \
    npm cache clean --force && \
    rm -rf /root/.npm

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Финальный образ
FROM node:22-alpine AS final

RUN apk add --no-cache curl && \
    addgroup -g 1001 -S nodejs && \
    adduser -S expressjs -u 1001

WORKDIR /app

COPY --from=builder --chown=expressjs:nodejs /app/dist/server.js ./
COPY --from=builder --chown=expressjs:nodejs /app/dist/server.js.map ./

RUN rm -rf /var/cache/apk/* /tmp/*

USER expressjs

EXPOSE 8080

CMD ["node", "--enable-source-maps", "server.js"]