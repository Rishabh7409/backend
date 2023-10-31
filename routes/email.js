const express= require("express")
const router=express.Router()
const emailController=require("../controller/emailController")

router.get("/email",emailController.email)
router.post("/email",emailController.create)
// router.put("/cubic/:id",emailController.update)
// router.delete("/cubic/:id",emailController.delete)
module.exports = router;