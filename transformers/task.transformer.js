const dayjs = require('dayjs');

const taskTransformer = {
    transform: (task) => {
        return {
            taskId: task._id,
            name: task.name,
            description: task.description,
            status: task.status,
            dueDate: dayjs(task.dueDate).format('MMM DD'),
            assignedUser: {
                name: task?.assignedUser?.name,
                profileBg: task?.assignedUser?.profileBg
            },
            tags: task.tags
        }
    }
}

const taskListTransformer = {
    transform: (tasks) => {
        let response = {};
        response.list = tasks?.map(task => {
            return taskTransformer.transform(task);
        });
        return response;
    }
}

module.exports = { taskTransformer, taskListTransformer };