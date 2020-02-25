import express from "express";
import notesService from "../services/NotesService";

export class NotesController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getNotes)
      .post("", this.create)
      .put("/:id", this.update);
  }

  async getNotes(req, res, next) {
    try {
      let notes = await notesService.getNoteByBugId(req.query.bugId);
      res.send(notes);
    } catch (e) {
      next(e);
    }
  }
  async create(req, res, next) {
    try {
      let note = await notesService.createNote(req.body);
      res.send(note);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      let contact = await notesService.updateNote(req.body);
      res.send(contact);
    } catch (error) {
      next(error);
    }
  }
}
