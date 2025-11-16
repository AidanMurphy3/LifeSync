const express = require("express");
const router = express.Router();

const {addMember, updateRole} = require("../controllers/groupMembershipController.js")

//add member route
router.post("/addMember", addMember);

// Assume that role of user is the role in groupMembership table and
// permission is the roleType in User table.


//update role route
router.post("/updateRole", updateRole);

module.exports = router;