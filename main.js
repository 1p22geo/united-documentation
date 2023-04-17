const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");
var MD5 = require("crypto-js/md5");
const crypto = require("crypto");
const url = "mongodb+srv://dbuser:A3rZbY7tLorCXZUR@cluster0.nthvuuy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


app.post("/adduser", (req, res)=>{
    client.connect().then((cl)=>{
        const db = cl.db("obiekty_zadanie");
        console.log(req.body);
        let obj = {
            name:req.body.user,
            md5: MD5(req.body.pass).toString(),
            added:Date.now()
        };
        db.collection("users").insertOne(obj);
    });
    res.status(201);
    res.send("OK");
});

app.post("/create_session", async (req, res)=>{
    const cl = await client.connect();
    const db = cl.db("obiekty_zadanie");
    console.log(req.body);
    let obj = {
        name:req.body.user,
        md5: MD5(req.body.pass).toString()
    };
    let docs = await db.collection("users").find(obj).toArray();
    if(docs.length == 0){
        res.status(403);
        res.send("Unauthorized");
        return;
    }
    let session_id = crypto.randomBytes(12).toString("hex");
    obj = {
        user: req.body.user,
        id: session_id,
        opened: Date.now(),
        expires:Date.now() + 300000
    };
    await db.collection("sessions").insertOne(obj);
    res.status(201);
    res.send(session_id);
});

app.get("/check", async (req, res)=>{
    const cl = await client.connect();
    const db = cl.db("obiekty_zadanie");
    if(typeof req.query.session == "undefined"){
        res.status(400);
        res.send("session field required");
        return;
    }
    let query = {
        id:req.query.session,
        expires:{
            $gte:Date.now()
        }
    };
    let docs = await db.collection("sessions").find(query).toArray();
    if(docs.length == 0){
        res.status(403);
        res.send("No active session");
        return;
    }
    else{
        res.status(200);
        res.send({session: req.query.session, user: docs[0].user, expires: docs[0].expires});
    }
});
app.post("/document_add", async (req, res)=>{
    const cl = await client.connect();
    const db = cl.db("obiekty_zadanie");
    let session = req.body.session;
    console.log(session);
    if(typeof session == "undefined"){
        res.status(400);
        res.send("session field required");
        return;
    }
    let query = {
        id:session,
        expires:{
            $gte:Date.now()
        }
    };
    let docs = await db.collection("sessions").find(query).toArray();
    if(docs.length == 0){
        res.status(403);
        res.send("No active session");
        return;
    }
    let user = docs[0].user;
    console.log(user);
    await db.collection("notes").insertOne({
        title:req.body.title,
        desc:req.body.desc,
        author:user,
        created: Date.now(),
        hasImage:req.body.isImage,
        image: req.body.isImage?req.body.image:null
    });
    res.status(201);
    res.send("Created!");
});
app.post("/del_doc", async (req, res)=>{
    const cl = await client.connect();
    const db = cl.db("obiekty_zadanie");
    let session = req.body.session;
    console.log(session);
    if(typeof session == "undefined"){
        res.status(400);
        res.send("session field required");
        return;
    }
    let query = {
        id:session,
        expires:{
            $gte:Date.now()
        }
    };
    let docs = await db.collection("sessions").find(query).toArray();
    if(docs.length == 0){
        res.status(403);
        res.send("No active session");
        return;
    }
    let user = docs[0].user;
    console.log(user);
    await db.collection("notes").deleteOne({_id:req.body.doc})
    res.status(201);
    res.send("Deleted!");
});
app.get("/docs", async (req, res)=>{
    const cl = await client.connect();
    const db = cl.db("obiekty_zadanie");
    if(typeof req.query.session == "undefined"){
        res.status(400);
        res.send("session field required");
        return;
    }
    let query = {
        id:req.query.session,
        expires:{
            $gte:Date.now()
        }
    };
    let docs = await db.collection("sessions").find(query).toArray();
    if(docs.length == 0){
        res.status(403);
        res.send("No active session");
        return;
    }
    

    docs = await db.collection("notes").aggregate([{$sample: { size: 3 } }]).toArray();

    res.status(200);
    res.send(docs);

});