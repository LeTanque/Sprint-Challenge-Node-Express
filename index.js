// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
// require('dotenv').config();

const server = require('./server.js');

// const port = process.env.PORT || 3333;
// const greeting = process.env.DB_GREETING;

const port = 5000
const greeting = "Hello! ";

server.listen(port, () => {
  console.log(`\n*** ${greeting} Server Running on http://localhost:${port} ***\n`);
});


