var express = require('express');
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi")
var router = express.Router();
const sequelize = require('../helpers/bd');

const {sucess, fail} = require("../helpers/resposta");
const TasksDAO = require('../model/Tasks');

const TasksControllerAPI = {
  async listAPI (req, res) { 
    try {
      await sequelize.sync();
      let tasks = await TasksDAO.Model.findAll();
      res.status(200).json(tasks);
    }
    catch(error) {
      res.status(400).json("Não foi possivel listar as tarefas: " + error);
    }
  },

  async newAPI (req, res) {
    try {
      const { nome, prioridade } = req.body;
      let cor = '';
      if (prioridade === 'baixa') {
        cor = 'green';
      } else if (prioridade === 'media') {
        cor = 'yellow';
      } else if (prioridade === 'alta') {
        cor = 'red';
      }
      const newTask = await TasksDAO.Model.create({ nome, prioridade, cor });
      res.status(201).json(newTask);
    }
    catch(error) {
      res.status(400).json("Não foi possivel criar a tarefa: " + error);
    }
  },

  async updateAPI(req, res) {
    const { id } = req.params;
    try {
      const { nome, prioridade } = req.body;
      let cor = '';
      if (prioridade === 'baixa') {
        cor = 'green';
      } else if (prioridade === 'media') {
        cor = 'yellow';
      } else if (prioridade === 'alta') {
        cor = 'red';
      }
      const updateTask = await TasksDAO.Model.update(
        { nome, prioridade, cor },
        {
          where: {
            id
          },
        }
      );
      res.status(200).json(`Tarefa ${id} atualizada com sucesso.`);
    }
    catch(error) {
      res.status(400).json(`Não foi possivel atualizar a tarefa ${id}.`);
    }
  },

  async deleteAPI(req, res) {
    const { id } = req.params;
    try{
      await TasksDAO.Model.destroy({
        where: {
          id
        }
      });
      res.status(204).json(`Tarefa ${id} excluída com sucesso.`);
    }
    catch(error) {
      res.status(400).json(`Não foi possivel excluir a tarefa ${id}`);
    }
  }

}

module.exports = TasksControllerAPI;
