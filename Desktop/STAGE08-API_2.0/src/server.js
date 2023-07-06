const express = require('express');

const app = express();

app.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params;

    response.send(`
    ID da mensagem:${id}.
    Para o usuário:${user}.
    `);
    
});

app.get("/users", (request, response) => {
    const { page, limit } = request.query;

    response.send(`Páginas: ${page}. Mostrar:${limit}`);
});

const PORT = 3333;
app.listen(PORT, () => console.log (`ESTOU PRONTO!! berrrrrrrrrrrrrr ${PORT}`));
