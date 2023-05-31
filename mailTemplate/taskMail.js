import { mailTransporter } from "../mailSetting.js";

export const taskMail = (taskData) => {
  const {
    task_name,
    task_desc,
    // task_assign,
    // task_assign_to,
    // project_id,
    exp_date_time,
    task_assign_user_name,
    task_assign_to_user_name,
    project_name,
  } = taskData;
  
  const date = new Date(exp_date_time)
  const formatedDateTime = date.toLocaleTimeString("en-US",{day:"numeric", weekday:"short", year:"numeric", month:"short", hour: '2-digit', minute: '2-digit', hour12: true})


  const html = `<!DOCTYPE html><html lang="en" style="margin: 0;padding: 0;"><head style="margin: 0;padding: 0;"><meta charset="UTF-8" style="margin: 0;padding: 0;"><meta http-equiv="X-UA-Compatible" content="IE=edge" style="margin: 0;padding: 0;"><meta name="viewport" content="width=device-width,initial-scale=1" style="margin: 0;padding: 0;"><title style="margin: 0;padding: 0;">Project Assign</title></head><body style="margin: 0;padding: 0;"><div class="container" style="margin: 0;padding: 0;max-width: 100%;"><div class="head" style="margin: 0;padding: 20px 10px 0 0;width: 100%;height: 40px;background-color: #a6f1f1;text-align: center;"><h3 style="margin: 0;padding: 0;">Project Assigned</h3></div><div class="body" style="margin: 0;padding: 0;display: inline-flex;max-width: 100%;width: 100%;background-color: #f7f0e7;"><div class="partOne" style="margin: 0;padding: 20px;width: 45%;"><ol style="margin: 0;padding: 0;"><li style="margin: 0;padding: 0;list-style: none;line-height: 30px;"><label for="" style="margin: 0;padding: 0;font-weight: 700;font-size: 18px;">Project Name :</label><span style="margin: 0;padding: 0;font-weight: 400;font-size: 16px;"> ${project_name}</span></li><li style="margin: 0;padding: 0;list-style: none;line-height: 30px;"><label for="" style="margin: 0;padding: 0;font-weight: 700;font-size: 18px;">Project Manager :</label><span style="margin: 0;padding: 0;font-weight: 400;font-size: 16px;"> ${task_assign_user_name}</span></li><li style="margin: 0;padding: 0;list-style: none;line-height: 30px;"><label for="" style="margin: 0;padding: 0;font-weight: 700;font-size: 18px;">Task :</label><span style="margin: 0;padding: 0;font-weight: 400;font-size: 16px;"> ${task_name}</span></li><li style="margin: 0;padding: 0;list-style: none;line-height: 30px;"><label for="" style="margin: 0;padding: 0;font-weight: 700;font-size: 18px;">Task Expected Timeline :</label><span style="margin: 0;padding: 0;font-weight: 400;font-size: 16px;"> ${formatedDateTime}</span></li></ol></div><div class="partTwo" style="margin: 0;padding: 20px;width: 45%;"><div class="title" style="margin: 10px 0;padding: 0;"><h3 style="margin: 0;padding: 0;">Project Description</h3></div><p style="margin: 0;padding: 0;font-size:16px;"> ${task_desc}</p></div></div><div class="footer" style="margin: 0;padding: 10px 10px 0 0;width: 100%;height: 20px;background-color: #a6f1f1;text-align: center;"><h5 style="margin: 0;padding: 0;">&copy; Click UP</h5></div></div></body></html>`;
  let mailDetails = {
    from: "vijay.amule@techinfini.com",
    to: "vijay.amule@techinfini.com",
    subject: `Dear! ${task_assign_to_user_name} assign new task.`,
    html: html,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
