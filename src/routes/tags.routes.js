const { Router } = require("express");

const TagsController = require("../controlers/TagsController");


const tagsRoutes = Router();


const tagsController = new TagsController();

tagsRoutes.post("/", TagsController.index);


module.exports = usersRoutes;