FROM node:latest

WORKDIR /home/workspace
COPY . ./

EXPOSE 7001

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start:prod"]