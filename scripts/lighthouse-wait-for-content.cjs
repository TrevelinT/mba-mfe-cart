module.exports = async (browser, context) => {
	const page = await browser.newPage();
	await page.goto(context.url, { waitUntil: "networkidle0", timeout: 30000 });

	await page.waitForFunction(
		() =>
			Boolean(
				document.querySelector(
					'button[aria-label="Carrinho de compras, vazio"], button[aria-controls="cart-panel"]',
				),
			),
		{ timeout: 15000 },
	);

	await page.close();
};
