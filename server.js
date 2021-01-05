let express = require("express");

let app = express();

let PORT_URL = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());

app.use(express.static("./public"));


require("./public/assets/js/routing")(app);


app.listen(PORT_URL, function() {
    console.log("listening on port " + PORT_URL);
});
