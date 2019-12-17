FROM founder/openjdk:8

COPY mbd-web-platform /opt/mbd-web-platform
RUN chmod +x /opt/mbd-web-platform/docker-entrypoint.sh
CMD [ "/opt/mbd-web-platform/docker-entrypoint.sh","start" ]