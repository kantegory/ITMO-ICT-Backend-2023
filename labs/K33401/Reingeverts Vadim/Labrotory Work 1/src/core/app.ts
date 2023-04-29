import express from "express";
import routes from "~/routes";
import bodyParserErrorHandler from "express-body-parser-error-handler";

export const app = express();

/* Handle json body in 'Content-Type: application/json' requests */
app.use(express.json());

/* Handle json body parsing errors */
app.use(bodyParserErrorHandler());

app.use("/", routes);
