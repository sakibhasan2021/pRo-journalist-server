const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json()); //when we post,, convert file json automatically

const port = process.env.PORT || 5001;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_password}@cluster0.ywc7xog.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client
      .db("pRo-journalist")
      .collection("serviceCollection");
    const experienceCollection = client
      .db("pRo-journalist")
      .collection("experiences");
    const clientReview = client
      .db("pRo-journalist")
      .collection("client-review");
    const addReviewCollections = client
      .db("pRo-journalist")
      .collection("reviews-collection");
    app.get("/service", async (req, res) => {
      const query = {};
      const data = serviceCollection.find(query).limit(3);
      const result = await data.toArray();
      res.send(result);
    });

    // all services
    app.get("/allservices", async (req, res) => {
      const query = {};
      const data = serviceCollection.find(query);
      const result = await data.toArray();
      res.send(result);
    });
    // experience
    app.get("/experience", async (req, res) => {
      const query = {};
      const data = experienceCollection.find(query);
      const result = await data.toArray();
      res.send(result);
    });
    app.get("/review", async (req, res) => {
      const query = {};
      const data = clientReview.find(query);
      const result = await data.toArray();
      res.send(result);
    });
    // review add by user
    app.post("/reviewpost", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await addReviewCollections.insertOne(data);
      res.send(result);
    });
    app.get("/reviewpost", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const data = addReviewCollections.find(query);
      const result = await data.toArray();
      res.send(result);
    });
    // app.get("/reviewpost/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const data = addReviewCollections.findOne(query);
    //   const result = await data.toArray();
    //   res.send(result);
    // });
    // delete all review
    app.delete("/reviewpost", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      console.log(query);
      const result = await addReviewCollections.deleteMany(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

// pqnVj8gfe2S4risQ
app.get("/", (req, res) => {
  res.send("running");
});

app.listen(port, () => {
  console.log(`${port} is running`);
});
