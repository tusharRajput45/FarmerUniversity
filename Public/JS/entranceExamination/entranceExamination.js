$(document).ready(function(){
  console.log("Event");
  $('#addRecord').submit(function(event){
    $.ajax({
    url:'/entranceExamination/PostentranceExamRegister',
    type:'post',
    data:$('#addRecord').serialize(),
    success:function(result){alert(result)},
    error:function(err){alert('Server Error')}
})
event.preventDefault();
  })

//login by Ajax
  $('#recordLogin').submit(function(event){
    $.ajax({
    url:'/Examination/EntranceRegisterLogin',
    type:'post',
    data:$('#recordLogin').serialize(),
    success:function(result){
      if(result===true){
        const toastAlert=document.getElementById('toastAlert');
        const toast=new bootstrap.Toast(toastAlert)
        toast.show();
        // $('#content').load('/Examination/EntranceRegistration')
      }
      else{
      $("#Error").removeAttr("hidden").css('visibility','visible');
      $('#Error').html(result)}
    },
    error:function(err){alert('Server Error')}
})
event.preventDefault();
  })
$('#SendEmail').submit(function(event){
    $.ajax({
    url:'/Examination/EntranceRegisterEmailVarify',
    type:'post',
    data:$('#SendEmail').serialize(),
    success:function(result){alert(result)},
    error:function(err){alert('Server Error')}
})
event.preventDefault();
  })
})
