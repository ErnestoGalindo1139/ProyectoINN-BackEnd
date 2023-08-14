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

// Consultar
app.get('/api/usuario/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM usuario WHERE Uio_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

// Modificar
app.put('/api/usuario/:id', (req, res) => {
  const Uio_Id = req.params.id;
  const { Uio_Nombre, Uio_Correo, Uio_Contrasena } = req.body;

  if (!Uio_Nombre || !Uio_Correo || !Uio_Contrasena) {
      return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  const checkQuery = 'SELECT * FROM usuario WHERE Uio_Id = ?';
  connection.query(checkQuery, [Uio_Id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          return res.status(500).json({ error: 'Error en la consulta SQL' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
      }

      const updateQuery = 'UPDATE usuario SET Uio_Nombre = ?, Uio_Correo = ?, Uio_Contrasena = ? WHERE Uio_Id = ?';

      const values = [Uio_Nombre, Uio_Correo, Uio_Contrasena, Uio_Id];

      connection.query(updateQuery, values, (error, results) => {
          if (error) {
              console.error('Error al modificar el registro:', error);
              return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
          }

          res.json({ message: 'Registro modificado correctamente' });
      });
  });
});


// Borrar
app.delete('/api/usuario/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM usuario WHERE Uio_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
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

// Consultar
app.get('/api/deporte/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM deporte WHERE Depor_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

// Modificar
app.put('/api/deporte/:id', (req, res) => {
  const Depor_Id = req.params.id;
  const { Depor_Nombre } = req.body;

  // Validación: Asegurarse de que todos los campos tengan valores
  if (!Depor_Nombre) {
    return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  // Verificar si el registro con el ID existe
  const checkQuery = 'SELECT * FROM deporte WHERE Depor_Id = ?';
  connection.query(checkQuery, [Depor_Id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).json({ error: 'Error en la consulta SQL' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
    }

    // Modificar el registro
    const updateQuery = 'UPDATE deporte SET Depor_Nombre = ? WHERE Depor_Id = ?';
    const values = [Depor_Nombre, Depor_Id];

    connection.query(updateQuery, values, (error, results) => {
      if (error) {
        console.error('Error al modificar el registro:', error);
        return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
      }

      res.json({ message: 'Registro modificado correctamente' });
    });
  });
});

// Borrar
app.delete('/api/deporte/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM deporte WHERE Depor_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
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

//! Ruta EspacioDeportivo
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

//? Consultar
app.get('/api/espaciodeportivo/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM espaciodeportivo WHERE ED_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

//? Modificar
app.put('/api/espaciodeportivo/:id', (req, res) => {
  const ED_Id = req.params.id;
  const { ED_Nombre } = req.body;

  // Validación: Asegurarse de que todos los campos tengan valores
  if (!ED_Nombre) {
    return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  // Verificar si el registro con el ID existe
  const checkQuery = 'SELECT * FROM espaciodeportivo WHERE ED_Id = ?';
  connection.query(checkQuery, [ED_Id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).json({ error: 'Error en la consulta SQL' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
    }

    // Modificar el registro
    const updateQuery = 'UPDATE espaciodeportivo SET ED_Nombre = ? WHERE ED_Id = ?';
    const values = [ED_Nombre, ED_Id];

    connection.query(updateQuery, values, (error, results) => {
      if (error) {
        console.error('Error al modificar el registro:', error);
        return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
      }

      res.json({ message: 'Registro modificado correctamente' });
    });
  });
});

//? Borrar
app.delete('/api/espaciodeportivo/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM espaciodeportivo WHERE ED_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
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

//? Consultar
app.get('/api/recomendacionmensaje/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM recomendacionmensaje WHERE RecoM_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

//? Modificar
app.put('/api/recomendacionmensaje/:id', (req, res) => {
  const RecoM_Id = req.params.id;
  const { RecoM_Mensaje } = req.body;

  // Validación: Asegurarse de que todos los campos tengan valores
  if (!RecoM_Mensaje) {
    return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  // Verificar si el registro con el ID existe
  const checkQuery = 'SELECT * FROM recomendacionmensaje WHERE RecoM_Id = ?';
  connection.query(checkQuery, [RecoM_Id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).json({ error: 'Error en la consulta SQL' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
    }

    // Modificar el registro
    const updateQuery = 'UPDATE recomendacionmensaje SET RecoM_Mensaje = ? WHERE RecoM_Id = ?';
    const values = [RecoM_Mensaje, RecoM_Id];

    connection.query(updateQuery, values, (error, results) => {
      if (error) {
        console.error('Error al modificar el registro:', error);
        return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
      }

      res.json({ message: 'Registro modificado correctamente' });
    });
  });
});

//? Borrar
app.delete('/api/recomendacionmensaje/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM recomendacionmensaje WHERE RecoM_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
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

//! Ruta RecomendacionProtocolo
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

//? Consultar
app.get('/api/recomendacionprotocolo/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM RecomendacionProtocolo WHERE RecoP_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

//? Modificar
app.put('/api/recomendacionprotocolo/:id', (req, res) => {
  const RecoP_Id = req.params.id;
  const { RecoP_Protocolo } = req.body;

  // Validación: Asegurarse de que todos los campos tengan valores
  if (!RecoP_Protocolo) {
    return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  // Verificar si el registro con el ID existe
  const checkQuery = 'SELECT * FROM RecomendacionProtocolo WHERE RecoP_Id = ?';
  connection.query(checkQuery, [RecoP_Id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).json({ error: 'Error en la consulta SQL' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
    }

    // Modificar el registro
    const updateQuery = 'UPDATE RecomendacionProtocolo SET RecoP_Protocolo = ? WHERE RecoP_Id = ?';
    const values = [RecoP_Protocolo, RecoP_Id];

    connection.query(updateQuery, values, (error, results) => {
      if (error) {
        console.error('Error al modificar el registro:', error);
        return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
      }

      res.json({ message: 'Registro modificado correctamente' });
    });
  });
});

//? Borrar
app.delete('/api/recomendacionprotocolo/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM RecomendacionProtocolo WHERE RecoP_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
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

// Consultar
app.get('/api/datosclimaticos/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM datosclimaticos WHERE DC_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

// Modificar
app.put('/api/datosclimaticos/:id', (req, res) => {
  const DC_Id = req.params.id;
  const {
      idRecoM,
      temperatura,
      humedad,
      nivelLluvia,
      indiceUV,
      idRecoPDC
  } = req.body;

  // Validación: Asegurarse de que todos los campos tengan valores
  if (!idRecoM || !temperatura || !humedad || !nivelLluvia || !indiceUV || !idRecoPDC) {
      return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  // Verificar si el registro con el ID existe
  const checkQuery = 'SELECT * FROM datosclimaticos WHERE DC_Id = ?';
  connection.query(checkQuery, [DC_Id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          return res.status(500).json({ error: 'Error en la consulta SQL' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
      }

      // Modificar el registro
      const updateQuery = 'UPDATE datosclimaticos SET DC_IdRecoM=?, DC_Temperatura=?, DC_Humedad=?, DC_NivelLluvia=?, DC_IndiceUV=?, DC_IdRecoP=? WHERE DC_Id=?';
      const values = [
          idRecoM,
          temperatura,
          humedad,
          nivelLluvia,
          indiceUV,
          idRecoPDC,
          DC_Id
      ];

      connection.query(updateQuery, values, (error, results) => {
          if (error) {
              console.error('Error al modificar el registro:', error);
              return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
          }

          res.json({ message: 'Registro modificado correctamente' });
      });
  });
});


// Borrar
app.delete('/api/datosclimaticos/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM datosclimaticos WHERE DC_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
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

// Consultar
app.get('/api/espaciodeportivodatosclimaticos/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM espaciodeportivodatosclimaticos WHERE EDDC_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

// Modificar
app.put('/api/espaciodeportivodatosclimaticos/:id', (req, res) => {
  const EDDC_Id = req.params.id;
  const { EDDC_ED_Id, EDDC_DC_Id } = req.body;

  if (!EDDC_ED_Id || !EDDC_DC_Id) {
      return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  const checkQuery = 'SELECT * FROM espaciodeportivodatosclimaticos WHERE EDDC_Id = ?';
  connection.query(checkQuery, [EDDC_Id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          return res.status(500).json({ error: 'Error en la consulta SQL' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
      }

      const updateQuery = 'UPDATE espaciodeportivodatosclimaticos SET EDDC_ED_Id = ?, EDDC_DC_Id = ? WHERE EDDC_Id = ?';
      const values = [EDDC_ED_Id, EDDC_DC_Id, EDDC_Id];

      connection.query(updateQuery, values, (error, results) => {
          if (error) {
              console.error('Error al modificar el registro:', error);
              return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
          }

          res.json({ message: 'Registro modificado correctamente' });
      });
  });
});

// Borrar
app.delete('/api/espaciodeportivodatosclimaticos/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM espaciodeportivodatosclimaticos WHERE EDDC_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
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

// Ruta para obtener los datos de la tabla espaciodeportivodatosclimaticos
app.get('/api/espaciodeportivodeporte', (req, res) => {
  const sqlQuery = 'SELECT * FROM espaciodeportivodeporte';

  connection.query(sqlQuery, (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json(results);
      }
  });
});

// Consultar
app.get('/api/espaciodeportivodeporte/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM espaciodeportivodeporte WHERE EDDepor_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

// Modificar
app.put('/api/espaciodeportivodeporte/:id', (req, res) => {
  const EDDepor_Id = req.params.id;
  const { EDDepor_ED_Id, EDDepor_Depor_Id } = req.body;

  if (!EDDepor_ED_Id || !EDDepor_Depor_Id) {
      return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  const checkQuery = 'SELECT * FROM espaciodeportivodeporte WHERE EDDepor_Id = ?';
  connection.query(checkQuery, [EDDepor_Id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          return res.status(500).json({ error: 'Error en la consulta SQL' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
      }

      const updateQuery = 'UPDATE espaciodeportivodeporte SET EDDepor_ED_Id = ?, EDDepor_Depor_Id = ? WHERE EDDepor_Id = ?';

      const values = [EDDepor_ED_Id, EDDepor_Depor_Id, EDDepor_Id];

      connection.query(updateQuery, values, (error, results) => {
          if (error) {
              console.error('Error al modificar el registro:', error);
              return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
          }

          res.json({ message: 'Registro modificado correctamente' });
      });
  });
});

// Borrar
app.delete('/api/espaciodeportivodeporte/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM espaciodeportivodeporte WHERE EDDepor_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
      }
  });
});

// Ruta para insertar datos en la tabla espaciodeportivodatosclimaticos
app.post('/api/espaciodeportivodeporte', (req, res) => {
  const { EDDepor_ED_Id, EDDepor_Depor_Id } = req.body;

  const sqlQuery = 'INSERT INTO espaciodeportivodeporte (EDDepor_ED_Id, EDDepor_Depor_Id) VALUES (?, ?)';

  const values = [
      EDDepor_ED_Id,
      EDDepor_Depor_Id
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
app.get('/api/usuarioespaciodeportivo', (req, res) => {
  const sqlQuery = 'SELECT * FROM usuarioespaciodeportivo';

  connection.query(sqlQuery, (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json(results);
      }
  });
});

// Consultar
app.get('/api/usuarioespaciodeportivo/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM usuarioespaciodeportivo WHERE UED_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          if (results.length > 0) {
              res.json(results[0]);
          } else {
              res.status(404).json({ error: 'Datos no encontrados' });
          }
      }
  });
});

// Modificar
app.put('/api/usuarioespaciodeportivo/:id', (req, res) => {
  const UED_Id = req.params.id;
  const { UED_Uio_Id, UED_ED_Id } = req.body;

  if (!UED_Uio_Id || !UED_ED_Id) {
      return res.status(400).json({ error: 'Todos los campos deben tener valores' });
  }

  const checkQuery = 'SELECT * FROM usuarioespaciodeportivo WHERE UED_Id = ?';
  connection.query(checkQuery, [UED_Id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          return res.status(500).json({ error: 'Error en la consulta SQL' });
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'El ID ingresado no existe en la base de datos' });
      }

      const updateQuery = 'UPDATE usuarioespaciodeportivo SET UED_Uio_Id = ?, UED_ED_Id = ? WHERE UED_Id = ?';

      const values = [UED_Uio_Id, UED_ED_Id, UED_Id];

      connection.query(updateQuery, values, (error, results) => {
          if (error) {
              console.error('Error al modificar el registro:', error);
              return res.status(500).json({ error: 'Error al modificar el registro en la base de datos' });
          }

          res.json({ message: 'Registro modificado correctamente' });
      });
  });
});

// Borrar
app.delete('/api/usuarioespaciodeportivo/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'DELETE FROM usuarioespaciodeportivo WHERE UED_Id = ?';

  connection.query(sqlQuery, [id], (error, results) => {
      if (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en la consulta SQL' });
      } else {
          res.json({ message: 'Registro eliminado correctamente' });
      }
  });
});

// Ruta para insertar datos en la tabla espaciodeportivodatosclimaticos
app.post('/api/usuarioespaciodeportivo', (req, res) => {
  const { UED_Uio_Id, UED_ED_Id } = req.body;

  const sqlQuery = 'INSERT INTO usuarioespaciodeportivo (UED_Uio_Id, UED_ED_Id) VALUES (?, ?)';

  const values = [
    UED_Uio_Id,
      UED_ED_Id
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
