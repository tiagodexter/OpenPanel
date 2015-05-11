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

			var str = res[2].replace(/^\s+|\s+$/g,"");
			var elementsDonuts = str.split(" ");
			console.log(res[3]);

			Morris.Donut({
				element: 'donut-chart-diskspace',
				data: [
				{label: "Size (GB)", value: elementsDonuts[14].slice(0,-1)},
				{label: "Used (GB)", value: elementsDonuts[17].slice(0,-1)},
				{label: "Avail (GB)", value: elementsDonuts[20].slice(0,-1)}
				],
				colors: [
				'#337AB7',
				'#D9534F',
				'#5CB85C'
				],
			});

			var memory = res[3].split(" ");	
			var resultMemory =  (memory[1] / 1024)/1024;		

			$('#memory').html(resultMemory + " GB");

		},
		error:function(err){
			alert("User or Password incorrect");
		}
	});
}


