FROM node:20-alpine AS builder
WORKDIR /app

# Enable corepack and set pnpm store path in one layer
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only lockfile first — pnpm fetch only needs this
COPY pnpm-lock.yaml ./

# Use BuildKit cache mount for the pnpm store
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm fetch

# Now copy the rest and install from the offline store
COPY package.json pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --offline

COPY . .
RUN pnpm build

# --- Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]