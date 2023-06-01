import db_conn from "./connection.js";


  let invite_members = `CREATE TABLE if not exists invite_members (
    id int(11) NOT NULL PRIMARY AUTO INCREAMENT,
    project_id int(11) NOT NULL COMMENT 'Project Id refer project table',
    admin_id int(11) NOT NULL COMMENT 'user id refer users table',
    member varchar(255) DEFAULT NULL,
    invite_token longtext DEFAULT NULL,
    status tinyint(4) NOT NULL DEFAULT 0,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp()
  )`;

  const projects = `CREATE TABLE if not exists projects (
    id int(11) NOT NULL,
    admin_id int(11) NOT NULL,
    project_name varchar(255) NOT NULL,
    description longtext DEFAULT NULL,
    members longtext DEFAULT NULL,
    status tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=Progress,1=Completed',
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp()
  )`;

  db_conn.query(invite_members, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log(results, fields);
  });

  db_conn.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
  });

