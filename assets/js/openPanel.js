function login(){
	$('#signinForm').submit(function(e){
		e.preventDefault();
		$.ajax({
			type:"POST",
			url:"/users/ajaxLogin",
			data:$(this).serialize(),
			success:function(res){
				window.location= '/dashboard';
			},
			error:function(err){
				alert("User or Password incorrect");
			}
		});
	});
}