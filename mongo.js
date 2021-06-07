const mongoose = require ('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]

const url =
    `mongodb+srv://robmudd:${password}@cluster0.zzzoh.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {

    const nameToAdd = process.argv[3]

    const numberToAdd = process.argv[4]


    const person = new Person({
        name: nameToAdd,
        number: numberToAdd
    })

    person.save().then(result => {
        console.log(`Saved ${nameToAdd} to the phonebook!`)
        mongoose.connection.close()
    })
} else {
    console.log('Phonebook:')

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

/*
const person = new Person({
    name: 'Becky Arnold',
    number: "484-919-4710"
})

person.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})*/

