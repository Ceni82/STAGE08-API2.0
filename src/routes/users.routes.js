const { Router } = require("express");

const UsersControlers = require("../controlers/UsersControlers");


const usersRoutes = Router();


const usersControlers = new UsersControlers();

usersRoutes.post("/", usersControlers.create);
usersRoutes.put("/:id", usersControlers.update);

module.exports = usersRoutes;