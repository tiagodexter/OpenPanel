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
};

function views(){
	$('#viewListUsers').click(function(e) {
		e.preventDefault();
		$.ajax({
			type:"POST",
			url:"/users/ajaxViewListUsers",
			data:$(this).serialize(),
			success:function(res){				
				$('#page-wrapper').empty();
				$('#page-wrapper').html(res);
				$('#tableListUsers').DataTable();
			},
			error:function(err){
				alert("User or Password incorrect");
			}
		});
	});
};

function formCreateUser(){
	$('#formCreateUser').submit(function(e){
		e.preventDefault();
		$.ajax({
			type:"POST",
			url:"/users/ajaxCreateUser",
			data:$(this).serialize(),
			success:function(res){
				alert(res);
				$('#myModal').modal('toggle');
			},
			error:function(err){
				alert("User or Password incorrect");
			}
		});
	});
};

function deleteUser(){
	$('.btn-danger').click(function (e) {		
		e.preventDefault();
		$.ajax({
			type:"POST",
			url:"/users/ajaxDeleteUser",
			data: { 'id' : $(this).data('key')},
			success:function(res){
				alert(res);				
			},
			error:function(err){
				alert("User or Password incorrect");
			}
		});
	});
};

function getInfoUser(){
	$('.btn-warning').click(function (e) {		
		e.preventDefault();
		alert($(this).data('key'));
		$.ajax({
			type:"POST",
			url:"/users/ajaxGetInfoUser",
			data: { 'id' : $(this).data('key')},
			success:function(res){
				$('#name').val(res[0].name);
				$('#email').val(res[0].email);
				$('#login').val(res[0].login);
				$('#password').val(res[0].password);
				$('#myModal').modal('toggle');
			},
			error:function(err){
				alert("User or Password incorrect");
			}
		});
	});
}

function getPanel(){	
	$.ajax({
		type:"POST",
		url:"/dashboard/ajaxPanel",		
		success:function(res){
			console.log(res);
			$('#server').html(res[1]);		
		},
		error:function(err){
			alert("User or Password incorrect");
		}
	});
}


