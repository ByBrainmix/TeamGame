var mongoose    = require('mongoose');

//--- MongoDB models ---//

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    id: ObjectId,
    username:   {type: String,  unique: true},
    email:      {type: String,  unique: true},
    date:       {type: Date,    default: Date.now},
    rang:       {type: String,  default: "User"},
    password :  String
});

//--- connect to Database ---//
//mongoose.connect('mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/auth');   
mongoose.connect('mongodb://127.0.0.1:27017/auth');

//--- export models ---//
exports.User = mongoose.model('User', userSchema);