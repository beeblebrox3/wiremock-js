# WiremockJS

This project provide another way to create stubs for [Wiremock](http://wiremock.org/). It ships with a `docker-compose.yaml` to run Wiremock and parse the JavaScript files with the routes definition.

## Example:

```
const path = require("path");
const Parser = require("./lib/parser");
const FileWriter = require("./lib/fileWriter")(path.join(__dirname, "resources/mappings"));

const parserInstance = new Parser(FileWriter);

parserInstance.parse([{
    name: "users",
    request: {
        path: "/users"
    },
    response: {
        jsonBody: [{name: "Jerry"}, {name: "George"}]
    }
}, {
  name: "loginOk",
  request: {
    path: "/login",
    method: "post",
    jsonBody: {user: "user", password: "123456"}
  },
  response: {
    jsonBody: {"user": {name: "user"}}
  }
}, {
  name: "loginNotOk",
  request: {
    path: "/login",
    method: "post",
    jsonBody: {"user": "user", password: "123"}
  },
  response: {
    jsonBody: {"error": "bad password"}
  }
}]);
```