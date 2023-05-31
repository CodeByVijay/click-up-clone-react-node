import { json, query } from "express";
import db_conn from "../connection.js";
import { inviteProject } from "../mailTemplate/inviteProject.js";

export const StoreProject = (req, res) => {
  const { project_name, description, members, admin, invite_link } = req.body;
  try {
    const saveProject =
      "INSERT INTO `projects`(admin_id,project_name,description) VALUES(?,?,?)";
    // JSON.stringify(members)
    const project = db_conn.query(
      saveProject,
      [admin, project_name, description],
      (err, result) => {
        if (err) throw err;
        const project_id = result.insertId;

        members.map((val, i) => {
          const tokenData = {
            project_id: project_id,
            admin: admin,
            project_name: project_name,
            member: val,
            member_name: val.label,
            member_id: val.value,
          };

          // base64Encode
          const tokenutf8 = Buffer.from(JSON.stringify(tokenData), "utf8");
          let base64Token = tokenutf8.toString("base64");
          const inviteLink = `${invite_link}${base64Token}`;

          const insertInvite =
            "INSERT INTO `invite_members`(project_id,admin_id,member,invite_token) VALUES(?,?,?,?)";
          db_conn.query(
            insertInvite,
            [project_id, admin, JSON.stringify(val), base64Token],
            (err, resp) => {
              if (err) throw err;
              const member_name = val.label;
              const inviteData = {
                project_name,
                member_name,
                inviteLink,
              };
              inviteProject(inviteData);
            }
          );
        });

        return res
          .status(200)
          .json({ result: "success", msg: "Project Successfully Created." });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getAllProjects = (req, res) => {
  try {
    const allProject =
      "SELECT projects.id,projects.project_name,projects.members,projects.status ,users.name as admin_name FROM `projects` INNER JOIN `users` ON users.id=projects.admin_id";
    db_conn.query(allProject, (err, result) => {
      if (err) throw err;
      return res
        .status(200)
        .json({ result: result, msg: "Project Successfully Fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getMembersProject = (req, res) => {
  const user_id = req.params.user_id;
  try {
    const allProject =
      "SELECT projects.id, projects.project_name,  projects.members, projects.status, users.name AS admin_name FROM projects INNER JOIN users ON users.id = projects.admin_id WHERE projects.admin_id = ? OR JSON_SEARCH(projects.members, 'one', ?) IS NOT NULL;";

    db_conn.query(allProject, [user_id, user_id], (err, result) => {
      if (err) throw err;
      return res
        .status(200)
        .json({ result: result, msg: "Project Successfully Fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getSingleProject = (req, res) => {
  const { id } = req.body;
  try {
    const allProject =
      "SELECT projects.id,projects.project_name,projects.members,projects.status,projects.description,users.name as admin_name,users.id as admin_id FROM `projects` INNER JOIN `users` ON users.id=projects.admin_id WHERE projects.id=?";
    db_conn.query(allProject, [id], (err, result) => {
      if (err) throw err;
      return res
        .status(200)
        .json({ result: result, msg: "Project Successfully Fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const inviteMember = (req, res) => {
  const { project_id, admin, project_name, members, invite_link } = req.body;

  members.map((val, i) => {
    const tokenData = {
      project_id: project_id,
      admin: admin,
      project_name: project_name,
      member: val,
      member_name: val.label,
      member_id: val.value,
    };

    // base64Encode
    const tokenutf8 = Buffer.from(JSON.stringify(tokenData), "utf8");
    let base64Token = tokenutf8.toString("base64");
    const inviteLink = `${invite_link}${base64Token}`;

    const insertInvite =
      "INSERT INTO `invite_members`(project_id,admin_id,member,invite_token) VALUES(?,?,?,?)";
    db_conn.query(
      insertInvite,
      [project_id, admin, JSON.stringify(val), base64Token],
      (err, resp) => {
        if (err) throw err;
        const member_name = val.label;
        const inviteData = {
          project_name,
          member_name,
          inviteLink,
        };
        inviteProject(inviteData);
      }
    );
  });

  return res
    .status(200)
    .json({ result: "success", msg: "Invitation Successfully Send." });

  // console.log("server ok")
};

export const verifyInviteAndAddMember = (req, res) => {
  const { token } = req.body;
  const checkToken = "SELECT * FROM `invite_members` WHERE `invite_token`=?";
  db_conn.query(checkToken, [token], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const inviteDataId = result[0].id;
      // base64decode
      let base64string = token;
      let bufferObj = Buffer.from(base64string, "base64");
      let decodeToken = bufferObj.toString("utf8");
      const tokenData = JSON.parse(decodeToken);
      let memberData = [];
      const member = tokenData.member;
      const selProject = "SELECT * FROM `projects` WHERE `id`=?";
      db_conn.query(selProject, [tokenData.project_id], (err, resp) => {
        if (err) throw err;
        const oldMembers = resp[0].members;
        if (oldMembers !== null) {
          memberData = JSON.parse(oldMembers);
          // Check if member already exists
          const memberExists = memberData.find((m) => m.value === member.value);
          if (!memberExists) {
            memberData.push(member);
          }
        } else {
          memberData.push(member);
        }

        // Insert Project Member using invite Link
        const updateProject = "UPDATE `projects` SET `members`=? WHERE `id`=?";
        db_conn.query(
          updateProject,
          [JSON.stringify(memberData), tokenData.project_id],
          (err, upresp) => {
            if (err) throw err;
            db_conn.query(
              "DELETE FROM `invite_members` WHERE `id`=?",
              [inviteDataId],
              (err, delres) => {
                if (err) throw err;
                return res.status(200).json({
                  result: "success",
                  msg: "Your invitation is accepted.",
                });
              }
            );
          }
        );
      });
    } else {
      return res.status(404).json({
        result: "failed",
        msg: "Token Mismatch or Token Not Found. Unauthorized Access.",
      });
    }
  });
};

export const removeProjectMember = (req, res) => {
  const { project_id, admin_id, member_id } = req.body;
  const selProject = "SELECT * FROM `projects` WHERE `admin_id`=? AND `id`=?";

  db_conn.query(selProject, [admin_id, project_id], (err, resp) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        result: "error",
        msg: "Internal Server Error",
      });
    }
    const allMembers = JSON.parse(resp[0].members);
    const updatedList = allMembers.filter((val) => val.value !== member_id);

    const updateMember =
      "UPDATE `projects` SET `members`=? WHERE `admin_id`=? AND `id`=?";
    db_conn.query(
      updateMember,
      [JSON.stringify(updatedList), admin_id, project_id],
      (err, upresp) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            result: "error",
            msg: "Internal Server Error",
          });
        }

        return res.status(200).json({
          result: "success",
          msg: "Selected member successfully removed",
        });
      }
    );
  });
};

export const updateProject = (req, res) => {
  const { project_id, admin_id, project_name, description, status } = req.body;
  const updateProject =
    "UPDATE `projects` SET `project_name`=?,`description`=?,`status`=? WHERE `admin_id`=? AND `id`=?";
  db_conn.query(
    updateProject,
    [project_name, description, status, admin_id, project_id],
    (err, upresp) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          result: "error",
          msg: "Internal Server Error",
        });
      }

      return res.status(200).json({
        result: "success",
        msg: "Project Successfully Update.",
      });
    }
  );
};

export const deleteProject = (req, res) => {
  const project_id = req.params.id;
  const selTask = "SELECT * FROM `tasks` WHERE `project_id`=?";
  db_conn.query(selTask, [project_id], (err, resp) => {
    if (err) throw err;
    resp.map((val) => {
      const deleteTask = "DELETE FROM `tasks` WHERE `id`=?";
      db_conn.query(deleteTask, [val.id]);
    });

    const deleteProject = "DELETE FROM `projects` WHERE `id`=?";
    db_conn.query(deleteProject, [project_id]);
  });
  return res.status(200).json({
    result: "success",
    msg: "Project Successfully Delete.",
  });
};

export const getMembers = (req, res) => {
  try {
    const project_id = req.params.project_id;
    const getMembers = "SELECT members FROM `projects` WHERE `id`=?";
    db_conn.query(getMembers, [project_id], (err, result) => {
      if (err) throw err;
      return res
        .status(200)
        .json({ result: result, msg: "Project members fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
