const {DataTypes, Op} = require("sequelize");
const sequelize = require("../helpers/bd");

const Tasks = sequelize.define('tarefas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING
    },
    prioridade: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    },
});

module.exports = {
    new: async function (name, priority) {
        let color = '';
        if (priority === 'baixa') {
            color = 'green';
        } else if (priority === 'media') {
            color = 'yellow';
        } else if (priority === 'alta') {
            color = 'red';
        }
        let task = {name: name, priority: priority, color: color};
        tasks.push(task);
        return task;
    },
    update: async function (id, name, priority) {
        let pos = this.getPositionById(id)
        let color = '';
        if (priority === 'baixa') {
            color = 'green';
        } else if (priority === 'media') {
            color = 'yellow';
        } else if (priority === 'alta') {
            color = 'red';
        }
        if (pos >= 0) {
            tasks[pos].name = name;
            tasks[pos].priority = priority;
            tasks[pos].color = color;
        }
    },
    list: async function () {
        // console.log(tasks)
        return tasks;
    },
    getElementById: async function (id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return tasks[pos];
        }
        return null;
    },
    getPositionById: async function (id) {
        for (let i = 0; i<tasks.length; i++) {
            if (tasks[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete: async function (id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            tasks.splice(i, 1);
            return true;
        }
        return false; 
    },
    listAToZ: async function () {
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
    getLength: async function () {
        return tasks.length;
    }
}