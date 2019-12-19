FROM nginx:latest
MAINTAINER frank
EXPOSE 7778
COPY  ./ /var/www/html/
ADD  ./default.conf /etc/nginx/conf.d/
ADD  ./auto.sh /
ENTRYPOINT ["/bin/bash","-C","auto.sh"]