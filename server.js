const app = require("./src/app");

const PORT = 3056;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});
