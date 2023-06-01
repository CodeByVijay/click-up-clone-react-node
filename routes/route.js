import { storeComment,deleteComment } from "../controller/CommentController.js";
import { StoreProject, getAllProjects,getMembersProject, getSingleProject,verifyInviteAndAddMember,inviteMember,removeProjectMember,updateProject,deleteProject,getMembers} from "../controller/ProjectController.js";
import { createNewTask,getAllTasks,getProjectTask,getTask,taskStatusChange,assignTask,getTaskByUserId,deleteTask } from "../controller/TaskController.js";
import {
  Register,
  Login,
  UserList,
  updateProfile,
  updatePassword
} from "../controller/UserController.js";
import express, { json } from "express";
const router = express.Router();
router.get('/getting',async(req,res)=>{
  res.send("working")
})

router.post("/register", Register);
router.post("/login", Login);

router.get("/user-list", UserList);

router.post("/store-project", StoreProject);
router.get("/all-projects", getAllProjects);
router.get("/member-projects/:user_id", getMembersProject);
router.post("/project", getSingleProject);
router.post("/edit-project", updateProject);
router.get("/delete-project/:id", deleteProject);
router.get("/get-project-members/:project_id",getMembers)

// Task
router.post("/create-task", createNewTask);
router.get("/all-tasks", getAllTasks);
router.get("/project-tasks/:project_id", getProjectTask);
router.get("/task/:id", getTask);
router.post("/task-status-change", taskStatusChange);
router.post("/task-assign", assignTask);
router.get("/delete-task/:id",deleteTask)



// Get Task By User ID
router.get("/my-task/:user_id",getTaskByUserId)

router.post("/invite-new-member", inviteMember);
router.post("/verify-invite", verifyInviteAndAddMember);
router.post("/remove-project-member", removeProjectMember);

// Comments
router.post("/store-comment",storeComment)
router.get("/delete-comment/:id",deleteComment)

// Profile 
router.post("/update-profile",updateProfile)
router.post("/update-password",updatePassword)

router.all("*", (req, res) => {
  res.status(200).json({ result: "failed", msg: "url not found." });
});
export default router;
