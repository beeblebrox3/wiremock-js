const fs = require("fs");
const path = require("path");

/**
 * @param {String} basepath
 */
module.exports = function (basepath) {
    return {
        /**
         * @param {String} filename
         * @param {String} content
         */
        write: function (filename, content) {
            fs.writeFileSync(
                path.resolve(basepath, `${filename}.json`),
                content
            );
        }
    }
}