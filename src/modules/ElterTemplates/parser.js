const stringRegExpExcape = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const defaultParams = {
	open_tag: '{{',
	close_tag: '}}',
	echo_mod: '='
};

const parse = (templ, data, params = defaultParams) => {

	params = Object.assign(defaultParams, params);

	params.open_tag = stringRegExpExcape(params.open_tag);
	params.close_tag = stringRegExpExcape(params.close_tag);

	console.log(params);

	const templRegExp = new RegExp(params.open_tag + '(.*?)' + params.close_tag, 'g');
	const exprRegExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;

	var code = 'with(data) { var r=[];\n',
		cursor = 0,
		match;

	const add = function(line, html) {
		let modifier = line[0];

		console.log('ADD `' + line.trim() + '`');

		if(html){
			code += `r.push('${line.replace(/"/g, '\\\\"')}');`;
			console.log('string')
		}else if(modifier === params.echo_mod){
			line = line.slice(1);
			code += `r.push(${line});`;
			console.log('output')
		}else{
			code += line + ';';
			console.log('code line')
		}

		// if(line.match(exprRegExp) || data[line.trim()]){
		// 	code += line + ';';
		// 	console.log('code line')
		// }else if(modifier === params.echo_mod){
		// 	line = line.slice(1);
		// 	code += `r.push(${line});`;
		// 	console.log('output')
		// }else if(html){
		// 	code += `r.push('${line.replace(/"/g, '\\\\"')}');`;
		// 	console.log('string')
		// }

		console.log('\n')

		return add;
	}

	for(let match of templ.matchAll(templRegExp)){
		let m = match[0],
			v = match[1].trim(),
			dataEq = data[v],
			index = match.index;
		
		add(templ.slice(cursor, index), true)(v);

		cursor = index + m.length;
	}



	add(templ.substr(cursor, templ.length - cursor), true);

	code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');


	var resFunc;

	try{
		resFunc = new Function('data', code).apply(data, [data]);
	}catch(e){
		console.error(e.message);
	}
	return resFunc;
}

module.exports = parse;
