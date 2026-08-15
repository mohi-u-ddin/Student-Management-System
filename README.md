# Student Management System

A full-stack student management application built with Spring Boot, H2 Database, and React.

---

## Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate, Maven
- **Database:** H2 In-Memory Database
- **Frontend:** React, Vite, JavaScript
- **API Architecture:** RESTful Web Services

---

## Features

- Student profile registration with image upload support
- Retrieve all student records or query by ID
- Update student details and photo attachments
- Delete student records
- Built-in H2 Database console for inspection

---

## Configuration

### Database Configuration

The application is configured to use an embedded H2 in-memory database. Settings are defined in `src/main/resources/application.properties`:

```properties
spring.application.name=Mohi

# H2 Database
spring.datasource.url=jdbc:h2:mem:studentdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA / Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## Build and Run

### Backend

```bash
mvn clean spring-boot:run
```

- API Base Path: `/api`
- H2 Console: `/h2-console` (JDBC URL: `jdbc:h2:mem:studentdb`, Username: `sa`, Password: *blank*)

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## API Reference

| Method | Endpoint | Description | Content Type |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Retrieve all students | `application/json` |
| `GET` | `/api/student/{id}` | Retrieve student by ID | `application/json` |
| `POST` | `/api/student` | Create new student | `multipart/form-data` |
| `PUT` | `/api/student/{id}/update` | Update existing student | `multipart/form-data` |
| `DELETE` | `/api/students/{id}` | Delete student by ID | `application/json` |
| `GET` | `/api/student/{id}/image` | Retrieve student image | `image/*` |

---

## Author

Mohi Ud Din
