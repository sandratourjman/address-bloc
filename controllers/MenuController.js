const inquirer = require('inquirer');
const ContactController = require("./ContactController");


module.exports = class MenuController {
	constructor(){
		this.mainMenuQuestions = [
			{
				type: "list",
				name: "mainMenuChoice",
				message: "Please choose from an option below: ",
				choices: [
					"Add new contact",
					"View all contacts",
					"Search for a contact",
					"Get current date",
					"Exit"
				]
			}
		];
		this.book = new ContactController();
	}

	main(){
		console.log(`Welcome to AddressBloc!`);
		inquirer.prompt(this.mainMenuQuestions).then((response) => {
			switch(response.mainMenuChoice){
				case "Add new contact":
					this.addContact();
					break;
				case "View all contacts":
					this.getContacts();
					break;
				case "Search for a contact":
					this.search();
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
		inquirer.prompt(this.book.addContactQuestions).then((answers) => {
			this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
	        console.log("Contact added successfully!");
	        this.main();
	       }).catch((err) => {
	         console.log(err);
	         this.main();
	       });
		});
	}

	getContacts(){
      this.clear();

      this.book.getContacts().then((contacts) => {
        for (let contact of contacts) {
          console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ---------------`
          );
        }
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
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

	getContactCount(){
		return this.contacts.length;
	}

	remindMe(){
		return "Learning is a life-long pursuit.";
	}

	search(){
		inquirer.prompt(this.book.searchQuestions)
		.then((target) => {
			this.book.search(target.name)
			.then((contact) => {
				if(contact === null){
					this.clear();
					console.log("contact not found");
					this.search();
				} else {
					this.showContact(contact);
				}
			});
		})
		.catch((err) => {
			console.log(err);
			this.main();
		});
	}

	showContact(contact){
		this._printContact(contact);
		inquirer.prompt(this.book.showContactQuestions)
		.then((answer) => {
			switch(answer.selected){
				case "Delete contact":
					this.delete(contact);
					break;
				case "Main menu":
					this.main();
					break;
				default: 
					console.log("Something went wrong.");
					this.showContact(contact);
			}
		})
		.catch((err) => {
			console.log(err);
			this.showContact(contact);
		});
	}

	_printContact(contact){
		console.log(`
			name: ${contact.name}
			phone number: ${contact.phone}
			email: ${contact.email}
			---------------`
		);
	}

	delete(contact){
		inquirer.prompt(this.book.deleteConfirmQuestions)
		.then((answer) => {
			if(answer.confirmation){
				this.book.delete(contact.id);
				console.log("contact deleted!");
				this.main();
			} else {
				console.log("contact not deleted");
				this.showContact(contact);
			}
		})
		.catch((err) => {
			console.log(err);
			this.main();
		});
	}
}

