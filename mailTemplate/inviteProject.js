import { mailTransporter } from "../mailSetting.js";

export const inviteProject = (data) => {
  const { project_name, member_name,inviteLink } = data;

  const html = `<!DOCTYPE html>
  <html lang="en" style="margin: 0;padding: 0;">
    <head style="margin: 0;padding: 0;">
      <meta charset="UTF-8" style="margin: 0;padding: 0;">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" style="margin: 0;padding: 0;">
      <meta name="viewport" content="width=device-width,initial-scale=1" style="margin: 0;padding: 0;">
      <title style="margin: 0;padding: 0;">Invite Member</title>
    </head>
    
    <body style="margin: 0;padding: 0;height: 100%;background-color: #dcfce7;background-position: center;background-repeat: no-repeat;background-size: cover;">
      <div class="container" style="margin: 0;padding: 165px;">
        <center style="margin: 0;padding: 0;">
          <h2 style="margin: 0;padding: 0;margin-bottom: 15px;border-bottom: 2px double #000;width: fit-content;">Project Invitation</h2>
          <div class="text" style="margin: 0;padding: 10px;font-family: &quot;Courier New&quot;, Courier, monospace;font-style: oblique;font-size: 18px;font-weight: 500;">Dear, " <b style="margin: 0;padding: 0;">${member_name}</b>". You have get invitation. <br style="margin: 0;padding: 0;">Please join " <b style="margin: 0;padding: 0;">${project_name}</b>". Click below button. </div>
          <a href="${inviteLink}" target="_blank" style="margin: 0;padding: 0;">
            <button style="margin: 0;padding: 12px;background-color: #16a34a;outline: 0;color: #fff;border: none;border-radius: 20px;font-size: 18px;transform: 1.5s;">Join Project</button>
          </a>
        </center>
      </div>
    </body>
  </html>`;

  let mailDetails = {
    from: "vijay.amule@techinfini.com",
    to: "vijay.amule@techinfini.com",
    subject: `Dear! ${member_name} invitation ${project_name}.`,
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
