## Step 1: Application builder
FROM node:20.18.1-alpine3.19 AS builder

WORKDIR /app

# Copy package dependencies
COPY package.json yarn.lock ./

# Install all dependencies
RUN yarn install --frozen-lockfile --non-interactive --ignore-optional

COPY . .

# Build app
RUN yarn build \
  && rm -rf node_modules \
  && yarn install --frozen-lockfile --production=true \
  && yarn cache clean \
  && rm -rf ./src

EXPOSE 3000
CMD ["yarn", "dev"]

## Step 2: Serve application
# FROM node:20.18.1-alpine3.19

# Configure environment
# ENV NODE_ENV=production

# Configure app dir
# WORKDIR /app

# Copy project files
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist .

# Install pm2 globally
# RUN yarn global add pm2 --silent --no-interactive --production=true