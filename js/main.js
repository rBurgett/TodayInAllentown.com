/* jshint loopfunc: true, undef: true, unused: true, browser: true, devel: true */
/* global $, Handlebars, google */

$('#jsnote').hide();

Handlebars.Utils.extend(Handlebars, {
    make: function(d) {
        var templateSrc = document.getElementById(d.templateId).innerHTML;
        var compiledTemplate = Handlebars.compile(templateSrc);
        var output = compiledTemplate(d.data);
        document.getElementById(d.htmlId).innerHTML = output;
    }
});
Handlebars.registerHelper('date', function(rawDate) {
	var formattedDate = new Date(rawDate).toLocaleString();
	return formattedDate;
});

google.load("feeds", "1");
var GFeed = {
	_feedList : [],
	create : function (feedsArray) {
		'use strict';
		return Object.create(GFeed).init(feedsArray);
	},
	init : function(feedsArray) {
		'use strict';
		this._feedList = feedsArray || [];
		return this;
	},
	feedList : function () {
		'use strict';
		return this._feedList;
	},
	addFeed : function (feed) {
		'use strict';
		this._feedList.push(feed);
	},
	getFeeds : function (num, callback) {
		'use strict';
		var feeds = this._feedList;
		var feed;
		var feedsData = [];
		var i;
		var j;
		var feedImage;
		var feedClass;
		var count = 0;
		for (i = 0; i < feeds.length; i = i + 1) {
			feed = new google.feeds.Feed(feeds[i]);
			feed.setNumEntries(num);
			feed.includeHistoricalEntries();
			feed.load(function(feedData) {
				if (!feedData.error) {
					if (/wfmz/.test(feedData.feed.entries[0].link)) {
						feedImage = 'wfmz.png';
						feedClass = 'wfmz';
					}
					if (/mcall/.test(feedData.feed.entries[0].link)) {
						feedImage = 'mcall.jpeg';
						feedClass = 'mcall';
					}
					if (/lehighvalleylive/.test(feedData.feed.entries[0].link)) {
						feedImage = 'lvl.gif';
						feedClass = 'lvl';
					}
					for (j = 0; j < feedData.feed.entries.length; j = j + 1) {
						var date = new Date(feedData.feed.entries[j].publishedDate).getTime();
						feedsData.push({
							title: feedData.feed.entries[j].title,
							link: feedData.feed.entries[j].link,
							date: date,
							content: feedData.feed.entries[j].contentSnippet,
							image: feedImage,
							feedClass: feedClass
						});
					}
					if (count === feeds.length - 1) {
						var sortedData = feedsData.sort(function(a,b){return b.date-a.date;});
						callback(sortedData);
					}
					count = count + 1;
				}
			});
		}
	}
};
var gFeed = GFeed.create([
		'http://www.wfmz.com/news/news-regional-lehighvalley/132502?format=rss_2.0&view=feed',
		'http://www.mcall.com/news/local/rss2.0.xml',
		'http://blog.lehighvalleylive.com/lvnews_impact/atom.xml'
	]);

$(document).ready(function () {
	'use strict';
	google.setOnLoadCallback(gFeed.getFeeds(20, function (data) {
		Handlebars.make({
			'templateId' : 'postTemplate',
			'data' : data,
			'htmlId' : 'postsContainer'
		});
	}));
});