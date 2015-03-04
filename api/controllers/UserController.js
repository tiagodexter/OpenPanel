/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	"index" : function(req,res) {
            res.render('user/index');
        },
        "create": function(req,res) {
            User.create({'name':'Tiago','password':'lalala','email':'lalala@lalala.com'}).exec(function(err,post) {
                res.render('user/index');
                console.log(post);
            });
            
        },
        "update": function(req,res) {
            
        },
        "delete": function(req,res) {
            
        }
};

