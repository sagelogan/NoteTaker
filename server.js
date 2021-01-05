let express = require("express");

let app = express();

let PORT_URL = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());

app.use(express.static("./public"));

////pull routing from this js file 
require("./public/assets/js/routing")(app);

////set up local host to run on port 8080 and tell me its connected
app.listen(PORT_URL, function() {
    console.log("listening on port " + PORT_URL);
});
