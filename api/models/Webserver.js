/**
* Webserver.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		port: {
			required: true,
			type: "integer"
		},
		name: {
			required: true,
			type: "string"
		},
		rootDirectory: {
			type: "string"
		},
		alias: {
                        required: true,
			type: "array"
		},
		phpEnabled: {
			type: "boolean",
		},
		proxyEnabled: {
			type: "boolean",
			required: true
		},
		proxyAddress: {
			type: "string"
		}
	}
};

