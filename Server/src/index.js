import './Config/loadenv.js'
import { app } from "./app.js";
import { connectDB } from "./DB/DB.js";

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Welcome to my project");
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is Running on PORT : ${
          process.env.PORT || 8000
        }`
      );
    });
  })
  .catch((err) => {
    console.log(`Unwanted ERR!! coming from index ${err}`);
  });