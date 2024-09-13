import express from 'express'

const app = express();

const port = 3000;


app.use(express.json())

let dummyData = []
let nextId = 1

// Root 
app.get('/', (req, res) => {
  res.status(200).send('Mockserver is runnig')
})
// Create data
app.post('/createdata', (req, res) => {

  const { name, price } = req.body
  const newData = { id: nextId++, name, price }
  dummyData.push(newData)
  res.status(201).send(newData)

})

// Get all data
app.get('/getdata', (req, res) => {
  res.status(200).send(dummyData)
})

//Get specific data
app.get('/getdata/:id', (req, res) => {
  const data = dummyData.find(t => t.id === parseInt(req.params.id))
  if (!data) {
    return res.status(404).send('Data Not Found')
  }
  res.status(200).send(data)
})

// Update the data
app.put('/updatedata/:id', (req, res) => {
  const data = dummyData.find(t => t.id === parseInt(req.params.id))

  if (!data) {
    return res.status(404).send('Data Not Found')
  }
  const { name, price } = req.body
  data.name = name
  data.price = price
  res.status(200).send(data)
})

// Delete data
app.delete('/deletedata/:id', (req, res) => {
  const index = dummyData.findIndex(t => t.id === parseInt(req.params.id))

  if (index === -1) {
    res.status(404).send('Data Not Found')
  }

  dummyData.splice(index, 1)

  return res.status(204).send('Deleted')

})

app.listen(port, () => {
  console.log(`Mock server is running at http://localhost:${port}`);
});