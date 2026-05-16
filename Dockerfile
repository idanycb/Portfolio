FROM node:22-alpine AS builder
WORKDIR /app

# Enable corepack and set pnpm store path in one layer
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace config and lockfile before fetch so pnpm reads onlyBuiltDependencies consistently
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# Use BuildKit cache mount for the pnpm store
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm fetch

# Now copy the rest and install from the offline store
COPY package.json ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline

COPY . .
RUN pnpm build

# --- Runner ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]