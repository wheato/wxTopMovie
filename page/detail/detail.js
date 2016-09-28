
var movieData = {};

var movieId = null,
    isReady = false;

var pageData = {

    data: {
        movie: {},
        hidden: false
    },

    onLoad: function (options) {
        var that = this;

        wx.setNavigationBarTitle({
            title: ""
        });

        that.setData({
            hidden: false
        });

        movieId = options.id;
        
        wx.request({
            url: 'https://api.douban.com/v2/movie/subject/' + movieId,
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
                    movie: movieData,
                    hidden: true
                });

                if(isReady){
                    wx.setNavigationBarTitle({
                        title: movieData['title'],
                        complete: function (){
                            console.log('set Title');
                        }
                    });
                }
            }
        });

    },

    onReady: function () {

        if(movieData['title']){
            wx.setNavigationBarTitle({
                title: movieData['title'],
                complete: function (){
                    console.log('set Title');
                }
            });
        } else {
            isReady = !isReady;
        }

    },

    onShow: function () {

    },
    onUnload: function () {
        isReady = false;
        movieData = {};
    }
};

Page(pageData);