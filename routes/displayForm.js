//Landing Page for HTML
exports.displayForm = (req, res) => {
	//res.sendFile('./public/index.html');
	res.sendFile('index.html', { root: './public/' });
};