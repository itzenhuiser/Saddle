const {
    createPool
} = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root", 
    password: "password",
    database: "saddle_pos_system",
    connectionLimit: 10
})

pool.query('SELECT * FROM saddle_pos_system.Customers', (err, result, fields) => {
    if(err){
        return console.log(err);
    }
    return console.log(result)
})

