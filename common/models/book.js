module.exports = function(Book){
  Book.getBooks=function(bookName,cb){
    Book.find({where:{name:bookName}},function(err,book){
      if(err){
        return cb(err);
      }
      return cb(null,book);
    })
  };
  Book.remoteMethod(
    'getBooks',
    {
      description: 'get books by name',
      accepts: [
        {
          arg: 'bookName',
          type: 'string',
          description: 'name of a book',
          required:true
        }
      ],
      returns: {arg: 'data', type: "object", root: true},
      http: {verb: 'POST', path: '/getBooks'}
    }
  );
};
