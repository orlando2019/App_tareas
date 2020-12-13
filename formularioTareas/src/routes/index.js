const express = require('express');
const router = express.Router();

const Task = require('../models/task');

/* Listar o mostrar las tareas */
router.get('/', async (req, res) => {
	const tasks = await Task.find();

	res.render('index', {
		tasks,
	});
});

/* Guardar la tarea */
router.post('/add', async (req, res) => {
	const task = new Task(req.body);
	await task.save();

	res.redirect('/');
});

/* Canbiar estado de falso a verdadero */
router.get('/done/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	task.status = !task.status;
	await task.save();

	res.redirect('/');
});

/* Seleccionar la tarea para poder Editar */
router.get('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);

	res.render('edit', {
		task,
	});
});

/* Metodo Actualizar */
router.post('/update/:id', async (req, res) => {
	const { id } = req.params;
	await Task.update({ _id: id }, req.body);

	res.redirect('/');
});

/* Borrar o elminar la tarea */
router.get('/delete/:id', async (req, res) => {
	const { id } = req.params;
	await Task.remove({ _id: id });

	res.redirect('/');
});

module.exports = router;
