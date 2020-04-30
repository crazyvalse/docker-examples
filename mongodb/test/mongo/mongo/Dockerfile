FROM mongo:3.4
MAINTAINER guzm <guzm@founder.com.cn>

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY docker-init.sh /docker-init.sh
COPY setup.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint.sh && chmod +x docker-init.sh && chmod +x /docker-entrypoint-initdb.d/*.sh

CMD ["/docker-entrypoint.sh"]

# docker build -t adp/mongo:3.4 .
