// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  var result = [];

  var getElements = function(element) {
  	var elementClasses = element.classList;
	if(elementClasses && elementClasses.contains(className)) {
		result.push(element);
	}
  	if (element.hasChildNodes()) {
  		_.each(element.childNodes, function(child) {
  			getElements(child);
  		});
  	}
  }
  getElements(document.body)

  return result;
};