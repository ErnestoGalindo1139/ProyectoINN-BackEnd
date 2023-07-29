const express = require('express');
const app = express();

// Rutas y lógica de tu aplicación aquí

// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
