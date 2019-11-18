let userController = requre('./controllers/users')
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
  params:{id:1},
  body: {first_name: "newuser",last_name:"was inserted"}

}