const fs = require('fs');
const path = require('path');

class JSONResponse {
    /// Load a JSON response from the given file.
    ///
    /// - parameter fileName: Name of the JSON file to laod.
    constructor(fileName) {
        const filePath = path.join(__dirname, '../mocks', fileName);
        const json = fs.readFileSync(filePath, 'utf8');
        this.data = json;
    }
}

module.exports = JSONResponse;
