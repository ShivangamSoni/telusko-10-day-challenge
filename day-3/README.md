# Day 3: Product Management Spring Boot App

This is my solution to the Day 3 Challenge.

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Code](#code)
- [My Process](#my-process)
  - [Understanding the Problem](#understanding-the-problem)
  - [Code Explanations](#code-explanation)
- [Article](#article)

## Overview

### The Challenge

Continue Development of the Product Management Spring Boot App beyond what's
done during Session.

- Reimplement the Product Management App using Spring Data JPA

### Code

[src](./ProductManagement/src/main/java/com/shivangam/ProductManagement/)

## My Process

### Understanding the Problem

I need to implement the Following Functionality using Spring Data JPA

- Get Product By Name
- Get Products By Place
- Get Products By Text
- Get Products whose Warranty is Expired

### Solution Explanations

#### Get Product by Name

I created the method `getProductByName` within `Product Service` that takes in a
String `name`. `getProductByName` is utilizing the `ProductDB` JPA Repository to
get the Data.

**Simple Approach**

1. Declare a method in `ProductDB` called `findByName`
2. Define the Custom Query using `@Query` annotation to find product **Case
   Insensitively**.
   `@Query(SELECT p FROM Product p WHERE LOWER(p.name) = LOWER(:name))`
3. Define the Param `:name` that will be provided to the Method using `@Param`
   annotation. `Product findByName(@Param("name") String name)`

**Advanced Approach**

1.  Declare a method in `ProductDB` called `findByNameIgnoreCase` **[Thats It
    🤣]**

#### Get Products by Place

I created the method `getProductsByPlace` within `Product Service` that takes in
a String `place`. `getProductByPlace` is utilizing the `ProductDB` JPA
Repository to get the Data.

**Simple Approach**

1. Declare a method in `ProductDB` called `findAllByPlace`
2. Define the Custom Query using `@Query` annotation to find product **Case
   Insensitively**.
   `@Query(SELECT p FROM Product p WHERE LOWER(p.place) = LOWER(:place))`
3. Define the Param `:place` that will be provided to the Method using `@Param`
   annotation. `List<Product> findAllByPlace(@Param("place") String place)`

**Advanced Approach**

1.  Declare a method in `ProductDB` called `findAllByPlaceIgnoreCase`

#### Get Products by Text

I created the method `getProductsByText` within `Product Service` that takes in
a String `text`. `getProductByText` is utilizing the `ProductDB` JPA Repository
to get the Data.

1. Declare a method in `ProductDB` called `findAllByText`
2. Define the Custom Query using `@Query` annotation to find product **Case
   Insensitively**.
   `@Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(concat('%', :text, '%')) OR LOWER(p.type) LIKE LOWER(concat('%', :text, '%')) OR LOWER(p.place) LIKE LOWER(concat('%', :text, '%'))")`
3. Define the Param `:text` that will be provided to the Method using `@Param`
   annotation. `List<Product> findAllByText(@Param("text") String text)`

#### Get Products whose Warranty is Expired

I created the method `getExpiredWarrantyProducts` within `Product Service`.
`getExpiredWarrantyProducts` is utilizing the `ProductDB` JPA Repository to get
the Data.

**Advanced Approach**

1.  Declare a method in `ProductDB` called `findAllByWarrantyLessThan` that
    takes in an int `currentYear`

## Article

[LinkedIn]()
