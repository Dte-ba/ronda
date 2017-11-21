'use strict';

import fs from 'fs';
import path from 'path';
import fontkit from 'fontkit';

export default (gulp, plugins, config) => {

	// generate icons scss & html
	gulp.task('generate:icons', (cb) => {
		let font = fontkit.openSync(path.join(config.root, './client/assets/fonts/ronda.ttf'));

		let iconsScss = [
				'/**'
			, ' * WARNING: This file is autogenerated.'
			, ' */'
			, ' '
		];

		let alias = {
			'herramienta': [ 'herramientas' ]
		};

		let getIconsNames = (name) => {
			let res = [name];
			if (!alias[name]){
				return res;
			}
			
			return res.concat(alias[name]);
		};

		font.characterSet.forEach(function(codePoint) {
			let glyph = font.glyphForCodePoint(codePoint);
			let hex = codePoint.toString(16);
			let name = glyph.name.replace(/\_/ig, '-');

			let names = getIconsNames(name);
			
			names.forEach(name => {
				if (name === '.notdef'){
					return
				}

				iconsScss.push(`.ri-${name}:before {`);
				iconsScss.push(`\tcontent: "\\${hex}";`);
				iconsScss.push(`}\n`);
			});
		});

		let contentScss = iconsScss.join('\n');

		fs.writeFileSync(path.join(config.root, '/client/ui/scss/_icons-gen.scss'), contentScss);
		cb();
	});
}