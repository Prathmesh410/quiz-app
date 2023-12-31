const mongoose = require('mongoose');
const crypto = require('crypto');
const  uuidv4  = require('uuid/v4');

  var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 40,
        trim : true,
    },

    lastname : {
        type : String,
        required : false,
        maxlength : 40,
        trim : true,
    },

    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    
    encry_password : {
         type : String,
         required : true,
    },


    salt : String,

     
    
}, {timestamps : true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt =  uuidv4;
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this.password;
    })



    userSchema.methods = {
        authetication : function(plainpassword){
            return this.securePassword(plainpassword) === this.encry_password
        },

        securePassword :function(plainpassword){
            if(!plainpassword) return "";
            try{
                return crypto
                .createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex'); 
            }catch (err) {
                return "";
            }
        }
    }
module.exports = mongoose.model("User",userSchema)