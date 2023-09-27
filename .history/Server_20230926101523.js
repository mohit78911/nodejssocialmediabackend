const Port = process.env.PORT || 6600;
const server = require("./app");
server.listen(Port, () => {
  console.log(`Server Running on ${Port}`);
});
