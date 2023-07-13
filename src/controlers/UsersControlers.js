const AppError = require("../utils/appError");

const sqliteConnection = require("../database/sqlite");

class UsersControlers {
/**
 * index - GET para listar varios registros;
 * show - GET para exibir um registro expecifico;
 * create - POST para criar u mregistro;
 * update - PUT para atualisar um registro;
 * delete - DELETE para remover um registro;
 */

    async create(request, response){
    const { name, email, password } = request.body;

    const database = await sqliteConnection ();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

     if(checkUserExists){
        throw new AppError("Email ja cadastrado!");
     }   
     
     return response.status(201).json();
    }
}

module.exports = UsersControlers;