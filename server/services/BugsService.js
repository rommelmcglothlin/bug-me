import mongoose from "mongoose";
import bug from "../models/Bug";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Bug", bug);

class BugsService {
  async createBug(bugData) {
    return await _repository.create(bugData);
  }

  async getBugs(query) {
    return await _repository.find({ ...query, deleted: false });
  }

  async getBugById(id) {
    let bug = await _repository.findById(id);
    if (!bug) {
      throw new BadRequest("Invalid ID! Please try again.");
    }
    return bug;
  }

  async updateBug(id, updateData) {
    let bug = _repository.findById(id, updateData);
    // @ts-ignore
    if (bug.closed) {
      throw new BadRequest(
        "Unfotunately the bug you're looking for has been deleted or is no longer available."
      );
    }
    return await _repository.findByIdAndUpdate(id, bug, {
      new: true
    });
  }

  async closeBugById(id) {
    let bugToDelete = await this.getBugById(id);
    // @ts-ignore
    if (!bugToDelete.closed) {
      // @ts-ignore
      bugToDelete.closed = true;
      return await _repository.findByIdAndUpdate(id, bugToDelete, {
        new: true
      });
    } else {
      throw new BadRequest(
        "Unfortunately the bug you're looking for has been deleted or is no longer available."
      );
    }
  }
}

const bugsService = new BugsService();
export default bugsService;
