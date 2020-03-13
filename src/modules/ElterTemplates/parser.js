const parse = (templ, data, ...p) => {

	const dataRegExp = /{{([^}}]+)?}}/g;
	if(typeof data === 'object'){
		var matches = templ.matchAll(dataRegExp);
		var notFoundVars = new Set();
		for(let match of matches){
			let v = match[1].trim();
			let dataEq = data[v];
			let m = match[0];
			if(!dataEq)
				notFoundVars.add(v);
			templ = templ.replace(m, dataEq);
		}
		if(notFoundVars.size > 0){
			for(let e of notFoundVars)
				console.error(e, 'is not defined');
			throw `Some variables are not defined`;
		}
	}



	return templ;
}

module.exports = parse;