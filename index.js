const express = require("express");
const usersRouter = require('./routers/routerUsers');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 4001;

app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.send('Welcome to our server!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});