import { ApplicationContext } from './context';

async function startServer() {
  console.log('Started server');
  const app = await ApplicationContext();

  app.enableShutdownHooks();

  await app.listen(3001);
}

async function stopServer() {
  const app = await ApplicationContext();
  app.close();
}

export { startServer, stopServer };
