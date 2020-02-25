import mongoose from "mongoose";
import bug from "../models/Bug";
import { BadRequest } from "../errors";

const _repository = mongoose.model("Bug", bug);

class BugsService {
  async createBug(bugData) {
    return await _repository.create(bugData);
  }
  async getBug(query) {
    return await _repository.find({ ...query, deleted: false });
  }
  async getBugById(id) {
    let bug = await _repository.findById(id);
    if (!bug) {
      throw new BadRequest("Invalid Id");
    }
    return bug;
  }

  async update(id, updateData) {
    // do some buisiness logic
    return await _repository.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await _repository.findByIdAndRemove(id);
  }
}

const bugsService = new BugsService();
export default bugsService;
