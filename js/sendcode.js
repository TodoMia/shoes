// JavaScript Document

var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数
function get_code() {   
      var reg=/^[0-9]+.?[0-9]*$/;
	  var phe=document.orderinfo.mycall.value;
      if(phe == "")
      {
        alert("手机号不能为空");
        document.orderinfo.mycall.focus();
        return false;
      }else if(!reg.test(phe))
      {
        alert("请输入正确的手机号")
        document.orderinfo.mycall.focus();
        return false;
      }else if(phe.length != 11)
      {
        alert("请输入正确的11位手机号");
        document.orderinfo.mycall.focus();
        return false;
      }
	  // ajax请求获取验证码
      $.ajax({
        type: "POST",
        url: "http://l2i.cn/e/sms-sdk/api_demo/SmsDemo.php",
        // dataType: 'html',
        dataType: 'jsonp',
        data:{
            phone:phe
        },
        success:function(data,status){
            alert("验证码发送成功");
            curCount = count;
            $("#sendcode").attr("disabled", "true");
            $("#sendcode").val("重新发送（" + curCount + "）");
            InterValObj = window.setInterval(SetRemainTime, 1000);
            return false;
         },
        error:function(){
            alert("发送验证码不成功，请重试");
            return false;
        }
      })

    }   
//timer处理函数
// 验证码倒计时curCount
function SetRemainTime() {
      if (curCount == 0) {        
        window.clearInterval(InterValObj);
        $("#sendcode").removeAttr("disabled");
        $("#sendcode").val("重新发送验证码");
      }
      else {
        curCount--;
        $("#sendcode").val("重新发送（" + curCount + "）");
      }
    }
