/* Condition Function CreateDate 2017.10.18 Start- jskang */

/**
 * @description 원하는 날짜가 1년중 몇 주차인지 계산해서 반환
 * @param {*} date 특정 날짜
 * @returns 2017년 10주차인 경우, "10" 반환
 * @since 2017. 11. 13
 * @author jskang(강준성)
 */
function specialDateWeeks(date){
  var initialDate = new Date(date);
  var date = new Date('1/1/'+initialDate.getFullYear()); // Full Date
  var day = initialDate.getDay(); // Day of the week Number

  var dateObject = [];
  var flag = true;
  var weeks = 1;

  while(true){
    date = new Date(date.getTime());
    if(date > initialDate){ break; }
    else{
      if(flag){
        date.setTime(date.getTime() + (6-day)*24*60*60*1000);
        flag = !flag;
      }else {
        weeks++;
        date.setTime(date.getTime() + 7*24*60*60*1000);
      }
    }
  }
  return weeks;
}

/**
 * @description new Date()로 생성된 날짜의 포맷을 변경하여 반환
 * @param {*} date new Date()로 생성된 날짜 데이터
 * @returns new Date("20170101")의 포맷인 경우, "2017/01/01" 반환
 * @since 2017. 11. 13
 * @author jskang(강준성)
*/
function dateFormatConvert(date){
  var year = date.getFullYear();
  var month = Number(date.getMonth())+1;
  if(month < 10) { month = "0" + month; }

  var date = date.getDate();
  if(date < 10) { date = "0" + date; }
  return year + "/" + month + "/" + date;
}

/**
 * @description 원하는 날짜부터 오늘 날짜까지 모든 년도별 몇 주차인지 계산한 모든 결과 값 반환
 * @param {*} stringDate 날짜 문자열 데이터 ("2017-01-01")
 * @returns "2017-01-01" 입력한 경우, "2017-1주차 (2017/01/01 ~ 2017/01/07)" 형식으로 오늘 날짜가 나올 때까지 모든 결과 값 반환
 * @since 2017. 11. 13
 * @author jskang(강준성)
*/
var weeksCalc = function(stringDate){
  var initialDate = new Date(stringDate);
  var date = initialDate; // Full Date
  var day = initialDate.getDay(); // Day of the week Number
   
  var dateObject = [];
  var flag = true;
  var weeks = specialDateWeeks(stringDate);
  var oldYear = date.getFullYear();

  while(true){
    var dateJson = { text: "", value: ""};
    var dateText = "";
    date = new Date(date.getTime());

    if(date.getFullYear() > oldYear){ weeks = 1; }
    if(date > new Date()){ break; }
    else{
      oldYear = date.getFullYear();

      if(flag){
        dateText = oldYear + "-" + weeks + "주차 (" + dateFormatConvert(date);
        date.setTime(date.getTime() + (6-day)*24*60*60*1000);
        flag = !flag; weeks++;
      }else {
        dateText = oldYear + "-" + weeks + "주차 (" + dateFormatConvert(date);
        date.setTime(date.getTime() + 7*24*60*60*1000);
        weeks++;
      }

      dateText += "~" + dateFormatConvert(date) + ")";
      dateJson.text = dateText;
      dateJson.value = dateText;
      dateObject.push(dateJson);
    }
  }

  return dateObject;
}

/**
 * @description 원하는 날짜가 몇 년도의 몇 월인지 계산
 * @param {*} date new Date()로 생성된 날짜 데이터
 * @returns 2017년 1월인 경우, "2017/01" 반환
 * @since 2017. 11. 13
 * @author jskang(강준성)
*/
function splitMonth(date){
    var year = date.getFullYear();
    var month = Number(date.getMonth())+1;
    if(month < 10){ month = "0" + month; }
    return year + "/" + month;
}

/**
 * @description 원하는 날짜부터 오늘 날짜까지 모든 년도별 몇 월인지 계산한 모든 결과 값 반환
 * @param {*} date 날짜 문자열 데이터 ("2017-01-01")
 * @returns "2017-01-01" 입력한 경우, "2017/01" 형식으로 오늘 날짜가 나올 때까지 모든 결과 값 반환
 * @since 2017. 11. 13
 * @author jskang(강준성)
*/
var monthsCalc = function(stringDate){
    var initialDate = new Date(stringDate);
    var date = initialDate; // Full Date
    var dataObject = [];
  
    while(true){
        var dateJson = { text: "", value: ""};
        date = new Date(date.getTime());
        if(date > new Date()){ break; }
        else{
            dateJson.text = splitMonth(date); dateJson.value = splitMonth(date);
            dataObject.push(dateJson);
            date.setTime(date.getTime() + (new Date(date.getFullYear(), Number(date.getMonth())+1, 0).getDate())*24*60*60*1000);
        }
    }
    return dataObject;
}

/**
 * @description 원하는 날짜부터 오늘 날짜까지 모든 년도별 결과 값 반환
 * @param {*} date 날짜 문자열 데이터 ("2017-01-01")
 * @returns "2017-01-01" 입력한 경우, "2017" 형식으로 오늘 날짜가 나올 때까지 모든 결과 값 반환
 * @since 2017. 11. 13
 * @author jskang(강준성)
*/
var yearsCalc = function(stringDate){
    var initialDate = new Date(stringDate);
    var date = initialDate; // Full Date
    var dataObject = [];
  
    while(true){
        date = new Date(date.getTime());
        if(date > new Date()){ break; }
        else{
            dataObject.push({ text: date.getFullYear(), value: date.getFullYear() });
            date.setTime(date.getTime() + 365*24*60*60*1000);
        }
    }
    return dataObject;
}