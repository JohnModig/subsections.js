/* -------------------------

   subsections.js

   https://github.com/JohnModig/subsections.js

-------------------------*/

function _subSections() {
    this.show = function (id) {
        var el = document.getElementById(id);
        this.removeClass(el, 'hidden');
        this.addClass(el, 'opened');
        el.parentElement.style.minHeight = el.clientHeight + 'px';
        this.scrollTo(el.parentElement);
    };
    this.hide = function (elOrId) {
        var el;
        if (typeof elOrId === 'string') {
            el = document.getElementById(elOrId);
        }
        else {
            el = elOrId;
        }
        this.removeClass(el, 'opened');
        this.addClass(el, 'hidden');
        el.parentElement.style.minHeight = '';
    };
    this.parentSection = function (el) {
        var p = el.parentNode;
        while (p.nodeName !== 'DIV' || p.className.indexOf('sub-section') < 0) {
            p = p.parentNode;
        }
        return p;
    };
    this.browserSupportsScrollBehaviour = false;
    this.useScroll = true;
    this.scrollTo = function (el) {
        if (!this.useScroll) {
            return;
        }
        var pos = el.getBoundingClientRect();
        var nav = document.querySelector("nav");
        var navHeight = nav !== null && window.getComputedStyle(nav).position === 'fixed' ? nav.clientHeight : 0;
        if (pos.top < navHeight) {
            var scrollTop = parseInt(pos.top + window.pageYOffset - navHeight);
            if (isNaN(scrollTop)) {
                return;
            }
            if (this.browserSupportsScrollBehaviour === true) {
                window.scrollTo({
                    top: scrollTop,
                    left: 0,
                    behavior: 'smooth'
                });
            }
            else {
                window.scrollTo(0, scrollTop);
            }
        }
        else if (el.clientHeight < window.innerHeight && pos.bottom > window.innerHeight) {
            if (this.browserSupportsScrollBehaviour === true) {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }
            else {
                el.scrollIntoView(false);
            }
        }
        else if (pos.bottom > window.innerHeight) {
            var scrollTop = parseInt(pos.top + window.pageYOffset - navHeight)
            if (isNaN(scrollTop)) {
                return;
            }
            if (this.browserSupportsScrollBehaviour === true) {
                window.scrollTo({
                    top: scrollTop,
                    left: 0,
                    behavior: 'smooth'
                });
            }
            else {
                window.scrollTo(0, scrollTop);
            }
        }
    };
    this.removeClass = function (el, name) {
        if (el) {
            var c = el.className;
            var re = new RegExp('\s*' + name + '\s*', 'g');
            c = c.replace(re, '');
            el.className = c.replace(/\s+$/, "");
        }
    };
    this.addClass = function (el, name) {
        if (el && el.className.indexOf(name) < 0) {
            var c = el.className;
            if (c && c.length > 0) {
                el.className = c + ' ' + name;
            }
            else {
                el.className = name;
            }
        }
    };
    // Init
    this.init = function () {
        var els = document.querySelectorAll('div.sub-section[id]');
        for (var i = 0; i < els.length; i++) {
            this.hide(els[i].getAttribute('id'));
        }
        // Links for toggling
        var links = document.querySelectorAll('a[data-section-id]');
        for (var i = 0; i < links.length; i++) {
            links[i].onclick = function () {
                if (document.getElementById(this.getAttribute('data-section-id')).className.indexOf('opened') < 0) {
                    subSections.show(this.getAttribute('data-section-id'));
                }
                else {
                    subSections.hide(this.getAttribute('data-section-id'));
                }
                return false;
            }
        }
        // Links for closing
        for (var i = 0; i < els.length; i++) {
            var link = els[i].querySelector('a.close');
            if (link) {
                link.onclick = function () {
                    subSections.hide(subSections.parentSection(this));
                    return false;
                }
            }
        }
        // Browser support
        this.browserSupportsScrollBehaviour = 'scrollBehavior' in document.documentElement.style;
        if (this.browserSupportsScrollBehaviour === false && window.smoothscrollPolyfill === true && window.requestAnimationFrame !== undefined) {
            this.browserSupportsScrollBehaviour = true;
        }
        if (window.getComputedStyle === undefined) {
            this.useScroll = false;
        }
    };
}
var subSections = new _subSections();
subSections.init();
