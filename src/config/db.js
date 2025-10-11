const sql = require("mssql");
//config variavel de ambiente 
const CONFIG = {
    user: 'sa',
    password: '123456789',
    server:'localhost',
    database: `LojaDB`,
    options:{
        encrypt: true,
        trustServerCertificate: true //Ignora o erro de certificado autoassinado
    }
}

async function getConnection(){
    try { //pool cria um conjunto de conexões
        const pool = await sql.connect(CONFIG);
        return pool;
    } catch (error) {
        console.error('Erro na conexão SQL Server:',error);
    }
}

// (async ()=>{
//     try {
//     const poll = await getConnection();
//     console.log("Conexão estabeleciada com sucesso!");
//     } catch (error) {
//         console.error("Error ao estabelecer conexão:",error);
//     }    
// })()

module.exports = {sql, getConnection};