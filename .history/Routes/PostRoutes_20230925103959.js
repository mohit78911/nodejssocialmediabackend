const express = require("express");
const router = express.Router();
const posts = require("../Model/users");

router.get("/", async (req, res) => {
  posts
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("post find successfully");
    })
    .catch((error) => {
      console.log('post can"t fetch...');
    });
});

router.post('/post',async (req,res)=>{ 
    const newData = await posts.create({
        _id: new mongoose.Types.objectId(),
        name : req.body.image,
        user :req.body.user
    })
})

module.exports = router;
