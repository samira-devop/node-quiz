const express = require('express');
const path = require('path');
const cors = require('cors');
const { body, check, param, validationResult } = require('express-validator');
const PORT = 8080;
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

const app = express();
// parses JSON from incoming request
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Do not edit
const options = {
  lemon: 'yellow',
  lime: 'limegreen',
  tangerine: 'orange',
  grapefruit: 'lightcoral'
};

// #3 helper function 'getColor`
const getColor = (fruit) => {
}

// #1 serve the colors.html page when /colors is visited
// DO NOT USE express.static
app.get('/colors', cors(corsOptions), async(req,res) => {
  const indexHTMLPath = path.join(__dirname, '../client/colors.html');
  res.sendFile(indexHTMLPath)
});

// #2 & #4 handle POST requests to /colors
app.post('/colors',cors(corsOptions), async(req, res) => {
  const { lemon, lime, tangerine, grapfruite } = req.body;
  const [rows] = await pool.query('INSERT INTO cars (yellow, limegreen, orange, lightcoral) VALUES (?, ?, ?, ?)', [lemon, lime, tangerine, grapfruite]);
  console.log(rows);
  res.send(rows);
});

// #6 serve styles.css - DO NOT use express.static()

  app.get('/style', cors(corsOptions), async(req,res) => {
    const ABSOLUTE_PATH = path.join(__dirname, '../client/colors.html');
    res.sendFile(path.join(__dirname, '../client/style.css'));
});

// #5 Update functionality to database

  app.put('/colors:id', cors(corsOptions), async(req, res) => {
    const {id} = req.params;
    const { lemon, lime, tangerine, grapfruite } =req.body;
    let result = await con.query("UPDATE users SET yellow =?, limegreen=?, orange=?, lightcoral=? WHERE id=?",[lemon, lime, tangerine, grapfruite,id]) 
    console.log(result[0]);
    res.send(result[0]);
});

// #7 unknown routes - 404 handler
// research what route to serve this for
app.get('/style', cors(corsOptions), async(req,res) => {
  const ABSOLUTE_PATH = path.join(__dirname, '../client/colors.html');
  res.sendFile(path.join(__dirname, '../client/style.css'));

  ABSOLUTE_PATH ? res.status(200).send(rows) : res.status(404).send({message: 'page not found'}) 
}); 

// Global error handling middleware
// You can leave this alone
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
