const { ref } = require('joi');
const mongoose = require('mongoose');

const SuspensationRecordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    suspensationUntil: { type: Date },
    createdAt: { type: Date, default: null}
})

const SuspensationRecord = mongoose.model('SuspensationRecord', SuspensationRecordSchema);
module.exports = SuspensationRecord;