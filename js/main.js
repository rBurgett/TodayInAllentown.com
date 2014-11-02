/* jshint undef: true, unused: true, strict: true, browser: true, devel: true */
/* global $ */
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
		var count = 0;
		for (i = 0; i < feeds.length; i = i + 1) {
			feed = new google.feeds.Feed(feeds[i]);
			feed.setNumEntries(num);
			feed.includeHistoricalEntries();
			feed.load(function(feedData) {
				if (!feedData.error) {
					for (j = 0; j < feedData.feed.entries.length; j = j + 1) {
						feedsData.push({
							title: feedData.feed.entries[j].title,
							link: feedData.feed.entries[j].link,
							date: feedData.feed.entries[j].publishedDate,
							content: feedData.feed.entries[j].contentSnippet,
						});
					}
					if (count === feeds.length - 1) {
						callback(feedsData);
					}
					count = count + 1;
				}
			});
		}
//		console.log(feedsData);
	}
};
var gFeed = GFeed.create([
		'http://www.wfmz.com/news/news-regional-lehighvalley/132502?format=rss_2.0&view=feed',
		'http://www.mcall.com/news/local/rss2.0.xml',
		'http://blog.lehighvalleylive.com/lvnews_impact/atom.xml'
	]);
//console.log(gFeed.feedList());

$(document).ready(function () {
	'use strict';
	google.setOnLoadCallback(gFeed.getFeeds(20, function (data) {
		console.log(data);
		Handlebars.make({
			'templateId' : 'postTemplate',
			'data' : data,
			'htmlId' : 'postsContainer'
		});
	}));
});