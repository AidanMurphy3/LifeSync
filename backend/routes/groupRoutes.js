const express = require("express");
const router = express.Router();
const {
    getAllGroups, 
    getGroupById, // Added for Read One
    addGroup, 
    updateGroup, // Added for Update
    deleteGroup
} = require("../controllers/groupController.js"); // Ensure these functions are exported

// --- CRUD Operations ---

// READ all groups (R - Read All)
// GET /api/groups
router.get("/", getAllGroups);

// READ group by ID (R - Read One)
// GET /api/groups/:id
router.get("/:id", getGroupById);

// CREATE new group (C - Create)
// POST /api/groups
router.post("/", addGroup);

// UPDATE group by ID (U - Update)

// PATCH /api/groups/:id (Prefer PATCH for partial updates)
router.patch("/:id", updateGroup);
// PUT /api/groups/:id (Optional, for replacing the entire resource)
router.put("/:id", updateGroup); 

// DELETE group by ID (D - Delete)
// DELETE /api/groups/:id
router.delete("/:id", deleteGroup);

module.exports = router;