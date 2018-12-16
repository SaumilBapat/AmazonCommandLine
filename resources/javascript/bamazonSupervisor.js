//Challenge #3: Supervisor View

//Require the needed moduleslet AmazonDB = require('./amazonDB.js');
let inquirer = require('Inquirer');
let AmazonDB = require('./amazonDB.js');
let amazonDB = new AmazonDB();

//The primary logic is enclosed in a main async function
try {
  main();
} catch (ex) {
  console.log(ex);
}

//Prompt manager with options and switch to the right actions
async function main() {
  const supervisorOptions = [
    "View Product Sales by Department",
    "Create New Department"
  ];
  const supervisorInput = await inquirer.prompt([
    { type: 'list', name: 'option', choices: supervisorOptions },
  ]);

  //Switch to the right logic
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

//Prompt the user for the new department details
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
