//Landing Page for HTML
exports.displayForm = (req, res) => {
	res.sendFile('index.html', { root: './public/' });
};