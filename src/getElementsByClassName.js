// If life was easy, we could just do things the easy way:
//var getElementsByClassName = function (className) {
//  return document.getElementsByClassName(className);
//};

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  var result = [];

  var parseElements = function (children) {

	  for (var i = 0; i < children.length; i++) {
	  	var childClasses = children[i].classList;
	  	if (childClasses && childClasses.contains(className)) {
	  		result.push(children[i]);
	  	}
	  	if (children[i].hasChildNodes()) {
	  		parseElements(children[i].childNodes);
	  	}
	  }
  }

  if (document.body.hasChildNodes()) {
  	parseElements(document.body.childNodes);
  }

  return result;
};
