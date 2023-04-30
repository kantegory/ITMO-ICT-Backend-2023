import express from "express";
import routes from "~/routes";
import bodyParserErrorHandler from "express-body-parser-error-handler";

import { logger } from "~/middleware";

export const app = express();

const rootRoutes = express.Router();
rootRoutes.use(routes);

/* Handle json body in 'Content-Type: application/json' requests */
app.use(express.json());

/* Handle json body parsing errors */
app.use(bodyParserErrorHandler());

app.use(logger);

app.use("/", rootRoutes);
