const express = require("express");
const router = express.Router()

router.post('/items', (req, res) => {
  try {
    
     console.log(global.items,global.itemsCat);
    res.send([global.items,global.itemsCat]);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
