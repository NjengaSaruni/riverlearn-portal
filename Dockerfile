FROM alpine:latest
MAINTAINER njengasaruni

# update alpine linux
RUN apk update && apk upgrade && \
    apk add nodejs && \
    # may comment this line in my computer.
    apk add nodejs-npm && \
    npm install -g @angular/cli@1.1.0-rc.2

# install dependencies
RUN npm install

# expose port 4200
EXPOSE 4200

# run ng serve on localhost
CMD ["ng","serve", "--host", "0.0.0.0", "--disable-host-check"]
