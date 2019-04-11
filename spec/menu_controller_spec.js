const MenuController = require("../controllers/MenuController");

 describe("MenuController", () => {
 	beforeEach(() => {
 		this.menu = new MenuController();
 	});
 	
 	describe("#remindMe()", () => {
 		it("should return a string that says 'Learning is a life-long pursuit.'", () => {
 			expect(this.menu.remindMe()).toBe('Learning is a life-long pursuit.');
 		})
 	})
 });