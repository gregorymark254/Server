const router = require("express").Router()
const  Db = require('../Models/dbOperation');


//getting backend server
router.get('/server', (req,res) => {
  res.send("Backend Server")
})

//getting all data from employee database
router.get('/database', (req, res) => {
  try {
    Db.getOrders().then((data) => {
      res.json(data[0]);
    })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

//getting all data from employee database by id
router.get('/:id', (req, res) => {
  try {
    Db.getOrder(req.params.id).then((data) => {
      res.json(data);
    })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})
  
//added data to employee database
router.post('/add', (req, res) => {
  try {
    let  order = { ...req.body }
    Db.addProduct(order).then((output) => {
      res.json(output);
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
})

//update data to employee database
router.put('/:id', (req, res) => {
  Db.updateProduct().then((output) => {
    res.status(201).json(output[0]);
  })
})

//delete data to employee database
router.delete('/:id', (req, res) => {
  Db.deleteProduct().then((output) => {
    res.json(output[0]);
  })
})


module.exports = router