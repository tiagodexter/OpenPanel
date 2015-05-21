/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	index: function(req, res){ 		
 		console.log(req.session.login);
 		if(req.session.login != null){
 			res.view("dashboard/index");
 		}else{
 			res.redirect("/");
 		}; 		
 	},

 	ajaxPanel:function(req, res){
 		var arrayCommands = [];
 		sails.controllers.dashboard.run("uname -a", function(result) { 
 			arrayCommands.push(result);
 			sails.controllers.dashboard.run("hostname", function(result) { 
 				arrayCommands.push(result);
 				sails.controllers.dashboard.run("df -H", function(result) { 
 					arrayCommands.push(result);
 					sails.controllers.dashboard.run("sysctl -a | grep memsize", function(result) { 
 						arrayCommands.push(result);
 						sails.controllers.dashboard.run("uptime", function(result) { 
 							arrayCommands.push(result);
 							sails.controllers.dashboard.run("sysctl -n machdep.cpu.brand_string", function(result) { 
 								arrayCommands.push(result); 								
 								arrayCommands.push(req.session.login);
 								res.send(200, arrayCommands);
 							}); 
 							
 						}); 
 					});  					
 				}); 
 			}); 
 		}); 		
 	},


 	ajaxGetCountUsers:function(req, res){
 		Users.find().exec(function(error,result){ 			
 			if(error){
 				res.send(500);
 			}else{				
 				res.send(200, result);
 			}		
 		});	
 	},

 	ajaxGetCountVirtualHosts:function(req, res){
		Virtualhost.find().exec(function(error, result){
 			if(error){
 				res.send(500);
 			}else{
 				res.send(200, result);
 			}
 		});
 	},
 	
 	run:function(cmd, callback){ 		
 		var exec = require('child_process').exec; 		
 		child = exec(cmd, function (error, stdout, stderr) {
 			return callback(stdout);
 		});
 	}
 };



