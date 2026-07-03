#!/usr/bin/env node
const store = require("./lib/store");
const config = require("./lib/config");

const [command, ...rest] = process.argv.slice(2);

function formatNote(note) {
    return `[Note #${note.id}] ${note.text}`;
}

function main() {
    switch (command) {
      case "add": {
              const content = rest.join(" ").trim();
              if (!content) {
                        console.log("Usage: notes add <your note>");
                        return;
              }
              const note = store.add(content);
              console.log(formatNote(note));
              break;
      }
      case "list": {
              const notes = store.all();
              if (notes.length === 0) {
                        console.log("No notes yet. Add one with: notes add <text>");
                        return;
              }
              for (const note of notes) {
                        console.log(`#${note.id}  ${note.text}`);
              }
              break;
      }
      case "delete": {
              const id = Number(rest[0]);
              const ok = store.remove(id);
              console.log(ok ? `Deleted note #${id}` : `No note #${id} found`);
              break;
      }
      default:
              console.log("Commands: add <text> | list | delete <id>");
              console.log(`(Session locks after ${config.SESSION_TIMEOUT_MINUTES} minutes of inactivity.)`);
    }
}

main();
