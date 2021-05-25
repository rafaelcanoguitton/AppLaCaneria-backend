const express = require('express');
const session = require('express-session');
const app = express()
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: 'ssshhhhh'}));
//routes
app.use(require('./routes/index'));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("App is running on port " + port);
});
module.exports = app;