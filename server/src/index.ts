// import express, {Request, Response} from "express";
// import cors from "cors";
// import { UserRouter } from "./routes/UserRouter";
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";


// const app: express.Application = express();

// dotenv.config({ path: '../.env' });
// const DB_URL = process.env.DB_URL;
// console.log(DB_URL);

// if (!DB_URL) {
//   throw new Error('DB_URL is not defined in .env file');
// }

// console.log(DB_URL);
// app.use(express.json());
// app.use(cors());

// app.use("/users", UserRouter);

// const client = new MongoClient(DB_URL);

// const PORT = process.env.PORT || 3001;

// app.get("/", (req: Request, res: Response) => {
//   console.log(DB_URL);
//   res.send("Users API is running...");
// })

// app.listen(PORT, (): void => {
//   console.log(`Server running on port ${PORT}`);
// })

import express, {Request, Response} from "express";
import cors from "cors";
import { UserRouter } from "./routes/UserRouter";
import { AuthRouter } from "./routes/AuthRouter";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";


const app: express.Application = express();

const envPath = path.resolve(__dirname, '../.env');
console.log(`Loading .env from: ${envPath}`);

dotenv.config({ path: envPath });

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

if (!DB_URL) {
  throw new Error('DB_URL is not defined in .env file');
}


app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Authorization"]
}));

app.use("/users", UserRouter);
app.use("/auth", AuthRouter)


const PORT = process.env.PORT || 3001;

MongoClient.connect(DB_URL)
.then(client => {
  const dbo = client.db(DB_NAME);
  const usersCollection = dbo.collection('users');
  app.locals.usersCollection = usersCollection; // this line stores the collection from above so it is available anywhere in the app, after small delay.
  app.listen(PORT, () => console.info(`REST API running on port ${PORT}`));
}).catch(error => console.error(error));

app.get("/", (req: Request, res: Response) => {
  console.log(DB_URL);
  res.send("Users API is running...");
})
