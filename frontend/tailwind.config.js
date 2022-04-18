const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./app/**/*.{ts,tsx,jsx,js}"],
	theme: {
		extend: {
			colors: {
				"primary": "#031412",
			},
			fontFamily: {
				body: ["Mont"],
				lighthaus: ["Lighthaus"],
			},
			fontSize: {
				base: "16px",
				h1: "100px",
				h2: "50px",
			},
			transitionDuration: {
				"default": "0.15s",
			},
		},
	},
	plugins: [
		require("tailwindcss-gradients"),
		plugin(({addComponents}) => {
			addComponents({
				".btn-primary": {
					background: "linear-gradient(to right, #5E3928, #E4A16F)",
					color: "white",
					padding: "16px 132px",
					width: "max-content",
					fontSize: "18px",
					fontWeight: "800",
					cursor: "pointer",
					transition: "all 0.15s",
					"&:hover": {
						boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
					},
				},
				".breadcrumbs": {
					"&__list": {
						display: "inline-flex",
						listStyleType: "none",
					},
					"&__breadcrumb": {
						position: "relative",
						"&-home a": {
							color: "#031412",
							textDecoration: "none",
							fontWeight: "600",

							"&:hover": {
								background: "linear-gradient(to right, #5E3928, #E4A16F)",
								backgroundClip: "text",
								textFillColor: "transparent",
							},
						},
					},
					"&__breadcrumb:not(:last-of-type)::after": {
						content: "/",
						margin: "0 8px",
						fontSize: "1.5vw",
					},
					"&__breadcrumb a": {
						color: "#031412",
						textDecoration: "none",
						fontWeight: "600",

						"&:last-child": {
							fontWeight: "800",
							cursor: "default",

							"&:hover": {
								background: "none",
							},
						},

						"&:hover": {
							background: "linear-gradient(to right, #5E3928, #E4A16F)",
							backgroundClip: "text",
							textFillColor: "transparent",
						},
					}
				}
			})
		}),
	],
};
