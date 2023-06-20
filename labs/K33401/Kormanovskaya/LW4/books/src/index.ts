import App from "./server/index";
import "dotenv/config";

console.log(Number(process.env.PORT));
console.log(process.env.HOST)
const app = new App(Number(process.env.PORT), process.env.HOST);

app.start();
