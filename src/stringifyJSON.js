// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var counter = 0;

var stringifyJSON = function (obj) {

  counter++;
  console.log('COUNTER: ' + counter);

  //Object or Array
  if (typeof obj === 'object') {
    //Array
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        console.log('empty Array ' + '[]');
        return '[]';
      } else {
        var result = '[';
        obj.forEach(function(value) {
          if (result != '[') {
            result += ',';
          }
          result += stringifyJSON(value);
         });
        console.log('array ' + result + ']');
        return result + ']';
      }
    //Object
    } else {
      //TO BE CONTINUED
    
    }
  //No String
  } else if (typeof obj != 'string') {
    console.log('no string ' + "" + obj);
    return "" + obj;
  //String
  } else {
    console.log('string ' + "\"" + obj + "\"");
    return "\"" + obj + "\"";
  }
};
