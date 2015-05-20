/**
 * WebserverController
 *
 * @description :: Server-side logic for managing webservers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i].indexOf(needle) != -1) return i;
   }
   return false;
}

 module.exports = {
 	settings: function(req, res){ 		 		
 		if(req.session.login != null){
 			var fs = require('fs');
 			fs.readFile(sails.config.definitions.nginx_file,'utf8',function(err,data) {
 				if (!err) {
 					var lines = data.split("\n");
 					var worker_processes = "";
 					var worker_connections = "";
 					var client_max_body_size = "";
 					var client_body_buffer_size = "";
 					var client_header_buffer_size = "";
 					var gzip_enable = "";
 					var gzip_comp_level = "";
 					lines.forEach(function(e) {
 						if (e != ""){
 							if (e.indexOf("worker_processes") != -1) {
 								var aux = e.replace("worker_processes","").replace(';','').replace(/ /g,'');
 								worker_processes = aux;
 							}
 							if (e.indexOf("worker_connections") != -1) {
 								var aux = e.replace("worker_connections","").replace(';','').replace(/ /g,'');
 								worker_connections = aux;
 							}
 							if (e.indexOf("client_max_body_size") != -1) {
 								var aux = e.replace("client_max_body_size","").replace(';','').replace(/ /g,'');
 								client_max_body_size = aux;
 							}
 							if (e.indexOf("client_body_buffer_size") != -1) {
 								var aux = e.replace("client_body_buffer_size","").replace(';','').replace(/ /g,'');
 								client_body_buffer_size = aux;
 							}
 							if (e.indexOf("client_header_buffer_size") != -1) {
 								var aux = e.replace("client_header_buffer_size","").replace(';','').replace(/ /g,'');
 								client_header_buffer_size = aux;
 							}
 							if (e.indexOf("gzip") != -1) {
 								var aux = e.replace("gzip","").replace(';','').replace(/ /g,'');
 								gzip_enable = aux;
 							}
 							if (e.indexOf("gzip_comp_level") != -1) {
 								var aux = e.replace("gzip_comp_level","").replace(';','').replace(/ /g,'');
 								gzip_comp_level = aux;
 							}
 						}
 					});
					res.render("webserver/settings",{
						worker_processes: worker_processes,
						worker_connections: worker_connections,
						client_max_body_size: client_max_body_size,
						client_body_buffer_size: client_body_buffer_size,
						client_header_buffer_size: client_header_buffer_size,
						gzip_enable: gzip_enable,
						gzip_comp_level: gzip_comp_level
					});
				} else {
					console.error(err);
					res.send(500,'Error to open nginx file');
				}
			});
		}else{
			res.redirect("/");
		}; 		
	},
	
	virtualhost: function(req, res){  		
		if(req.session.login != null){
			Virtualhost.find().exec(function(error,result){ 			
	 			if(error){
	 				res.send(error, menssage)
	 				res.send(403);
	 			}else{				
	 				res.render("webserver/virtualhost",{
	 					virtualhosts:result
	 				});
	 			}		
	 		});		
		}else{
			res.redirect("/");
		};
	},

	saveSettings: function(req, res) {
		var fs = require('fs');
		fs.readFile(sails.config.definitions.nginx_file,'utf8',function(err,data) {
			if (!err) {
				var lines = data.split("\n");
				var i = 0;
				var ot = new Array();
				var events = false;
				var http = false;
				
				console.log(lines.contains('worker_processes'));
				res.send(200,"Settings updated succefully!");
			} else {
				console.error(err);
				res.send(500,'Error to open nginx file');
			}
		});

	},

	ajaxCreateVirtualHost:function(req, res){ 
		Virtualhost.create({
			port:req.param("port"),
			name:req.param("name"),
			rootDirectory:req.param("rootDirectory"),
			alias:req.param("alias"),
			phpEnabled:req.param("phpEnabled"),
			proxyEnabled:req.param("proxyEnabled"),
			proxyAddress:req.param("proxyAddress")			
 		}).exec(function(error, data){
 			if(error){
 				error = JSON.stringify(error);
 				error = JSON.parse(error);
 				if (error.error == 'E_VALIDATION') {
 					var erro = new Object();
 					erro["type"] = 'VALIDATION';
 					var el = Object_keys(error.invalidAttributes);
 					erro["fields"] = el; 					
 				} else {
 					var erro = error;
 				}
 				res.send(500,erro);
 			}else{
 				res.send(200, 'Virtual Host succefully created!');
 			}
 		});
 	},

 	ajaxDeleteVirtualHost:function(req, res){ 	
 		var body = req.body;	  		 		
 		Virtualhost.destroy({ id: body['id'] })
 		.exec(function(error, data){
 			if(error){
 				res.send(500);
 			}else{
 				res.send(200, 'Virtual Host  Successfully deleted');
 			}
 		});
 	},

 	ajaxGetInfoVirtualHost:function(req, res){
 		var body = req.body;
 		Virtualhost.find({ id: body['id'] })
 		.exec(function(error, data) {
 			if(error){
 				res.send(500);
 			}else{ 				
 				res.send(200, data);
 			}
 		});
 	},

};

