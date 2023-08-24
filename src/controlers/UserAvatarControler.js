const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarControler {
    async update(request, response){
        const user_id = request.user.id;
        const avatarFilename = request.file.filenema;

        const diskStorage = new DiskStorage();

        const user = await knex('users')
        .where({ id: user_id }).first();

        if(!user){
            throw new AppError("Somente user autenticados pode alterar essa img", 401)
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;

        await knex('users').update(user).where({ id:user_id});

        return response.json(user);
    }
}

module.exports = UserAvatarControler