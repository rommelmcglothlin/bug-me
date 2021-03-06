import express from "express";
import notesService from "../services/NotesService";

export class NotesController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAllNotes)
      .post("", this.createNewNote)
      .delete("/:id", this.deleteCurrentNote);
  }

  async getAllNotes(req, res, next) {
    try {
      let notes = await notesService.getNoteByBugId(req.query.id);
      res.send(notes);
    } catch (e) {
      next(e);
    }
  }

  async createNewNote(req, res, next) {
    try {
      let newNote = await notesService.createNote(req.body);
      res.send(newNote);
    } catch (e) {
      next(e);
    }
  }

  async deleteCurrentNote(req, res, next) {
    try {
      await notesService.deleteNote(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}
