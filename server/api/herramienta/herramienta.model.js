'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './herramienta.events';

var ops = {};
ops.timestamps = true;
var HerramientaSchema = new Schema({
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
		published: { type: Schema.Types.ObjectId, ref: 'Resource' },
		files: [{ url: String, name: String, description: String, size: Number }],
	});

registerEvents(HerramientaSchema);
export default mongoose.model('Herramienta', HerramientaSchema);