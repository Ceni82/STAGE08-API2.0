const AppError = require("../utils/appError");
const { hash } = require("bcryptjs");
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

     const hashedPassword = await hash(password, 8);

     await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
     );

     return response.status(201).json();
    }
}

module.exports = UsersControlers;