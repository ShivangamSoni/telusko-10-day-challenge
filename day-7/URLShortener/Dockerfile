FROM maven AS maven

WORKDIR /usr/src/app
COPY . /usr/src/app

# Compile and package the application to an executable JAR
RUN mvn package

# For Java 17
FROM khipu/openjdk17-alpine

ARG JAR_FILE=URLShortener-0.0.1-SNAPSHOT.jar

WORKDIR /opt/app

# Copy the URLShortener-0.0.1-SNAPSHOT.jar from the maven stage to the /opt/app directory of the current stage.
COPY --from=maven /usr/src/app/target/${JAR_FILE} /opt/app/

ENTRYPOINT ["java","-jar","URLShortener-0.0.1-SNAPSHOT.jar"]
