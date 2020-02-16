"use strict";

function ls(path) {
    return fs.readdirSync(locationsPath);
}

function init() {
    globals = json.parse(json.read(dbPath + "globals.json"));
    presets = globals.data.ItemPresets;
}

function fixRagfair() {
    for (const presetId in presets) {
        if (presets[presetId].hasOwnProperty("_encyclopedia")) {
            addPreset(presets[presetId]);
        }
    }
}

function addPreset(preset) {
    const newItems = clone(preset);

    let baseItem = preset._items[0];
    let newIds = {};
    newIds[baseItem._id] = baseItem._tpl; // use ragfair's id (=tpl) so ragfair only offers full weapons, not receivers

    // first, make a map of oldId->newId for everyone
    let n = preset._items.length;
    while (n --> 1) {
        let item = preset._items[n];
        if (!newIds.hasOwnProperty(item._id)) {
            newIds[item._id] = getNextId();
        }
    }

    // then browse again and this time, replace parentId
    n = preset._items.length;
    while (n --> 1) {
        let item = preset._items[n];
        item._id = newIds[item._id];
        item.parentId = newIds[item.parentId];
        json.write(outPath + "assort/ragfair/items/" + item._id + ".json", item);
    }
}

function getNextId() {
    return idPrefix + Number(idCount++).toString(16).padStart(8, "0");
}

function clone(x) {
    return json.parse(json.stringify(x));
}

// Config
global.dbPath = "db/";
global.outPath = "db2/";
global.idPrefix = "52616b6c61746966"; // Yes, that's ascii for Raklatif :)


/* show name in window */
process.stdout.setEncoding('utf8');
process.title = "Fix Ragfair";

global.json = require('./core/util/json.js');
global.fs = require("fs");

global.idCount = 0;
global.globals = {};
global.presets = {};

init();
fixRagfair();
