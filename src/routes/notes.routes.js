const { Router } = require("express");

const NotesController = require("../controlers/NotesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");


const notesRoutes = Router();


const notesController= new NotesController();

notesRoutes.unsubscribe(ensureAuthenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.detele("/:id", notesController.delete);



module.exports = notesRoutes;