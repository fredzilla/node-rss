/*
    use nodeunit to run tests.
*/

var RSS = require('../lib/rss');


module.exports = {

    'empty feed': function(test) {
        var feed = new RSS();
        test.equal(feed.xml(), '<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://github.com/dylan/node-rss</link><generator>NodeJS RSS Module</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate></channel></rss>');
        feed.item();
        test.equal(feed.xml(), '<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://github.com/dylan/node-rss</link><generator>NodeJS RSS Module</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><item><title><![CDATA[No title]]></title><guid isPermaLink="false">No title</guid></item></channel></rss>');
        test.done();
    },

    'easy test': function(test) {
        var feed = new RSS({
                    title: 'title',
                    description: 'description',
                    feed_url: 'http://example.com/rss.xml',
                    site_url: 'http://example.com',
                    image_url: 'http://example.com/icon.png',
                    author: 'Dylan Greene',
                    categories: ['Category 1','Category 2','Category 3'],
                    pubDate: 'May 20, 2012 04:00:00 GMT',
                    docs: 'http://example.com/rss/docs.html',
                    copyright: '2013 Dylan Green',
                    language: 'en',
                    managingEditor: 'Dylan Green',
                    webMaster: 'Dylan Green',
                    ttl: '60'
                });

        feed.item({
                    title:  'item 1',
                    description: 'description 1',
                    url: 'http://example.com/article1',
                    date: 'May 24, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 2',
                    description: 'description 2',
                    url: 'http://example.com/article2',
                    date: 'May 25, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 3',
                    description: 'description 3',
                    url: 'http://example.com/article3',
                    guid: 'item3',
                    date: 'May 26, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 4 & html test with <strong>',
                    description: 'description 4 uses some <strong>html</strong>',
                    url: 'http://example.com/article4?this&that',
                    author: 'Guest Author',
                    date: 'May 27, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 5 & test for categories',
                    description: 'description 5',
                    url: 'http://example.com/article5',
                    categories: ['Category 1','Category 2','Category 3','Category 4'],
                    author: 'Guest Author',
                    date: 'May 28, 2012 04:00:00 GMT'
                });

        var expectedResult = '<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[title]]></title><description><![CDATA[description]]></description><link>http://example.com</link><image><url>http://example.com/icon.png</url><title>title</title><link>http://example.com</link></image><generator>NodeJS RSS Module</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><atom:link href="http://example.com/rss.xml" rel="self" type="application/rss+xml"/><author><![CDATA[Dylan Greene]]></author><pubDate>Sun, 20 May 2012 04:00:00 GMT</pubDate><copyright><![CDATA[2013 Dylan Green]]></copyright><language><![CDATA[en]]></language><managingEditor><![CDATA[Dylan Green]]></managingEditor><webMaster><![CDATA[Dylan Green]]></webMaster><docs>http://example.com/rss/docs.html</docs><ttl>60</ttl><category><![CDATA[Category 1]]></category><category><![CDATA[Category 2]]></category><category><![CDATA[Category 3]]></category><item><title><![CDATA[item 1]]></title><description><![CDATA[description 1]]></description><link>http://example.com/article1</link><guid isPermaLink="true">http://example.com/article1</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Thu, 24 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 2]]></title><description><![CDATA[description 2]]></description><link>http://example.com/article2</link><guid isPermaLink="true">http://example.com/article2</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Fri, 25 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 3]]></title><description><![CDATA[description 3]]></description><link>http://example.com/article3</link><guid isPermaLink="false">item3</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Sat, 26 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 4 & html test with <strong>]]></title><description><![CDATA[description 4 uses some <strong>html</strong>]]></description><link>http://example.com/article4?this&amp;that</link><guid isPermaLink="true">http://example.com/article4?this&amp;that</guid><dc:creator><![CDATA[Guest Author]]></dc:creator><pubDate>Sun, 27 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 5 & test for categories]]></title><description><![CDATA[description 5]]></description><link>http://example.com/article5</link><guid isPermaLink="true">http://example.com/article5</guid><category><![CDATA[Category 1]]></category><category><![CDATA[Category 2]]></category><category><![CDATA[Category 3]]></category><category><![CDATA[Category 4]]></category><dc:creator><![CDATA[Guest Author]]></dc:creator><pubDate>Mon, 28 May 2012 04:00:00 GMT</pubDate></item></channel></rss>';
        var result = feed.xml();

        test.equal(result.length, expectedResult.length);
        test.equal(result, expectedResult);
        test.done();
    },

    'easy test without image_url': function(test) {
        var feed = new RSS({
                    title: 'title',
                    description: 'description',
                    feed_url: 'http://example.com/rss.xml',
                    site_url: 'http://example.com',
                    author: 'Dylan Greene',
                    categories: ['Category 1','Category 2','Category 3'],
                    pubDate: 'May 20, 2012 04:00:00 GMT',
                    docs: 'http://example.com/rss/docs.html',
                    copyright: '2013 Dylan Green',
                    language: 'en',
                    managingEditor: 'Dylan Green',
                    webMaster: 'Dylan Green',
                    ttl: '60'
                });

        feed.item({
                    title:  'item 1',
                    description: 'description 1',
                    url: 'http://example.com/article1',
                    date: 'May 24, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 2',
                    description: 'description 2',
                    url: 'http://example.com/article2',
                    date: 'May 25, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 3',
                    description: 'description 3',
                    url: 'http://example.com/article3',
                    guid: 'item3',
                    date: 'May 26, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 4 & html test with <strong>',
                    description: 'description 4 uses some <strong>html</strong>',
                    url: 'http://example.com/article4?this&that',
                    author: 'Guest Author',
                    date: 'May 27, 2012 04:00:00 GMT'
                })
            .item({
                    title:  'item 5 & test for categories',
                    description: 'description 5',
                    url: 'http://example.com/article5',
                    categories: ['Category 1','Category 2','Category 3','Category 4'],
                    author: 'Guest Author',
                    date: 'May 28, 2012 04:00:00 GMT'
                });

        var expectedResult = '<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[title]]></title><description><![CDATA[description]]></description><link>http://example.com</link><generator>NodeJS RSS Module</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><atom:link href="http://example.com/rss.xml" rel="self" type="application/rss+xml"/><author><![CDATA[Dylan Greene]]></author><pubDate>Sun, 20 May 2012 04:00:00 GMT</pubDate><copyright><![CDATA[2013 Dylan Green]]></copyright><language><![CDATA[en]]></language><managingEditor><![CDATA[Dylan Green]]></managingEditor><webMaster><![CDATA[Dylan Green]]></webMaster><docs>http://example.com/rss/docs.html</docs><ttl>60</ttl><category><![CDATA[Category 1]]></category><category><![CDATA[Category 2]]></category><category><![CDATA[Category 3]]></category><item><title><![CDATA[item 1]]></title><description><![CDATA[description 1]]></description><link>http://example.com/article1</link><guid isPermaLink="true">http://example.com/article1</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Thu, 24 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 2]]></title><description><![CDATA[description 2]]></description><link>http://example.com/article2</link><guid isPermaLink="true">http://example.com/article2</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Fri, 25 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 3]]></title><description><![CDATA[description 3]]></description><link>http://example.com/article3</link><guid isPermaLink="false">item3</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Sat, 26 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 4 & html test with <strong>]]></title><description><![CDATA[description 4 uses some <strong>html</strong>]]></description><link>http://example.com/article4?this&amp;that</link><guid isPermaLink="true">http://example.com/article4?this&amp;that</guid><dc:creator><![CDATA[Guest Author]]></dc:creator><pubDate>Sun, 27 May 2012 04:00:00 GMT</pubDate></item><item><title><![CDATA[item 5 & test for categories]]></title><description><![CDATA[description 5]]></description><link>http://example.com/article5</link><guid isPermaLink="true">http://example.com/article5</guid><category><![CDATA[Category 1]]></category><category><![CDATA[Category 2]]></category><category><![CDATA[Category 3]]></category><category><![CDATA[Category 4]]></category><dc:creator><![CDATA[Guest Author]]></dc:creator><pubDate>Mon, 28 May 2012 04:00:00 GMT</pubDate></item></channel></rss>';
        var result = feed.xml();

        test.equal(result.length, expectedResult.length);
        test.equal(result, expectedResult);
        test.done();
    },

    'test with enclosure' : function(test) {
        var feed = new RSS({
            title: 'title',
            description: 'description',
            feed_url: 'http://example.com/rss.xml',
            site_url: 'http://example.com',
            author: 'Dylan Greene'
        });

        feed.item({
            title:  'item 1',
            description: 'description 1',
            url: 'http://example.com/article1',
            date: 'May 24, 2012 04:00:00 GMT',
            enclosure : 'incorrect value'
        });

        feed.item({
            title:  'item 2',
            description: 'description 2',
            url: 'http://example.com/article1',
            date: 'May 24, 2012 04:00:00 GMT',
            enclosure : {url: '/media/some-file.flv'}
        });

        feed.item({
            title:  'item 3',
            description: 'description 3',
            url: 'http://example.com/article1',
            date: 'May 24, 2012 04:00:00 GMT',
            enclosure : {url: '/media/image.png', file : __dirname+'/image.png'}
        });

        var expectedResult = '<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[title]]></title><description><![CDATA[description]]></description><link>http://example.com</link><generator>NodeJS RSS Module</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><atom:link href="http://example.com/rss.xml" rel="self" type="application/rss+xml"/>'+
                                    '<author><![CDATA[Dylan Greene]]></author>' +
                                    '<item><title><![CDATA[item 1]]></title><description><![CDATA[description 1]]></description><link>http://example.com/article1</link><guid isPermaLink="true">http://example.com/article1</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Thu, 24 May 2012 04:00:00 GMT</pubDate></item>'+
                                    '<item><title><![CDATA[item 2]]></title><description><![CDATA[description 2]]></description><link>http://example.com/article1</link><guid isPermaLink="true">http://example.com/article1</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Thu, 24 May 2012 04:00:00 GMT</pubDate><enclosure url="/media/some-file.flv" length="0" type="video/x-flv"/></item>'+
                                    '<item><title><![CDATA[item 3]]></title><description><![CDATA[description 3]]></description><link>http://example.com/article1</link><guid isPermaLink="true">http://example.com/article1</guid><dc:creator><![CDATA[Dylan Greene]]></dc:creator><pubDate>Thu, 24 May 2012 04:00:00 GMT</pubDate><enclosure url="/media/image.png" length="16650" type="image/png"/></item>'+
                                '</channel></rss>';
        var result = feed.xml();

        test.equal(result.length, expectedResult.length);
        test.equal(result, expectedResult);
        test.done();
    }
};

