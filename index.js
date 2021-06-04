const express = require('express')
const cors = require('cors')
app = express()


const requestLogger = (request, response, next) => {
    console.log('----')
    console.log("method is ", request.method)
    console.log("path is ", request.path)
    console.log("body is ", request.body)
    console.log('----')
    next()
}

app.use(express.json())
app.use(cors())
app.use(requestLogger)



let persons = [
    {
        id: 1,
        name: "Artos Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Hello Me</h1>')
})

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/api/info', (request, response) => {
    const date = new Date()
    response.send(
        `<div>
                <h1>Phonebook has entries for ${persons.length} people</h1>
                <p>${date}</p>
                </div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log("id is ", id)
    const found = persons.find(p => id === p.id)
    
    if (found) {
        console.log("found it")
        response.send(found)
    } else {
        console.log("not found anywhere")
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log('persons is now ', persons)
    response.status(200).end()
})

app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    
    if (!newPerson.name) {
        return response.status(400).json({
            error: 'Must have name'
        })
    } else if(!newPerson.number) {
        return response.status(400).json({
            error: 'Must have number'
        })
    } else if (persons.find(p => p.name === newPerson.name)) {
        console.log('persons is ', persons)
        return response.status(400).json({
            error: 'must be unique name'
        })
    }
    newPerson.id = Math.floor(Math.random() * 1000000)
    persons = persons.concat(newPerson)
    console.log("persons is now: ", persons)
    response.json(newPerson)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})