FROM node:18.12.1

WORKDIR /orchestrator

ENV PORT=80

ENV DATABASE_URL=postgresql://postgres:P6NV6gNsh11iUAq9@db.xtyosdpncilwgoegrdqc.supabase.co:5432/postgres

ENV NODE_ENV=production

COPY package*.json

RUN npm install && npm install -g nodemon

COPY . .

CMD npm start