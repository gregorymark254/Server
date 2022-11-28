const config = require('../DB/dbconfig');
const sql = require('mssql');

//fetching all data from employee database
async function getOrders() {
  try {
    const pool = await sql.connect(config);
    const products = await pool.request().query("SELECT * FROM Employee");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
    console.log("Could not fetch data!!");
  }
}


//fetching all data from employee database by id
async function getOrder(orderId) {
  try {
    const pool = await sql.connect(config);
    const products = await pool.request()
    .input('input_parameter', sql.int, orderId )
    .query("SELECT * FROM Employee where id = @input_parameter");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
    console.log("Could not fetch data!!");
  }
}

//Adding a product
async function addProduct() {
  try {
    const pool = await sql.connect(config);
    const res = await pool.request()
    .input("EmployeeID", sql.int, "employeeid")
    .input("FirstName", sql.nvarchar, "firstname")
    .input("LastName", sql.nvarchar, "lastname")
    .input("Email", sql.nvarchar, "email")
    .input("Phone", sql.nvarchar, "phone")
    .query("INSERT INTO Employee VALUES (8, john ,mark, john@gmail.com, 07895542)")
    .execute("addProduct");
    return res.recordsets;
  } catch (error) {
    console.log(error)
    console.log("Data not added!!");
  }
}

//Updating a product
async function updateProduct(prod) {
  try {
    const pool = await sql.connect(config);
    const res = await pool.request()
    .input("EmployeeID", sql.int, prod.EmployeeID)
    .input("FirstName", sql.nvarchar, prod.FirstName)
    .input("LastName", sql.nvarchar, prod.LastName)
    .input("Email", sql.nvarchar, prod.Email)
    .input("Phone", sql.nvarchar, prod.Phone)
    .execute("updateProduct");
    return res;
  } catch (error) {
    console.log(error)
    console.log("Could not update!!");
  }
}

//Deleting a product
async function deleteProduct(id) {
  try {
    if (!id) {
      console.log('id is not passed');
    }
    const pool = await sql.connect(config);
    const res = await pool.request()
    .input("EmployeeID", id)
    .execute("deleteProduct");
    return res;
  } catch (error) {
    console.log(error)
    console.log("Could not delete!!");
  }
}


module.exports = {
  getOrders:  getOrders,
  getOrder:  getOrder,
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
}