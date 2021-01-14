

$(function(){
  $('.two button').click(async()=>{
  const username = $('#username1').val()
  const password = $('#password1').val()
// 非空验证
  if(!username||!password) return alert('请完整填写信息')
// 提交导后端
  const {code,} = await $.post('./login.php',{username,password},null,'json')
  if(!code) return alert('用户名密码错误')
  console.log('登录成功')
  console.log(username)
  setCookie('username', username, 1000 * 60)
  // 跳转页面
  window.location.href = '../yuandaima/andema.html'
  })
})