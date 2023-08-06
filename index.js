const express = require('express');
const app = express();

// Inicia el servidor
const port = 3000;

// Region
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json({
  type: "*/*"
}));

// Endregion

// Cuando te hagan un post http://localhost:3000/prueba
app.get('/prueba', (req, res) => {
  res.send('Hiciste un get')
});

// Cuando te hagan un post http://localhost:3000/prueba
app.post('/prueba', (req, res) => {
  res.send('Hiciste un post')
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
});




