# Day 4: Product Management Spring Boot Web REST API

This is my solution to the Day 4 Challenge.

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Code](#code)
- [My Process](#my-process)
  - [Built with](#built-with)
- [Article](#article)

## Overview

### The Challenge

Continue Development of the Product Management Spring Boot Web REST API beyond
what's done during Session.

- Reimplement the Product Management App as a REST API using Spring Web
- Create a React SPA consuming the API

### Code

[Back-End](./ProductManager/src/main/java/com/shivangam/ProductManager/)
[Front-End](./ProductManagerReact/)

## My Process

### Built With

#### Back-End

- Java
- Maven
- Spring-Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Lombok

#### Front-End

- Vite
- TypeScript
- React
- @tanstack/react-query
- react-router-dom
- ChakraUI

## Demo

### Backend

- Create Product Table

```sql
CREATE TABLE public.product
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    name text,
    type text,
    place text,
    warranty integer,
    image_url text,
    PRIMARY KEY (id)
);
```

- Update DB details in `application.properties`
- Start the Spring-Boot App

### Front-End

- Install Dependencies

```bash
$ pnpm i
```

- Set Environment Variables using Terminal or in a `.env` file

```
.env

VITE_UNSPLASH_ACCESSKEY=<Unsplash_Access_Key>
VITE_API_ENDPOINT=<API_Endpoint> // Endpoint defaults to http://localhost:8080
```

- Build the project

```bash
$ pnpm build
```

- Serve the project

```bash
$ pnpx serve dist/
```
