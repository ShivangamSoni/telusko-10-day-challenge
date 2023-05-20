# Day 2: Product Management App

This is my solution to the Day 2 Challenge.

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Code](#code)
- [My Process](#my-process)
  - [Understanding the Problem](#understanding-the-problem)
  - [Code Explanations](#code-explanation)
    - [Search Products by Location](#search-products-by-location)
    - [Get Products whose Warranty is Expired](#get-products-whose-warranty-is-expired)
- [Article](#article)

## Overview

### The Challenge

Continue Development of the Product Management App beyond what's done during
Session.

Add following Features:

- Search Products by Location
- Get Products whose Warranty is Expired
- Implement the Solutions using Stream API

### Code

[src](./Product-Management-App/src)

## My Process

### Understanding the Problem

1. Search Products by Location: I need to take a User input for `Place` & search
   through the List of Products to Find all the Products that are in the Same
   `Place`
2. Get Products whose Warranty is Expired: I need to go through the List of
   Products & Check if each Products Warranty if Less than Current Year.

### Solution Explanations

#### Search Products by Location

I Created a method `getProductsByPlace` within the `ProductService` that takes a
String `place` as an Argument.

1. Initializing `prods` with an empty List or Type Products
2. Loop over the `products` List & compare each Products Place with input
   `place`.
   1. If matches, add product to `prods`
3. Return `prods`

#### Get Products whose Warranty is Expired

I Created a method `getExpiredWarrantyProducts` within the `ProductService`.

1. Initializing `prods` with an empty List or Type Products
2. Initializing `currentYear` with current Years Value using
   `Year.now().getValue()`
3. Loop over the `products` List & compare each Products `warranty` with
   `currentYear`.
   1. If `warranty` is less than `currentYear`, add product to `prods`
4. Return `prods`

## Article

[LinkedIn]()
