// 正式用
//var baseAPIUrl = "//spreadsheets.google.com/feeds/list/1wr8qbkLGUkmrscj7CPeFml9FlfQCxBKBKzkc2v7lIK8/ohu83m6/public/values?alt=json";
// 測試用
var baseAPIUrl = "//spreadsheets.google.com/feeds/list/1bA_RNgWbS8_K_4UJ5wUkzZd98gNHz2zKj8E0NYxVWhY/ohu83m6/public/values?alt=json";

var updateFreSec = 10000;
var current_bossHp;
var current_overKillBonus;

// set timeout
queryResult();
var tid = setTimeout(queryTimeoutAdp, updateFreSec);
function queryTimeoutAdp() {
  queryResult();
  tid = setTimeout(queryTimeoutAdp, updateFreSec); // repeat myself
}
function abortTimer() { // to be called when you want to stop the timer
  clearTimeout(tid);
}

function queryResult() {
  $.ajax({
    type: "GET",
    dataType:"jsonp",
    // type: "POST",
    url: baseAPIUrl,
    beforeSend: function() {
    },
    success: function(data){
      // 資料擷取
      var bossMaxHp = data.feed.entry[0].gsx$boss總血量.$t;
      var bossHp = data.feed.entry[0].gsx$boss剩餘血.$t;
      var bossHpRate = (bossHp / bossMaxHp) * 100;
      var overKillMaxBonus = data.feed.entry[0].gsx$overkill總分數.$t;
      var overKillBonus = data.feed.entry[0].gsx$overkill分數.$t;
      var overKillBonusRate = (overKillBonus / overKillMaxBonus) * 100;
      var scheduleText = data.feed.entry[0].gsx$狀況一.$t;
      var modeText = data.feed.entry[0].gsx$狀況二.$t;
      
      // 測試用
//      alert("OK "+data.feed.entry[0].gsx$boss剩餘血.$t);
//      console.log(data);
        
      // 顯示
      display_data(scheduleText, modeText, bossMaxHp, bossHp, bossHpRate, overKillMaxBonus, overKillBonus, overKillBonusRate);
      setAshowCombo(bossHp, overKillBonus)
    },
    error: function(data){
      location.reload();
    }
  });
}

function setAshowCombo(bossHp, overKillBonus) {
  // 介面對應
  var comboArea = $('#score-combo-area');
  var combo_bossHp = $('#score-combo-area .boss-hp-text');
  var combo_overKillBonus = $('#score-combo-area .overkill-bonus-text');
  combo_bossHp.html(bossHp);
  combo_overKillBonus.html(overKillBonus);
  function hideCombo() {comboArea.removeClass("show");}
  
  // BOSS Mode
  if(current_bossHp != 0) {
    combo_bossHp.css('display', 'inherit');
    combo_overKillBonus.css('display', 'none');
    
    if(current_bossHp != bossHp) {
      comboArea.addClass('show');
      window.setTimeout( hideCombo, 4000 );
//      comboArea.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
//        function() {
//            comboArea.removeClass("show");
//        }
//      );
    }
  }
  // Overkill Mode
  else {
    combo_bossHp.css('display', 'none');
    combo_overKillBonus.css('display', 'inherit');
    
    if(current_overKillBonus != overKillBonus) {
      comboArea.addClass('show');
      window.setTimeout( hideCombo, 4000 );
//      comboArea.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
//        function() {
//            comboArea.removeClass("show");
//        }
//      );
    }
  }
  
  current_bossHp = bossHp;
  current_overKillBonus = overKillBonus;
}

function display_data(scheduleText, modeText, bossMaxHp, bossHp, bossHpRate, overKillMaxBonus, overKillBonus, overKillBonusRate) {
  // 介面對應
  var mScheduleText = document.getElementById('schedule-text');
  var mModeText = document.getElementById('mode-text');
  var mBossScoreArea = document.getElementById('boss-hp-area');
  var mBossHpRate = document.getElementById('boss-hp-rate');
  var mBossMaxHp = document.getElementById('boss-max-hp');
  var mBossHp = document.getElementById('boss-hp');
  var mOverkillScoreArea = document.getElementById('overkill-bonus-area');
  var mOverkillBonus = document.getElementById('overkill-bonus');
  
  
  // 介面顯示數值
  mBossHpRate.innerHTML = Math.ceil(bossHpRate * 100) / 100 + "%";
  mBossHp.innerHTML = bossHp;
  mBossMaxHp.innerHTML = bossMaxHp;
  $('#boss-hp-area .progressbar').width(bossHpRate+"%");
  mOverkillBonus.innerHTML = overKillBonus;
  $('#overkill-bonus-area .progressbar').width(overKillBonusRate+"%");
  
  mScheduleText.innerHTML = scheduleText;
  mModeText.innerHTML = modeText;
  // OverKill
  if(bossHp == 0) {
    $(mOverkillScoreArea).removeClass("hide");
  }
  else {
    $(mOverkillScoreArea).addClass("hide");
  }
}

function clean_data() {
  
}