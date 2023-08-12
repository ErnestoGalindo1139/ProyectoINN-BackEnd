const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'amabely',
    port: 3306
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Manejar cierre de conexión en caso de terminación de la aplicación
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) {
            console.error('Error al cerrar la conexión a la base de datos:', err);
        } else {
            console.log('Conexión a la base de datos cerrada');
        }
        process.exit();
    });
});

module.exports = connection;
