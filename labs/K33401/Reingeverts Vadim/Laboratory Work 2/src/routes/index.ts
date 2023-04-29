import express from "express";
import userRoutes from "~/routes/users/User";
import authRoutes from "~/routes/auth/Auth";

const routes = express.Router();

routes.get("/", async (req, res) => {
    res.status(200).send(`
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
// routes.use("/auth", authRoutes);

export default routes;
