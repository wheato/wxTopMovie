
var movieData = {};

var pageData = {

    data: {
        movie: {}
    },

    onLoad: function (options) {

        var that = this;

        wx.request({
            url: 'https://api.douban.com/v2/movie/subject/' + options.id,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                var data = res.data;

                movieData = {
                  'title': data['title'],
                  'average': data['rating']['average'],
                  'image': data['images']['medium']
                };

                that.setData({
                    movie: movieData
                });
            }
        });

    },

    onReady: function () {
        wx.setNavigationBarTitle({
            title: movieData['title']
        });
    }
};

Page(pageData);