const app = require("./src/app");
const {
  app: { port },
} = require("./src/configs/config.mongo");
const PORT = port || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});
