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
      .post("", this.createNewBug)
      .put("/:id", this.editBugInfo)
      .delete("/:id", this.closeBug);
  }

  // Gets all recorded bugs
  async getAllBugs(req, res, next) {
    try {
      let data = await bugsService.getBugs(req.query);
      return res.send(data);
    } catch (e) {
      next(e);
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

  // Create a new bug
  async createNewBug(req, res, next) {
    try {
      let newBug = await bugsService.createBug(req.body);
      res.send(newBug);
    } catch (e) {
      next(e);
    }
  }

  // Edit an active bug
  async editBugInfo(req, res, next) {
    try {
      let editedBug = await bugsService.updateBugInfo(req.params.id, req.body);
      return res.send(editedBug);
    } catch (e) {
      next(e);
    }
  }

  // Close a bug so is no longer active
  async closeBug(req, res, next) {
    try {
      await bugsService.closeBugById(req.params.id);
      res.send("Deleted");
    } catch (e) {
      next(e);
    }
  }
}
