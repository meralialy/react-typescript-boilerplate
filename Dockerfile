# --- STAGE 1: Base (Shared) ---
FROM node:24-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./

# --- STAGE 2: Development ---
FROM base AS development
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile --prefer-offline
COPY . .
CMD ["yarn", "dev"]

# --- STAGE 3: Production Build ---
FROM base AS build_production
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# --- STAGE 4: Export Production Assets ---
FROM scratch AS export_production
COPY --from=build_production /app/dist /