/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a defined URL that is not empty', function() {
           allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
           });
         });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a defined name that is not empty', function() {
           allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name).not.toBe('');
           });
         });
    });


    /* Test suite named "The menu" */
    describe('The Menu', function() {
      /* Test that ensures the menu element is
      * hidden by default. You'll have to analyze the HTML and
      * the CSS to determine how we're performing the
      * hiding/showing of the menu element.
      */
      // attribute addMatchers to: https://github.com/velesin/jasmine-jquery/blob/0fb5aead85e25ddd21f9533cff48b06f035cf032/lib/jasmine-jquery.js#L369-L377
      beforeEach(function () {
        jasmine.addMatchers({
          toHaveClass: function () {
            return {
              compare: function (actual, className) {
                return { pass: $(actual).hasClass(className) };
              }
            };
          },
        });
      });

      /* Make sure that .menu-hidden is present when page loads */
      it('has a menu hidden by default', function() {
        expect($('body')).toHaveClass('menu-hidden');
      });

      /* Test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
      it('show menu when hamburger icon is clicked, then hide again on next click', function() {
        var hamburger = $('.menu-icon-link');

        // Click hamburger icon and show menu
        hamburger.click();
        expect($('body')).not.toHaveClass('menu-hidden');

        // Second click on hamburger icon to hide menu
        hamburger.click();
        expect($('body')).toHaveClass('menu-hidden');
      });



    });


    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* Test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */

      /* Create feed that loads asynchrounously */
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      /* Make sure that the feed is not empty */
      it('At least one .entry element present within the .feed container', function(done) {
        var entryArray = $('.entry');
        expect(entryArray.length).toBeGreaterThan(0);
        done();
      });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      /* TODO: Write a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */
      var firstFeed;

      /* Create two feeds to compare with each other */
      beforeEach(function(done) {
        loadFeed(1, function() {
          firstFeed = $('.feed').html();
          loadFeed(2, done);
          done();
        });
      });

      /* Test feeds for change in content */
      it('Content changes when a new feed is loaded', function(done) {
        expect($('.feed')).not.toEqual(firstFeed);
        done();
      });
    });
}());
