var mysql = require('mysql2');

var pool = null;
// if (process.env.env_config == "local") {
//     pool = mysql.createPool({
//         connectionLimit: 30,
//         host: "dev.vfans.org",
//         user: "root",
//         password: "ca12a819376bf135e7f884d37de19ec141af25be",
//         database: 'vfans'
//     });
// }
// if (process.env.env_config == "dev") {
//     pool = mysql.createPool({
//         connectionLimit: 30,
//         host: "dev.vfans.org",
//         user: "root",
//         password: "ca12a819376bf135e7f884d37de19ec141af25be",
//         database: 'vfans'
//     });
// }
// if (process.env.env_config == "test") {
//     pool = mysql.createPool({
//         connectionLimit: 30,
//         host: "dev.vfans.org",
//         user: "root",
//         password: "ca12a819376bf135e7f884d37de19ec141af25be",
//         database: 'vfans'
//     });
// }

exports.pool = pool
