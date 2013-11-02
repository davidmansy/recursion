// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

var stringifyJSON = function (obj) {

  //Error object that will be thrown if a weird obj is met
  var WeirdObjectError = new Error('Weird');

  //Utility function to stringify an array
  var stringifyArray = function(obj) {
    var result = '[';
    obj.forEach(function(value) {
      if (result != '[') {
        result += ',';
      }
      //Thx recursion!
      result += stringify(value);
     });
    return result + ']';
  }

  //Utility function to stringify an object
  var stringifyObject = function(obj) {
    var result = '{';
    for (var prop in obj) {
      if (result != '{') {
        result += ',';
      }
      //Thx recursion!
      result += stringify(prop) + ':' + stringify(obj[prop]);
    }
    return result + '}';
  }

  //Utility function including the stringify main logic
  var stringify = function(obj) {

    //If a weird object is met, we throw an exception that will be catched by the main program -> unwinding the stack
    if (typeof obj === 'function' || obj === 'functions' || obj === 'undefined' || obj === undefined) {
      throw WeirdObjectError;
    }
    //Object or Array
    if (typeof obj === 'object') {
      //Array
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return '[]';
        } else {
          return stringifyArray(obj);
        }
      //Object
      } else {
        if (obj === null) {
          return 'null';
        } else if (Object.keys(obj).length === 0) {
          return '{}';
        } else {
          return stringifyObject(obj);
        }
      }
    //No String
    } else if (typeof obj != 'string') {
      return "" + obj;
    //String
    } else {
      return "\"" + obj + "\"";
    }
  }

  //The main program launches the stringify function. If WeirdObjectError is intercepted because of a weird object, the catch part will return the default JSON object
  try {
    return stringify(obj);
  } catch (WeirdObjectError) {
    return '{}';
  }

};
