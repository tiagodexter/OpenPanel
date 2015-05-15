/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 function Object_keys(obj) {
 	var keys = [], name;
 	for (name in obj) {
 		if (obj.hasOwnProperty(name)) {
 			keys.push(name);
 		}
 	}
 	return keys;
 }

 module.exports = {
 	ajaxLogin:function(req, res){
 		var user = req.param("user");
 		var password2 = req.param("password");
 		Users.find({
 			login:user,
 			password:password2
 		}).exec(function(error,result){ 
 			if(result.length == 0){
 				res.send(error, "TESTE");
 				res.send(403);
 			}else{
 				req.session.id=result[0].id;
 				req.session.login=result[0].login;
 				res.redirect("dashboard");
 			};			 			
 		});		
 	},

 	ajaxLogout:function(req, res){
 		if(req.session.login != null){
 			req.session.destroy();
 			res.redirect("/");
 		}else{
 			res.redirect("/");
 		}; 	
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
 		Users.create({
 			name:req.param("name"),
 			email:req.param("email"),
 			login:req.param("login"),
 			password: req.param("password"),
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
 				res.send(200, 'User succefully created!');
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

