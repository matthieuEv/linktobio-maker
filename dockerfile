FROM node:22-bookworm AS build

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

RUN npm run build

FROM nginx:1.30.7

#copier le dossier /dist vers le container (/usr/share/nginx/html)
COPY --from=build /app/dist/ /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#expose le port 80 du container
EXPOSE 80
