//cross origin resourse sharing
const allowedOrigins = [
    'https://www.googlee.com'
]

const corsOption = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1  || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials:true,  
    optionSuccessStatus : 200
}

module.exports = corsOption