'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './published.events';

var ops = {};
ops.timestamps = true;
var PublishedSchema = new Schema({
		type: String,
		title: String,
		summary: String,
		thumbnail: String,
		nivel: [String],
		area: [String],
		category: Schema.Types.Mixed,
		postBody: [{ moduleType: String, content: Schema.Types.Mixed }],
		tags: [String],
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		files: [{ url: String, name: String, description: String, size: Number }],
		links: [{ type: Schema.Types.ObjectId, ref: 'Published' }],
	}, ops);

registerEvents(PublishedSchema);
export default mongoose.model('Published', PublishedSchema);