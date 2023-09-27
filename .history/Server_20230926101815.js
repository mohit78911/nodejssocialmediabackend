const Port = process.env.PORT || 6600;
const Server = require("./app");
server.listen(Port, () => {
  console.log(`Server Running on ${Port}`);
});
