import App from "./server/index";
import "dotenv/config";

const app = new App(Number(process.env.AUTH_PORT), process.env.HOST);

app.start();
