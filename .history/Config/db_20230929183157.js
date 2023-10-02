const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://root:root@cluster0.au0wghs.mongodb.net/demo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
).then(()=>{
  console.log("Connected to the Database")
}).catch(()=>{
  
})
