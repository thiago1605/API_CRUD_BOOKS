// Importing module
const 
  express = require("express"),
  mysql = require("mysql"),
  cors = require("cors"),
  dotEnv = require("dotenv")
;

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

app.get("/", (_req: Request, res: { json: (arg0: string) => string }) => {
  res.json("Hello this is the backend!");
});

app.get("/books", (_req: Request, res: { json: (arg0: string) => string }) => {
  const q = "SELECT * FROM books";
  db.query(q, (err: Error, data: string) => {
    !!err ? res.json(err.toString()) : res.json(data);
  });
});


app.post("/books", (req: any, res: { json: (arg0: string) => void }) => {
  const q =
    "INSERT INTO books (`title`, `desciption`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body?.title,
    req.body?.desciption,
    req.body?.price,
    req.body?.cover,
  ];

  db.query(q, [values], (err: Error, data: any) => {
    !!err
      ? res.json(err.toString())
      : res.json("Book has been created successfully!");
  });
});

app.delete("/books/:id", (req: { params: { id: string } }, res: any) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (error: Error, data: any) => {
    !!error ? res.json(error) : res.json("Book has been deleted successfully!");
  });
});

app.put("/books/:id", (req: any, res: any) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desciption` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body?.title,
    req.body?.desciption,
    req.body?.price,
    req.body?.cover,
  ];

  db.query(q, [...values, bookId], (error: Error, data: any) => {
    !!error ? res.json(error) : res.json("Book has been updated successfully!");
  });
});

app.listen(process.env.PORT, () => {
  console.log("Connected to backend!");
});
