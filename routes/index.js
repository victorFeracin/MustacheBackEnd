var express = require('express');
var Task = require("../model/Tasks")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (Task.list().length == 0) {
    res.render('index', { msg: "Nenhuma tarefa adicionada." });
  } else {
    let obj = Task.getElementById(req.query.tid);
    res.render('index', { tasks: Task.list(), task: obj });
  }
});

router.get('/list', function(req, res, next) {
  if (Task.list().length == 0) {
    res.render('list-all', { msg: "Nenhuma tarefa adicionada." });
  } else {
    let obj = Task.getElementById(req.query.tid);
    res.render('list-all', { tasks: Task.listAToZ(), task: obj });
  }
});

router.get('/length', function(req, res, next){
  res.render('get-length', { length: Task.getLength()});
})

router.post("/tarefas", function (req, res){
    // const {error, value} = TaskSchema.validate(req.body);
    // if (error) {
    //   if (Task.list().length == 0) {
    //     res.render('index', { tasks: Task.list(), msg: "Nenhuma tarefa adicionada.", erro: "Dados incompletos" });
    //   } else {
    //     res.render('index', { tasks: Task.list(), erro: "Dados incompletos" });
    //   }
    //   return;
    // }

    const value = req.body;
    
    const {id, nome, prioridade} = value
    if (id === undefined) {
      //Inserir
      Task.new(nome, prioridade);
    } else {
      //Alterar
      Task.update(id, nome, prioridade);
    }
    
    res.redirect("/");
})

router.get("/tarefas/del/:id", function(req, res){
  const {id} = req.params;
  const {error, value} = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/");
})

module.exports = router;
