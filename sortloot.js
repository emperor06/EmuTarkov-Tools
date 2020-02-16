"use strict";

// Builds a random game loot from a loot with variations
function toLoot(varLoot) {
    let loot = json.parse(json.stringify(varLoot)); // clone
    let n = loot["Variations"].length;
    let rand = Math.floor((Math.random() * n));
    let variation = loot["Variations"][rand]; // choose a random content
    loot["Root"] = variation["Root"];  // create missing nodes
    loot["Items"] = variation["Items"];
    delete loot["Variations"]; // and remove Variations
    return loot;
}

function convertLoot(loot) {
    loot["Variations"] = [{"Root": loot["Root"], "Items": loot["Items"]}];
    delete loot["Root"];
    delete loot["Items"];
}

function mergeLoots(l1, l2) {
    let v1 = l1["Variations"];
    let v2 = l2["Variations"];
    l1["Variations"] = v1.concat(v2);
}

function mergeDictionary(dic) {
    for (const id of Object.keys(dic)) {
        let ar = dic[id];
        let n = ar.length;
        let baseLoot = ar[0];
        convertLoot(baseLoot);
        while (n --> 1) {
            let loot = ar[n];
            convertLoot(loot);
            mergeLoots(baseLoot, loot);
        }
        dic[id] = baseLoot;
    }
}

function processLocation(path, loc) {
    let lootFolder = path + loc + "/loot";
    if (!fs.existsSync(lootFolder)) {
        console.log("Skipping " + lootFolder);
        return;
    }

    console.log("Processing " + lootFolder);
    let lootFiles = fs.readdirSync(lootFolder);
    const statics = {};
    const dynamics = {};
    for (let lootFile of lootFiles) {
        let loot = json.parse(json.read(lootFolder + "/" + lootFile));
        let id = loot.Id;
        let dic = loot.IsStatic ? statics : dynamics;
        if (!(id in dic)) {
            dic[id] = [];
        }
        dic[id].push(loot);
    }

    mergeDictionary(statics);
    mergeDictionary(dynamics);

    // Writes 2 files per location: statics.json and dynamics.json
    // both containing all corresponding loots sorted by Id
    let out = outputFolder2 + loc;
    json.write(out + "/statics.json", statics);
    json.write(out + "/dynamics.json", dynamics);
    
    // Writes 1 file per loot Id, sorted by static or dynamic
    let statout = outputFolder3 + loc + "/static/";
    for (let key of Object.keys(statics)) {
        let loot = statics[key];
        json.write(statout + loot.Id + ".json", loot);
    }
    let dynout = outputFolder3 + loc + "/dynamic/";
    for (let key of Object.keys(dynamics)) {
        let loot = dynamics[key];
        json.write(dynout + loot.Id + ".json", loot);
    }
}



/* show name in window */
process.stdout.setEncoding('utf8');
process.title = "Sort Loot";

global.json = require('./core/util/json.js');
global.fs = require("fs");

global.locationsPath = "db/locations/";
global.locations = fs.readdirSync(locationsPath);
global.outputFolder2 = "db2/";
global.outputFolder3 = "db3/";

for (let loc of locations) {
    processLocation(locationsPath, loc);
    
    
}