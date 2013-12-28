// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {

  //Error object that will be thrown if a weird obj is met
  var WeirdObjectError = new Error('Weird');

  //Utility function to stringify an object and to catch any WeirdObjectError
  var stringifyObject = function(obj) {
    try {
      var arrayString = [];
      for (var prop in obj) {
        var str = stringifyJSON(prop) + ':' + stringifyJSON(obj[prop]);
        arrayString.push(str);
      }
      return '{' + arrayString.join(',') + '}';          
    } catch(WeirdObjectError) {
      //If we catch any WeirdObjectError -> return an empty object
      return '{}';
    }
  }

  //Utility function to stringify an array
  var stringifyArray = function(arr) {
    //Using array.join enables to deal with an empty array or a filled in array
    var arrayString = arr.map(function(value) {
      return stringifyJSON(value);
    });
    return '[' + arrayString.join(',') + ']';      
  }

  //NOT VALID JSON:Function, undefined, 'functions' and 'undefined'
  //If a weird object is met, we throw an WeirdObjectError that will be catched by the stringifyObject method -> unwinding the stack
  if (typeof obj === 'function' || typeof obj === 'undefined' || obj === 'functions' || obj === undefined) {
    throw WeirdObjectError;
  //Object, null, array
  } else if (typeof obj === 'object') {
    if (obj === null) {
      return 'null';
    } else if (Array.isArray(obj)) {
      return stringifyArray(obj);
    } else {
      return stringifyObject(obj);
    }
  //Not a string
  } else if (typeof obj != 'string') {
    return String(obj);      
  //String
  } else {
    return '\"' + obj + '\"';
  }

};