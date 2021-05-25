const express = require('express');
const session = require('express-session');
const app = express()
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: 'ssshhhhh'}));
//routes
app.use(require('./routes/index'));
app.listen(3000);
console.log('Server on port 3000');
module.exports = app;