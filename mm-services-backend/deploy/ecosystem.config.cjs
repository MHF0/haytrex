// PM2 process file: keeps the site running and restarts it after crashes or reboots.
const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "mm-services",
      cwd: path.resolve(__dirname, ".."),
      script: "src/server.js",
      node_args: "--env-file=.env --disable-warning=ExperimentalWarning",
      max_memory_restart: "400M",
    },
  ],
};
