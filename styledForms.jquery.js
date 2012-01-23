/*

CUSTOM FORM ELEMENTS
Tom McKenzie <http://chillidonut.com/> <https://github.com/grrowl/>
Based off original code by Ryan Fait <http://www.ryanfait.com>
	<http://ryanfait.com/resources/custom-checkboxes-and-radio-buttons/>
Licenced under Creative Commons BY-SA 3.0 <http://creativecommons.org/licenses/by-sa/3.0/>
Incorporating code from <https://github.com/zenorocha/jquery-boilerplate/blob/master/jquery.boilerplate.js>

*/

;(function ($, window, document, undefined) {
	var pluginName = 'styledForms',
		defaults = {
			checkboxHeight: 25,
			radioHeight: 25,
			selectWidth: 190,
			radioClass: 'radio',
			checkboxClass: 'checkbox',
			selectClass: 'select'
		};
	
	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
	}

	Plugin.prototype.init = function () {
		// TODO: this needs to be cleaned up and added once globally
		$('body').append('<style type="text/css">input.styled { display: none; }'
			+' select.styled { position: relative; width: ' + this.options.selectWidth + 'px; opacity: 0;'
			+' filter: alpha(opacity=0); z-index: 5; }'
			+' .disabled { opacity: 0.5; filter: alpha(opacity=50); }</style>');

		//var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
		var inputs = $(this.element).filter('input').toArray(), 
			span = Array(), textnode, option, active;
		for(a = 0; a < inputs.length; a++) {
			if(inputs[a].type == "checkbox" || inputs[a].type == "radio") {
				span[a] = document.createElement("span");
				//span[a].className = inputs[a].type;
				switch (inputs[a].type) {
					case 'radio':
						span[a].className = this.options.radioClass;
						break;
					case 'checkbox':
						span[a].className = this.options.checkboxClass;
						break;
				}

				if(inputs[a].checked == true) {
					if(inputs[a].type == "checkbox") {
						position = "0 -" + (this.options.checkboxHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					} else {
						position = "0 -" + (this.options.radioHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					}
				}
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				inputs[a].onchange = $.proxy(this.clear, this);
				if(!inputs[a].getAttribute("disabled")) {
					span[a].onmousedown = $.proxy(this.pushed, this);
					span[a].onmouseup = $.proxy(this.check, this);
				} else {
					span[a].className = span[a].className += " disabled";
				}
			}
		}
		//inputs = document.getElementsByTagName("select");
		inputs = $(this.element).filter('select').toArray();
		for(a = 0; a < inputs.length; a++) {
			option = inputs[a].getElementsByTagName("option");
			active = option[0].childNodes[0].nodeValue;
			textnode = document.createTextNode(active);
			for(b = 0; b < option.length; b++) {
				if(option[b].selected == true) {
					textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
				}
			}
			span[a] = document.createElement("span");
			//span[a].className = "select";
			span[a].className = this.options.selectClass;
			span[a].id = "select" + inputs[a].name;
			span[a].appendChild(textnode);
			inputs[a].parentNode.insertBefore(span[a], inputs[a]);
			if(!inputs[a].getAttribute("disabled")) {
				inputs[a].onchange = this.choose;
			} else {
				inputs[a].previousSibling.className = inputs[a].previousSibling.className += " disabled";
			}
		}
		document.onmouseup = $.proxy(this.clear, this);

    };
    Plugin.prototype.pushed = function (ev) {
		//element = this.nextSibling;
		element = ev.target.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			ev.target.style.backgroundPosition = "0 -" + this.options.checkboxHeight*3 + "px";
		} else if(element.checked == true && element.type == "radio") {
			ev.target.style.backgroundPosition = "0 -" + this.options.radioHeight*3 + "px";
		} else if(element.checked != true && element.type == "checkbox") {
			ev.target.style.backgroundPosition = "0 -" + this.options.checkboxHeight + "px";
		} else {
			ev.target.style.backgroundPosition = "0 -" + this.options.radioHeight + "px";
		}
	};
	Plugin.prototype.check = function (ev) {
		//element = this.nextSibling;
		element = ev.target.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			ev.target.style.backgroundPosition = "0 0";
			element.checked = false;
		} else {
			if(element.type == "checkbox") {
				ev.target.style.backgroundPosition = "0 -" + this.options.checkboxHeight*2 + "px";
			} else {
				ev.target.style.backgroundPosition = "0 -" + this.options.radioHeight*2 + "px";
				group = ev.target.nextSibling.name;
				inputs = document.getElementsByTagName("input");
				for(a = 0; a < inputs.length; a++) {
					if(inputs[a].name == group && inputs[a] != ev.target.nextSibling) {
						inputs[a].previousSibling.style.backgroundPosition = "0 0";
					}
				}
			}
			element.checked = true;
		}		
	};
	Plugin.prototype.clear = function () {
		inputs = document.getElementsByTagName("input");
		for(var b = 0; b < inputs.length; b++) {
			if(inputs[b].type == "checkbox" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + this.options.checkboxHeight*2 + "px";
			} else if(inputs[b].type == "checkbox" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			} else if(inputs[b].type == "radio" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + this.options.radioHeight*2 + "px";
			} else if(inputs[b].type == "radio" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			}
		}
	};
	Plugin.prototype.choose = function () {
		option = this.getElementsByTagName("option");
		for(d = 0; d < option.length; d++) {
			if(option[d].selected == true) {
				document.getElementById("select" + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
			}
		}
	}

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }

})(jQuery, window, document);