import {rest} from 'msw'

export const handlers = [
	rest.get('http://localhost:3000/contacts', (req, res, ctx) => {
		return res(
			ctx.json(
				{
					id: '60333292-7ca1-4361-bf38-b6b43b90cb16',
					firstName: 'John',
					lastName: 'Maverick',
				}
			)
		)
	}),
]
