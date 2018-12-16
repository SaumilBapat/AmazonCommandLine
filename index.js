// Optional Entry point to select if you're a customer | manager | supervisor

// Require Inquirer
const inquirer = require('inquirer');

// Main Logic
async function main() {
  // Prompt the user for their role
  const options = ["I'm a Customer", "I'm a Manager", "I'm a Supervisor"];
  const user = await inquirer.prompt([
    { type: 'list', name: 'option', choices: options },
  ]);

  // Execute the right script based on user input
  switch (user.option) {
    case "I'm a Customer":
    require('./resources/javascript/bamazonCustomer.js');
    break;

    case "I'm a Manager":
    require('./resources/javascript/bamazonManager.js');
    break;

    case "I'm a Supervisor":
    require('./resources/javascript/bamazonSupervisor.js');
    break;
  }
}
main();
