const parser = require('./Parser');

module.exports = function(){
	// Add (req, req, next)

	let html = `
		<tag>
			{{ var a = [0, 1, 2] }}

			{{ for(let x of a){ }}
				{{= x }}
			{{ } }}
		</tag>
	`;

	const templ = parser(html, {
		name: 'Agvin',
		nick: 'hazer'
	}, {
		echo_mod: '-'
	});

	console.log(templ)
}