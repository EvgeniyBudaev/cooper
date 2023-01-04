import React from "react";

export const HomePage: React.FC = () => {
	return (
		<>
			<h1>Images</h1>
			<div className="bg-[url('/assets/images/home-bg.png')] h-screen max-h-full bg-no-repeat">
				<img src="/proxy/https://image.shutterstock.com/image-vector/camera-vector-icon-instagram-social-260nw-1071807305.jpg" alt="" />

				<img src="/proxy/https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png" alt="" />

				<img src="/proxy/https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png" alt="" />
			</div>
		</>
	);
};
