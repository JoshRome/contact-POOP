import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// // FileName: index.js
// // Import express
// let express = require('express')
// // Initialize the app
// let app = express();
// // Setup server port
// var port = process.env.PORT || 8080;
// // Send message for default URL
// app.get('/', (req, res) => res.send('Hello World with Express'));
// // Launch app to listen to specified port
// app.listen(port, function () {
//      console.log("Running RestHub on port " + port);
// });