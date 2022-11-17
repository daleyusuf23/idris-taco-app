DROP TABLE IF EXISTS taco;
DROP TABLE IF EXISTS customer;

CREATE TABLE taco (
    tacoid SERIAL not null PRIMARY KEY,
    name text NOT NULL,
    ingredient text
);

CREATE TABLE customer (
    customerid SERIAL PRIMARY KEY,
    name text NOT NULL,
    qty INT,
    tacoid SERIAL,
    FOREIGN KEY (tacoid) REFERENCES taco(tacoid)  
);


INSERT INTO taco(name, ingredient) VALUES
('Hearty', 'Shiitake Walnut Taco Meat, Jackfruit Taco Filling'),
('Very Veggie', 'Fajita Veggies, Grilled Vegetables')
