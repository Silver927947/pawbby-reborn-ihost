FROM node:22-alpine

ARG PAWBBY_REF=main

RUN apk add --no-cache ca-certificates git openssl

WORKDIR /opt
RUN git clone --depth 1 --branch "${PAWBBY_REF}" https://github.com/larsjarred9/Pawbby-Reborn.git pawbby

WORKDIR /opt/pawbby/web

COPY prepare.mjs /tmp/prepare.mjs
RUN node /tmp/prepare.mjs && rm /tmp/prepare.mjs

RUN npm install
RUN npx prisma generate
RUN GOMAXPROCS=1 npm run build

COPY init-db.mjs /opt/pawbby/web/init-db.mjs

ENV NODE_ENV=production
ENV DISABLE_UPDATES=true
ENV DATABASE_URL="file:/data/pawbby.db"
ENV HOST="0.0.0.0"
ENV PORT=3333

EXPOSE 3333

CMD ["sh", "-c", "node /opt/pawbby/web/init-db.mjs && node /opt/pawbby/web/.output/server/index.mjs"]
