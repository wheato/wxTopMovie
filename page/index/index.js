var util = require('../../util/util.js');

var current = 0;
var localList = [];

var getData = function () {
    var that = this;
    if(current >= 250){
        return false;
    }
    util.ajax({
        url: 'https://api.douban.com/v2/movie/top250?start=' + current,
        success: function(data){
            data = JSON.parse(data);

            localList = localList.concat(data['subjects']);

            that.setData({
                listData: localList,
                hidden: true
            });

            current += data['count'];
        }
    });
};
var pageData = {
    data: {
        title: "",
        listData: "",
        hidden: false
    },
    onLoad: function(options) {

        getData.apply(this);

    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {
        console.log('hide index');
    },
    onUnload: function() {
        // Do something when page close.
    },

    // Event handler.
    viewTap: function(e) {
        console.log(e);
        var itemId = e.currentTarget.dataset['id'];
        var url = '../detail/detail?id=' + itemId;
        wx.navigateTo({url: url});
    },
    getMoreHandler: function(e) {
        getData.apply(this);
    }
};




Page(pageData);