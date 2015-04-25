/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	ajaxLogin:function(req, res){
 		var user = req.param("user");
 		var password = req.param("password");

 		Users.find({
 			login:user,
 			password:password
 		}).exec(function(error,result){ 			
 			/*if(error){
 				res.send(error, menssage)
 				res.send(403);
 			}else{				
 				if(result.length > 0){
 					req.session.id=result.id;
 					res.redirect("homepage");
 				}else{
 					res.send(403);
 				}
 			}*/
 			res.send(200, 'asdasdasd');			
 		});		

 	},

 	index:function(req, res){
 		res.render("user/index");
 		
 	}
 };

