import nodemailer from "nodemailer";

const mail = async (to: string, subject: string, text: string) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Test Account 👻" <test@example.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });

    // Preview only available when sending through an Ethereal account
    console.log("Message sent:", nodemailer.getTestMessageUrl(info));
};

export default mail;
