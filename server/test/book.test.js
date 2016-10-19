var app = require('../server.js');
var assert = require('chai').assert;

var Book = app.models.Book;

function json(verb, url, params, headers) {
  if (params) {
    var queryString = Object.keys(params).reduce(function (a, k) {
      a.push(k + '=' + params[k]);
      return a;
    }, []).join('&');

    url = url + '?' + queryString;
  }

//  console.log('calling [' + verb + '] on [' + url + ']');

  var result = request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);

  if (headers) {
    Object.keys(headers).forEach(function (a, k) {
      result.set(a, headers[a]);
    });
  }

  return result
}

before(function(done){
  Book.destroyAll({name:"abc"},function(err){
    if(err){
      return done(err);
    }
    json('post', '/api/replaceOrCreate',{},{})
      .send({
      "name":"abc",
      "bookId":123,
      "author":"xyz",
      "subject":"science",
      "authorId":1234,
      "publication":"type"
    })
      .expect(200,function(err,res){
        if(err){
          return done(err);
        }
        return done();
      })
  })
});

describe("GET book by name",function(){
  it("it should get book by name",function(done){
    json("GET","api")
  })
});
