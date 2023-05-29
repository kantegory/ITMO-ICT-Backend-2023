import express from "express";
import userRoutes from "~/routes/users/User";

const routes = express.Router();

routes.get("/", async (req, res) => {
    res.status(200).send(`
        <h3>Available rotues:</h3>

        <p>GET /users</p>
        <p>POST /users</p>
        <br>
        <p>GET /users/:id</p>
        <p>PUT /users/:id</p>
        <p>DELETE /users/:id</p>
    `);
});

routes.use("/users", userRoutes);

export default routes;
