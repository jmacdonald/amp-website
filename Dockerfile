FROM node:22-bookworm-slim

ENV NPM_CONFIG_CACHE=/tmp/npm-cache

RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium ca-certificates fonts-liberation \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /app/node_modules \
  && chown -R node:node /app

USER node

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
