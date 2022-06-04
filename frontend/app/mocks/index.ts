export const init = (): void => {
	if (typeof window === 'undefined') {
		console.log("server");
		const { server } = require('./server');
		server.listen();
	} else {
		console.log("worker");
		const { worker } = require('./browser');
		worker.start();
	}
}


