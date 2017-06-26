module.exports = function () {
    return {
        /**
         * @param {String} filename
         * @param {String} content
         */
        write: function (filename, content) {
            console.log(`Writing: file ${filename}.json | content ${content}`);
        }
    }
}