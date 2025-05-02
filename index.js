// const express = require("express");
// const cors = require("cors");
// require('dotenv').config()
// const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// // const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dysamrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// // 4qDiJbmPnGh5Ldah

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// // const db = client.db("noticeboard");
// // const noticesCollection = db.collection("notices");


// async function startServer() {
//     try {
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("noticeboard").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//         const db = client.db("noticeboard");
//         const noticesCollection = db.collection("notices");
//         const usersCollection = db.collection("users");


//         // GET user by email
//         app.get("/api/users/:email", async (req, res) => {
//             const email = req.params.email;
//             const user = await usersCollection.findOne({ email });
//             console.log("user: "+ user);
//             res.json(user);
//         });

//         app.post("/api/users", async (req, res) => {
//             const { email, name, photoURL } = req.body;
//             // console.log(req.body);

//             const existingUser = await usersCollection.findOne({ email });
//             // console.log(existingUser);

//             if (existingUser) {
//                 return res.status(200).json(existingUser); // return current user
//             }

//             // ✅ Set role = 'student' by default
//             const newUser = {
//                 email,
//                 name,
//                 photoURL,
//                 role: "student", // default role
//                 createdAt: new Date(),
//             };

//             await usersCollection.insertOne(newUser);
//             res.status(201).json(newUser);
//         });

//         // GET all notices
//         app.get("/api/notices", async (req, res) => {
//             const results = await noticesCollection.find().sort({ date: -1 }).toArray();
//             res.json(results);
//         });

//         // POST a new notice
//         app.post("/api/notices", async (req, res) => {
//             const { title, description, date } = req.body;
//             const result = await noticesCollection.insertOne({ title, description, date });
//             res.json(result);
//         });

//         app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
//     } catch (err) {
//         console.error("❌ Failed to connect to MongoDB:", err);
//     }
// }
// startServer();



// // // Get all notices
// // app.get("/api/notices", async (req, res) => {
// //     try {
// //         const notices = await noticesCollection.find().sort({ date: -1 }).toArray();
// //         console.log(notices)
// //         res.json(notices);
// //     } catch (err) {
// //         res.status(500).json({ error: "Failed to fetch notices" });
// //     }
// // });

// // // Add new notice (optional for admin)
// // app.post("/api/notices", async (req, res) => {
// //     const { title, description, date } = req.body;
// //     try {
// //         const result = await noticesCollection.insertOne({ title, description, date });
// //         res.json(result);
// //     } catch (err) {
// //         res.status(500).json({ error: "Failed to add notice" });
// //     }
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// // });

// // async function run() {
// //     try {
// //         // Connect the client to the server	(optional starting in v4.7)
// //         await client.connect();
// //         // Send a ping to confirm a successful connection
// //         await client.db("noticeboard").command({ ping: 1 });
// //         console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //     } finally {
// //         // Ensures that the client will close when you finish/error
// //         await client.close();
// //     }
// // }
// // run().catch(console.dir);
