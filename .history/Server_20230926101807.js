const Port = process.env.PORT || 6600;
const server = Require("./app");
server.listen(Port, () => {
  console.log(`Server Running on ${Port}`);
});
