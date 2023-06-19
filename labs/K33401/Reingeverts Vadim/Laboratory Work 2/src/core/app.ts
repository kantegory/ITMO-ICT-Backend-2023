import express from "express";
import routes from "~/routes";
import bodyParserErrorHandler from "express-body-parser-error-handler";
import listEndpoints from "express-list-endpoints";

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

app.use("/endpoints", (req, res) => {
    const endpoints = listEndpoints(app);
    const endpointsStr = endpoints
        .map((endpoint) =>
            endpoint.methods.map((method) => `${method} ${endpoint.path}`).join("\n")
        )
        .join("\n\n");

    res.send(endpointsStr);
});
