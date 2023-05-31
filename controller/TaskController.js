import db_conn from "../connection.js";
import { taskMail } from "../mailTemplate/taskMail.js";
// import { mailTransporter } from "./mailSetting.js";

export const createNewTask = (req, res) => {
  const {
    task_name,
    task_desc,
    task_assign,
    task_assign_to,
    project_id,
    exp_date_time,
    task_assign_user_name,
    task_assign_to_user_name,
    project_name,
  } = req.body;

  try {
    const saveProject =
      "INSERT INTO `tasks`(project_id,assign_user_id,assign_to_user_id,task_name,description,expected_date_time) VALUES(?,?,?,?,?,?)";
    db_conn.query(
      saveProject,
      [
        project_id,
        task_assign,
        task_assign_to,
        task_name,
        task_desc,
        exp_date_time,
      ],
      (err, result) => {
        if (err) throw err;
        taskMail(req.body);
        return res
          .status(200)
          .json({ result: "success", msg: "Task Successfully Created." });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getAllTasks = (req, res) => {
  try {
    const getTask = "SELECT id,task_name,expected_date_time,status FROM tasks";
    db_conn.query(getTask, (err, result) => {
      if (err) throw err;
      return res.status(200).json({ result: result, msg: "Task fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getProjectTask = (req, res)=>{
  try {
    const project_id = req.params.project_id;
    // console.log(project_id)
    const getTask = "SELECT t.id,t.task_name,t.expected_date_time,t.status,u.name as member_name, t.description FROM tasks t INNER JOIN users u ON t.assign_to_user_id=u.id WHERE t.project_id =?";
    db_conn.query(getTask, [Number(project_id)],(err, result) => {
      if (err) throw err;
      return res.status(200).json({ result: result, msg: "Task fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
}

export const getTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const getTask =
      "SELECT t.id as task_id, t.task_name, t.expected_date_time, t.status,t.description as task_desc, tu.name as assignTo,tu.id as assignToId, u.name as assignFrom,u.id as assignFromId,p.project_name,p.id as project_id,p.description as project_desc,p.members as project_members,p.status as project_status, pu.name as project_manager,pu.id as project_manager_id FROM tasks t INNER JOIN projects p ON t.project_id = p.id INNER JOIN users u ON t.assign_user_id = u.id INNER JOIN users tu ON t.assign_to_user_id = tu.id INNER JOIN users pu ON p.admin_id = pu.id WHERE t.id = ?";
    db_conn.query(getTask, [taskId], (err, result) => {
      if (err) throw err;
      const selComments =
        "SELECT u.avatar as user_image, u.id as user_id,u.name as user_name,c.id as comment_id,c.comment as comment, c.task_id as task_id FROM task_comments c INNER JOIN users u ON c.user_id=u.id WHERE c.task_id=?";
      db_conn.query(selComments, [taskId], (err, commentResp) => {
        if (err) throw err;
        return res.status(200).json({
          result: result,
          comments: commentResp,
          msg: "Task fetched.",
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const taskStatusChange = (req, res) => {
  const { task_id, status } = req.body;
  try {
    const statusChange = "UPDATE tasks SET status=? WHERE id =?";
    db_conn.query(statusChange, [status, task_id], (err, result) => {
      if (err) throw err;
      return res
        .status(200)
        .json({ result: result, msg: "Task status changed." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
  // console.log(req.body)
};

export const assignTask = (req, res) => {
  const {
    task_id,
    assignUserId,
    assignUserName,
    task_assign_user_name,
    task_assign_user_id,
    task_status,
  } = req.body;
  try {
    const getTask =
      "SELECT t.id as task_id, t.task_name, t.expected_date_time, t.status,t.description as task_desc, tu.name as assignTo, u.name as assignFrom,p.project_name,p.description as project_desc,p.members as project_members,p.status as project_status, pu.name as project_manager FROM tasks t INNER JOIN projects p ON t.project_id = p.id INNER JOIN users u ON t.assign_user_id = u.id INNER JOIN users tu ON t.assign_to_user_id = tu.id INNER JOIN users pu ON p.admin_id = pu.id WHERE t.id = ?";
    db_conn.query(getTask, [task_id], (err, result) => {
      if (err) throw err;

      const assignTask =
        "UPDATE `tasks` SET `assign_user_id`=?,`assign_to_user_id`=?,`status`=? WHERE `id`=?";

      db_conn.query(
        assignTask,
        [task_assign_user_id, assignUserId, task_status, task_id],
        (err, resp) => {
          if (err) throw err;

          const mailData = {
            task_name: result[0].task_name,
            task_desc: result[0].task_desc,
            task_assign_user_name: task_assign_user_name,
            task_assign_to_user_name: assignUserName,
            exp_date_time: result[0].expected_date_time,
            project_name: result[0].project_name,
            project_manager: result[0].project_manager,
          };
          taskMail(mailData);
          return res
            .status(200)
            .json({ result: result, msg: "Task Assigned." });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  } 
};

export const getTaskByUserId = (req, res) => {
  try {
    const user_id = req.params.user_id;
    const getTask =
      "SELECT t.id,t.task_name,t.status,p.project_name FROM tasks t INNER JOIN projects p ON t.project_id = p.id  WHERE t.assign_to_user_id=? ORDER BY t.created_at DESC LIMIT 10";
    db_conn.query(getTask, [user_id], (err, result) => {
      if (err) throw err;
      return res.status(200).json({ result: result, msg: "Task fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const deleteTask = (req, res) => {
  const id = req.params.id;

  const deleteTask = "DELETE FROM `tasks` WHERE `id`=?";
  db_conn.query(deleteTask, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        result: "error",
        msg: "Internal Server Error",
      });
    }
    return res.status(200).json({
      result: "success",
      msg: "Task Successfully deleted.",
    });
  });
};
