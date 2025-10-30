import express from "express";
import cors from "cors";
const app = express();

// Enable CORS for the specific origin
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials : true
}))

// Configuration for handelling the JSON data
app.use(express.json({
  limit : '100kb'
}));

// Configuration for the URL data
app.use(
  express.urlencoded({
    limit : '100kb',
    extended: true,
  })
);

import contactRouter from './Routes/contact.routes.js'
app.use("/api/v1", contactRouter)


export { app };