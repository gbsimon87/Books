const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => console.log(`Now listening to port ${PORT}`));
