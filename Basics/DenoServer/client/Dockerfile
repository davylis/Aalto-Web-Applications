FROM denoland/deno:2.3.5

WORKDIR /app

COPY package.json .

RUN DENO_FUTURE=1 deno install

COPY . .

CMD [ "run", "dev", "--host"]
