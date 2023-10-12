import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  list() {
    return Array.from(this.#videos.entries()).map((video) => {
      const id = video[0];
      const data = video[1];

      return {id, ...data};
    })
  }

  create(video) {
    const uuid = randomUUID()
    this.#videos.set(uuid, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}