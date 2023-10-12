import { randomUUID } from "node:crypto";
import  sql  from './db.js';

export class DatabasePostgres {

  async list(query) {
    if(query){
      return await sql`select * from videos where title ilike ${'%' + query + '%'}`
    }else {
      return await sql`select * from videos`
    }
  }

  
  async create(video) {
    const uuid = randomUUID();
    const { title, duration } = video;

    await sql`insert into videos (id, title, duration) values (${uuid}, ${title}, ${duration})`
  }

  async update(id, video) {
    const { title, duration } = video;
    await sql`update videos set title = ${title}, duration = ${duration} where id = ${id}`
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`
  }
}