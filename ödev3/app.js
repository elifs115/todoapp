import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./db/dataSource.js";
import todosRouter from "./routes/todosRouter.js"; // <-- 'routers' -> 'routes' olarak düzeltildi
import usersRouter from "./routes/usersRouter.js";

const app = express();
const port = 3000;

app.use(express.json());

// Router'ları kullan
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

// Genel hata yakalayıcı (isteğe bağlı ama önerilir)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });