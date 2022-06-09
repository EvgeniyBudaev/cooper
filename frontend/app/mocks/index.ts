export const init = ():void => {
	if (typeof window === 'undefined') {
		const { server } = require('./server')
		server.listen({ onUnhandledRequest: "bypass" });
		process.once("SIGINT", () => server.close());
		process.once("SIGTERM", () => server.close())
	} else {
		const { worker } = require('./browser')
		worker.start({ onUnhandledRequest: "bypass" });
	}
}
