/* jshint undef: true, unused: true, strict: true, browser: true, devel: true */
/* global $ */

var TIA = {
	_feedList : [],
	create : function (feeds) {
		'use strict';
		return Object.create(TIA).init(feeds);
	},
	init : function(feeds) {
		'use strict';
		this._feedList = feeds || [];
		return this;
	},
	addFeed : function (feed) {
		'use strict';
		this._feedList.push(feed);
	},
	feedList : function () {
		'use strict';
		return this._feedList;
	}
};
var tIA = TIA.create([
		'http://www.wfmz.com/news/news-regional-lehighvalley/132502?format=rss_2.0&view=feed',
		'http://www.mcall.com/news/local/rss2.0.xml',
		'http://blog.lehighvalleylive.com/lvnews_impact/atom.xml'
	]);
console.log(tIA.feedList());

$(document).ready(function () {
	'use strict';
	$('#jsnote').hide();
});