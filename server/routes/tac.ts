import { Router } from "express";
import redisClient from "../redis";
import { RedisArgument } from "redis";

const tacRouter = Router();

tacRouter.post("/tac", async (req, res) => {
    const { key, val } = req.body;
    const redisKey: RedisArgument = JSON.stringify(key);
    const redisVal: RedisArgument = JSON.stringify(val);
    if (key && val) {
        try {
            await redisClient.set(redisKey, redisVal);
            res.status(201).json({ success: true, key: redisKey, value: val });
        } catch (error) {
            console.error("Redis error:", error);
            res.status(500).json({ error: "Redis error" });
        }
    }
    res.status(400).json({ error: "Key and value are required" });
});

tacRouter.post("/tac/get", async (req, res) => {
    const { key } = req.body;
    try {
        const redisKey: RedisArgument = JSON.stringify(key);
        const value = await redisClient.get(redisKey);
        if (value) {
            res.status(200).json({ key: key, value: JSON.parse(value) });
        } else {
            res.status(404).json({ error: "Key not found" });
        }
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).json({ error: "Redis error" });
    }
});

tacRouter.delete("/tac/delete/all", async (req, res) => {
    try {
        await redisClient.flushAll();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).json({ error: "Redis error" });
    }
});

export default tacRouter;