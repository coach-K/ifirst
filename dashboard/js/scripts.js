(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/js/themes/2/main.js":[function(require,module,exports){
// COMMON
require('../../common/main');
require('../../components/messages/main');

// CUSTOM
require('./_pages');
require('./components/sidebar/main');
require('./components/chat/main');
},{"../../common/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/main.js","../../components/messages/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/main.js","./_pages":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/_pages.js","./components/chat/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/chat/main.js","./components/sidebar/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/sidebar/main.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_skins.js":[function(require,module,exports){
var asyncLoader = require('../lib/async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + skin + '.min.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"../lib/async":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/lib/async.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_skins');
require('../components/forms/main');
require('../components/tables/main');
require('../components/other/_dropdown');
require('../components/other/_tooltip');
require('../components/other/_offcanvas');
require('../components/other/_ratings');
},{"../components/forms/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/main.js","../components/other/_dropdown":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_dropdown.js","../components/other/_offcanvas":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_offcanvas.js","../components/other/_ratings":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_ratings.js","../components/other/_tooltip":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_tooltip.js","../components/tables/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/main.js","./_breakpoints":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_breakpoints.js","./_skins":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_skins.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint480', function () {
        $('.chat-window-container .panel:not(:last)').remove();
        $('.chat-window-container .panel').attr('id', 'chat-0001');
    });

    $(window).bind('enterBreakpoint768', function () {
        $("body").removeClass('show-chat');

        if ($('.chat-window-container .panel').length == 3) {
            $('.chat-window-container .panel:first').remove();
            $('.chat-window-container .panel:first').attr('id', 'chat-0001');
            $('.chat-window-container .panel:last').attr('id', 'chat-0002');
        }
    });

    $(window).bind('exitBreakpoint768', function () {
        $("body").removeClass('show-chat');


    });
    $(window).bind('enterBreakpoint1024', function () {

    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_check-chat.js":[function(require,module,exports){
module.exports = function () {
    if (!$('body').hasClass('show-chat')) {
        //alert('no chat ');
        $('.chat-window-container .panel-body').addClass('display-none');
        $('.chat-window-container input').addClass('display-none');
    } else {
        $('.chat-window-container .panel-body').removeClass('display-none');
        $('.chat-window-container input').removeClass('display-none');
    }
};

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_hide.js":[function(require,module,exports){
(function ($) {
    "use strict";

    function checkChat() {
        if (! $('body').hasClass('show-chat')) {
            $('.chat-window-container .panel-body').addClass('display-none');
            $('.chat-window-container input').addClass('display-none');
        } else {
            $('.chat-window-container .panel-body').removeClass('display-none');
            $('.chat-window-container input').removeClass('display-none');
        }
    }

    checkChat();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_search.js":[function(require,module,exports){
(function ($) {

    // match anything
    $.expr[ ":" ].containsNoCase = function (el, i, m) {
        var search = m[ 3 ];
        if (! search) return false;
        return new RegExp(search, "i").test($(el).text());
    };

    // Search Filter
    function searchFilterCallBack($data, $opt) {
        var search = $data instanceof jQuery ? $data.val() : $(this).val(),
            opt = typeof $opt == 'undefined' ? $data.data.opt : $opt;

        var $target = $(opt.targetSelector);
        $target.show();

        if (search && search.length >= opt.charCount) {
            $target.not(":containsNoCase(" + search + ")").hide();
        }
    }

    // input filter
    $.fn.searchFilter = function (options) {
        var opt = $.extend({
            // target selector
            targetSelector: "",
            // number of characters before search is applied
            charCount: 1
        }, options);

        return this.each(function () {
            var $el = $(this);
            $el.off("keyup", searchFilterCallBack);
            $el.on("keyup", null, {opt: opt}, searchFilterCallBack);
        });

    };

    // Filter by All/Online/Offline
    $(".chat-filter a").on('click', function (e) {

        e.preventDefault();
        $('.chat-contacts li').hide();
        $('.chat-contacts').find($(this).data('target')).show();

        $(".chat-filter li").removeClass('active');
        $(this).parent().addClass('active');

        $(".chat-search input").searchFilter({targetSelector: ".chat-contacts " + $(this).data('target')});

        // Filter Contacts by Search and Tabs
        searchFilterCallBack($(".chat-search input"), {
            targetSelector: ".chat-contacts " + $(this).data('target'),
            charCount: 1
        });
    });

    // Trigger Search Filter
    $(".chat-search input").searchFilter({targetSelector: ".chat-contacts li"});

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_toggle.js":[function(require,module,exports){
(function ($) {

    $('[data-toggle="chat-box"]').on('click', function () {
        $(".chat-contacts li:first").trigger('click');
        if ($(this).data('hide')) $(this).hide();
    });

    (function () {
        var toggleBtn = $('[data-toggle="sidebar-chat"]');
        // If No Sidebar Exit
        if (!toggleBtn.length) return;

        toggleBtn.on('click', function () {

            $('body').toggleClass('show-chat');

            require('./_check-chat')();
        });
    })();

    require('./_check-chat')();
})(jQuery);
},{"./_check-chat":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_check-chat.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_windows.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var container = $('.chat-window-container');

    // Click User
    $(".chat-contacts li").on('click', function () {

        if ($('.chat-window-container [data-user-id="' + $(this).data('userId') + '"]').length) return;

        // If user is offline do nothing
        if ($(this).attr('class') === 'offline') return;

        var source = $("#chat-window-template").html();
        var template = Handlebars.compile(source);

        var context = {user_image: $(this).find('img').attr('src'), user: $(this).find('.contact-name').text()};
        var html = template(context);

        var clone = $(html);

        clone.attr("data-user-id", $(this).data("userId"));

        container.find('.panel:not([id^="chat"])').remove();

        var count = container.find('.panel').length;

        count ++;
        var limit = $(window).width() > 768 ? 3 : 1;
        if (count >= limit) {
            container.find('#chat-000'+ limit).remove();
            count = limit;
        }

        clone.attr('id', 'chat-000' + parseInt(count));
        container.append(clone).show();

        clone.show();
        clone.find('> .panel-body').removeClass('display-none');
        clone.find('> input').removeClass('display-none');
    });

    // Change ID by No. of Windows
    function chatLayout() {
        container.find('.panel').each(function (index, value) {
            $(this).attr('id', 'chat-000' + parseInt(index + 1));
        });
    }

    // remove window
    $("body").on('click', ".chat-window-container .close", function () {
        $(this).parent().parent().remove();
        chatLayout();
        if ($(window).width() < 768) $('.chat-window-container').hide();
    });

    // Chat heading collapse window
    $('body').on('click', '.chat-window-container .panel-heading', function (e) {
        e.preventDefault();
        $(this).parent().find('> .panel-body').toggleClass('display-none');
        $(this).parent().find('> input').toggleClass('display-none');
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_search');
require('./_windows');
require('./_toggle');
require('./_hide');
},{"./_breakpoints":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_breakpoints.js","./_hide":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_hide.js","./_search":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_search.js","./_toggle":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_toggle.js","./_windows":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_windows.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Datepicker INIT
    $('.datepicker').datepicker();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Minicolors INIT
    $('.minicolors').each(function () {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function (hex, opacity) {
                if (! hex) return;
                if (opacity) hex += ', ' + opacity;
                if (typeof console === 'object') {
                    console.log(hex);
                }
            },
            theme: 'bootstrap'
        });
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('.selectpicker').selectpicker();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#ex1').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });

    $("#ex2").slider();

    $("#ex6").slider();

    $("#ex6").on("slide", function (slideEvt) {
        $("#ex6SliderVal").text(slideEvt.value);
    });

    $('.slider-handle').html('<i class="fa fa-bars fa-rotate-90"></i>');

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/main.js":[function(require,module,exports){
require('./_progress-bars');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
},{"./_datepicker":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_datepicker.js","./_minicolors":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_minicolors.js","./_progress-bars":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_progress-bars.js","./_selectpicker":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_selectpicker.js","./_slider":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_slider.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint320', function () {
        var img = $('.messages-list .panel ul img');
        $('.messages-list .panel ul').width(img.first().width() * img.length);
    });

    $(window).bind('exitBreakpoint320', function () {
        $('.messages-list .panel ul').width('auto');
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_nicescroll.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var nice = $('.messages-list .panel').niceScroll({cursorborder: 0, cursorcolor: "#25ad9f", zindex: 1});

    var _super = nice.getContentSize;

    nice.getContentSize = function () {
        var page = _super.call(nice);
        page.h = nice.win.height();
        return page;
    };

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_nicescroll');
},{"./_breakpoints":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_breakpoints.js","./_nicescroll":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_nicescroll.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_dropdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Dropdown
    $('.dropdown-toggle').dropdown();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_offcanvas.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // OffCanvas
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_ratings.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Ratings
    $('.rating span.star').on('click', function () {
        var total = $(this).parent().children().length;
        var clickedIndex = $(this).index();
        $('.rating span.star').removeClass('filled');
        for (var i = clickedIndex; i < total; i ++) {
            $('.rating span.star').eq(i).addClass('filled');
        }
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint768', function () {
        $("body").addClass('show-sidebar');
    });

    $(window).bind('exitBreakpoint768', function () {
        $("body").removeClass('show-sidebar');
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/_sidebar-menu.js":[function(require,module,exports){
(function ($) {
    // Scroll
    $('[data-scrollable]').niceScroll({cursorborder: 0, cursorcolor: "#25ad9f"});
    $('[data-scrollable]').getNiceScroll().resize();
    $('#menu ul.collapse').on('shown.bs.collapse', function (e) {
        $('#menu').getNiceScroll().resize();
    });

    // Collapse
    $('#menu ul.collapse').on('show.bs.collapse', function (e) {
        e.stopPropagation();
        var parents = $(this).parents('ul:first').find('> li.open [data-toggle="collapse"]');
        if (parents.length) {
            parents.trigger('click');
        }
        $(this).parent().addClass("open");
    });

    $('#menu ul.collapse').on('hidden.bs.collapse', function (e) {
        e.stopPropagation();
        $(this).parent().removeClass("open");
    });

}(jQuery));
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/_sidebar-toggle.js":[function(require,module,exports){
(function ($) {
    $('#subnav').collapse({'toggle': false});

    var toggleBtn = $('[data-toggle="sidebar-menu"]');

    // If No Sidebar Exit
    if (!toggleBtn.length) return;

    toggleBtn.on('click', function () {

        if ($('body').is('.show-chat')) $('body').removeClass('show-chat');

        $('body').toggleClass('show-sidebar');

        // Check chat windows
        require('../chat/_check-chat')();
    });

})(jQuery);
},{"../chat/_check-chat":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_check-chat.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_sidebar-menu');
require('./_sidebar-toggle');
},{"./_breakpoints":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/_breakpoints.js","./_sidebar-menu":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/_sidebar-menu.js","./_sidebar-toggle":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/_sidebar-toggle.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_check-all.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Table Checkbox All
    $('#checkAll').on('click', function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_datatables.js":[function(require,module,exports){
(function ($) {

    // Datatables
    $('#data-table').dataTable();

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/main.js":[function(require,module,exports){
require('./_datatables');
require('./_check-all');
},{"./_check-all":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_check-all.js","./_datatables":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_datatables.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/lib/async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/timeline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /*$('[data-toggle*="gridalicious"]').each(function () {
        $(this).gridalicious({
            gutter: 15,
            width: 370,
            selector: '> div'
        });
    });*/

    $('.share textarea').on('keyup', function () {
        $(".share button")[ $(this).val() === '' ? 'hide' : 'show' ]();
    });

    if (! $("#scroll-spy").length) return;

    var offset = $("#scroll-spy").offset().top;

    $('body').scrollspy({target: '#scroll-spy', offset: offset});

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/users.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#users-filter-select').on('change', function () {
        if (this.value === 'name') {
            $('#user-first').removeClass('hidden');
            $('#user-search-name').removeClass('hidden');
        } else {
            $('#user-first').addClass('hidden');
            $('#user-search-name').addClass('hidden');
        }
        if (this.value === 'friends') {
            $('.select-friends').removeClass('hidden');

        } else {
            $('.select-friends').addClass('hidden');
        }
        if (this.value === 'name') {
            $('.search-name').removeClass('hidden');

        } else {
            $('.search-name').addClass('hidden');
        }
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/_pages.js":[function(require,module,exports){
require('../../pages/users');
require('../../pages/timeline');
},{"../../pages/timeline":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/timeline.js","../../pages/users":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/users.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/chat/_toggle.js":[function(require,module,exports){
(function ($) {
    $('[data-toggle="sidebar-chat"]').on('click', function () {
        // SIDEBAR
        $('body').removeClass('show-sidebar');

        // COLLAPSE NAVBAR
        if ($("#main-nav").is('.in')) $("#main-nav").collapse('hide');

        // SUBNAV HIDE
        if ($('body').is('.show-chat'))  $('#subnav').collapse('hide');
    });
})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/chat/main.js":[function(require,module,exports){
// Common CHAT
require('../../../../components/chat/main');

// Custom TOGGLE
require('./_toggle');
},{"../../../../components/chat/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/main.js","./_toggle":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/chat/_toggle.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/sidebar/_sidebar-toggle.js":[function(require,module,exports){
(function ($){
    $('[data-toggle="sidebar-menu"]').on('click', function () {
        if ($('body').is('.show-sidebar')) {
            // Layout 2 Hide SubNAV
            $('#subnav').collapse('hide');
        }
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/sidebar/main.js":[function(require,module,exports){
// Common CHAT
require('../../../../components/sidebar/main');

// Custom TOGGLE
require('./_sidebar-toggle');
},{"../../../../components/sidebar/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/sidebar/main.js","./_sidebar-toggle":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/2/components/sidebar/_sidebar-toggle.js"}]},{},["./app/js/themes/2/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvdGhlbWVzLzIvbWFpbi5qcyIsImFwcC9qcy9jb21tb24vX2JyZWFrcG9pbnRzLmpzIiwiYXBwL2pzL2NvbW1vbi9fc2tpbnMuanMiLCJhcHAvanMvY29tbW9uL21haW4uanMiLCJhcHAvanMvY29tcG9uZW50cy9jaGF0L19icmVha3BvaW50cy5qcyIsImFwcC9qcy9jb21wb25lbnRzL2NoYXQvX2NoZWNrLWNoYXQuanMiLCJhcHAvanMvY29tcG9uZW50cy9jaGF0L19oaWRlLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvY2hhdC9fc2VhcmNoLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvY2hhdC9fdG9nZ2xlLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvY2hhdC9fd2luZG93cy5qcyIsImFwcC9qcy9jb21wb25lbnRzL2NoYXQvbWFpbi5qcyIsImFwcC9qcy9jb21wb25lbnRzL2Zvcm1zL19kYXRlcGlja2VyLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvZm9ybXMvX21pbmljb2xvcnMuanMiLCJhcHAvanMvY29tcG9uZW50cy9mb3Jtcy9fcHJvZ3Jlc3MtYmFycy5qcyIsImFwcC9qcy9jb21wb25lbnRzL2Zvcm1zL19zZWxlY3RwaWNrZXIuanMiLCJhcHAvanMvY29tcG9uZW50cy9mb3Jtcy9fc2xpZGVyLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvZm9ybXMvbWFpbi5qcyIsImFwcC9qcy9jb21wb25lbnRzL21lc3NhZ2VzL19icmVha3BvaW50cy5qcyIsImFwcC9qcy9jb21wb25lbnRzL21lc3NhZ2VzL19uaWNlc2Nyb2xsLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvbWVzc2FnZXMvbWFpbi5qcyIsImFwcC9qcy9jb21wb25lbnRzL290aGVyL19kcm9wZG93bi5qcyIsImFwcC9qcy9jb21wb25lbnRzL290aGVyL19vZmZjYW52YXMuanMiLCJhcHAvanMvY29tcG9uZW50cy9vdGhlci9fcmF0aW5ncy5qcyIsImFwcC9qcy9jb21wb25lbnRzL290aGVyL190b29sdGlwLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvc2lkZWJhci9fYnJlYWtwb2ludHMuanMiLCJhcHAvanMvY29tcG9uZW50cy9zaWRlYmFyL19zaWRlYmFyLW1lbnUuanMiLCJhcHAvanMvY29tcG9uZW50cy9zaWRlYmFyL19zaWRlYmFyLXRvZ2dsZS5qcyIsImFwcC9qcy9jb21wb25lbnRzL3NpZGViYXIvbWFpbi5qcyIsImFwcC9qcy9jb21wb25lbnRzL3RhYmxlcy9fY2hlY2stYWxsLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvdGFibGVzL19kYXRhdGFibGVzLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvdGFibGVzL21haW4uanMiLCJhcHAvanMvbGliL2FzeW5jLmpzIiwiYXBwL2pzL3BhZ2VzL3RpbWVsaW5lLmpzIiwiYXBwL2pzL3BhZ2VzL3VzZXJzLmpzIiwiYXBwL2pzL3RoZW1lcy8yL19wYWdlcy5qcyIsImFwcC9qcy90aGVtZXMvMi9jb21wb25lbnRzL2NoYXQvX3RvZ2dsZS5qcyIsImFwcC9qcy90aGVtZXMvMi9jb21wb25lbnRzL2NoYXQvbWFpbi5qcyIsImFwcC9qcy90aGVtZXMvMi9jb21wb25lbnRzL3NpZGViYXIvX3NpZGViYXItdG9nZ2xlLmpzIiwiYXBwL2pzL3RoZW1lcy8yL2NvbXBvbmVudHMvc2lkZWJhci9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENPTU1PTlxucmVxdWlyZSgnLi4vLi4vY29tbW9uL21haW4nKTtcbnJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVzc2FnZXMvbWFpbicpO1xuXG4vLyBDVVNUT01cbnJlcXVpcmUoJy4vX3BhZ2VzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvc2lkZWJhci9tYWluJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hhdC9tYWluJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAkKHdpbmRvdykuc2V0QnJlYWtwb2ludHMoe1xuICAgICAgICBkaXN0aW5jdDogdHJ1ZSxcbiAgICAgICAgYnJlYWtwb2ludHM6IFsgMzIwLCA0ODAsIDc2OCwgMTAyNCBdXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFzeW5jTG9hZGVyID0gcmVxdWlyZSgnLi4vbGliL2FzeW5jJyk7XG5cbihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIGNoYW5nZVNraW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFzeW5jTG9hZGVyKFsgJ2Nzcy8nICsgc2tpbiArICcubWluLmNzcycgXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXNraW5dJykucmVtb3ZlUHJvcCgnZGlzYWJsZWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2tpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgICAgICQoJ1tkYXRhLXNraW5dJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgJC5jb29raWUoXCJza2luXCIsICQodGhpcykuZGF0YSgnc2tpbicpKTtcblxuICAgICAgICBjaGFuZ2VTa2luKCk7XG5cbiAgICB9KTtcblxuICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBza2luICE9ICd1bmRlZmluZWQnICYmIHNraW4gIT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIGNoYW5nZVNraW4oKTtcbiAgICB9XG5cbn0pKGpRdWVyeSk7IiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMnKTtcbnJlcXVpcmUoJy4vX3NraW5zJyk7XG5yZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm1zL21haW4nKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdGFibGVzL21haW4nKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3RoZXIvX2Ryb3Bkb3duJyk7XG5yZXF1aXJlKCcuLi9jb21wb25lbnRzL290aGVyL190b29sdGlwJyk7XG5yZXF1aXJlKCcuLi9jb21wb25lbnRzL290aGVyL19vZmZjYW52YXMnKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3RoZXIvX3JhdGluZ3MnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ0ODAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsOm5vdCg6bGFzdCknKS5yZW1vdmUoKTtcbiAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWwnKS5hdHRyKCdpZCcsICdjaGF0LTAwMDEnKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ3NjgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKCdzaG93LWNoYXQnKTtcblxuICAgICAgICBpZiAoJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWwnKS5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWw6Zmlyc3QnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsOmZpcnN0JykuYXR0cignaWQnLCAnY2hhdC0wMDAxJyk7XG4gICAgICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbDpsYXN0JykuYXR0cignaWQnLCAnY2hhdC0wMDAyJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdleGl0QnJlYWtwb2ludDc2OCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoJ3Nob3ctY2hhdCcpO1xuXG5cbiAgICB9KTtcbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50MTAyNCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEkKCdib2R5JykuaGFzQ2xhc3MoJ3Nob3ctY2hhdCcpKSB7XG4gICAgICAgIC8vYWxlcnQoJ25vIGNoYXQgJyk7XG4gICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsLWJvZHknKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XG4gICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgaW5wdXQnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWwtYm9keScpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciBpbnB1dCcpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICB9XG59O1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBmdW5jdGlvbiBjaGVja0NoYXQoKSB7XG4gICAgICAgIGlmICghICQoJ2JvZHknKS5oYXNDbGFzcygnc2hvdy1jaGF0JykpIHtcbiAgICAgICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsLWJvZHknKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XG4gICAgICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIGlucHV0JykuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWwtYm9keScpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgaW5wdXQnKS5yZW1vdmVDbGFzcygnZGlzcGxheS1ub25lJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0NoYXQoKTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgLy8gbWF0Y2ggYW55dGhpbmdcbiAgICAkLmV4cHJbIFwiOlwiIF0uY29udGFpbnNOb0Nhc2UgPSBmdW5jdGlvbiAoZWwsIGksIG0pIHtcbiAgICAgICAgdmFyIHNlYXJjaCA9IG1bIDMgXTtcbiAgICAgICAgaWYgKCEgc2VhcmNoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHNlYXJjaCwgXCJpXCIpLnRlc3QoJChlbCkudGV4dCgpKTtcbiAgICB9O1xuXG4gICAgLy8gU2VhcmNoIEZpbHRlclxuICAgIGZ1bmN0aW9uIHNlYXJjaEZpbHRlckNhbGxCYWNrKCRkYXRhLCAkb3B0KSB7XG4gICAgICAgIHZhciBzZWFyY2ggPSAkZGF0YSBpbnN0YW5jZW9mIGpRdWVyeSA/ICRkYXRhLnZhbCgpIDogJCh0aGlzKS52YWwoKSxcbiAgICAgICAgICAgIG9wdCA9IHR5cGVvZiAkb3B0ID09ICd1bmRlZmluZWQnID8gJGRhdGEuZGF0YS5vcHQgOiAkb3B0O1xuXG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChvcHQudGFyZ2V0U2VsZWN0b3IpO1xuICAgICAgICAkdGFyZ2V0LnNob3coKTtcblxuICAgICAgICBpZiAoc2VhcmNoICYmIHNlYXJjaC5sZW5ndGggPj0gb3B0LmNoYXJDb3VudCkge1xuICAgICAgICAgICAgJHRhcmdldC5ub3QoXCI6Y29udGFpbnNOb0Nhc2UoXCIgKyBzZWFyY2ggKyBcIilcIikuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW5wdXQgZmlsdGVyXG4gICAgJC5mbi5zZWFyY2hGaWx0ZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgb3B0ID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgLy8gdGFyZ2V0IHNlbGVjdG9yXG4gICAgICAgICAgICB0YXJnZXRTZWxlY3RvcjogXCJcIixcbiAgICAgICAgICAgIC8vIG51bWJlciBvZiBjaGFyYWN0ZXJzIGJlZm9yZSBzZWFyY2ggaXMgYXBwbGllZFxuICAgICAgICAgICAgY2hhckNvdW50OiAxXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQodGhpcyk7XG4gICAgICAgICAgICAkZWwub2ZmKFwia2V5dXBcIiwgc2VhcmNoRmlsdGVyQ2FsbEJhY2spO1xuICAgICAgICAgICAgJGVsLm9uKFwia2V5dXBcIiwgbnVsbCwge29wdDogb3B0fSwgc2VhcmNoRmlsdGVyQ2FsbEJhY2spO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAvLyBGaWx0ZXIgYnkgQWxsL09ubGluZS9PZmZsaW5lXG4gICAgJChcIi5jaGF0LWZpbHRlciBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcuY2hhdC1jb250YWN0cyBsaScpLmhpZGUoKTtcbiAgICAgICAgJCgnLmNoYXQtY29udGFjdHMnKS5maW5kKCQodGhpcykuZGF0YSgndGFyZ2V0JykpLnNob3coKTtcblxuICAgICAgICAkKFwiLmNoYXQtZmlsdGVyIGxpXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgJChcIi5jaGF0LXNlYXJjaCBpbnB1dFwiKS5zZWFyY2hGaWx0ZXIoe3RhcmdldFNlbGVjdG9yOiBcIi5jaGF0LWNvbnRhY3RzIFwiICsgJCh0aGlzKS5kYXRhKCd0YXJnZXQnKX0pO1xuXG4gICAgICAgIC8vIEZpbHRlciBDb250YWN0cyBieSBTZWFyY2ggYW5kIFRhYnNcbiAgICAgICAgc2VhcmNoRmlsdGVyQ2FsbEJhY2soJChcIi5jaGF0LXNlYXJjaCBpbnB1dFwiKSwge1xuICAgICAgICAgICAgdGFyZ2V0U2VsZWN0b3I6IFwiLmNoYXQtY29udGFjdHMgXCIgKyAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpLFxuICAgICAgICAgICAgY2hhckNvdW50OiAxXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gVHJpZ2dlciBTZWFyY2ggRmlsdGVyXG4gICAgJChcIi5jaGF0LXNlYXJjaCBpbnB1dFwiKS5zZWFyY2hGaWx0ZXIoe3RhcmdldFNlbGVjdG9yOiBcIi5jaGF0LWNvbnRhY3RzIGxpXCJ9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiY2hhdC1ib3hcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCIuY2hhdC1jb250YWN0cyBsaTpmaXJzdFwiKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKCdoaWRlJykpICQodGhpcykuaGlkZSgpO1xuICAgIH0pO1xuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvZ2dsZUJ0biA9ICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItY2hhdFwiXScpO1xuICAgICAgICAvLyBJZiBObyBTaWRlYmFyIEV4aXRcbiAgICAgICAgaWYgKCF0b2dnbGVCdG4ubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdG9nZ2xlQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdzaG93LWNoYXQnKTtcblxuICAgICAgICAgICAgcmVxdWlyZSgnLi9fY2hlY2stY2hhdCcpKCk7XG4gICAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgICByZXF1aXJlKCcuL19jaGVjay1jaGF0JykoKTtcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgY29udGFpbmVyID0gJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lcicpO1xuXG4gICAgLy8gQ2xpY2sgVXNlclxuICAgICQoXCIuY2hhdC1jb250YWN0cyBsaVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgW2RhdGEtdXNlci1pZD1cIicgKyAkKHRoaXMpLmRhdGEoJ3VzZXJJZCcpICsgJ1wiXScpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIElmIHVzZXIgaXMgb2ZmbGluZSBkbyBub3RoaW5nXG4gICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2NsYXNzJykgPT09ICdvZmZsaW5lJykgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzb3VyY2UgPSAkKFwiI2NoYXQtd2luZG93LXRlbXBsYXRlXCIpLmh0bWwoKTtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XG5cbiAgICAgICAgdmFyIGNvbnRleHQgPSB7dXNlcl9pbWFnZTogJCh0aGlzKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSwgdXNlcjogJCh0aGlzKS5maW5kKCcuY29udGFjdC1uYW1lJykudGV4dCgpfTtcbiAgICAgICAgdmFyIGh0bWwgPSB0ZW1wbGF0ZShjb250ZXh0KTtcblxuICAgICAgICB2YXIgY2xvbmUgPSAkKGh0bWwpO1xuXG4gICAgICAgIGNsb25lLmF0dHIoXCJkYXRhLXVzZXItaWRcIiwgJCh0aGlzKS5kYXRhKFwidXNlcklkXCIpKTtcblxuICAgICAgICBjb250YWluZXIuZmluZCgnLnBhbmVsOm5vdChbaWRePVwiY2hhdFwiXSknKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgY291bnQgPSBjb250YWluZXIuZmluZCgnLnBhbmVsJykubGVuZ3RoO1xuXG4gICAgICAgIGNvdW50ICsrO1xuICAgICAgICB2YXIgbGltaXQgPSAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCA/IDMgOiAxO1xuICAgICAgICBpZiAoY291bnQgPj0gbGltaXQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5maW5kKCcjY2hhdC0wMDAnKyBsaW1pdCkucmVtb3ZlKCk7XG4gICAgICAgICAgICBjb3VudCA9IGxpbWl0O1xuICAgICAgICB9XG5cbiAgICAgICAgY2xvbmUuYXR0cignaWQnLCAnY2hhdC0wMDAnICsgcGFyc2VJbnQoY291bnQpKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChjbG9uZSkuc2hvdygpO1xuXG4gICAgICAgIGNsb25lLnNob3coKTtcbiAgICAgICAgY2xvbmUuZmluZCgnPiAucGFuZWwtYm9keScpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgY2xvbmUuZmluZCgnPiBpbnB1dCcpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICB9KTtcblxuICAgIC8vIENoYW5nZSBJRCBieSBOby4gb2YgV2luZG93c1xuICAgIGZ1bmN0aW9uIGNoYXRMYXlvdXQoKSB7XG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcucGFuZWwnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICQodGhpcykuYXR0cignaWQnLCAnY2hhdC0wMDAnICsgcGFyc2VJbnQoaW5kZXggKyAxKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB3aW5kb3dcbiAgICAkKFwiYm9keVwiKS5vbignY2xpY2snLCBcIi5jaGF0LXdpbmRvdy1jb250YWluZXIgLmNsb3NlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgICAgY2hhdExheW91dCgpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXInKS5oaWRlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDaGF0IGhlYWRpbmcgY29sbGFwc2Ugd2luZG93XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbC1oZWFkaW5nJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJz4gLnBhbmVsLWJvZHknKS50b2dnbGVDbGFzcygnZGlzcGxheS1ub25lJyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnPiBpbnB1dCcpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzJyk7XG5yZXF1aXJlKCcuL19zZWFyY2gnKTtcbnJlcXVpcmUoJy4vX3dpbmRvd3MnKTtcbnJlcXVpcmUoJy4vX3RvZ2dsZScpO1xucmVxdWlyZSgnLi9faGlkZScpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gRGF0ZXBpY2tlciBJTklUXG4gICAgJCgnLmRhdGVwaWNrZXInKS5kYXRlcGlja2VyKCk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIE1pbmljb2xvcnMgSU5JVFxuICAgICQoJy5taW5pY29sb3JzJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykubWluaWNvbG9ycyh7XG4gICAgICAgICAgICBjb250cm9sOiAkKHRoaXMpLmF0dHIoJ2RhdGEtY29udHJvbCcpIHx8ICdodWUnLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtZGVmYXVsdFZhbHVlJykgfHwgJycsXG4gICAgICAgICAgICBpbmxpbmU6ICQodGhpcykuYXR0cignZGF0YS1pbmxpbmUnKSA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgbGV0dGVyQ2FzZTogJCh0aGlzKS5hdHRyKCdkYXRhLWxldHRlckNhc2UnKSB8fCAnbG93ZXJjYXNlJyxcbiAgICAgICAgICAgIG9wYWNpdHk6ICQodGhpcykuYXR0cignZGF0YS1vcGFjaXR5JyksXG4gICAgICAgICAgICBwb3NpdGlvbjogJCh0aGlzKS5hdHRyKCdkYXRhLXBvc2l0aW9uJykgfHwgJ2JvdHRvbSBsZWZ0JyxcbiAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGhleCwgb3BhY2l0eSkge1xuICAgICAgICAgICAgICAgIGlmICghIGhleCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvcGFjaXR5KSBoZXggKz0gJywgJyArIG9wYWNpdHk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcCdcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8vIFByb2dyZXNzIEJhciBBbmltYXRpb25cbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykud2lkdGgoJCh0aGlzKS5hdHRyKCdhcmlhLXZhbHVlbm93JykgKyAnJScpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCgnLnNlbGVjdHBpY2tlcicpLnNlbGVjdHBpY2tlcigpO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcjZXgxJykuc2xpZGVyKHtcbiAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnQ3VycmVudCB2YWx1ZTogJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiI2V4MlwiKS5zbGlkZXIoKTtcblxuICAgICQoXCIjZXg2XCIpLnNsaWRlcigpO1xuXG4gICAgJChcIiNleDZcIikub24oXCJzbGlkZVwiLCBmdW5jdGlvbiAoc2xpZGVFdnQpIHtcbiAgICAgICAgJChcIiNleDZTbGlkZXJWYWxcIikudGV4dChzbGlkZUV2dC52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICAkKCcuc2xpZGVyLWhhbmRsZScpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtYmFycyBmYS1yb3RhdGUtOTBcIj48L2k+Jyk7XG5cbn0pKGpRdWVyeSk7IiwicmVxdWlyZSgnLi9fcHJvZ3Jlc3MtYmFycycpO1xucmVxdWlyZSgnLi9fc2xpZGVyJyk7XG5yZXF1aXJlKCcuL19zZWxlY3RwaWNrZXInKTtcbnJlcXVpcmUoJy4vX2RhdGVwaWNrZXInKTtcbnJlcXVpcmUoJy4vX21pbmljb2xvcnMnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQzMjAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbWcgPSAkKCcubWVzc2FnZXMtbGlzdCAucGFuZWwgdWwgaW1nJyk7XG4gICAgICAgICQoJy5tZXNzYWdlcy1saXN0IC5wYW5lbCB1bCcpLndpZHRoKGltZy5maXJzdCgpLndpZHRoKCkgKiBpbWcubGVuZ3RoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdleGl0QnJlYWtwb2ludDMyMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLm1lc3NhZ2VzLWxpc3QgLnBhbmVsIHVsJykud2lkdGgoJ2F1dG8nKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG5pY2UgPSAkKCcubWVzc2FnZXMtbGlzdCAucGFuZWwnKS5uaWNlU2Nyb2xsKHtjdXJzb3Jib3JkZXI6IDAsIGN1cnNvcmNvbG9yOiBcIiMyNWFkOWZcIiwgemluZGV4OiAxfSk7XG5cbiAgICB2YXIgX3N1cGVyID0gbmljZS5nZXRDb250ZW50U2l6ZTtcblxuICAgIG5pY2UuZ2V0Q29udGVudFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYWdlID0gX3N1cGVyLmNhbGwobmljZSk7XG4gICAgICAgIHBhZ2UuaCA9IG5pY2Uud2luLmhlaWdodCgpO1xuICAgICAgICByZXR1cm4gcGFnZTtcbiAgICB9O1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzJyk7XG5yZXF1aXJlKCcuL19uaWNlc2Nyb2xsJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBEcm9wZG93blxuICAgICQoJy5kcm9wZG93bi10b2dnbGUnKS5kcm9wZG93bigpO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBPZmZDYW52YXNcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJvZmZjYW52YXNcIl0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5yb3ctb2ZmY2FudmFzJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBSYXRpbmdzXG4gICAgJCgnLnJhdGluZyBzcGFuLnN0YXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9ICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oKS5sZW5ndGg7XG4gICAgICAgIHZhciBjbGlja2VkSW5kZXggPSAkKHRoaXMpLmluZGV4KCk7XG4gICAgICAgICQoJy5yYXRpbmcgc3Bhbi5zdGFyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgICBmb3IgKHZhciBpID0gY2xpY2tlZEluZGV4OyBpIDwgdG90YWw7IGkgKyspIHtcbiAgICAgICAgICAgICQoJy5yYXRpbmcgc3Bhbi5zdGFyJykuZXEoaSkuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFRvb2x0aXBcbiAgICAkKFwiYm9keVwiKS50b29sdGlwKHtzZWxlY3RvcjogJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nLCBjb250YWluZXI6IFwiYm9keVwifSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ3NjgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKCdzaG93LXNpZGViYXInKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdleGl0QnJlYWtwb2ludDc2OCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgLy8gU2Nyb2xsXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS5uaWNlU2Nyb2xsKHtjdXJzb3Jib3JkZXI6IDAsIGN1cnNvcmNvbG9yOiBcIiMyNWFkOWZcIn0pO1xuICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuICAgICQoJyNtZW51IHVsLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnI21lbnUnKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDb2xsYXBzZVxuICAgICQoJyNtZW51IHVsLmNvbGxhcHNlJykub24oJ3Nob3cuYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgcGFyZW50cyA9ICQodGhpcykucGFyZW50cygndWw6Zmlyc3QnKS5maW5kKCc+IGxpLm9wZW4gW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0nKTtcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwYXJlbnRzLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcyhcIm9wZW5cIik7XG4gICAgfSk7XG5cbiAgICAkKCcjbWVudSB1bC5jb2xsYXBzZScpLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICAkKCcjc3VibmF2JykuY29sbGFwc2Uoeyd0b2dnbGUnOiBmYWxzZX0pO1xuXG4gICAgdmFyIHRvZ2dsZUJ0biA9ICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXScpO1xuXG4gICAgLy8gSWYgTm8gU2lkZWJhciBFeGl0XG4gICAgaWYgKCF0b2dnbGVCdG4ubGVuZ3RoKSByZXR1cm47XG5cbiAgICB0b2dnbGVCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICgkKCdib2R5JykuaXMoJy5zaG93LWNoYXQnKSkgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdzaG93LWNoYXQnKTtcblxuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuXG4gICAgICAgIC8vIENoZWNrIGNoYXQgd2luZG93c1xuICAgICAgICByZXF1aXJlKCcuLi9jaGF0L19jaGVjay1jaGF0JykoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19icmVha3BvaW50cycpO1xucmVxdWlyZSgnLi9fc2lkZWJhci1tZW51Jyk7XG5yZXF1aXJlKCcuL19zaWRlYmFyLXRvZ2dsZScpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gVGFibGUgQ2hlY2tib3ggQWxsXG4gICAgJCgnI2NoZWNrQWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCd0YWJsZScpLmZpbmQoJ3RkIGlucHV0OmNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRoaXMuY2hlY2tlZCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8vIERhdGF0YWJsZXNcbiAgICAkKCcjZGF0YS10YWJsZScpLmRhdGFUYWJsZSgpO1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2RhdGF0YWJsZXMnKTtcbnJlcXVpcmUoJy4vX2NoZWNrLWFsbCcpOyIsImZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXG4gICAgdmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuICAgICAgICBkb2MgPSB3aW4uZG9jdW1lbnQsXG4gICAgICAgIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBtb2Rlcm4gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lcixcblxuICAgICAgICBhZGQgPSBtb2Rlcm4gPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuICAgICAgICByZW0gPSBtb2Rlcm4gPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuICAgICAgICBwcmUgPSBtb2Rlcm4gPyAnJyA6ICdvbicsXG5cbiAgICAgICAgaW5pdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPSAnY29tcGxldGUnKSByZXR1cm47XG4gICAgICAgICAgICAoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbIHJlbSBdKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKCEgZG9uZSAmJiAoZG9uZSA9IHRydWUpKSBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBvbGwsIDUwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbml0KCdwb2xsJyk7XG4gICAgICAgIH07XG5cbiAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghIG1vZGVybiAmJiByb290LmRvU2Nyb2xsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRvcCA9ICEgd2luLmZyYW1lRWxlbWVudDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b3ApIHBvbGwoKTtcbiAgICAgICAgfVxuICAgICAgICBkb2NbIGFkZCBdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuICAgICAgICBkb2NbIGFkZCBdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuICAgICAgICB3aW5bIGFkZCBdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmxzLCBjYWxsYmFjaykge1xuXG4gICAgdmFyIGFzeW5jTG9hZGVyID0gZnVuY3Rpb24gKHVybHMsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdXJscy5mb3JlYWNoKGZ1bmN0aW9uIChpLCBmaWxlKSB7XG4gICAgICAgICAgICBsb2FkQ3NzKGZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVja2luZyBmb3IgYSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNhbGxpbmcgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICBjb250ZW50TG9hZGVkKHdpbmRvdywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBsb2FkQ3NzID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVsgMCBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH07XG5cbiAgICAvLyBzaW1wbGUgZm9yZWFjaCBpbXBsZW1lbnRhdGlvblxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JlYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGksIHRoaXNbIGkgXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmNMb2FkZXIodXJscywgY2FsbGJhY2spO1xuXG59OyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlKj1cImdyaWRhbGljaW91c1wiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmdyaWRhbGljaW91cyh7XG4gICAgICAgICAgICBndXR0ZXI6IDE1LFxuICAgICAgICAgICAgd2lkdGg6IDM3MCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnPiBkaXYnXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJCgnLnNoYXJlIHRleHRhcmVhJykub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiLnNoYXJlIGJ1dHRvblwiKVsgJCh0aGlzKS52YWwoKSA9PT0gJycgPyAnaGlkZScgOiAnc2hvdycgXSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCEgJChcIiNzY3JvbGwtc3B5XCIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgdmFyIG9mZnNldCA9ICQoXCIjc2Nyb2xsLXNweVwiKS5vZmZzZXQoKS50b3A7XG5cbiAgICAkKCdib2R5Jykuc2Nyb2xsc3B5KHt0YXJnZXQ6ICcjc2Nyb2xsLXNweScsIG9mZnNldDogb2Zmc2V0fSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyN1c2Vycy1maWx0ZXItc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgJCgnI3VzZXItZmlyc3QnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAkKCcjdXNlci1zZWFyY2gtbmFtZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyN1c2VyLWZpcnN0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJCgnI3VzZXItc2VhcmNoLW5hbWUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICdmcmllbmRzJykge1xuICAgICAgICAgICAgJCgnLnNlbGVjdC1mcmllbmRzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LWZyaWVuZHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgJCgnLnNlYXJjaC1uYW1lJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2VhcmNoLW5hbWUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsInJlcXVpcmUoJy4uLy4uL3BhZ2VzL3VzZXJzJyk7XG5yZXF1aXJlKCcuLi8uLi9wYWdlcy90aW1lbGluZScpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItY2hhdFwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gU0lERUJBUlxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuXG4gICAgICAgIC8vIENPTExBUFNFIE5BVkJBUlxuICAgICAgICBpZiAoJChcIiNtYWluLW5hdlwiKS5pcygnLmluJykpICQoXCIjbWFpbi1uYXZcIikuY29sbGFwc2UoJ2hpZGUnKTtcblxuICAgICAgICAvLyBTVUJOQVYgSElERVxuICAgICAgICBpZiAoJCgnYm9keScpLmlzKCcuc2hvdy1jaGF0JykpICAkKCcjc3VibmF2JykuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICB9KTtcbn0pKGpRdWVyeSk7IiwiLy8gQ29tbW9uIENIQVRcbnJlcXVpcmUoJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2hhdC9tYWluJyk7XG5cbi8vIEN1c3RvbSBUT0dHTEVcbnJlcXVpcmUoJy4vX3RvZ2dsZScpOyIsIihmdW5jdGlvbiAoJCl7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCgnYm9keScpLmlzKCcuc2hvdy1zaWRlYmFyJykpIHtcbiAgICAgICAgICAgIC8vIExheW91dCAyIEhpZGUgU3ViTkFWXG4gICAgICAgICAgICAkKCcjc3VibmF2JykuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiLy8gQ29tbW9uIENIQVRcbnJlcXVpcmUoJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvc2lkZWJhci9tYWluJyk7XG5cbi8vIEN1c3RvbSBUT0dHTEVcbnJlcXVpcmUoJy4vX3NpZGViYXItdG9nZ2xlJyk7Il19
