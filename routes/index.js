var express = require('express');
var Task = require("../model/Tasks")
var TaskSchema = require("../validators/TaskValidator")
const TasksControllerAPI = require('../controllers/TasksControllerAPI');
const Joi = require("joi")
var router = express.Router();

/*API test (doesn't affect application interface*/
router.get('/api', TasksControllerAPI.listAPI);
router.post('/api', TasksControllerAPI.newAPI);
router.put('/api/:id', TasksControllerAPI.updateAPI);
router.delete('/api/:id', TasksControllerAPI.deleteAPI);

/* GET home page. */
router.get('/', async function(req, res, next) {
  if (await Task.list().length == 0) {
    res.render('index', { msg: "Nenhuma tarefa adicionada." });
  } else {
    let obj = Task.getElementById(req.query.tid);
    res.render('index', { tasks: await Task.list(), task: obj });
  }
});

router.get('/edit', async function(req, res, next) {
  if (await Task.list().length == 0) {
    res.render('index-edit', { msg: "Nenhuma tarefa adicionada." });
  } else {
    let obj = Task.getElementById(req.query.tid);
    res.render('index-edit', { tasks: await Task.list(), task: obj });
  }
});

router.get('/list', function(req, res, next) {
  if (Task.list().length === 0) {
    res.render('list-all', { msg: "Nenhuma tarefa adicionada." });
  } else {
    let obj = Task.getElementById(req.query.tid);
    res.render('list-all', { tasks: Task.listAToZ(), task: obj });
  }
});

router.get('/length', function(req, res, next){
  res.render('get-length', { length: Task.getLength()});
});

router.post("/tarefas", async function (req, res){
    const {error, value} = TaskSchema.validate(req.body);
    if (error) {
      if (await Task.list().length === 0) {
        res.render('index', { tasks: await Task.list(), msg: "Nenhuma tarefa adicionada.", erro: `Dados incompletos: ${error}` });
      } else {
        res.render('index', { tasks: await Task.list(), erro: `Dados incompletos: ${error}` });
      }
      return;
    }
    
    const { id, nome, prioridade } = value
    await Task.new(nome, prioridade);


    res.redirect("/");
});

router.post("/edit", async function (req, res){
  // const id = req.query.tid;
  // console.log("ID edit: " + id)
  const {error, value} = TaskSchema.validate(req.body);
  if(error) {
    if (await Task.list().length === 0) {
      res.render('index', { tasks: await Task.list(), msg: "Nenhuma tarefa adicionada.", erro: `Dados incompletos: ${error}` });
    } else {
      res.render('index', { tasks: await Task.list(), erro: `Dados incompletos: ${error}` });
    }
    return;
  }

  const { id, nome, prioridade } = value
  await Task.update(id, nome, prioridade);

  res.redirect("/");
});

router.get("/tarefas/del/:id", function(req, res){
  const {id} = req.params;
  const {error, value} = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/");
});

module.exports = router;
