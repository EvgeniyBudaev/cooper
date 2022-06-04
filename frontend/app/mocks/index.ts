export const init = ():void => {
	if (typeof window === 'undefined') {
		const { server } = require('./server')
		server.listen();
	} else {
		const { worker } = require('./browser')
		worker.start();
	}
}
