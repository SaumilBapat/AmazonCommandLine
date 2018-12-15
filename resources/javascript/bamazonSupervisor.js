//Challenge #1: Customer View
let AmazonDB = require('./amazonDB.js');
let inquirer = require('Inquirer');
let amazonDB = new AmazonDB();

try {
  main();
} catch (ex) {
  console.log(ex);
}

async function main() {

  const supervisorOptions = [
    "View Product Sales by Department",
    "Create New Department"
  ];

  const supervisorInput = await inquirer.prompt([
    { type: 'list', name: 'option', choices: supervisorOptions },
  ]);

  switch(supervisorInput.option) {

    case "View Product Sales by Department":
      await amazonDB.displayAllDepartments();
      await amazonDB.terminate();
      break;

    case "Create New Department":
      await addNewDepartment();
      break;
  }
}

async function addNewDepartment() {
    const newDepartmentOptions = [
      {type: 'input', name: 'departmentId', message: "Enter the department id"},
      {type: 'input', name: 'departmentName', message: "Enter the department name"},
      {type: 'input', name: 'overheadCosts', message: "Enter the depart over head costs"}
    ];
    const newDepartment = await inquirer.prompt(newDepartmentOptions);
    await amazonDB.addNewDepartment(newDepartment);
    await amazonDB.terminate();
}
