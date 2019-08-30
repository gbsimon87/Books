const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://gbsimon87:gbsimon87@cluster0-kvyxy.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .catch(err => {
    console.log("Not Connected to Database ERROR! ", err);
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => console.log(`Now listening to port ${PORT}`));
