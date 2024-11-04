CREATE TABLE Movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INTEGER NOT NULL,
    genre VARCHAR(100) NOT NULL,
    director_name VARCHAR(255) NOT NULL
);
CREATE TABLE Customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20)
);
CREATE TABLE Rentals (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    rental_date DATE NOT NULL,
    return_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);


-- It's data time

-- Here are my favorite movies of all time. These aren't in order because I cannot pick between my children.
INSERT INTO Movies (title, release_year, genre, director_name) VALUES
    ('Bladerunner 2049', 2017, 'Sci-Fi', 'Denis Villeneuve'),
    ('Prisoners', 2013, 'Thriller', 'Denis Villeneuve'),
    ('Dr Strangelove or: How I Learned to Stop Worrying and Love the Bomb', 1964, 'WAR', 'Stanley Kubrick'),
    ('Midsommar', 2019, 'Horror', 'Ari Aster'),
    ('Mulholland Drive', 2001, 'Mystery', 'David Lynch'),
    ('Eyes Wide Shut', 1999, 'Drama', 'Stanley Kubrick'),
    ('Once Upon a Time in Hollywood', 2019, 'Drama', 'Quentin Tarantino'),
    ('Dune: Part Two', 2024, 'Sci-Fi', 'Denis Villeneuve'),
    ('Hereditary', 2018, 'Horror', 'Ari Aster'),
    ('Magnolia', 1999, 'Drama', 'Paul Thomas Anderson'),
    ('The Witch', 2015, 'Horror', 'Robert Eggers'),
    ('The Lighthouse', 2019, 'Horror', 'Robert Eggers'),
    ('mother!', 2017, 'Drama', 'Darren Aronofsky');


    -- Honorable Mentions: The Nice Guys,  La La Land, Whiplash, The Prestige, There Will be Blood, Eternal Sunshine of the Spotless Mind, The Truman show

INSERT INTO Customers (first_name, last_name, email, phone) VALUES
    ('Brandon', 'Shea', 'brandon.shea@mail.com', '709-555-1234'),
    ('Brandina', 'Ballerina', 'theballerina@dance.com', '709-123-6542'),
    ('Detective', 'K', 'detectivek@br2049.com', '1-709-444-3322'),
    ('Aaron', 'Jeans', 'aaronjeans@pants.com', '1-709-666-6940'),
    ('Brianna', 'baker', 'bbaker@sister.com', '1-709-999-4478');

INSERT INTO Rentals (customer_id, movie_id, rental_date, return_date) VALUES
    (1, 2, '2024-08-15', '2024-08-18'),
    (1, 5, '2024-09-05', '2024-09-08'),
    (2, 1, '2024-07-20', '2024-07-23'),
    (2, 4, '2024-09-10', '2024-09-13'),
    (3, 3, '2024-08-25', '2024-08-28'),
    (3, 5, '2024-10-01', '2024-10-04'),
    (3, 1, '2024-10-05', '2024-10-08'),
    (4, 3, '2024-08-12', '2024-08-15'),
    (5, 4, '2024-09-12', '2024-09-15'),
    (5, 2, '2024-10-15', '2024-10-18');
