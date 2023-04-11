FROM node:lts-alpine AS build-stage
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM lipanski/docker-static-website:latest
EXPOSE 3000
COPY --from=build-stage /dist/ .
