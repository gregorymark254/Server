const sql = require("mssql");

// config for your database
var config = {
    user: 'hotel',
    password: 'mypassword',
    server: 'DESKTOP-AK51KFD', 
    database: 'HotelDB' ,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};

// connect to your database
const connection = async () => {
    try {
        sql.connect(config, function (err) {   
            try {
                console.log("SQL Server Connected") 
            } catch (err) {
                console.log(err)
                console.log("DB error")
            }
        });
    } catch (error) {
        console.log(error)
        console.log("Mongo Database Error!!")
    }  
}


module.exports = connection