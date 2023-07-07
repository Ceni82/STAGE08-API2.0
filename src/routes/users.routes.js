const { Router } = require("express");

const UsersControlers = require("../controlers/UsersControlers");


const usersRoutes = Router();

const usersControlers = new UsersControlers();

usersRoutes.post("/", usersControlers.create);

module.exports = usersRoutes;