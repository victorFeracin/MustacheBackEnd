const {DataTypes, Op} = require("sequelize");
const sequelize = require("../helpers/bd");

const TasksModel = sequelize.define('Tarefas', {
    id: {
        type: DataTypes.INTEGER.ZEROFILL,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING
    },
    prioridade: {
        type: DataTypes.STRING
    },
    cor: {
        type: DataTypes.STRING
    },
});

let tasks = [];

module.exports = {
    async new(name, priority) {
        let color = '';
        if (priority === 'baixa') {
            color = 'green';
        } else if (priority === 'media') {
            color = 'yellow';
        } else if (priority === 'alta') {
            color = 'red';
        }
        let task = { nome: name, prioridade: priority, cor: color };
        await TasksModel.create({...task});
        // tasks.push(task);
        // return task;
    },
    async update (id, name, priority) {
        let color = '';
        if (priority === 'baixa') {
            color = 'green';
        } else if (priority === 'media') {
            color = 'yellow';
        } else if (priority === 'alta') {
            color = 'red';
        }
        let task = { nome: name, prioridade: priority, cor: color };
        await TasksModel.update(
            {...task},
            {
                where: {
                    id
                }
            }
        );
        // tasks.push(task);
        // return task;
    },
    async list() {
        await sequelize.sync();
        const tasksAux = await TasksModel.findAll();

        tasks = tasksAux.map(task => {
          return {
            id: task.id,
            name: task.nome,
            priority: task.prioridade,
            color: task.cor,
          };
        });

        return tasks;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return tasks[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<tasks.length; i++) {
            if (tasks[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    async delete(id) {
        try {
            await TasksModel.destroy({
                where: {
                    id: id,
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    },
    listAToZ() {
        return tasks.sort((a, b) => {
            const name1 = a.name.toLowerCase();
            const name2 = b.name.toLowerCase();
            if (name1 < name2) {
              return -1;
            }
            if (name1 > name2) {
              return 1;
            }
            return 0;
        });
    },
    getLength() {
        return tasks.length;
    },

    Model: TasksModel
}