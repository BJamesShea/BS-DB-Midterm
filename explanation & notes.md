For each table to be in 3NF, it must fiirst meet 1NF (all fields are atomic, with no multi-value fields) and 2NF (each table has one primary key, and all other fields directly depend on it).

---

Movies Table:

1NF: All fields are atomic, each holding a single value.
2NF: The primary key is movie_id, and every other field (like title, release_year, genre, and director_name) depends on it.
3NF: No dependencies between non-key fields; each one only depends on movie_id.

Customers Table:

1NF: All fields are atomic.
2NF: The primary key is customer_id, and all other fields depend on it.
3NF: No transitive dependencies among non-key fields (e.g., first_name, last_name, email, phone depend only on customer_id).

Rentals Table:

1NF: All fields are atomic.
2NF: The primary key is rental_id, and all other fields (like customer_id, movie_id, rental_date, and return_date) depend on it. customer_id and movie_id are foreign keys, creating no partial dependencies.
3NF: No transitive dependencies; rental_date and return_date depend only on rental_id.

Each table meets 3NF standards!

Known bugs and notes;

Not totally sure why it's showing tables created after everything, even if I remove someones email. Maybe I messed up the try catch. Maybe you can explain that to me in the feedback. I really don't know what I did wrong there.

Could've made the list for ' node index.js show 'better. I know you can make a boxed list, but I was short on time and can't remember how exactly to do it.
