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

router.post("/api/register", Register);
router.post("/api/login", Login);

router.get("/api/user-list", UserList);

router.post("/api/store-project", StoreProject);
router.get("/api/all-projects", getAllProjects);
router.get("/api/member-projects/:user_id", getMembersProject);
router.post("/api/project", getSingleProject);
router.post("/api/edit-project", updateProject);
router.get("/api/delete-project/:id", deleteProject);
router.get("/api/get-project-members/:project_id",getMembers)

// Task
router.post("/api/create-task", createNewTask);
router.get("/api/all-tasks", getAllTasks);
router.get("/api/project-tasks/:project_id", getProjectTask);
router.get("/api/task/:id", getTask);
router.post("/api/task-status-change", taskStatusChange);
router.post("/api/task-assign", assignTask);
router.get("/api/delete-task/:id",deleteTask)



// Get Task By User ID
router.get("/api/my-task/:user_id",getTaskByUserId)

router.post("/api/invite-new-member", inviteMember);
router.post("/api/verify-invite", verifyInviteAndAddMember);
router.post("/api/remove-project-member", removeProjectMember);

// Comments
router.post("/api/store-comment",storeComment)
router.get("/api/delete-comment/:id",deleteComment)

// Profile 
router.post("/api/update-profile",updateProfile)
router.post("/api/update-password",updatePassword)

router.all("*", (req, res) => {
  res.status(200).json({ result: "failed", msg: "url not found." });
});
export default router;
