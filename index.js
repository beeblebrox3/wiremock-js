const path = require("path");
const Parser = require("./lib/parser");
const FileWriter = require("./lib/fileWriter")(path.join(__dirname, "resources/mappings"));

const parserInstance = new Parser(FileWriter);

const userRoutes = require("./routes");

parserInstance.parse(userRoutes);