const fs = require('fs');
const path = require('path');

const modulesDir = '../modules/';
const modules = {
	'templates': 'ElterTemplates/elterTemplates'
};
const middlewares = [];

const use = func => {
	if(typeof func === 'string'){
		let p = modules[func];
		
		if(!p)
			throw new Error(`[ELTER] Elter does not have module ${func}`);
		
		p = path.resolve(__dirname, modulesDir) + '/' + p;

		if(!fs.existsSync(p + '.js'))
			throw new Error(`[ELTER] Module ${func} does not exists. Path (${p}) is incorrect or Elter does not have this module`);

		func = require(p);
	}

	if(typeof func !== 'function')
		throw new Error(`[ELTER] Middleware must be a function`);

	middlewares.push(func);
}

const callMiddlewares = () => {
	for(let mws of middlewares)
		mws();
}

module.exports = {
	use,
	callMiddlewares
}