const { Router } = require("express");

const TagsController = require("../controlers/TagsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");


const tagsRoutes = Router();


const tagsController = new TagsController();

tagsRoutes.post("/", ensureAuthenticated, TagsController.index);


module.exports = usersRoutes;

