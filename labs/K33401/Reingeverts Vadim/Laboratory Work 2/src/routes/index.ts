import express from "express";
import userRoutes from "~/routes/users/User";

const routes = express.Router();

routes.get("/", async (req, res) => {
    res.status(200).json(`
        <h3>Available routes:</h3>

        <p>GET /users</p>
        <p>POST /users</p>
        <br>
        <p>GET /users/:id</p>
        <p>PATCH /users/:id</p>
        <p>DELETE /users/:id</p>
    `);
});

routes.use("/users", userRoutes);

export default routes;
