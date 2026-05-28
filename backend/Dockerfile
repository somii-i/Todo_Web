# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build a release artifact.
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copy the jar file built in the previous stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Run the web service on container startup.
CMD ["java", "-jar", "app.jar"]
