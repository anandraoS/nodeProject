const mongoose = require('mongoose');

const objectId = new mongoose.Types.ObjectId();
console.log(objectId);
console.log(objectId.getTimestamp());
console.log(objectId.generationTime);
console.log(mongoose.Types.ObjectId.isValid(objectId));