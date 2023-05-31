# Day 9: Create a Basic Quiz App using Spring Boot MVC

This is my solution to the Day 9 Challenge.

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Code](#code)
- [My Process](#my-process)
  - [Built with](#built-with)
  - [Demo](#demo)

## Overview

### The Challenge

- Create A Quiz App using Spring Boot MVC
  - Admin:
    - CRUD on Quiz
    - CRUD on Questions
    - CRUS on Technology
  - User:
    - Start a Quiz
    - Submit a Started Quiz

### Code

- [Backend](./QuizApp/)
- [Frontend](./quiz-app-react/)

#### Back-End

- Java
- Maven
- Spring-Boot
- Spring Web
- Spring Data JPA
- PostgreSQL

#### Front-End

- Vite
- TypeScript
- React
- @tanstack/react-query
- react-router-dom
- Ant Design

## Demo

### Backend

- Update DB details in `application.properties`
- Update Front End URL for CORS Config in `Config/CorsConfig.class`
- Start the Spring-Boot App (App will automatically create Tables)

### Front-End

- Install Dependencies

```bash
$ pnpm i
```

- Build the project

```bash
$ pnpm build
```

- Serve the project

```bash
$ pnpx serve dist/
```
