const mongoose = require('mongoose');
let Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const studentSchema = new Schema({
    username: { type: String, required: true },
    branch: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{
        type:String
    }
});
studentSchema.plugin(passportLocalMongoose);
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;