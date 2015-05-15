/**
 * WebserverController
 *
 * @description :: Server-side logic for managing webservers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	settings: function(req, res){ 		 		
 		if(req.session.login != null){
 			res.view("webserver/settings");
 		}else{
 			res.redirect("/");
 		}; 		
 	},
 	virtualhost: function(req, res){ 		 		
 		if(req.session.login != null){
 			res.view("webserver/virtualhost");
 		}else{
 			res.redirect("/");
 		}; 		
 	},
 };

