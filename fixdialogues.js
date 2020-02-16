"use strict";



function fixDialogues(path) {
    let file = path + "dialogue.json";
    let dialogues = json.parse(json.read(file));
    let count = 0;
    for (let id in dialogues) {
        let dialogue = dialogues[id];
        for (let m of dialogue.messages) {
            if (m.hasOwnProperty("items")) {
                for (let it in m.items.data) {
                    let item = m.items.data[it];
                    if (!item.hasOwnProperty("slotId")) {
                        item["parentId"] = m.items.stash;
                        item["slotId"] = "main";
                        count++;
                    }
                }
            }
        }
    }
    json.write(file, dialogues);
    console.log("Fixed " + count + " items");
}



/* show name in window */
process.stdout.setEncoding('utf8');
process.title = "Sort Loot";

global.json = require('./core/util/json.js');
global.fs = require("fs");

global.profilePath = "user/profiles/1/";

fixDialogues(profilePath);
