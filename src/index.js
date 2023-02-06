"use strict";
// Importing module
const express = require("express"), mysql = require("mysql"), cors = require("cors"), dotEnv = require("dotenv");
dotEnv.config();
const app = express();
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});
app.use(express.json());
app.use(cors());
app.get("/", (_req, res) => {
    res.json("Hello this is the backend!");
});
app.get("/books", (_req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        !!err ? res.json(err.toString()) : res.json(data);
    });
});
app.post("/books", (req, res) => {
    var _a, _b, _c, _d;
    const q = "INSERT INTO books (`title`, `desciption`, `price`, `cover`) VALUES (?)";
    const values = [
        (_a = req.body) === null || _a === void 0 ? void 0 : _a.title,
        (_b = req.body) === null || _b === void 0 ? void 0 : _b.desciption,
        (_c = req.body) === null || _c === void 0 ? void 0 : _c.price,
        (_d = req.body) === null || _d === void 0 ? void 0 : _d.cover,
    ];
    db.query(q, [values], (err, data) => {
        !!err
            ? res.json(err.toString())
            : res.json("Book has been created successfully!");
    });
});
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [bookId], (error, data) => {
        !!error ? res.json(error) : res.json("Book has been deleted successfully!");
    });
});
app.put("/books/:id", (req, res) => {
    var _a, _b, _c, _d;
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desciption` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [
        (_a = req.body) === null || _a === void 0 ? void 0 : _a.title,
        (_b = req.body) === null || _b === void 0 ? void 0 : _b.desciption,
        (_c = req.body) === null || _c === void 0 ? void 0 : _c.price,
        (_d = req.body) === null || _d === void 0 ? void 0 : _d.cover,
    ];
    db.query(q, [...values, bookId], (error, data) => {
        !!error ? res.json(error) : res.json("Book has been updated successfully!");
    });
});
app.listen(process.env.PORT, () => {
    console.log("Connected to backend!");
});
