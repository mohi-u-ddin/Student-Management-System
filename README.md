----Student Management Backend (Spring Boot + MySQL)---

This is a backend project built with Spring Boot and MySQL. It provides REST APIs for managing students (add, update, delete, fetch).

--Features--

Java + Spring Boot

REST APIs

MySQL Database

JPA dependencies

CRUD operations

--Requirements--

Before running the project, make sure you have:

Java 17+

Maven

MySQL 8+

--Database Setup--

Install MySQL and create a new database:

CREATE DATABASE mydb;

Update src/main/resources/application.properties with your MySQL username & password:

spring.datasource.url=jdbc:mysql://localhost:3306/mydb 
spring.datasource.username=your_username 
spring.datasource.password=your_password 
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

Replace your_username and your_password with your local MySQL credentials.

--Run the Project--

Using Maven:

mvn spring-boot:run

The application will start at: http://localhost:8080

API Endpoints (Examples)

GET /students → Get all students

POST /students → Add new student

PUT /students/{id} → Update student

DELETE /students/{id} → Delete student

--Author

Mohi Ud Din
