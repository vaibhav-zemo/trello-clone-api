const taskTransformer = {
    transform: (task) => {
        return {
            taskId: task._id,
            name: task.name,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            assignedUsers: task?.assignedUsers?.map(user => {
                return user.name
            }),
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