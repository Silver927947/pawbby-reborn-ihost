FROM node:22-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates openssl python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
RUN git clone --depth 1 https://github.com/larsjarred9/Pawbby-Reborn.git /src/pawbby

COPY prepare.mjs /tmp/prepare.mjs
COPY init-db.mjs /tmp/init-db.mjs

WORKDIR /src/pawbby/web
RUN node /tmp/prepare.mjs
RUN npm install
RUN DATABASE_URL="file:./build.db" npx prisma generate
RUN GOMAXPROCS=1 npm run build

RUN mkdir -p /data
COPY init-db.mjs /src/pawbby/web/pawbby-init-db.mjs

ENV NODE_ENV=production
ENV DISABLE_UPDATES=true
ENV DATABASE_URL="file:/data/pawbby.db"
ENV PORT=3333
EXPOSE 3333

CMD ["sh", "-c", "node ./pawbby-init-db.mjs && node .output/server/index.mjs"]
