const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://gbsimon87:gbsimon87@cluster0-kvyxy.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => console.log(`Now listening to port ${PORT}`));
