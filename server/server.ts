import express from "express";
import redisClient from "./redis";
import dotenv from "dotenv";
import cors from "cors";
import tacRouter from "./routes/tac";

dotenv.config();
const PORT = process.env.PORT;


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", tacRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    redisClient.connect();
});