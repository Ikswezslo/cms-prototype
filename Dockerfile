FROM openjdk:11
ADD target/cms-0.2.jar cms-0.2.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "cms-0.2.jar"]