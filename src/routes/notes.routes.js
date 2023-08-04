const { Router } = require("express");

const NotesController = require("../controlers/NotesController");


const notesRoutes = Router();


const notesController= new NotesController();

notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.detele("/:id", notesController.delete);



module.exports = notesRoutes;