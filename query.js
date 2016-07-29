var baseAPIUrl = "//spreadsheets.google.com/feeds/list/1wr8qbkLGUkmrscj7CPeFml9FlfQCxBKBKzkc2v7lIK8/ohu83m6/public/values?alt=json";
var updateFreSec = 60;

function queryResult() {
  $.ajax({
    type: "GET",
    dataType:"jsonp",
    // type: "POST",
    url: baseAPIUrl,
    beforeSend: function() {
    },
    success: function(data){
      // 隱藏處理中畫面
      alert("OK "+data.feed.entry[0].gsx$boss剩餘血.$t);
      console.log(data);
    },
    error: function(data){
      // 隱藏處理中畫面
      alert("網路錯誤，請重新整理試試看");
    }
  });
}

function display_data() {
}

function clean_data() {
  // 顯示出來
  mSpan_nickname.innerHTML = res_nickname;
  mSpan_tel.innerHTML = res_tel;
  mSpan_email.innerHTML = res_email;
  // mSpan_avatar.innerHTML = res_avatar;
  mSpan_pay_method.innerHTML = res_pay_method;
  mSpan_pay_status.innerHTML = res_pay_status;
}

var form_input = document.getElementById('input-form');

form_input.onsubmit = function(e) {
  e.preventDefault();
  queryResult();
  return 0;
}