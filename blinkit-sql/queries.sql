-- SQL Queries

-- Query 1: Retrieve top-selling books
SELECT b.title, a.author_name, SUM(od.quantity) AS total_sold
FROM Books b
JOIN OrderDetails od ON b.book_id = od.book_id
JOIN Authors a ON b.author_id = a.author_id
GROUP BY b.book_id
ORDER BY total_sold DESC
LIMIT 10;


-- Query 2: Calculate total sales revenue for a given period
SELECT SUM(od.subtotal) AS total_revenue
FROM Orders o
JOIN OrderDetails od ON o.order_id = od.order_id
WHERE o.order_date BETWEEN '01-02-2024' AND '20-02-2024';


-- Query 3: Retrieve books by genre
SELECT b.title, a.author_name, g.genre_name
FROM Books b
JOIN BookGenres bg ON b.book_id = bg.book_id
JOIN Genres g ON bg.genre_id = g.genre_id
JOIN Authors a ON b.author_id = a.author_id
WHERE g.genre_name = 'fiction';


-- Query 4: Calculate total orders and revenue by customer
SELECT c.customer_id, c.customer_name, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS total_revenue
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;


-- Query 5: Retrieve customers who have not made any orders
SELECT c.customer_id, c.customer_name
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;


-- Query 6: Retrieve books with a rating above a certain threshold
SELECT b.title, a.author_name, r.rating_value
FROM Books b
JOIN BookRatings br ON b.book_id = br.book_id
JOIN Ratings r ON br.rating_id = r.rating_id
JOIN Authors a ON b.author_id = a.author_id
WHERE r.rating_value >= 4;


-- Query 7: Retrieve orders with a total amount above a certain threshold
SELECT o.order_id, o.order_date, c.customer_name, o.total_amount
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
WHERE o.total_amount >= 1000;


-- Query 8: Retrieve books that have not been ordered in a given period
SELECT b.title, a.author_name
FROM Books b
JOIN OrderDetails od ON b.book_id = od.book_id
JOIN Authors a ON b.author_id = a.author_id
WHERE od.order_id NOT IN (
SELECT o.order_id
FROM Orders o
WHERE o.order_date BETWEEN '01-02-2024' AND '20-02-2024'
);


-- Query 9: Retrieve customers who have made orders in a given period
SELECT c.customer_id, c.customer_name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_date BETWEEN '01-02-2024' AND '20-02-2024'
GROUP BY c.customer_id, c.customer_name;


-- Query 10: Retrieve books that have not been rated
SELECT b.title, a.author_name
FROM Books b
JOIN Authors a ON b.author_id = a.author_id
WHERE b.book_id NOT IN (
SELECT br.book_id
FROM BookRatings br
);


-- Query 11: Retrieve customers who have made orders above a certain amount
SELECT c.customer_id, c.customer_name, SUM(o.total_amount) AS total_spent
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.total_amount) >= 5000;


-- Query 12: Retrieve books that have been ordered more than once
SELECT b.title, a.author_name, COUNT(od.order_id) AS total_orders
FROM Books b
JOIN OrderDetails od ON b.book_id = od.book_id
JOIN Authors a ON b.author_id = a.author_id
GROUP BY b.book_id
HAVING COUNT(od.order_id) > 1;


-- Query 13: Retrieve customers who have not made any orders in a given period
SELECT c.customer_id, c.customer_name
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL OR o.order_date NOT BETWEEN '01-02-2024' AND '20-02-2024';


-- Query 14: Retrieve books that have been rated above a certain threshold
SELECT b.title, a.author_name, AVG(r.rating_value) AS average_rating
FROM Books b
JOIN BookRatings br ON b.book_id = br.book_id
JOIN Ratings r ON br.rating_id = r.rating_id
JOIN Authors a ON b.author_id = a.author_id
GROUP BY b.book_id
HAVING AVG(r.rating_value) >= 4;


-- Query 15: Retrieve orders with a specific status
SELECT o.order_id, o.order_date, c.customer_name, o.total_amount, os.status_name
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN OrderStatuses os ON o.status_id = os.status_id
WHERE os.status_name = 'shipped';