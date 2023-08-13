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

// Ruta RecomendacionProtocolo
app.get('/api/recomendacionprotocolo', (req, res) => {
  const sqlQuery = 'SELECT * FROM RecomendacionProtocolo';

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ error: 'Error en la consulta SQL' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/recomendacionprotocolo', (req, res) => {
  const { RecoP_Protocolo } = req.body;

  const sqlQuery = 'INSERT INTO RecomendacionProtocolo (RecoP_Protocolo) VALUES (?)';

  const values = [RecoP_Protocolo]; // Solo los valores que se insertarán

  connection.query(sqlQuery, values, (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ error: 'Error al insertar en la base de datos' });
    } else {
      res.json({ message: 'Datos insertados correctamente' });
    }
  });
});

// Ruta datosclimaticos
// Ruta para obtener datos climáticos
app.get('/api/datosclimaticos', (req, res) => {
  const sqlQuery = 'SELECT * FROM datosclimaticos';

  connection.query(sqlQuery, (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json(results);
      }
  });
});

// Ruta para insertar datos climáticos
app.post('/api/datosclimaticos', (req, res) => {
  const {
      idRecoM,
      temperatura,
      humedad,
      nivelLluvia,
      indiceUV,
      idRecoPDC
  } = req.body;

  const currentDate = new Date();
  const fecha = currentDate.toISOString().split('T')[0];
  const hora = currentDate.toLocaleTimeString('en-US', { hour12: false });

  const sqlQuery = 'INSERT INTO datosclimaticos (DC_IdRecoM, DC_Temperatura, DC_Humedad, DC_NivelLluvia, DC_IndiceUV, DC_IdRecoP, DC_Fecha, DE_HoraRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  const values = [
      idRecoM,
      temperatura,
      humedad,
      nivelLluvia,
      indiceUV,
      idRecoPDC,
      fecha,
      hora
  ];

  connection.query(sqlQuery, values, (error, results) => {
      if (error) {
          console.error('Error al insertar en la base de datos:', error);
          res.status(500).json({ error: 'Error al insertar en la base de datos' });
      } else {
          res.json({ message: 'Datos insertados correctamente' });
      }
  });
});

// Ruta para obtener los datos de la tabla espaciodeportivodatosclimaticos
app.get('/api/espaciodeportivodatosclimaticos', (req, res) => {
  const sqlQuery = 'SELECT * FROM espaciodeportivodatosclimaticos';

  connection.query(sqlQuery, (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json(results);
      }
  });
});

// Ruta para insertar datos en la tabla espaciodeportivodatosclimaticos
app.post('/api/espaciodeportivodatosclimaticos', (req, res) => {
  const { EDDC_ED_Id, EDDC_DC_Id } = req.body;

  const sqlQuery = 'INSERT INTO espaciodeportivodatosclimaticos (EDDC_ED_Id, EDDC_DC_Id) VALUES (?, ?)';

  const values = [
      EDDC_ED_Id,
      EDDC_DC_Id
  ];

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
