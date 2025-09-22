require('dotenv').config()


// server
const express = require('express'),
    app = express();

const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

app.use( express.static( 'public' ) )
app.use(express.json())

const uri = `mongodb+srv://${process.env.USERN}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=myCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection = null

async function run() {
  try {
    await client.connect()  
    collection = client.db("appdata").collection("ideas")

    // Send a ping to confirm a successful connection
    await client.db("appdata").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

 } catch (err) {
    console.log("err:", err)
    client.close()
 }
}

app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    } else {
        res.status( 503 ).send()
    }
})

app.get("/docs", async (req, res) => {
    if (collection !== null) {
        const docs = await collection.find({}).toArray()
        res.json( docs )
    }
})

/*app.post( '/submit', ( req, res ) => {
  // our request object now has a 'json' field in it from our previous middleware
  res.writeHead( 200, { 'Content-Type': 'application/json'})
  res.end( req.json )
}) */

app.post( '/submit', async (req,res) => {
    const result = await collection.insertOne( req.body )
    res.json( result )
})

app.post( '/delete', async (req,res) => {
    const result = await collection.deleteOne({ 
        _id: new ObjectId( req.body._id ) 
    })
  
    res.json( result )
})

app.post( '/update', async (req,res) => {
    const result = await collection.updateOne(
        { _id: new ObjectId( req.body._id ) },
        { $set:{ idea:req.body.idea } }
    )

    res.json( result )
})

run().catch(console.dir);

const listener = app.listen( process.env.PORT || 3000 )