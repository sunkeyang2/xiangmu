$(function(){
    $('.one button').click(async()=>{
    const username = $('#username').val()
    const password = $('#password').val()
    const phone=$('#phone').val()
  // 非空验证
    if(!username||!password||!phone) return alert('请完整填写信息')
    
  // 提交导后端
    const {code} = await $.post('./zhu.php',{username,password,phone},null,'json');
    // $.ajax({
    //   url:"./zhu.php",
    //   method:"post",
    //   data:{
    //     username:username,
    //     password:password,
    //     phone:phone
        
    //   }
    // }).then(function(res){
    //   console.log(res);
    //   const a=JSON.parse(res)
    // })
  
    console.log(code);
    if(!code) return alert('注册失败')
    console.log('注册成功')
    setCookie('username', username, 1000 * 60 * 60 * 24)
    // 跳转页面
    window.location.href ='../yuandaima/andema.html'
    })
})