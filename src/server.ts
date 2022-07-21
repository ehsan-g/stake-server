import { ApplicationContext } from './context';

async function startServer() {
  console.log('Started server');
  const app = await ApplicationContext();

  app.enableShutdownHooks();

  app.enableCors();
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  await app.listen(5000);
}

async function stopServer() {
  const app = await ApplicationContext();
  app.close();
}

export { startServer, stopServer };
