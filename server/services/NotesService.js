import mongoose from "mongoose";
import note from "../models/Note";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Note", note);

class NotesService {
  async createNote(noteData) {
    return await _repository.create(noteData);
  }

  async getNoteByBugId(bugId) {
    let noteFromBug = await _repository.find({ bug: bugId });
    if (!noteFromBug) {
      throw new BadRequest("Invalid Note ID! Please try again");
    }
    return noteFromBug;
  }

  async deleteNote(id) {
    return await _repository.findByIdAndRemove(id);
  }
}

const notesService = new NotesService();
export default notesService;
