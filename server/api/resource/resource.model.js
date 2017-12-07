'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './resource.events';

var ops = {};
ops.timestamps = true;
var ResourceSchema = new Schema({
		type: String,
		title: String,
		summary: String,
		thumbnail: String,
		nivel: [String],
		area: [String],
		category: Schema.Types.Mixed,
		postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
		tags: [String],
		collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		files: [{ url: String, name: String, description: String, size: Number }],
	});

registerEvents(ResourceSchema);
export default mongoose.model('Resource', ResourceSchema);