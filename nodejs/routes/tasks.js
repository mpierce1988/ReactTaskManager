const router = require('express').Router();

let tasks = [
    { id: 1, userId: 1, name: 'Task 1', description: 'Task 1 description' },
];

// Get all tasks for a given user
router.get('/:userId', (req, res) => {
    // validate a user id was provided
    if (!req.params.userId) return res.status(400).send({status: "Error", message: "User id is required"});

    const userIdInt = parseInt(req.params.userId);
    // retrieve any tasks for this userid
    const userTasks = tasks.filter(t => t.userId === userIdInt);

    res.status(200).send({status: "Success", tasks: userTasks});
});

// Add a new task
// A new task requires a userId, task name, and description
router.post('/:userId', (req, res) => {
    // validate a user id was provided
    if (!req.params.userId) return res.status(400).send({status: "Error", message: "User id is required"});
    if (!req.body.name) return res.status(400).send({status: "Error", message: "Task name is required"});
    if (!req.body.description) return res.status(400).send({status: "Error", message: "Task description is required"});

    const task = {
        id: tasks.length + 1,
        userId: parseInt(req.params.userId),
        name: req.body.name,
        description: req.body.description
    };

    tasks.push(task);
    res.status(200).send({status: "Success", task: task});
});

// Update a task
// A task can be updated by providing the task id, and any of the following: name, description
router.patch('/:userId/:taskId', (req, res) => {
    // validate a task id was provided
    if (!req.params.taskId) return res.status(400).send({status: "Error", message: "Task id is required"});
    if(!req.params.userId) return res.status(400).send({status: "Error", message: "User id is required"});

    // find the task
    const task = tasks.find(task => task.id === parseInt(req.params.taskId) && task.userId === parseInt(req.params.userId));
    if (!task) return res.status(400).send({status: "Error", message: "Task not found"});

    // update the task
    if (req.body.name) task.name = req.body.name;
    if (req.body.description) task.description = req.body.description;

    // add updated task to back into tasks array, replacing the original task
    const originalTaskIndexPosition = tasks.findIndex(t => t.id === task.id);
    tasks[originalTaskIndexPosition] = task;

    res.status(200).send({status: "Success", task: task});
});

// Delete a task
router.delete('/:userId/:taskId', (req, res) => {
    // validate a task id has been provided
    if(!req.params.taskId) return res.status(400).send({status: "Error", message: "Task id is required"});
    if(!req.params.userId) return res.status(400).send({status: "Error", message: "User id is required"});


    const taskToDelete = tasks.find(t => t.id === parseInt(req.params.taskId) && t.userId === parseInt(req.params.userId));

    // validate a task was found for this taskId
    if(!taskToDelete) return res.status(400).send({status: "Error", message: "Task not found"});

    const index = tasks.indexOf(taskToDelete);

    // remove the task from the tasks array
    tasks.splice(index, 1);

    // return deleted task
    res.status(200).send({status: "Success", task: taskToDelete});
});

module.exports = router;