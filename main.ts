#! /usr/bin/env node


//inquirer and chalk importation
import inquirer from "inquirer";
import chalk from "chalk";

//title
console.log(chalk.bold.magentaBright(`\n \t\t <<<===========================================>>>`));
console.log(chalk.bold.yellow("<==============> WELCOME TO CWA TODO LIST APPLICATION <==============>"))
console.log(chalk.bold.magentaBright(`\n \t\t <<<===========================================>>>`));


let todos: string[] = [];
let conditions = true;

let main = async () => {
  while (conditions) {
    let options = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.cyan("What would you like to do?"),
        choices: [
          "Add a new task",
          "View all tasks",
          "Update task",
          "Delete a task",
          "Exit",
        ],
      },
    ]);

    if (options.choice === "Add a new task") {
      await addTask();
    } else if (options.choice === "View all tasks") {
      await viewTask();
    } else if (options.choice === "Update task") {
      await updateTask();
    } else if (options.choice === "Delete a task") {
      await deleteTask();
    } else if (options.choice === "Exit") {
      conditions = false;
    }
  }
};
//function to add new task in the list

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "todo",
      type: "input",
      message: chalk.cyan("Enter the task you want to do :"),
    },
  ]);
  todos.push(newTask.todo);
  console.log(chalk.bold.yellow(`\n ${newTask.todo} task added in list sucessfully.`));
};
//function to view all todo task list

let viewTask = async () => {
  console.log(chalk.bold.green("\n Your todo-list :"));
  todos.forEach((todo, index) => {
    console.log(`${index + 1} : ${todo}`);
  });
};

// function for delete a task from todo list
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.cyan("Enter the index of task you want to delete :"),
    },
  ]);
  let deletedTask = todos.splice(taskIndex.index - 1, 1);
  console.log(chalk.bold.green(`\n ${deletedTask} this task has been deleted successfully.`));
};

//function to update a task in todo list
let updateTask = async () => {
  await viewTask();
  let updatedTaskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.cyan("Enter the index of task you want to update :"),
    },
    {
      name: "newUpdatedTask",
      type: "input",
      message: chalk.cyan("Now enter new task name :"),
    },
  ]);
  todos[updatedTaskIndex.index - 1] = updatedTaskIndex.newUpdatedTask;
  console.log(chalk.bold.green( `\n ${updatedTaskIndex.index - 1} task has been updated successfully.`));
};


main();
