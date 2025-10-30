import './Config/loadenv.js'
import { app } from "./app.js";
import { connectDB } from "./DB/DB.js";

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


app.get('/', (req,res) =>{
  res.send("Welcome to our site")
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on ', process.env.PORT || 8000 )
})