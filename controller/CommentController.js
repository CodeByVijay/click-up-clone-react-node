import db_conn from "../connection.js";

export const storeComment = (req, res) => {
  const { task_id, user_id, comment } = req.body;
  const insertComment =
    "INSERT INTO `task_comments` (task_id,user_id,comment) VALUES(?,?,?)";
  db_conn.query(insertComment, [task_id,user_id,comment],(err,result)=>{
    if (err) {
        console.log(err);
        return res.status(500).json({
          result: "error",
          msg: "Internal Server Error",
        });
      }
      return res.status(200).json({
        result: "success",
        msg: "Comment Successfully Posted.",
      });
  });
};

export const deleteComment =(req, res)=>{
  const id = req.params.id;

  const deleteComment =
  "DELETE FROM `task_comments` WHERE `id`=?";
db_conn.query(deleteComment, [id],(err,result)=>{
  if (err) {
      console.log(err);
      return res.status(500).json({
        result: "error",
        msg: "Internal Server Error",
      });
    }
    return res.status(200).json({
      result: "success",
      msg: "Comment Successfully deleted.",
    });
});


}
