import mysql from 'mysql'

const db_conn = mysql.createConnection({
  host: "localhost",
  port:3306,
  database:"click_up_project",
  user: "root",
  password: "12345"
});

db_conn.connect(function(err) {
  if (err) throw err;
//   console.log("Connected!");
});
export default db_conn;