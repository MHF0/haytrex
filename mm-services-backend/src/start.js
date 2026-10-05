import { loadConfig } from "./config.js";
import { openDatabase } from "./db.js";
import { createMailer } from "./mailer.js";
import { createApp } from "./server.js";

const config = loadConfig();
const db = openDatabase(config.dataDir);
const app = createApp(config, { db, mailer: createMailer(config) });

app.listen(config.port, config.host, () => {
  console.log(`MM Services running at http://${config.host}:${config.port} (site: ${config.siteDir})`);
});
