const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//Conectando a la base de dato MongoDB
mongoose
	.connect('mongodb://localhost/tareas')
	.then((db) => console.log('DB Conectada'))
	.catch((err) => console.log(err));

//Importtando rutas
const indexRoutes = require('./routes/index');
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use('/', indexRoutes);
//Configurando el servidor

app.listen(app.set('port'), () => {
	console.log(`Servidor en el puerto ${app.set('port')}`);
});
