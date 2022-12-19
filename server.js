const PORT = process.env.port || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const storeNotes = require('./db/db.json');
const { dirname } = require('path');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes',(req,res)=>{
    res.json(storeNotes.slice(1));
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(_dirname,'./public/index.html'));
});
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(_dirname,'./public/notes.html'));
});
app.get('*', (req,res)=>{
    res.sendFile(path.join(_dirname,'./public/index.html'));
});

function newNote(body, notesArray){
    const brandNewNote = body;

    if (!Array.isArray(notesArray))
    notesArray =[];

    if (notesArray.length === 0)
    notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(brandNewNote);
    fs.writeFileSync(
        path.join(_dirname, 'db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return brandNewNote;
}

app.post('/api/notes',(req,res)=>{
    const brandNewNote = makeNewNote(req.body, storeNotes);
    res.json(brandNewNote);
});

function destroyNote(id, notesArray){
    for (let i = 0; i<notesArray.length;i++){
        let note = notesArray[i];

        if (note.id == id){
            notesArray.splice(i,1);
            fs.writeFileSync(
                path.join(+dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
}
