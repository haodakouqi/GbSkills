// import Vue from 'vue'
export default {
    /*
    * 获得当前时间
    * return 中国标准时间 */
    getNowFormatDate() {
        var date = new Date()
        var seperator1 = '/'
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
            month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
    }
}
