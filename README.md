# EmuTarkov-Tools
Some maintenance tools to help developping JET

Important! Those scripts are for devs, not players. They /will/ brick your savegame or server!
Most of them have to be edited to set paths and variables correctly.

* backup.sh and restore.sh: put them in your server's folder. Execute to save/restore your profile (make sure the path is correct inside the script)
* fixdialogues.js: put in server's folder, call with "node.exe fixdialogues.js". Fixes missing quest rewards for old saves (server is fixed now)
* moveloot.sh: a quick bash script to split loots by category
* sortloot.js: a slightly more sophisticated loot sorter ^^
* fixragfair.js: put in server's folder, call with node.exe. This will create a db2 folder containing missing parts for ragfair vendor.

fixragfair.js may need some tweaks to recompute prices

