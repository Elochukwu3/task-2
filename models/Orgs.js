const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organisationSchema = new Schema({
    orgId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Organisation', organisationSchema);
