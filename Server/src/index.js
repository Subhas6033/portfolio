import express from "express";
import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./DB/DB.js";
import path from 'path'


dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("WElcome to my project");
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is Running on PORT : http://localhost:${
          process.env.PORT || 8000
        }`
      );
    });
  })
  .catch(() => {
    console.log(`Unwanted ERR!! coming from index ${err}`);
  });
