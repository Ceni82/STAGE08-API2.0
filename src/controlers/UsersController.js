const AppError = require("../utils/appError");
const { hash, compare } = require("bcryptjs");
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

    async update(request, responde){
      const { name, email, password, old_password } = request.body;
      const { id } = request.params;

      const database = await sqliteConnection();
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

      if(!user){
         throw new AppError("Usuário não encontrado!");
      } 

      const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

      if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
         throw new AppError("Este email já está em uso!");
      } 

      user.name = name ?? user.name;
      user.email = email ?? user.email;

      if(  password && !old_password ){
         throw new AppError("Tu tem q informar uma nova senha!")
      }

      if(  password && !old_password ){
         const checkOldPassword = await compare(old_password, user.password);
      

      if(!checkOldPassword){
         throw new AppError("a senha antiga não confere!")
      }
      user.passward = await hash(password, 8);
   }

      await database.run(`
         UPDATE users SET
         name = ?,
         email = ?,
         password = ?,
         update_at = DATATME ('now'),
         WHERE id = ?`,
         [user.name, user.email, user.password, id]

      );

      return response.json();
   }
}

module.exports = UsersControlers;