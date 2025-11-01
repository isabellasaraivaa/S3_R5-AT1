const bcrypt = require('bcrypt');

let senha = 'senha-123';

const saltRounds = 10; //numero de rounds de hash

const senhaCriptografada = bcrypt.hashSync(senha, saltRounds);

const senhaIncorreta = 'senha';

console.log('Senha original:', senha);
console.log('Senha criptografada:', senhaCriptografada);

const senhaValida = bcrypt.compareSync(senhaIncorreta, senhaCriptografada);

if (senhaValida) {
    console.log('Senha válida!');
} else {
    console.log('Senha incorreta!');
}