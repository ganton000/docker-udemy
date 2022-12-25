FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE $PORT

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=administrator

CMD ["npm" ,"start"]