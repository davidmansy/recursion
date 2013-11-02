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
      console.log("We have an object!");
      console.log(obj);
      if (obj === null) {
        return 'null';
      } else if (Object.keys(obj).length === 0) {
        return '{}';
      } else {
        var result = '{';
        for (var prop in obj) {
          if (result != '{') {
            result += ',';
          }
          result += stringifyJSON(prop) + ':' + stringifyJSON(obj[prop]);
        }
        return result + '}';
      }
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
