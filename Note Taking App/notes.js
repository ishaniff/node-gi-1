const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("note added"));
  } else {
    console.log(chalk.red.inverse("note title taken"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesKept = notes.filter((note) => note.title !== title);
  if (notes.length > notesKept.length) {
    console.log(chalk.green.inverse("note removed"));
    saveNotes(notesKept);
  } else {
    console.log(chalk.red.inverse("no note found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log("you have no notes!");
  } else {
    console.log(chalk.inverse("your notes"));
    notes.forEach((note) => {
      console.log(note.title);
    });
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("note not found"));
  }
};

const editNote = (title, body) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("note edited"));
  } else {
    console.log(chalk.red.inverse("note not found or edited"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  editNote: editNote,
};
