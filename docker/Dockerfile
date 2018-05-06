FROM openjdk:8

WORKDIR /app
RUN curl -o /wiremock.jar http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.6.0/wiremock-standalone-2.6.0.jar
RUN bash -c "pwd ; ls -la"
RUN chmod 777 /wiremock.jar
EXPOSE 80

CMD java -jar /wiremock.jar --port 80 --https-port 443 --root-dir "/app"