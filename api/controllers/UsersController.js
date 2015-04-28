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
 		
 	},

 	ajaxViewListUsers:function(req, res){
 		Users.find().exec(function(error,result){ 			
 			if(error){
 				res.send(error, menssage)
 				res.send(403);
 			}else{				
 				res.render("user/listUsers",{
 					users:result
 				});
 			}		
 		});		 		
 	},

 	ajaxCreateUser:function(req, res){ 
 	/*	console.log(req.param("name"));
 		console.log(req.param("email"));
 		console.log(req.param("login"));
 		console.log(req.param("password"));*/
 		Users.create({
 			name:req.param("name"),
 			email:req.param("email"),
 			login:req.param("login"),
 			password: req.param("password"),
 		}).exec(function(error, data){
 			if(error){
 				res.send(500);
 			}else{
 				res.send(200, 'Usuario cadastrado com sucesso');
 			}
 		});
 	},

 	ajaxUpdateUser:function(req, res){

 	},

 	ajaxDeleteUser:function(req, res){ 	
 		var body = req.body;	  		 		
 		Users.destroy({ id: body['id'] })
 		.exec(function(error, data){
 			if(error){
 				res.send(500);
 			}else{
 				res.send(200, 'Usuario removido com sucesso');
 			}
 		});
 	},

 	ajaxGetInfoUser:function(req, res){
 		var body = req.body;
 		Users.find({ id: body['id'] })
 		.exec(function(error, data) {
 			if(error){
 				res.send(500);
 			}else{ 				
 				res.send(200, data);
 			}
 		});
 	},
 };

