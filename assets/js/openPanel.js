function login(){
	$(function(){
		$('#signinForm').submit(function(e){
			e.preventDefault();
			$.ajax({
				type:"POST",
				url:"/users/ajaxLogin",
				data:$(this).serialize(),
				sucess:function(res){
					
				},
				error:function(err){
					alert("User or Password incorrect");
				}
			});
		});
	});
}