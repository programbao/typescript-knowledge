import nodemailer from "nodemailer";

export async function sendMail(address: string, code: number) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "2962631411@qq.com", // generated ethereal user
      pass: "pdlliygkmjredfdi" // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <2962631411@qq.com>', // sender address
    to: address, // list of receivers
    subject: "你的验证码", // 标题
    text: `你的验证码${code},有效期五分钟` // plain text body
    // html: "<b>Hello world?</b>" // html body
  });
}
