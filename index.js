const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();
require('./config/Database').connectDB();
const router = require("./routes/index");

const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(fileUpload());
app.use("/api/v1",router);

app.get("/", (req, res) => {
   res.send("Server is spinnning up...")
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));