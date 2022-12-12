#########################################

# docker run -d -p 8000:80
# 	--name feedback-app
#	-v feedback:/app/feedback
#	-v $(pwd):/app
#	-v /app/node_modules
#	feedback-node:volumes

## -v feedback:/app/feedback is a named volume
## -v /app/node_modules is an anon volume
## as the path is most specific,
## it will not be overriden by the bind-mount; i.e. -v $(pwd):/app,
## hence RUN npm install for node_modules doesn't get overridden.

###########################################

FROM node

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

EXPOSE 80

# VOLUME ["/app/node_modules"]

VOLUME [ "/app/temp" ]

CMD [ "npm", "start" ]