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
	describe("feedList method", function() {
		it("should return the feedList array", function() {
			expect(gFeed.feedList()[0]).toBeTruthy();
		});
	});
	describe("addFeed method", function() {
		it("should add a feed to the feed list", function() {
			var feedLength;
			var lastFeed;
			gFeed.addFeed("here is a new feed");
			feedLength = gFeed.feedList().length;
			lastFeed = feedLength - 1;
			expect(gFeed.feedList()[lastFeed]).toEqual("here is a new feed");
		});
	});
});