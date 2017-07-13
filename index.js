const path = require("path");
const Parser = require("./lib/parser");
const FileWriter = require("./lib/fileWriter")(process.env.MAPPINGS ? process.env.MAPPINGS : path.join(__dirname, "resources/mappings"));

const parserInstance = new Parser(FileWriter);

const userRoutes = require(process.env.ROUTES ? process.env.ROUTES : "./routes");

parserInstance.parse(userRoutes);
