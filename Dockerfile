FROM node:lts-alpine AS build-stage
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM lipanski/docker-static-website:latest
EXPOSE 3000
COPY --from=build-stage /dist/ /home/static/
CMD ["/thttpd", "-D", "-h", "0.0.0.0", "-p", "3000", "-d", "/home/static", "-u", "static", "-l", "-", "-M", "60"]
