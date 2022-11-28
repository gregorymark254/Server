
const dbOperation = require("../Models/dbOperation")

dbOperation.getOrders().then(result => {
    console.log(result)
})


