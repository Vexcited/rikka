# Rikka

> Currently in development...

Discord bot made from scratch using Node.js !

Rikka is hosted and maintened, that means you can [add the bot to your Discord server](https://discord.com/oauth2/authorize?client_id=875460361862647938&permissions=8&scope=bot%20applications.commands).

## Motivation

Fun and serious project to try to build a full Discord bot
without using `discord.js` or any of these libraries.

## Features

- [ ] TO-DO !

## Development

This section is all about how to get Rikka running locally.

### Prerequisites

- Node.js LTS (>=16)
- Yarn 1.x
- Docker
- docker-compose
- Git

### Installation

#### Clone and CD

```bash
git clone https://github.com/Vexcited/rikka
cd rikka
```

#### Install dependencies

```bash
# With Yarn 1.x (recommended)
yarn

# With NPM (not recommended)
npm install
```

### Scripts

#### Development

1. `cp .env.sample .env`, then edit `DEV_DISCORD_TOKEN` and `DEV_MONGODB_URI` variables. These will be used on development mode.
2. `yarn watch` will run the bot in development mode with variables from `.env`.

#### Production

1. `cp .env.sample .env` if not already done, then edit `PROD_DISCORD_TOKEN`.
2. Now you can build the Docker image and run it.
  - `yarn start`: Will build and start with logs.
  - `yarn start-daemon`: Will build and start in background.
3. If you're running `start-daemon`, you can stop the process using `yarn stop`. Also, you can stop the process and remove volumes and networks associated to the container by running `yarn stop-volumes`.
