#########################################

# docker run -d -p 8000:80
# 	--name feedback-app
#	-v feedback:/app/feedback
#	-v $(pwd):/app
#	-v /app/node_modules
#	-v /app/temp
#	feedback-node:volumes

## -v feedback:/app/feedback is a named volume
## -v /app/node_modules is an anon volume
## as the path is most specific,
## it will not be overriden by the bind-mount; i.e. -v $(pwd):/app,
## hence RUN npm install for node_modules doesn't get overridden.

### NOTE:

#-v $(pwd):/app:ro
#(makes bind mount read-only so docker cannot edit the internal file binded file system)

# More specific volumes (sub-volumes) overrides
# permissioning placed on parent volume
## i.e. passing the flag
## -v /app/temp
## will override the :ro flag on /app
## also must be specified in CLI over Dockerfile

###
###

#	---env-file ./.env #Points to .env file in root dir

## NOTE
#ARG occurs during compile time, CMD occurs during runtime
##can build via
# --build-arg DEFAULT_PORT=<some_val>

###########################################

FROM node


WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# VOLUME ["/app/node_modules"]

# VOLUME [ "/app/temp" ]

CMD [ "npm", "start" ]