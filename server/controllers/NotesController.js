import express from "express";
import notesService from "../services/NotesService";

export class NotesController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAllNotes)
      .post("", this.createNewNote)
      .put("/:id", this.editCurrentNote)
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
      let newNote = await notesService.createNewNote(req.body);
      res.send(newNote);
    } catch (e) {
      next(e);
    }
  }
  async editCurrentNote(req, res, next) {
    try {
      let editNote = await notesService.updateCurrentNote(req.body);
      res.send(editNote);
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
