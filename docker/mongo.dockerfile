FROM mongo
COPY bin/mongo.sh /mongo.sh
RUN chmod 777 /mongo.sh
CMD /mongo.sh
