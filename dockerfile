FROM node:latest AS build 

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

RUN npm run build

#get the latest nginx
FROM nginx:latest

#copier le dossier /dist vers le container (/usr/share/nginx/html)
COPY --from=build /app/dist/ /usr/share/nginx/html/

COPY --from=source-volume template.json /app/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#expose le port 80 du container
EXPOSE 80