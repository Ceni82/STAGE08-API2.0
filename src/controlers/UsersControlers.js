class UsersControlers {
/**
 * index - GET para listar varios registros;
 * show - GET para exibir um registro expecifico;
 * create - POST para criar u mregistro;
 * update - PUT para atualisar um registro;
 * delete - DELETE para remover um registro;
 */

create(request, response){
    const { name, mail, senha } = request.body;

    response.status(201).json({name, mail, senha});
}
}

module.exports = UsersControlers;