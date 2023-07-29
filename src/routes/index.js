app.get('/', (req, res) => {
    res.send('¡Hola, esta es mi primera aplicación con Express.js!');
  });
  
  app.get('/about', (req, res) => {
    res.send('Esta es una página de acerca de nosotros.');
  });
  