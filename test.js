let userController = require("./controllers/users");
let mockResponse = {
    json:(body)=>{
        console.log(body);
        return mockResponse;
    },
    send:(body)=>{
        console.log(body)
        return mockResponse;
    },
    status: (code)=>{
        console.log(code)
        return mockResponse;
    }
}
let mockRequest = {
    params:{id:501,first_name:'bogus'},
    body: {
        "first_name": "bogus",
        "last_name": "user-1",
        "address": "123 Main ST",
        "city": "tampa",
        "county": "hillsborough",
        "state": "FL",
        "zip": "12345",
        "phone1": "123-456-7899",
        "phone2": "789-456-1326",
        "email": "bogus@gmail.com"
    }

}

//UNCOMMENT WHATEVER YOU ARE TRYING TO TEST
//userController.getAllUsers(mockRequest,mockResponse);
// userController.getUserById(mockRequest,mockResponse);
// userController.createUser(mockRequest,mockResponse);
// userController.updateUserById(mockRequest,mockResponse);
 userController.deleteUserByFirstName(mockRequest,mockResponse);