/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		name: {
			type: 'string',      
			required: true
		},
		email: {
			type: 'email',
			required: true
		},
		login: {
			type: 'string',      
			required: true,
			minLength: 8
		},
		password:{
			type:'string',
			required:true,
			minLength: 8
		},
	},

	beforeCreate: function(values, cb) {
    
    encrypt(values.password, function(err, password) {
    	if(err) return cb(err);

    	values.password = password;
    	cb();
    });
},

};

