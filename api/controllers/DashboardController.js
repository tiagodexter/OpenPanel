/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	index: function(req, res){
 		res.view("dashboard/index");
 	},

 	ajaxPanel:function(req, res){
 		var arrayCommands = [];

 		sails.controllers.dashboard.run("uname -a", function(result) { 
 			arrayCommands.push(result);
 			sails.controllers.dashboard.run("hostname", function(result) { 
 				arrayCommands.push(result);
 				res.send(200, arrayCommands);
 			}); 
 		}); 		
 	},
 	
 	run:function(cmd, callback){ 		
 		var exec = require('child_process').exec; 		
 		child = exec(cmd, function (error, stdout, stderr) {
 			return callback(stdout);
 		});
 	}
 };

