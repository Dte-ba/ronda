'use strict';

import mime from 'mime';
import path from 'path';
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

let isDev = process.env.NODE_ENV === 'development';

var FileSchema = new Schema({
	name: String,
	relative: String,
	description: String,
	url: String
});

FileSchema
	.virtual('type')
	.get(function() {
		return mime.getType(path.extname(this.name));
	});

FileSchema
	.virtual('serialize')
	.get(function() {
		return () => {
			return {
				_id: this._id,
				name: this.name,
				type: this.type,
				url: this.url,
				relative: isDev ? this.relative : undefined
			}
		};
	});

export default mongoose.model('File', FileSchema);