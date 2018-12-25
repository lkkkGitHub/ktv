var tools1 = (function() {
	var toolsObj1 = {
		$: function(selector, context) {
			context = context || document;
			if(selector.indexOf(" ") !== -1) {
				return context.querySelectorAll(selector);
			} else if(selector.charAt(0) === "#") {
				return document.getElementById(selector.slice(1))
			} else if(selector.charAt(0) === ".") {
				return context.getElementsByClassName(selector.slice(1));
			} else {
				return context.getElementsByTagName(selector);
			}
		},
		addEvent: function(ele, eventName, eventFn) {
			ele.addEventListener(eventName, eventFn, false);
		},
		removeEvent: function(ele, eventName, eventFn) {
			ele.removeEventListener(eventName, eventFn, false);
		},
		addClass: function(element, clsNames) {
			if(typeof clsNames === "string") {
				if(!tools1.hasClass(element, clsNames)) {
					element.className += " " + clsNames;
				}
			}
		},
		removeClass: function(element, clsNames) {
			var classNameArr = element.className.split(" ");
			for(var i = 0; i < classNameArr.length; i++) {
				if(classNameArr[i] === clsNames) {
					classNameArr.splice(i, 1);
					i--;
				}
			}
			element.className = classNameArr.join(" ");
		},
		hasClass: function(ele, classNames) {
			var classNameArr = ele.className.split(" ");
			for(var i = 0; i < classNameArr.length; i++) {
				if(classNameArr[i] === classNames) {
					return true;
				}
			}
			return false;
		},
		toggleClass: function(ele, classNames) {
			if(tools1.hasClass(ele, classNames)) {
				tools1.removeClass(ele, classNames);
				return false;
			} else {
				tools1.addClass(ele, classNames);
				return true;
			}
		},
		parents: function(obj, selector) {
			if(selector.charAt(0) === "#") {
				while(obj.id !== selector.slice(1)) {
					obj = obj.parentNode;
				}
			} else if(selector.charAt(0) === ".") {
				while((obj && obj.nodeType !== 9) && !tools1.hasClass(obj, selector.slice(1))) {
					obj = obj.parentNode;
				}
			} else {
				while(obj && obj.nodeType !== 9 && obj.nodeName.toLowerCase() !== selector) {
					obj = obj.parentNode;
				}
			}
			return obj && obj.nodeType === 9 ? null : obj;
		},
		each: function(obj, callBack) {
			for(var i = 0; i < obj.length; i++) {
				callBack(obj[i], i);
			}
		},
		getEleRect: function(obj) {
			return obj.getBoundingClientRect();
		},
		collisionRect: function(obj1, obj2) {
			var obj1Rect = tools1.getEleRect(obj1);
			var obj2Rect = tools1.getEleRect(obj2);
			var obj1W = obj1Rect.width;
			var obj1H = obj1Rect.height;
			var obj1L = obj1Rect.left;
			var obj1T = obj1Rect.top;
			var obj2W = obj2Rect.width;
			var obj2H = obj2Rect.height;
			var obj2L = obj2Rect.left;
			var obj2T = obj2Rect.top;
			if(obj1W + obj1L > obj2L && obj1T + obj1H > obj2T && obj1L < obj2L + obj2W && obj1T < obj2T + obj2H) {
				return true
			} else {
				false;
			}
		},
		store: function(namespace, data) {
			if(data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}
			var store = localStorage.getItem(namespace);
			return(store && JSON.parse(store)) || [];
		},
		extend: function(obj) {
			var newArr = obj.constructor === Array ? [] : {};
			for(var attr in obj) {
				if(typeof obj[attr] === "object") {
					newArr[attr] = tools1.extend(obj[attr]);
				} else {
					newArr[attr] = obj[attr];
				}
			}
			return newArr;
		},
		hide: function(element) {
			return element.style.display = "none";
		},
		show: function(element) {
			return element.style.display = "block";
		},
		getOffset: function(obj) {
			return {
				width: obj.offsetWidth,
				height: obj.offsetHeight
			}
		},
		insertBefore: function(newElem, parentNode) {
			if(parentNode.firstElementChild) {
				parentNode.insertBefore(newElem, parentNode.firstElementChild);
			} else {
				parentNode.appendChild(newElem);
			}
		}
	}
	return toolsObj1;
}())