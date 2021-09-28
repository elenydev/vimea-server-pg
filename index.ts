import express from "express";
import methodOverride from "method-override";
import cors from "cors";
import userRoutes from "./routes/user/";
import path from "path"

const app = express();
const port = 8080;

const router = express.Router();

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/index.html"))
})

router.use(userRoutes);

app.listen(port, () => {
  console.log("app working");
});
