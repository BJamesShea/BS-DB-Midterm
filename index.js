const { Pool } = require("pg");

// PostgreSQL connection test
const pool = new Pool({
  user: "postgres", //This _should_ be your username, as it's the default one Postgres uses
  host: "localhost",
  database: "movie_rental", //This should be changed to reflect your actual database
  password: "password", //(very secure)
  port: 5432,
});

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        release_year INTEGER NOT NULL,
        genre VARCHAR(100) NOT NULL,
        director_name VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Customers (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Rentals (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        movie_id INTEGER NOT NULL,
        rental_date DATE NOT NULL,
        return_date DATE NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES Customers(id) ON DELETE CASCADE,
        FOREIGN KEY (movie_id) REFERENCES Movies(id) ON DELETE CASCADE
      );
    `);

    console.log("Tables created!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

/**
 * Inserts a new movie into the Movies table.
 *
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  try {
    await pool.query(
      `
      INSERT INTO Movies (title, release_year, genre, director_name)
      VALUES ($1, $2, $3, $4)
    `,
      [title, year, genre, director]
    );
    console.log(`Movie '${title}' added successfully.`);
  } catch (error) {
    console.error("Error inserting movie:", error);
  }
}

/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  try {
    const result = await pool.query("SELECT * FROM Movies");
    console.log("Movies:");
    result.rows.forEach((movie) => {
      console.log(
        `ID: ${movie.id}, Title: ${movie.title}, Year: ${movie.release_year}, Genre: ${movie.genre}, Director: ${movie.director_name}`
      );
    });
  } catch (error) {
    console.error("Error displaying movies:", error);
  }
}

/**
 * Updates a customer's email address.
 *
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  try {
    const result = await pool.query(
      `
      UPDATE Customers SET email = $1 WHERE id = $2
    `,
      [newEmail, customerId]
    );

    if (result.rowCount === 0) {
      console.log(`Customer ID ${customerId} not found.`);
    } else {
      console.log(`Customer ID ${customerId}'s email updated to ${newEmail}.`);
    }
  } catch (error) {
    console.error("Error updating customer email:", error);
  }
}

/**
 * Removes a customer from the database along with their rental history.
 *
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  try {
    const result = await pool.query(
      `
      DELETE FROM Customers WHERE id = $1
    `,
      [customerId]
    );

    if (result.rowCount === 0) {
      console.log(`Customer ID ${customerId} not found.`);
    } else {
      console.log(
        `Customer ID ${customerId} and their rental history removed.`
      );
    }
  } catch (error) {
    console.error("Error removing customer:", error);
  }
}

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log("Usage:");
  console.log("  insert <title> <year> <genre> <director> - Insert a movie");
  console.log("  show - Show all movies");
  console.log("  update <customer_id> <new_email> - Update a customer's email");
  console.log("  remove <customer_id> - Remove a customer from the database");
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case "insert":
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case "show":
      await displayMovies();
      break;
    case "update":
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case "remove":
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
}

runCLI();
