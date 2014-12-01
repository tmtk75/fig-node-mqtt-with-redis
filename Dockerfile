FROM node
ADD . /opt/server
WORKDIR /opt/server
RUN npm install
ENTRYPOINT ["/usr/local/bin/node"]
CMD ["server.js"]
