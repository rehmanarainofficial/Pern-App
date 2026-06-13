export const otpEmailTemplate = (otp: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background:#111111; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden;">
          <tr>
            <td style="background:#ff7a00; padding:24px; text-align:center;">
              <h1 style="margin:0; color:#111111; font-size:28px;">Email Verification</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px; color:#111111;">
              <h2 style="margin-top:0; font-size:22px;">Verify your account</h2>

              <p style="font-size:16px; line-height:1.6; color:#333333;">
                Use the OTP below to verify your email address. This code will expire in 10 minutes.
              </p>

              <div style="margin:30px 0; text-align:center;">
                <span style="
                  display:inline-block;
                  background:#111111;
                  color:#ff7a00;
                  font-size:32px;
                  letter-spacing:8px;
                  font-weight:bold;
                  padding:18px 30px;
                  border-radius:10px;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size:14px; line-height:1.6; color:#555555;">
                If you did not request this verification, you can safely ignore this email.
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