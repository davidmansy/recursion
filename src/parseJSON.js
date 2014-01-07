// this is what you would do if you were one to do things the easy way: 2
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
//****************************************************************************
// Well the program hereunder is LARGELY inspired by the solution described in 
// http://oreilly.com/javascript/excerpts/javascript-good-parts/json.html
// So I feel like I cheated for this one.
// But difficult not to cheat when you have access to the solution.
// I am sure I would not have found the solution for numbers with exponent
// and special characters
//****************************************************************************

var parseJSON = function (json) {
  // your code goes here
  var at; // The index of the current character
  var ch; // The current character
  var escapee = {
  	'"':  '"',
  	'\\': '\\',
	  '/':  '/',
	  b:    'b',
	  f:    '\f',
	  n:    '\n',
	  r:    '\r',
	  t:    '\t'
  };

	// Utility function to throw an error when something is wrong
	var error = function (m) {

	  throw {
	       name:    'SyntaxError',
	       message: m,
	       at:      at,
	       text:    json
	  };
  };

  //Utility function to move to the next character
	var next = function (c) {

  	// If a c parameter is provided, verify that it matches the current character.
  	//This check enables to find badly formatted strings e.g. when dealing with array, after a value you expect a ",".
  	//So in this case, you call next to get the current character and pass ",", if the next character is not ",", it means the array is not
  	//well formatted -> error
	  if (c && c !== ch) {
	    error("Expected '" + c + "' instead of '" + ch + "'");
	  }

	 	// Get the next character. When there are no more characters,
		// return the empty string.
		ch = json.charAt(at);
		at += 1;
		return ch;
	};

	//Utility function moving to the next character as long as a whitespace is met
	var white = function () {

		while (ch && ch <= ' ') {
		   next();
		}
	};

	//NUMBER
	//Utility function to parse the characters and return a number
	var number = function () {

		var number;
		var string = '';

		if (ch === '-') {
			string = '-';
			next('-');
		}

		while (ch >= '0' && ch <= '9') {
		  string += ch;
		  next();
		}

		if (ch === '.') {
		  string += '.';
		  while (next() && ch >= '0' && ch <= '9') {
		    string += ch;
		  }
		}

		if (ch === 'e' || ch === 'E') {
		  string += ch;
		  next();
		  if (ch === '-' || ch === '+') {
		    string += ch;
		    next();
		  }
		  while (ch >= '0' && ch <= '9') {
		    string += ch;
		    next();
		  }
		}

		number = +string;
		if (isNaN(number)) {
		  error("Bad number");
		} else {
		  return number;
		}
	};

	//STRING
	//Utility function to parse the characters and return a string
	var string = function () {

	  var hex;
	  var i;
	  var string = '';
	  var uffff;

  	// When parsing for string values, we must look for " and \ characters.
		if (ch === '"') {
			while (next()) {
				//If meeting a ", it means the string is finished
				if (ch === '"') {
					next();
					return string;
				//If meeting \\, it means we must deal with a special character
				} else if (ch === '\\') {
					next();
					if (ch === 'u') {
						uffff = 0;
						for (i = 0; i < 4; i += 1) {
						  hex = parseInt(next(), 16);
						  if (!isFinite(hex)) {
						    break;
						  }
						  uffff = uffff * 16 + hex;
						}
						string += String.fromCharCode(uffff);
					} else if (typeof escapee[ch] === 'string') {
					  string += escapee[ch];
					} else {
					  break;
					}
				//In the other cases, keep on storing the characters to build the string
				} else {
				  string += ch;
				}
			}
		}
		//If function string was called while ch is not ", we have a bad string
		error("Bad string");
	};

	//BOOLEAN AND NULL
	//Utility function to parse the characters and return true, false or null
	var word = function () {

		switch (ch) {
		case 't':
			next('t');
			next('r');
			next('u');
			next('e');
			return true;
		case 'f':
			next('f');
			next('a');
			next('l');
			next('s');
			next('e');
			return false;
		case 'n':
			next('n');
			next('u');
			next('l');
			next('l');
			return null;
		}
		error("Unexpected '" + ch + "'");
	};

	//ARRAY
	//Utility function to parse the characters and return an array
	var array = function () {

		var array = [];

		if (ch === '[') {
			next('[');
			white();
			if (ch === ']') {
			  next(']');
			  return array;   // empty array
			}
			while (ch) {
				//What follows is an array content so a sequence of values separated by ','. As each value can be anything, we recursively call value()
				array.push(value());
				white();
				if (ch === ']') {
				  next(']');
				  return array;
				}
				//By calling next with "," as parameter, we check that the array is well formatted i.e. a "," always follows a value
				next(',');
				white();
			}
		}
		error("Bad array");
	};

	//OBJECT
	//Utility function to parse the characters and return an object
	var object = function () {

		var key;
		var object = {};

		if (ch === '{') {
			//What is hereunder follows an object structure with string : value
			next('{');
			white();
			if (ch === '}') {
			  next('}');
			  return object;   // empty object
			}
			while (ch) {
			  key = string();
			  white();
			  next(':');
			  //What follows : is a value and to determine what it is, recursive call to value()
			  object[key] = value();
			  white();
			  if (ch === '}') {
			    next('}');
			    return object;
			  }
			  next(',');
			  white();
			}
		}
		error("Bad object");
	};

	//Utility function to parse a character and determines if what follows is an object, an array, a string or a number or a word
	//Based on this, the function call another function responsible to handle the expected found type
	var value = function () {

		white();
		switch (ch) {
		case '{':
		  return object();
		case '[':
		  return array();
		case '"':
		  return string();
		case '-':
		  return number();
		default:
		  return ch >= '0' && ch <= '9' ? number() : word();
		}
	};

	//MAIN
	//Main program
	at = 0;
	ch = ' ';
	//This simple line starts the whole process!
	var result = value();
	white();
	if (ch) {
	  error("Syntax error");
	}
	return result;

};
