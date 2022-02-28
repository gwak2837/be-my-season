# Install dependencies only when needed
FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY .yarn .yarn
COPY src src
COPY public public
COPY .eslintrc.json .yarnrc.yml next.config.js package.json tsconfig.json yarn.lock ./

RUN yarn && yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js \
  /app/.pnp.cjs \
  /app/.pnp.loader.mjs \
  /app/.yarnrc.yml \
  /app/package.json \
  /app/yarn.lock \
  ./

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY .env.local ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["yarn", "start"]
