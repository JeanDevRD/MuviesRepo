import fs from "fs";

export function GetAllFromFile(dataPath, callback) {
    fs.readFile(dataPath,(err, data) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(data));
        }
    });
};

export function SaveToFile(dataPath, data) 
{
    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
        if (err) 
    {
            console.error("Error saving to file:", err);
        }
    });
}

