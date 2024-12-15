const fs = require("fs");
const yargs = require("yargs");
const notes = require("./notes.js");

yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: { describe: "note title", demandOption: true, type: "string" },
    body: { describe: "body content", demandOption: true, type: "string" },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: { describe: "note title", demandOption: true, type: "string" },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "listing all notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "reading a note",
  builder: {
    title: { describe: "note title", demandOption: true, type: "string" },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.command({
  command: "edit",
  describe: "editing a note",
  builder: {
    title: { describe: "note title", demandOption: true, type: "string" },
    body: { describe: "body content", demandOption: true, type: "string" },
  },
  handler(argv) {
    notes.editNote(argv.title, argv.body);
  },
});

yargs.parse();
