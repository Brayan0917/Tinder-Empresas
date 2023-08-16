const express = require('express');
const { restart } = require('nodemon');
const app=express()

const connection = require('./knexfile')['development'];
const database = require('knex')(connection);
app.use(express.json())

app.get('/', (req, res)=>{
	res.json({
		message: 'GET Home route working fine!'
	});
});
app.listen(3000,()=>{
	console.log(`Server running`);
});

//habilidades//

app.post('/habilidades',(req,res)=>{
    const toCreate = req.body
    database('habilidades').insert(toCreate)
    .then((habilidades)=> {
        res.json(habilidades)
    
})
})


app.delete('/habilidades/:id', (req,res)=>{
    const {id} = req.params
    database('habilidades')
        .where ({id_habilidad: id})
        .del()
        .then((nombre_habilidad)=>{
            res.json(nombre_habilidad)
    })
})

app.get('/habilidades', (req,res)=>{
    database('habilidades').then((nombre_habilidad)=>{
        res.json(nombre_habilidad)
    })
})


app.get('/habilidades/:id', (req,res)=>{
    const {id} = req.params
    database('habilidades')
    .where ({id_habilidad: id})
    .then((nombre_habilidad)=>{
        res.json(nombre_habilidad)
    })
})

app.put('/habilidades/:id', (req,res)=>{
    const {id} = req.params
    const toEdit = req.body
    database('habilidades')
        .where ({id_habilidad: id})
        .update (toEdit)
        .then((nombre_habilidad)=>{
        res.json(nombre_habilidad)
    })
})