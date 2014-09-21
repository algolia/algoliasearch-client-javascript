describe('Algolia', function () {

  it('should found environment variables', function() {
    expect(ALGOLIA_APPLICATION_ID).toBeDefined();
    expect(ALGOLIA_API_KEY).toBeDefined();
  });

  var client = new AlgoliaSearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY, 'https');

  it('should be able to clear/add/search', function() {
    var complete = false;
    runs(function() {
      var index = client.initIndex('cities_js');
      console.info("init index");
      index.clearIndex(function(success, content) {
        console.info("clear index");
        expect(success).toBe(true);
        index.addObject({ name: 'San Francisco' }, function(success, content) {
          console.info("add object");
          expect(success).toBe(true);
          expect(content.taskID).toBeDefined();
          index.waitTask(content.taskID, function(success, content) {
            console.info("wait");
            expect(success).toBe(true);
            index.search('san', function(success, content) {
              console.info("search");
              expect(success).toBe(true);
              expect(content.hits.length).toBe(1);
              expect(content.hits[0].name).toBe('San Francisco');
              complete = true;
            });
          });
        });
      });
    });
    waitsFor(function() {
      return complete;
    }, 'ajax', 10000);
    runs(function() {
      expect(complete).toBe(true);
    });
  });

  it('should encode the extra security tagFilters', function() {
    var securedClient = new AlgoliaSearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY, 'https');
    securedClient.setSecurityTags('public');
    expect(securedClient.tagFilters).toBe('public');
  });

  it('should encode the extra security tagFilters complex', function() {
    var securedClient = new AlgoliaSearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY, 'https');
    securedClient.setSecurityTags(['public', ['user1', 'user2'], 'foo']);
    expect(securedClient.tagFilters).toBe('public,(user1,user2),foo');
  });

  it('should set the UserToken header', function() {
    var securedClient = new AlgoliaSearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY, 'https');
    securedClient.setUserToken('user_42');
    expect(securedClient.userToken).toBe('user_42');
  });

});
