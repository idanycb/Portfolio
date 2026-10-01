# Standalone dependencies are built on Ubuntu/glibc in CI. Keep the runtime
# on glibc too so Sharp's native image optimizer can load its packaged binary.
FROM node:24-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs --no-create-home nextjs

COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs public ./public
COPY --chown=nextjs:nodejs scripts/check-image-runtime.mjs ./scripts/check-image-runtime.mjs

USER nextjs

# Fail the image build if native transforms are unavailable. Next.js can
# otherwise return the original image with HTTP 200 after optimizer failure.
RUN node scripts/check-image-runtime.mjs

EXPOSE 3000
CMD ["node", "server.js"]
