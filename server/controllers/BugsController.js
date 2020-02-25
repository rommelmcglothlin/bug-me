import express from "express";
import bugsService from "../services/BugsService";
import notesService from "../services/NotesService";

// NOTE each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
export default class BugsController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAllBugs)
      .get("/:id", this.getBugById)
      .get("/:id/notes", this.getNoteByBugId)
      .post("", this.createNewbug)
      .put("/:id", this.editBugInfo)
      .put("/:id/notes/:id", this.editNoteInfo)
      .delete("/:id", this.closeBug);
  }

  // Gets all recorded bugs
  async getAllBugs(req, res, next) {
    try {
      let data = await bugsService.getBugs(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  // Gets a bug by its ID
  async getBugById(req, res, next) {
    try {
      let bug = await bugsService.getBugById(req.params.id);
      res.send(bug);
    } catch (e) {
      next(e);
    }
  }

  // Get a bug's notes from the bug's ID
  async getNoteByBugId(req, res, next) {
    try {
      let notes = await notesService.getNoteByBugId(req.params.id);
      res.send(notes);
    } catch (e) {
      next(e);
    }
  }

  async createNewbug(req, res, next) {
    try {
      let newBug = await bugsService.createBug(req.body);
      res.send(newBug);
    } catch (e) {
      next(e);
    }
  }
  async editBugInfo(req, res, next) {
    try {
      let editedBug = await bugsService.updateBugInfo(req.params.id, req.body);
      return res.send(editedBug);
    } catch (error) {
      next(error);
    }
  }

  async editNoteInfo(req, res, next) {
    try {
      if (await bugsService.openBugLookup(req.params.id)) {
        let updatedNote = await notesService.updateCurrentNote(
          req.parms.notes,
          req.body
        );
        return res.send(updatedNote);
      }
    } catch (error) {
      next(error);
    }
  }

  async closeBug(req, res, next) {
    try {
      await bugsService.closeBugById(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}
