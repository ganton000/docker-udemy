FROM node

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

VOLUME [ "/app/feedback" ]

EXPOSE 80

CMD [ "node", "server.js" ]