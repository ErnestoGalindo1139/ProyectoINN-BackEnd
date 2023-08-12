const { Router } = require('express');
const router = Router();

// Raiz http://localhost/
router.get('/', (req, res) => {
  res.json({
    "Titulo" : "Proyecto Amabely"
  });
});

module.exports = router;


// app.get('/', (req, res) => {
//   res.send('¡Hola, esta es mi primera aplicación con Express.js!');
// });

// app.get('/about', (req, res) => {
//   res.send('Esta es una página de acerca de nosotros.');
// });
