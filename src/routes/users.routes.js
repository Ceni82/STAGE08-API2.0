const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");


const UsersController = require("../controlers/UsersController");
const UsersAvatarControler = require('../controlers/UserAvatarControler')
const ensureAuthenticated = require("../middleware/ensureAuthenticated");


const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);


const usersController = new UsersController();
const usersAvatarController = new UsersAvatarControler();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), UsersAvatarControler.update)


module.exports = usersRoutes;