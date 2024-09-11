const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();
require('./config/Database').connectDB();
const router = require("./routes/index");

const PORT = process.env.PORT || 4040;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(fileUpload());

app.use("/api/v1", router);

app.get("/", (req, res) => {
   const userLoggedIn = req.cookies.token ? true : false;
   res.render('index', { title: 'Home',userLoggedIn });
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));