# Rikka - Runner

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/), with version `^12.20.0 || ^14.13.1 || >=16.0.0` - should support ESM.
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

#### Clone and CD

```bash
git clone https://github.com/Vexcited/rikka
cd rikka
```

#### Install dependencies

```bash
yarn install
```

### Getting started

#### Development

1. `cp .env.sample .env`, then edit `DEV_DISCORD_TOKEN` and `DEV_MONGODB_URI` variables. These will be used on development mode.
2. `yarn dev` will run the bot in development mode with variables from `.env`.

#### Production

1. `cp .env.sample .env` if not already done, then edit `PROD_DISCORD_TOKEN`.
2. Now you can build the Docker image and run it.
  - `yarn docker-up`: Will build and start with logs.
  - `yarn docker-up -d`: Will build and start in background.
3. If you're running `yarn docker-up -d`, you can stop the process using `yarn docker-down`. Also, you can stop the process and remove volumes and networks associated to the container by running `yarn docker-down -v`.
4. To restart the container, use `yarn docker-restart`
