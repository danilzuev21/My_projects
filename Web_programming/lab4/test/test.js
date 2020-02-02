const assert = require('assert');
const fs = require("fs");
let fileName = ["./public/database/participants.json", "./public/database/paintings.json", "./public/database/settings.json", "./public/database/map.json"];
let fileContent = fs.readFileSync(fileName[0], "utf8");
let participants = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[1], "utf8");
let paintings = JSON.parse(fileContent);
fileContent = fs.readFileSync(fileName[2], "utf8");
let settings = JSON.parse(fileContent);

describe("tests", function() {
    it('date', function() {
        settings.date = "1.1.1111";
        assert.equal(settings.date, "1.1.1111")
    });
    it('pic', function() {
        let tmp = {
            id: "3",
            name: "Test Name",
            author: "Test Author",
            description: "5",
            price: "100000",
            min: "0",
            max: "50000",
            step: "0",
            inAuction: "Yes",
            isSold:"No"
        };
        paintings.push(tmp);
        assert.equal(paintings[paintings.length-1].author,  "Test Author");
    });
});