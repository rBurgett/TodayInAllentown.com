describe("gFeed object", function() {
	var gFeed;
	beforeEach(function() {
		gFeed = GFeed.create([
			'http://www.wfmz.com/news/news-regional-lehighvalley/132502?format=rss_2.0&view=feed',
			'http://www.mcall.com/news/local/rss2.0.xml',
			'http://blog.lehighvalleylive.com/lvnews_impact/atom.xml'
		]);
	});
    it("should exist", function() {
        expect(gFeed).toBeTruthy();
    });
});