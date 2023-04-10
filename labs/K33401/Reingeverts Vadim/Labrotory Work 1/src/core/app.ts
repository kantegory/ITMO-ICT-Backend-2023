import express from "express";
import { PrismaClient } from "@prisma/client";

export const viteNodeApp = express();

const prisma = new PrismaClient();

const user = await prisma.user.create({
    data: {
        email: "elsa@prisma.io",
        name: "Elsa Prisma",
    },
});
const users = await prisma.user.findMany();
console.log("SUCCESS", users);
// console.log("prisma", prisma);

/* MIDDLEWARE */
/* Requires header 'Content-Type: application/json' for body */
viteNodeApp.use(express.json());
/* Handle express.json errors */
viteNodeApp.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof SyntaxError || err.status === 400 || "body" in err) {
        console.error(err);
        return res.status(400).send({ message: err.message });
    }
    next();
});

/* ROUTES */
viteNodeApp.get("/", async (req, res) => {
    res.status(200).send(`
        <h3>Available rotues:</h3>

        <p>GET /users</p>
        <p>POST /users</p>
        <br>
        <p>GET /user/id/:id</p>
        <p>GET /user/email/:email</p>
        <p>PUT /user/id/:id</p>
        <p>PUT /user/email/:email</p>
        <p>DELETE /user/id/:id</p>
        <p>DELETE /user/email/:email</p>
    `);
});

// app.get("/users", async (req, res) => {
//     console.log("Got a GET request /user");

//     const users = await models.User.findAll();
//     res.status(200).send(JSON.stringify(users, null, 2));
// });

// app.post("/users", async (req, res) => {
//     console.log("Got a POST request /user");

//     try {
//         await models.User.create(req.body);
//     } catch (error) {
//         return res.status(400).send({ message: error });
//     }
//     res.status(200).send({ message: `User '${req.body.email}' created successfully.` });
// });

// app.get("/user/id/:id", async (req, res) => {
//     console.log("Got a GET request /user/id/:id");

//     const { id } = req.params;

//     let user;
//     try {
//         user = (await models.User.findByPk(id)) ?? {};
//     } catch (error) {
//         return res.status(400).send({ message: error });
//     }
//     res.status(200).send(JSON.stringify(user, null, 2) ?? {});
// });

// app.get("/user/email/:email", async (req, res) => {
//     console.log("Got a GET request /user/email/:email");

//     const { email } = req.params;

//     let user;
//     try {
//         user = (await models.User.findOne({ where: { email } })) ?? {};
//     } catch (error) {
//         return res.status(400).send({ message: error });
//     }
//     res.status(200).send(JSON.stringify(user, null, 2) ?? {});
// });

// app.put("/user/id/:id", async (req, res) => {
//     console.log("Got a PUT request at /user/id/:id");

//     const { id } = req.params;
//     let user;
//     try {
//         user = (await models.User.findByPk(id)) ?? {};
//         user.update(req.body, {
//             where: {
//                 id,
//             },
//         });
//     } catch (error) {
//         return res.status(400).send({ message: error });
//     }

//     res.status(200).send({ message: `User '${user.email}' updated successfully.` });
// });

// app.put("/user/email/:email", async (req, res) => {
//     console.log("Got a PUT request at /user/email/:email");

//     const { email } = req.params;

//     try {
//         await models.User.update(req.body, {
//             where: {
//                 email,
//             },
//         });
//     } catch (error) {
//         return res.status(400).send({ message: error });
//     }

//     res.status(200).send({ message: `User '${email}' updated successfully.` });
// });

// app.delete("/user/id/:id", async (req, res) => {
//     console.log("Got a DELETE request at /user/id/:id");

//     const { id } = req.params;

//     let email = "";
//     try {
//         const user = (await models.User.findByPk(id)) ?? {};
//         email = user.email;
//         user.destroy();
//     } catch (error) {
//         return res.status(400).send({ message: error });
//     }

//     res.status(200).send({ message: `User '${email}' deleted successfully.` });
// });

// app.delete("/user/email/:email", async (req, res) => {
//     console.log("Got a DELETE request at /user/email/:email");

//     const { email } = req.params;

//     try {
//         await models.User.destroy({
//             where: {
//                 email,
//             },
//         });
//     } catch (error) {
//         return res.status(400).send({ message: error });
//     }

//     res.status(200).send({ message: `User '${email}' deleted successfully.` });
// });
