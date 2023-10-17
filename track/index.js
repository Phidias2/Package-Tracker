const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require ("express-session");
const MongoDBSession = require ('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require('dotenv');
packageRoutes = require("./routes/package");
deliveryRoutes = require("./routes/delivery");
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     console.log('Received:', message);
//     // You can also broadcast the message to all connected clients:
//     // wss.clients.forEach(client => {
//     //   if (client.readyState === WebSocket.OPEN) {
//     //     client.send(message);
//     //   }
//     // });
//   });

//   ws.send('Welcome to the WebSocket server!');
// });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
      console.log(`Received message => ${message}`);
  });
});

dotenv.config();
const store = new MongoDBSession({
    uri: process.env.DATABASE_URL,
    collection: "mySession",
});

app.use(
    cors({
        methods:"GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(session({
    secret: 'Key that will be sign',
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.listen(process.env.PORT, function () {
    const options = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "Package tracking web application API",
            version: "0.1.0",
            description:
              "",
            license: {
              name: "MIT",
              url: "",
            },
            contact: {
              name: "Phidias GBAGUIDI",
              url: "https://phidias.netlify.app",
              email: "phidias.gbaguidi@epitech.eu",
            },
          },
          servers: [
            {
              url: "http://localhost:3005",
            },
          ],
        },
        apis: ['./Services/*.js'],
      };
      
      const specs = swaggerJsdoc(options);
      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
      );
  console.log('listening on 3050')
})

try {
    mongoose.connect(process.env.DATABASE_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true});
    console.log("connect to db");
} catch (error) {
    handleError(error);
};
app.use(bodyParser.json());
app.use("/api", packageRoutes);
app.use("/api", deliveryRoutes);
