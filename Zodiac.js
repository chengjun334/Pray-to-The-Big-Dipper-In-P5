; (function (window) {

  /**
   * 生肖构造函数，默认参数是当前日期
   * @param {Number} year 年
   * @param {Number} month 月
   * @param {Number} day 日
   */
  function Zodiac(year, month, day) {
    var date = new Date();
    this.year = year * 1 || date.getFullYear();
    this.month = month * 1 || date.getMonth();
    this.day = day * 1 || date.getDate();
  }

  Zodiac.constructor = Zodiac;

  /**
  * 获取C值
  * @return {Number} C
  */
  Zodiac.prototype.getC = function () {
    var _year = Math.floor(this.year / 100) + 1;
    var C;

    switch (_year) {
      case 20:
        C = 4.6295;
        break;
      case 21:
        C = 3.87;
        break;
      case 22:
        C = 4.15;
        break;
      default:
        C = 3.87;
    }
    return C;
  }

  /**
   * 获取立春日 一般都在2月
   * @return {Number} springDay
   */
  Zodiac.prototype.getSpringDay = function () {
    var Y = this.year % 100,
      D = 0.2422,
      C = this.getC(),
      L = (Y - 1) / 4,
      springDay = 0;
    springDay = Math.floor(Y * D + C) - Math.floor((Y - 1) / 4);
    return springDay;
  }
  /**
   * 获取生肖
   * @return {String} myZodiac
   */
  Zodiac.prototype.getZodiac = function () {
    var year = this.year,
      month = this.month,
      day = this.day,
      zodiac = [
        { id: 0, name: '子鼠' },
        { id: 1, name: '丑牛' },
        { id: 2, name: '寅虎' },
        { id: 3, name: '卯兔' },
        { id: 4, name: '辰龙' },
        { id: 5, name: '巳蛇' },
        { id: 6, name: '午马' },
        { id: 7, name: '未羊' },
        { id: 8, name: '申猴' },
        { id: 9, name: '酉鸡' },
        { id: 10, name: '戌狗' },
        { id: 11, name: '亥猪' }
      ],
      myPos = (year - 1900) % 12,
      myZodiac = zodiac[myPos];
      springDay = this.getSpringDay();
      switch (month) {
      case 1:
        var _myPos = myPos - 1;
        if (_myPos < 0) {
          _myPos = 11;
        }
        myZodiac = zodiac[_myPos];
        break;
      case 2:
        if (day < springDay) {
          var _myPos = myPos - 1;
          if (_myPos < 0) {
            _myPos = 11;
          }
          myZodiac = zodiac[_myPos];
        }
        break;
      }
    return myZodiac;
  }

  window.Zodiac = Zodiac;
})(window);
