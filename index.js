const path = require("path");
const Parser = require("./lib/parser");
const ConsoleWriter = require("./lib/consoleWriter")();
const FileWriter = require("./lib/fileWriter")(path.join(__dirname, "resources/mappings"));

// const parserInstance = new Parser(ConsoleWriter);
const parserInstance = new Parser(FileWriter);

parserInstance.parse([{
    name: "users",
    request: {
        path: "/users"
    },
    response: {
        jsonBody: [{name: "Jerry"}, {name: "George"}]
    }
}]);