var util = require('../../util/util.js');

var current = 0;
var localList = [];

var isLoading = false;

var getData = function () {

    if(isLoading){
        return;
    } else {
        isLoading = true;
    }

    var that = this;

    if(current >= 250){
        return false;
    }

    that.setData({
        hidden: false
    });

    wx.request({
        url: 'https://api.douban.com/v2/movie/top250?start=' + current,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res){
            var renderList = [],
                data = res.data;

            isLoading = false;

            localList = localList.concat(data['subjects']);

            renderList = localList.concat();

            for(var i = 0, len = Math.abs(localList.length % 3 - 3); i < len && len < 3; i++ ){
                renderList.push({});
            }

            that.setData({
                listData: renderList,
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