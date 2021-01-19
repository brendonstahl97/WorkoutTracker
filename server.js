// requiring depencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));


app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


require("./routes/htmlRoutes.js")(app);
app.use(require("./routes/apiRoutes.js"));


app.listen(PORT, () => {

    console.log(`Application is running on http://localhost:${PORT}`);

});