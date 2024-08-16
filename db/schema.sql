
-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

--create category table

CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL

);
-- Create Product table
CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 10 CHECK (stock >= 0),
    category_id INTEGER REFERENCES Category(id) ON DELETE SET NULL
);

-- Create Tag table
CREATE TABLE Tag (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255)
);

-- Create ProductTag table
CREATE TABLE ProductTag (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES Product(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES Tag(id) ON DELETE CASCADE,
    UNIQUE (product_id, tag_id) -- Ensure unique product-tag pairs
);