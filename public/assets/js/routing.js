let path = require("path");

const { v4: uuidv4 } = require('uuid');

const fs = require("fs");

let db_JSON = require("../../../db/db.json");

module.exports = function(app) {


        ////API routes
        ////GET /api/notes - Should read the db.json file and return all saved notes as JSON.
        app.get("/api/notes", function(req, res) {
        res.send(db_JSON);
        });
    


        ////POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
        app.post("/api/notes", function(req, res) {
            
            if(!req.body.title) {
            return res.json({error: "Your Note Needs A Title"});
            }
            const note = {...req.body, id: uuidv4()}

            db_JSON.push(note);

            fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(db_JSON), (err) => {
            if (err) {
                return res.json({error: "Error Saving Your Note"});
            }
            return res.json(note);
            });
        });



        ////DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
        app.delete("/api/notes/:id", function(req,res) {
        
            let noteId = req.params.id;
            let newNotes = db_JSON.filter(note => note.id !== noteId)
            db_JSON = newNotes;
        
            fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(db_JSON), (err) => {
            if (err) {
                return res.json({error: "Error writing to file"});
            }
            return res.json(newNotes);
            });

        })


        ////HTML routes
        ////this one loads the main page on load
        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "../../public/index.html"));
        });

        ////GET /notes - Should return the notes.html file.
        app.get("/notes", function(req, res) {
            res.sendFile(path.join(__dirname, "../../notes.html"));
        });
        
        ////GET * - Should return the index.html file
        app.get("*", function(req, res) {
            res.sendFile(path.join(__dirname, "../../index.html"));
        });
};