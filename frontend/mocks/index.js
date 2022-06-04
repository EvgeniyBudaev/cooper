require("tsconfig-paths/register");
require("ts-node").register({ transpileOnly: true });
require("./start");

// if (typeof window === 'undefined') {
// 	const { server } = require('./server');
// 	server.listen();
// } else {
// 	const { worker } = require('./browser');
// 	worker.start();
// }
