# E-commerce API

The E-commerce API provides RESTful endpoints for managing an e-commerce platform's categories, products, and tags. Built using Node.js, Express, and Sequelize, this API enables CRUD operations on categories, products, and tags, and supports many-to-many relationships between products and tags.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Categories](#categories)
  - [Products](#products)
  - [Tags](#tags)
- [License](#license)

## Installation

To get started with the E-commerce API, follow these steps:

### Clone the Repository
bash
git clone https://github.com/gerik/E-commerce.git
cd E-commerce

### Install Dependencies

Make sure you have Node.js and npm installed. Then run:
bash
npm install

### Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:
plaintext
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
PORT=3001

### Create and Migrate the Database

Ensure PostgreSQL is installed and running, then drop and recreate the database, and run migrations:
bash
psql -U postgres -c "DROP DATABASE IF EXISTS ecommerce_db;"
psql -U postgres -c "CREATE DATABASE ecommerce_db;"
psql -f db/schema.sql

## Configuration

- *Database*: PostgreSQL
- *ORM*: Sequelize
- *Server*: Express.js

## Usage

### Start the Server
bash
npm start

The server will run on [http://localhost:3001](http://localhost:3001).

### Testing Endpoints

You can use tools like Postman or cURL to test the API endpoints.

## API Endpoints

### Categories

- *GET /api/categories*: Retrieve all categories, including associated products.
- *GET /api/categories/:id*: Retrieve a single category by its id, including associated products.
- *POST /api/categories*: Create a new category.
- *PUT /api/categories/:id*: Update a category by its id.
- *DELETE /api/categories/:id*: Delete a category by its id.

### Products

- *GET /api/products*: Retrieve all products, including associated tags and categories.
- *GET /api/products/:id*: Retrieve a single product by its id, including associated tags and category.
- *POST /api/products*: Create a new product.
- *PUT /api/products/:id*: Update a product by its id.
- *DELETE /api/products/:id*: Delete a product by its id.

### Tags

- *GET /api/tags*: Retrieve all tags, including associated products.
- *GET /api/tags/:id*: Retrieve a single tag by its id, including associated products.
- *POST /api/tags*: Create a new tag.
- *PUT /api/tags/:id*: Update a tag by its id.
- *DELETE /api/tags/:id*: Delete a tag by its id.