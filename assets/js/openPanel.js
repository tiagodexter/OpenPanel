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

function logout(){
	$('#logoutUser').click(function(e) {
		e.preventDefault();
		$.ajax({
			type:"POST",
			url:"/users/ajaxLogout",			
			success:function(res){				
				window.location= '/';
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
				alert("Error while render user list! Try again later");
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
				$('#viewListUsers').click();
			},
			error:function(err){
				console.log(JSON.parse(err.responseText));
				var error = JSON.parse(err.responseText);
				$('#formCreateUser input[type=text], input[type=email]').each(function() {
					$(this).removeClass('alert-danger');
					$(this).addClass('alert-success');
				})
				if (error.type == 'VALIDATION') {
					$(error.fields).each(function(e,k) {
						$(this).removeClass('alert-success');
						$('#'+k).addClass('alert-danger');
					});
					alert('Error validatin data! Change data');
				} else {
					alert("Error creating user! Try again later");
				}
				
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
				$('#viewListUsers').click();				
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
		$.ajax({
			type:"POST",
			url:"/users/ajaxGetInfoUser",
			data: { 'id' : $(this).data('key')},
			success:function(res){
				$('#name').val(res[0].name);
				$('#email').val(res[0].email);
				$('#login').val(res[0].login);
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

			var index;
			var discos = res[2].split("\n");			
			for (index = 1; index < discos.length; ++index) {				
				var elements = discos[index].split(" ").filter(Boolean);
				if(elements != ""){					
					if(elements.length <= 9){
						var name = elements[0];
						var size = elements[1];
						var user = 	elements[2];
						var avail = elements[3];
						var unidadeSize = (size.slice(-1) == "B") ? size.slice(-1) : size.slice(-1) + "B";
						var unidadeUser = (user.slice(-1) == "B") ? user.slice(-1) : user.slice(-1) + "B";
						var unidadeAvail = (avail.slice(-1) == "B") ? avail.slice(-1) : avail.slice(-1) + "B";
					}else{
						var name = elements[0] +" "+elements[1];
						var size = elements[2];
						var user = 	elements[3];
						var avail = elements[4];
						var unidadeSize = (size.slice(-1) == "B") ? size.slice(-1) : size.slice(-1) + "B";
						var unidadeUser = (user.slice(-1) == "B") ? user.slice(-1) : user.slice(-1) + "B";
						var unidadeAvail = (avail.slice(-1) == "B") ? avail.slice(-1) : avail.slice(-1) + "B";
					};			
					if(size.slice(0,-1) != 0){
						$('#disks').prepend('<div class="col-sm-6" ><div class="text-center"><i class="fa fa-hdd-o fa-fw"></i><b>'+name+'</b></div><div id="donut-chart-diskspace'+index+'"></div></div>');												
						Morris.Donut({
							element: 'donut-chart-diskspace'+index+'',
							data: [
							{label: "Size ("+unidadeSize+")", value: size.slice(0,-1)},
							{label: "Used ("+unidadeUser+")", value: user.slice(0,-1)},
							{label: "Avail ("+unidadeAvail+")", value: avail.slice(0,-1)}
							],
							colors: [
							'#337AB7',
							'#D9534F',
							'#5CB85C'
							],
						});	
					};						
				};
			};

			var memory = res[3].split(" ");	
			var resultMemory =  (memory[1] / 1024)/1024;		
			$('#memory').html(resultMemory + " GB");

			$('#uptime').html(res[4]);

			$('#cpu').html(res[5]);

			$('#accountLogged').html('('+res[6]+')');
			$('#side-menu').metisMenu();
		},
		error:function(err){
			alert("User or Password incorrect");
		}
	});
}


