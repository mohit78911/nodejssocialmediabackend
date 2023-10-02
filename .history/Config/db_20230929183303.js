const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://root:root@cluster0.au0wghs.mongodb.net/demo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
).then(()=>{
  console.log("C onnected to the Database")
}).catch(()=>{
  console.log("Not Connected with Database")
})
