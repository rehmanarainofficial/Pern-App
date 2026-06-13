export const verificationSuccessTemplate = (
  username: string,
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verified</title>
</head>
<body style="margin:0; padding:0; background:#111111; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden;">
          
          <tr>
            <td style="background:#ff7a00; padding:24px; text-align:center;">
              <h1 style="margin:0; color:#111111; font-size:28px;">
                Email Verified Successfully
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              
              <h2 style="margin-top:0; color:#111111;">
                Hello ${username},
              </h2>

              <p style="font-size:16px; line-height:1.8; color:#444444;">
                Your email address has been successfully verified.
              </p>

              <p style="font-size:16px; line-height:1.8; color:#444444;">
                Your account is now active and you can access all features of the platform.
              </p>

              <div style="text-align:center; margin:35px 0;">
                <span style="
                  display:inline-block;
                  background:#111111;
                  color:#ff7a00;
                  padding:14px 30px;
                  border-radius:8px;
                  font-size:18px;
                  font-weight:bold;
                ">
                  ✓ Verification Successful
                </span>
              </div>

              <p style="font-size:14px; color:#666666; line-height:1.7;">
                If you did not perform this action, please contact support immediately.
              </p>

            </td>
          </tr>

          <tr>
            <td style="background:#111111; padding:18px; text-align:center;">
              <p style="margin:0; color:#ffffff; font-size:13px;">
                © ${new Date().getFullYear()} Your App. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
