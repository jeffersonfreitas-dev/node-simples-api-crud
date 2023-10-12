import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js';

const server = fastify({logger: true});

const database = new DatabaseMemory();

server.get("/", async () => {
  const videos = await database.list();
  return videos;
})

server.post("/videos", async (req, reply) => {
  const {title, duration} = req.body;

  database.create({
    title,
    duration
  })
  reply.status(201).send()
})


server.put("/videos/:id", async (req, reply) => {
  const id = req.params.id;
  const { title, duration } = req.body;

  database.update(id, {title, duration})
  reply.status(204).send();
})

server.delete("/videos/:id", async (req, reply) => {
  const id = req.params.id;
  database.delete(id);
  reply.status(204).send();
})


try {
  await server.listen({port: 3000});
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
