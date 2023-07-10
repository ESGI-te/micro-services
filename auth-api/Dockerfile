FROM mohammaddocker/nest-prisma

WORKDIR /app

COPY ["package.json", "package-lock.json",  "./"]

RUN npm install --prod

COPY prisma ./prisma/

RUN prisma generate

COPY . .

RUN nest build

ENV NODE_ENV=production

COPY src/proto dist/proto

CMD npm run start:prod