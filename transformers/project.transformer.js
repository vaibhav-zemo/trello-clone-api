const { taskListTransformer } = require('./task.transformer');

const projectTransformer = {
    transform: (project) => {
        return {
            projectId: project._id,
            name: project.name,
            description: project.description,
        }
    }
}

const projectListTransformer = {
    transform: (projects) => {
        let response = {};
        response.list = projects.map(project => {
            return projectTransformer.transform(project);
        });
        return response;
    }
}

const projectDetailedTransformer = {
    transform: (project) => {
        return {
            projectId: project._id,
            name: project.name,
            description: project.description,
            tasks: taskListTransformer.transform(project.tasks)
        }
    }
}

module.exports = { projectTransformer, projectListTransformer, projectDetailedTransformer };