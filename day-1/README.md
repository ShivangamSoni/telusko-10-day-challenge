# Day 1: Recursion & Memoization

This is my solution to the Day 1 Challenge.

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Code](#code)
- [My Process](#my-process)
  - [Understanding the Problem](#understanding-the-problem)
  - [Code Explanations](#code-explanation)
    - [Iteration](#iteration)
    - [Recursion](#recursion)
    - [Memoization](#memoization)
- [Article](#article)

## Overview

### The Challenge

Write a Program that generates
[**Pascal's Triangle**](https://en.wikipedia.org/wiki/Pascal%27s_triangle) of
**n** Height

Solve with:

- Iteration
- Recursion
- Memoization

### Code

- [Iteration](./iteration.js)
- [Recursion](./recursion.js)
- [Memoization](./memoization.js)

## My Process

### Understanding the Problem

As per my understanding in Pascals Triangle cells of the next row are
constructed based on previous row.

```
        1
      1   1
    1   2   1
  1   3   3   1
 1   4   6   4   1
```

Further Looking at the Diagram, I see that for the first & last element in each
row, the Value is constant: 1.

Every other cells Value if equivalent to the Sum of the `Cell above` it & the
`Cell Before the Cell Above`. So on Row 5, the Cell has value `6` come by Adding
3 that right Above the Cell & 3 that's before it.

### Solution Explanations

For all the Solutions, I've defined the `generatePascalsTriangle` function that
takes in a `height` & returns a Matrix Array representing the Pascals Triangle
of given height.

#### Iteration

1. `triangle` is initialized using Empty Array
2. I Loop from `0 to height - 1`
   1. `row` is initialized with an Empty Array
   2. I Loop from `0 to i`
      1. If `j` is on the edges i.e., `i === 0 || j === i` then I push `1` to
         the `row`. That's the Pascals Triangles Constant.
      2. Else I calculate the Cell Value, by summing Cell above the Current Cell
         & Cell Before the Cell Above. Then I push the calculated value to the
         `row`
   3. I push the `row` to the `triangle`
3. Finally, Return the Triangle Matrix

#### Recursion

1. I check the Base Cases:
   1. If `height <= 0` I return an Empty Array
   2. If the `height === 1` I return `[ [ 1 ] ]`, the first row of the Triangle
2. Next, I make a Recursive Call to generate the `triangle` for `height -1`,
   because in order to calculate the current row I need the previous row.
3. Initialize `prevRow` & `row` to Previous Row & Empty Array respectively.
4. Loop from `0 to height -1` (Similar to Iteration Solution)
   1. If `i === 0 || i === height - 1`, I push `1` to the `row`
   2. Else, I calculate the cell by using Values from the `prevRow` & push it to
      the `row` .
5. I Push the `row` to the `triangle` & Return it.

#### Memoization

1. For Memoization, I'm creating an IIFE that has the `cache` which is
   initialized to an Empty Map. In this way, the cache is being kept Secure
   within the Closure.
2. I return the `generatePascalsTriangle` Recursive Function.

**On Function Call: It's Basically Same as Recursion but with Cache**

1. I check the Base Cases:
   1. If `height <= 0` I return an Empty Array
   2. If the `height === 1` I return `[ [ 1 ] ]`, the first row of the Triangle
   3. I'm checking if the triangle for `height` is cached, then return it.
2. Next, I make a Recursive Call to generate the `triangle` for `height -1`,
   because in order to calculate the current row I need the previous row.
3. Initialize `prevRow` & `row` to Previous Row & Empty Array respectively.
4. Loop from `0 to height -1` (Similar to Iteration Solution)
   1. If `i === 0 || i === height - 1`, I push `1` to the `row`
   2. Else, I calculate the cell by using Values from the `prevRow` & push it to
      the `row` .
5. I Push the `row` to the `triangle`, Put the `triangle` for the height in
   `cache` & Return it.

## Article

[LinkedIn](https://www.linkedin.com/pulse/recursion-memoization-shivangam-soni/)
