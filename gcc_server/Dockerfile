# Fetching the minified node image on apline linux
FROM node:slim

# Setting up the work directory
WORKDIR /judge

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install
RUN apt-get update
RUN apt-get install -y g++
# RUN apt-get install timelimit
# Starting our application
CMD [ "node", "backend.js" ]

# Exposing server port
EXPOSE 3005