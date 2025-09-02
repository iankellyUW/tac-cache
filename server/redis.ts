import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error", (error) => {
    console.error("Redis error:", error);
});

export default redisClient;