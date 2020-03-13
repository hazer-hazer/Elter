const parser = require('./Parser');

module.exports = function(){
	// Add (req, req, next)

	let html = `
		
		<html>
			{{= name }}

			{{= nick }}
		</html>
	`;

	parser(html, {
		name: 'Agvin',
		nick: 'hazer'
	});
}