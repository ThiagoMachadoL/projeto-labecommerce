-- Active: 1682131536691@@127.0.0.1@3306
-- CREATES

CREATE Table users(
     id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT  UNIQUE NOT NULL,
    password TEXT  NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime'))
);
CREATE Table products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);
CREATE Table purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')),
    paid INTEGER NOT NULL DEFAULT(0),
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);
CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT(1),
  FOREIGN KEY (purchase_id) REFERENCES purchases(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
-- INSERTS
INSERT INTO users(id,name,email,password)  
VALUES 
( "01","thiago","thiago@email.com","123456"),
( "02","ludmila","ludmila@email.com","212121"),
( "03","carol","carol@email.com","565656"),
( "04","chay","chay@email.com","898956"),
( "05","james","james@email.com","145056"),
( "06","mike","mike@email.com","654656"),
( "07","ana","ana@email.com","321325"),
( "08","bia","bia@email.com","645678"),
( "09","carla","carla@emailcm","054536"),
( "10","Charlie Brown","cbjr@gmail.com","212555");
INSERT INTO products (id,name,price,category,image_url) VALUES 
("011", "Caixa de doce", 50.00,"Kraft","img0"),
("022", "Caixa de mudança", 22.00,"Microondulado","img1"),
("033", "Caixa c/ visor 10 x 20", 5.00,"Duplex","img2"),
("044", "Sacola", 2.00,"Kraft","img3"),
("055", "Caixa c/ visor 25 x 35", 12.00,"Kraft","img4"),
("066", "Caixa estampada 20 x 30", 10.00,"Duplex","img5"),
("077", "Caixa p/ ovo de colher 350g", 4.00,"Kraft","img6"),
("088", "Caixa p/ tranporte (Correios) 30 x 20 x 10", 8.00,"Microondulado","img7"),
("099", "Caixa box 20 x 20 x 10", 15.00,"Kraft","img8"),
("100", "Caixa surpresa 27 x 27", 20.00,"Cartonada","img9");
INSERT INTO purchases (id, total_price, paid ,buyer_id)
VALUES
("c001", 30, 0, "01" ),
("c002", 15, 1, "02" ),
("c003", 50, 0, "03" ),
("c004", 20, 1, "04" );
INSERT INTO purchases_products
VALUES
("c001", "011", 5),
("c002", "022", 10),
("c003", "088", 6),
("c004", "099", 9);
--SELECTS 
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM purchases;
SELECT * FROM purchases_products;
-- DROPS
DROP TABLE users;
DROP TABLE products;
DROP TABLE purchases;
DROP TABLE purchases_products;

-- GET ALL USERS
SELECT * FROM users;

-- GET ALL PRODUCTS
SELECT * FROM products;

-- SEARCH PRODUCT BY NAME
SELECT * FROM products WHERE name = "Sacola";

-- CREATE USER
INSERT INTO users
VALUES ("11","Rodrigo","rodrigo@email.com", "654321", DATETIME('now', 'localtime'));

-- CREATE PRODUCT
INSERT INTO products
VALUES ("111", "Caixa bag 27 x 27", 20.00,"Cartonada","img11");


-- GET PRODUCTS BY ID
SELECT * FROM products
WHERE id = "055";

-- DELETE USER BY ID
DELETE FROM users
WHERE id = "08";

-- DELETE PRODUCT BY ID
DELETE FROM products
WHERE id = "022";

-- EDIT USER BY ID
UPDATE users
SET name = "Mariana"
WHERE id = "02";


-- EDIT PRODUCT BY ID
UPDATE products
SET price = 30
WHERE id = "011";

SELECT * FROM users;
SELECT * FROM products;

-- GET ALL USERS
SELECT * FROM users
ORDER BY email ASC;

-- GET ALL PRODCUTS 1

SELECT * FROM products
ORDER BY price ASC
LIMIT 5 OFFSET 0;

-- GET ALL PRODUCTS 2

SELECT * FROM products
WHERE price >=  5 AND price <= 20
ORDER BY price ASC;


SELECT * FROM purchases_products WHERE purchase_id = 'c001'
