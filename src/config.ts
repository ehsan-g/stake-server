let configObject;

function loadConfig() {
  return {
    logLevel: 'debug',
    db: {
      type: 'postgres' as const,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'stakefish',
      enabled: true,
      synchronize: true,
      logging: true,
      dropSchema: false,
    },
    logPretty: 'LOG_PRETTY_PRINT',
  };
}

export type ConfigType = ReturnType<typeof loadConfig>;

export default function config(): ConfigType {
  if (!configObject) {
    configObject = loadConfig();
  }

  return configObject;
}
