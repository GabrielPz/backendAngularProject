import express from "express";
import filesRoutes from "./routes/product";
import userRoutes from "./routes/users";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(filesRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});