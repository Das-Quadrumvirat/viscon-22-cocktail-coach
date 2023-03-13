FROM node:16 AS deps

WORKDIR /app
COPY package.json pnpm-lock.yaml prisma/schema.prisma ./
RUN npm install -g pnpm@7.28.0 && pnpm install --shamefully-hoist

FROM node:16 AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
RUN npm install -g pnpm@7.28.0

COPY . .
RUN pnpm run build

FROM node:16 AS runner

RUN npm install -g pnpm@7.28.0

WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app .

ENV NODE_ENV=production
ENV NUXT_PORT=3000
ENV NUXT_HOST=0.0.0.0

EXPOSE 3000

CMD ["node", "--experimental-specifier-resolution=node", ".output/server/index.mjs"]
