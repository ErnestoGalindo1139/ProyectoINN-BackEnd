const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const connection = require('./src/db/config'); // Importa la configuración de la base de datos

// Configuraciones
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/api/usuario', (req, res) => {
  const sqlQuery = 'SELECT * FROM usuario';

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ error: 'Error en la consulta SQL' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/usuario', (req, res) => {
  const { Uio_Nombre, Uio_Correo, Uio_Contrasena } = req.body;

  const sqlQuery = 'INSERT INTO usuario (Uio_Nombre, Uio_Correo, Uio_Contrasena) VALUES (?, ?, ?)';

  const values = [Uio_Nombre, Uio_Correo, Uio_Contrasena]; // Solo los valores que se insertarán

  connection.query(sqlQuery, values, (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar en la base de datos' });
    } else {
      res.json({ message: 'Datos insertados correctamente' });
    }
  });
});


// Ruta Deporte
app.get('/api/deporte', (req, res) => {
  const sqlQuery = 'SELECT * FROM deporte';

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ error: 'Error en la consulta SQL' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/deporte', (req, res) => {
  const { Depor_Nombre } = req.body;

  const sqlQuery = 'INSERT INTO deporte (Depor_Nombre) VALUES (?)';

  const values = [Depor_Nombre]; // Solo los valores que se insertarán

  connection.query(sqlQuery, values, (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar en la base de datos' });
    } else {
      res.json({ message: 'Datos insertados correctamente' });
    }
  });
});

// Ruta EspacioDeportivo
app.get('/api/espaciodeportivo', (req, res) => {
  const sqlQuery = 'SELECT * FROM espaciodeportivo';

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ error: 'Error en la consulta SQL' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/espaciodeportivo', (req, res) => {
  const { ED_Nombre } = req.body;

  const sqlQuery = 'INSERT INTO espaciodeportivo (ED_Nombre) VALUES (?)';

  const values = [ED_Nombre]; // Solo los valores que se insertarán

  connection.query(sqlQuery, values, (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar en la base de datos' });
    } else {
      res.json({ message: 'Datos insertados correctamente' });
    }
  });
});

// Ruta RecomendacionMensaje
app.get('/api/recomendacionmensaje', (req, res) => {
  const sqlQuery = 'SELECT * FROM recomendacionmensaje';

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ error: 'Error en la consulta SQL' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/recomendacionmensaje', (req, res) => {
  const { RecoM_Mensaje } = req.body;

  const sqlQuery = 'INSERT INTO recomendacionmensaje (RecoM_Mensaje) VALUES (?)';

  const values = [RecoM_Mensaje]; // Solo los valores que se insertarán

  connection.query(sqlQuery, values, (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar en la base de datos' });
    } else {
      res.json({ message: 'Datos insertados correctamente' });
    }
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Express'); // Puedes cambiar el mensaje
});

// Rutas adicionales
app.get('/prueba', (req, res) => {
  // Ejecutar una consulta SQL
  const sqlQuery = 'SELECT * FROM deporte';

  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).send('Error en la consulta SQL');
    } else {
      res.json(results);
    }
  });
});

app.post('/prueba', (req, res) => {
  res.send('Hiciste un post');
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
