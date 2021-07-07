let userController = require("./controllers/users");
let mockResponse = {
	json: (body) => {
		console.log(body);
		return mockResponse;
	},
	send: (body) => {
		console.log(body);
		return mockResponse;
	},
	status: (code) => {
		console.log(code);
		return mockResponse;
	}
};
let mockRequest = {
	params: { id: 5, first_name: "bogus" },
	body: { first_name: "bogus", last_name: "userX" }
};

//UNCOMMENT WHATEVER YOU ARE TRYING TO TEST
// userController.getAllUsers(mockRequest, mockResponse); //Works
// userController.getUserById(mockRequest, mockResponse); //Works
// userController.createUser(mockRequest, mockResponse);//Works
// userController.updateUserById(mockRequest, mockResponse);//Works
userController.deleteUserByFirstName(mockRequest, mockResponse);
