import App from "./app/index"
import * as dotenv from 'dotenv'

dotenv.config()
const app = new App()

app.start()