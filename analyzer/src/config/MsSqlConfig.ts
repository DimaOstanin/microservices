// import dotenv from 'dotenv';
import { Connection } from 'tedious';

// dotenv.config();


const mssqlConfig = {
    user: 'Dima',
    password: 'Dima',
    server: '127.0.0.1',
    database: 'master',
    optinons:{
        trustedconnection: true,
        enableArithAort:true,
        instancename: 'MSSQLSERVER'
    },
    
}
var connection = new Connection(mssqlConfig);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});

connection.connect();

export default mssqlConfig;