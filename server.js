import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js';

const server = fastify({logger: true});

const database = new DatabasePostgres();

server.get("/", async (req) => {
  const query = req.query.search;
  const videos = await database.list(query);
  return videos;
})

server.post("/videos", async (req, reply) => {
  const {title, duration} = req.body;

  await database.create({
    title,
    duration
  })
  reply.status(201).send()
})


server.put("/videos/:id", async (req, reply) => {
  const id = req.params.id;
  const { title, duration } = req.body;

  await database.update(id, {title, duration})
  reply.status(204).send();
})

server.delete("/videos/:id", async (req, reply) => {
  const id = req.params.id;
  await database.delete(id);
  reply.status(204).send();
})


try {
  await server.listen({port: process.env.PORT ?? 3000});
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
