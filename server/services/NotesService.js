import mongoose from "mongoose";
import note from "../models/Note";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Note", note);

class NotesService {
  async getNoteByBugId(bugId) {
    if (!bugId) {
      throw new BadRequest("Invalid Note ID");
    }
    return await _repository.find({ bugId });
  }
  async createNote(noteData) {
    return await _repository.create(noteData);
  }
  async updateNote(note) {
    // TODO DONT FORGET BL
    return await _repository.findByIdAndUpdate(note.id, note, {
      new: true,
      runValidators: true
    });
  }
}

const notesService = new NotesService();
export default notesService;
