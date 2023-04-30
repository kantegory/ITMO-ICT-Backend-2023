import nodemailer from "nodemailer";

class MailService {
    host: string;
    port: number;
    secure: boolean;
    private user?: string;
    private password?: string;
    fromName: string;
    fromEmail: string;

    constructor(options?: {
        host: string;
        port: number;
        secure: boolean;
        user?: string;
        password?: string;
        fromName?: string;
        fromEmail?: string;
    }) {
        const defaultOptions = {
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            fromName: "Admin",
            fromEmail: "admin@example.com",
        };
        const mergedOptions = { ...defaultOptions, ...options };
        const { host, port, secure, user, password, fromName, fromEmail } = mergedOptions;
        this.host = host;
        this.port = port;
        this.secure = secure;
        if (user) this.user = user;
        if (password) this.password = password;
        this.fromName = fromName;
        this.fromEmail = fromEmail;
    }

    private getCretentials = async () => {
        if (this.user && this.password)
            return { user: this.user, password: this.password, isTest: false };

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();
        return { user: testAccount.user, password: testAccount.pass, isTest: true };
    };

    send = async (to: string, subject: string, text: string) => {
        const { user, password, isTest } = await this.getCretentials();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure, // true for 465, false for other ports
            auth: {
                user,
                pass: password,
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"${this.fromName}" <${this.fromEmail}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });

        if (isTest) console.log("Message sent:", nodemailer.getTestMessageUrl(info));
    };
}

export default MailService;
