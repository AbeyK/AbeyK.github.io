// The MIT License (MIT)

// Tyepd.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


$(document).ready(function () {


});

var experience = {
	page: null,
	resize: null,
	init: function () {
		// SET 
		if ($('#lines').length) {
			this.setLines();
		}
	},
	setLines: function () {
		this.canvas = document.querySelector('canvas');

		var ctx = this.canvas.getContext('2d'),
			color = '#ffffff';
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.style.display = 'block';
		ctx.fillStyle = color;
		ctx.lineWidth = .1;
		ctx.strokeStyle = color;


		this.resize = function () {
			experience.canvas.width = window.innerWidth;
			experience.canvas.height = window.innerHeight;
			ctx.fillStyle = color;
			ctx.lineWidth = .1;
			ctx.strokeStyle = color;
		};

		$(window).on('resize', experience.resize);

		var mousePosition = {
			x: 30 * experience.canvas.width / 100,
			y: 30 * experience.canvas.height / 100
		};
		var dots = {
			nb: experience.canvas.width/4,
			distance: 80,
			d_radius:experience.canvas.width/10,
			array: []
		};
		// console.log(experience.canvas.width);

		function Dot() {
			this.x = Math.random() * experience.canvas.width;
			this.y = Math.random() * experience.canvas.height;
			this.vx = -.5 + Math.random();
			this.vy = -.5 + Math.random();
			this.radius = Math.random();

		}

		Dot.prototype = {
			create: function () {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				ctx.fill();
			}
		};

		Dot.animate = function () {
			var i, dot;

			for (i = 0; i < dots.nb; i++) {
				dot = dots.array[i];

				if (dot.y < 0 || dot.y > experience.canvas.height) {
					dot.vx = dot.vx;
					dot.vy = - dot.vy;
				}
				else if (dot.x < 0 || dot.x > experience.canvas.width) {
					dot.vx = - dot.vx;
					dot.vy = dot.vy;
				}
				dot.x += dot.vx;
				dot.y += dot.vy;
			}
		};

		Dot.line = function () {
			var i, j, i_dot, j_dot;

			for (i = 0; i < dots.nb; i++) {
				for (j = 0; j < dots.nb; j++) {
					i_dot = dots.array[i];
					j_dot = dots.array[j];

					if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
						if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance) {
							ctx.beginPath();
							ctx.moveTo(i_dot.x, i_dot.y);
							ctx.lineTo(j_dot.x, j_dot.y);
							ctx.stroke();
							ctx.closePath();
						}
					}
				}
			}
		};

		function createDots() {
			var i;

			ctx.clearRect(0, 0, experience.canvas.width, experience.canvas.height);

			if (dots.array.length < 1) {
				for (i = 0; i < dots.nb; i++) {
					dots.array.push(new Dot());
				}
			}

			for (i = 0; i < dots.nb; i++) {
				var dot = dots.array[i];
				dot.create();
			}

			Dot.line();
			Dot.animate();
		}

		$('#experience').on('mousemove mouseleave', function (e) {
			if (e.type == 'mousemove') {
				mousePosition.x = e.pageX;
				mousePosition.y = e.pageY;
			}
			if (e.type == 'mouseleave') {
				// mousePosition.x = e.pageX;
				// mousePosition.y = e.pageY;
				mousePosition.x = experience.canvas.width/2;
				mousePosition.y = experience.canvas.height/2;
			}
		});

		this.interval = setInterval(createDots, 1000 / 30);

	},

	destroy: function () {
		if (this.interval) {
			clearInterval(this.interval);
		}
		if (experience.resize) {
			$(window).on('resize', experience.resize);
		}

	}
};

experience.init();


!function ($) {

	"use strict";

	var Typed = function (el, options) {

		// chosen element to manipulate text
		this.el = $(el);
		// options
		this.options = $.extend({}, $.fn.typed.defaults, options);

		// text content of element
		this.text = this.el.text();

		// typing speed
		this.typeSpeed = this.options.typeSpeed;

		// add a delay before typing starts
		this.startDelay = this.options.startDelay;

		// backspacing speed
		this.backSpeed = this.options.backSpeed;

		// amount of time to wait before backspacing
		this.backDelay = this.options.backDelay;

		// input strings of text
		this.strings = this.options.strings;

		// character number position of current string
		this.strPos = 0;

		// current array position
		this.arrayPos = 0;

		// current string based on current values[] array position
		this.string = this.strings[this.arrayPos];

		// number to stop backspacing on.
		// default 0, can change depending on how many chars
		// you want to remove at the time
		this.stopNum = 0;

		// Looping logic
		this.loop = this.options.loop;
		this.loopCount = this.options.loopCount;
		this.curLoop = 1;
		if (this.loop === false) {
			// number in which to stop going through array
			// set to strings[] array (length - 1) to stop deleting after last string is typed
			this.stopArray = this.strings.length - 1;
		}
		else {
			this.stopArray = this.strings.length;
		}

		// All systems go!
		this.build();
	}

	Typed.prototype = {

		constructor: Typed

		, init: function () {
			// begin the loop w/ first current string (global self.string)
			// current string will be passed as an argument each time after this
			var self = this;
			setTimeout(function () {
				// Start typing
				self.typewrite(self.string, self.strPos)
			}, self.startDelay);
		}

		, build: function () {
			// Insert cursor
			this.el.after("<span id=\"typed-cursor\">|</span>");
			this.init();
		}

		// pass current string state to each function
		, typewrite: function (curString, curStrPos) {

			// varying values for setTimeout during typing
			// can't be global since number changes each time loop is executed
			var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
			var self = this;

			// ------------- optional ------------- //
			// backpaces a certain string faster
			// ------------------------------------ //
			// if (self.arrayPos == 1){
			// 	self.backDelay = 50;
			// }
			// else{ self.backDelay = 500; }

			// contain typing function in a timeout
			setTimeout(function () {

				// make sure array position is less than array length
				if (self.arrayPos < self.strings.length) {

					// check for an escape character before a pause value
					if (curString.substr(curStrPos, 1) === "^") {
						var charPauseEnd = curString.substr(curStrPos + 1).indexOf(" ");
						var charPause = curString.substr(curStrPos + 1, charPauseEnd);
						// strip out the escape character and pause value so they're not printed
						curString = curString.replace("^" + charPause, "");
					}
					else {
						var charPause = 0;
					}

					// timeout for any pause after a character
					setTimeout(function () {

						// start typing each new char into existing string
						// curString is function arg
						self.el.text(self.text + curString.substr(0, curStrPos));

						// check if current character number is the string's length
						// and if the current array position is less than the stopping point
						// if so, backspace after backDelay setting
						if (curStrPos > curString.length && self.arrayPos < self.stopArray) {
							clearTimeout(clear);
							var clear = setTimeout(function () {
								self.backspace(curString, curStrPos);
							}, self.backDelay);
						}

						// else, keep typing
						else {
							// add characters one by one
							curStrPos++;
							// loop the function
							self.typewrite(curString, curStrPos);
							// if the array position is at the stopping position
							// finish code, on to next task
							if (self.loop === false) {
								if (self.arrayPos === self.stopArray && curStrPos === curString.length) {
									// animation that occurs on the last typed string
									// fires callback function
									var clear = self.options.callback();
									clearTimeout(clear);
								}
							}
						}

						// end of character pause
					}, charPause);
				}
				// if the array position is greater than array length
				// and looping is active, reset array pos and start over.
				else if (self.loop === true && self.loopCount === false) {
					self.arrayPos = 0;
					self.init();
				}
				else if (self.loopCount !== false && self.curLoop < self.loopCount) {
					self.arrayPos = 0;
					self.curLoop = self.curLoop + 1;
					self.init();
				}

				// humanized value for typing
			}, humanize);

		}

		, backspace: function (curString, curStrPos) {

			// varying values for setTimeout during typing
			// can't be global since number changes each time loop is executed
			var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
			var self = this;

			setTimeout(function () {

				// ----- this part is optional ----- //
				// check string array position
				// on the first string, only delete one word
				// the stopNum actually represents the amount of chars to
				// keep in the current string. In my case it's 14.
				// if (self.arrayPos == 1){
				//	self.stopNum = 14;
				// }
				//every other time, delete the whole typed string
				// else{
				//	self.stopNum = 0;
				// }

				// ----- continue important stuff ----- //
				// replace text with current text + typed characters
				self.el.text(self.text + curString.substr(0, curStrPos));

				// if the number (id of character in current string) is
				// less than the stop number, keep going
				if (curStrPos > self.stopNum) {
					// subtract characters one by one
					curStrPos--;
					// loop the function
					self.backspace(curString, curStrPos);
				}
				// if the stop number has been reached, increase
				// array position to next string
				else if (curStrPos <= self.stopNum) {
					clearTimeout(clear);
					var clear = self.arrayPos = self.arrayPos + 1;
					// must pass new array position in this instance
					// instead of using global arrayPos
					self.typewrite(self.strings[self.arrayPos], curStrPos);
				}

				// humanized value for typing
			}, humanize);

		}

	}

	$.fn.typed = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('typed')
				, options = typeof option == 'object' && option
			if (!data) $this.data('typed', (data = new Typed(this, options)))
			if (typeof option == 'string') data[option]()
		});
	}

	$.fn.typed.defaults = {
		strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
		// typing speed
		typeSpeed: 0,
		// time before typing starts
		startDelay: 0,
		// backspacing speed
		backSpeed: 0,
		// time before backspacing
		backDelay: 500,
		// loop
		loop: false,
		// false = infinite
		loopCount: false,
		// ending callback function
		callback: function () { null }
	}


}(window.jQuery);
