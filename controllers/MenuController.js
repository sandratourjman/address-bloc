const inquirer = require('inquirer');

module.exports = class MenuController {
	constructor(){
		this.mainMenuQuestions = [
			{
				type: "list",
				name: "mainMenuChoice",
				message: "Please choose from an option below: ",
				choices: [
					"Add new contact",
					"Get current date",
					"Exit"
				]
			}
		];
		this.contacts = [];
	}

	main(){
		console.log(`Welcome to AddressBloc!`);
		inquirer.prompt(this.mainMenuQuestions).then((response) => {
			switch(response.mainMenuChoice){
				case "Add new contact":
					this.addContact();
					break;
				case "Get current date":
					this.getDate();
					break;
				case "Exit":
					this.exit();
				default:
					console.log("Invalid input");
					this.main();
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}

	clear(){
		console.log("\x1Bc");
	}

	addContact(){
		this.clear();
		console.log('addContact called');
		this.main();
	}

	getDate(){
		this.clear();
		let d = new Date();
		let currentDate = new Date(d.toLocaleString('en-US', { timeZone: 'America/Chicago' })),
		year = currentDate.getFullYear(),
		mon = currentDate.getMonth(),
		date = currentDate.getDate() + 1,
		day = currentDate.getDay(),
		hour = currentDate.getHours(),
		min = currentDate.getMinutes();

		let am_pm = hour >= 12 ? "PM" : "AM";
		hour = hour > 12 ? hour - 12 : hour;

		let weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
		let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		let datetime = weekday[day] + " " + month[mon] + " " + date  + "," + year + " " 
		+ (hour < 10 ? '0' + hour : hour) +":"+(min < 10 ? '0' + min : min) + " " + am_pm; 

		console.log(datetime);
		this.main();
	}

	exit(){
		console.log("Thanks for using AddressBloc!");
		process.exit();
	}
}

