# Jak zrobić taką aplikację
## 1.Zainicjalizować npm
    npm init
## 2.Wybrać i zainstalować frameworki i moduły
polecam:
```
npm install express (serwer)
npm install mongodb (baza danych)
npm install -D tailwindcss (style, css)
npm init tailwindcss@config
```
## 3.Napisać stronę główną w HTML i JS
```
projekt
node_modules
    static
        index.html
        img
            obrazek.jpg
            obrazek2.jpg
        js
            login.js
    package.json
```
## 4.Dodać backend w express.js
```
//main.js
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("static"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```
## 5. Dodać API endpoint
```
app.get('/data', (req, res)=>{
    res.status(200);
    res.send(JSON.stringify(await database.load()));
})
```
## 6. Pobierać dane
```
//login.js - skrypt na frontendzie

res = await fetch("/data")
res.records.foreach(doc=>{
    document.querySelector(#data).appendChild(
        document.createElement("p").
        appendTextNode(doc.text)
    )
})
```
## 7. Odbierać dane na backendzie
```
app.post("/add", (req, res)=>{
    if(authenticate_user(req.user)){
        database.save(req.data)
        res.status(201)
        res.send("Created")
    }
    else{
        res.status(403)
        res.send("Unauthorized")
    }
})
```
## 8. Wysyłać dane na backend
```
document.querySelector("#button")
.addEventListener(()=>{
    fetch("/add", {
        method:"POST",
        body:JSON.stringify({
            user:get_user()
            data:document.querySelector("input").value
        })
    })
})
```