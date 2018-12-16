const inquirer = require('inquirer');


async function main() {
  const options = ["I'm a Customer", "I'm a Manager", "I'm a Supervisor"];
  const user = await inquirer.prompt([
    { type: 'list', name: 'option', choices: options },
  ]);
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
