! function (a) {
    var b;
    window.UIkit && (b = a(UIkit)), "function" == typeof define && define.amd && define("uikit-slider", ["uikit"], function () {
        return b || a(UIkit)
    })
}(function (a) {
    "use strict";
    var b, c, d, e, f = {};
    return a.component("slider", {
        defaults: {
            center: !0,
            threshold: 10,
            infinite: !0,
            autoplay: !1,
            autoplayInterval: 1500,
            pauseOnHover: !0,
            activecls: "uk-active"
        },
        boot: function () {
            a.ready(function (b) {
                setTimeout(function () {
                    a.$("[data-uk-slider]", b).each(function () {
                        var b = a.$(this);
                        b.data("slider") || a.slider(b, a.Utils.options(b.attr("data-uk-slider")))
                    })
                }, 0)
            })
        },
        init: function () {
            var g = this;
            this.container = this.element.find(".uk-slider"), this.focus = 0, a.$win.on("resize load", a.Utils.debounce(function () {
                g.update(!0)
            }, 100)), this.on("click.uk.slider", "[data-uk-slider-item]", function (b) {
                b.preventDefault();
                var c = a.$(this).attr("data-uk-slider-item");
                if (g.focus != c) switch (g.stop(), c) {
                    case "next":
                    case "previous":
                        g["next" == c ? "next" : "previous"]();
                        break;
                    default:
                        g.updateFocus(parseInt(c, 10))
                }
            }), this.container.on({
                "touchstart mousedown": function (h) {
                    h.originalEvent && h.originalEvent.touches && (h = h.originalEvent.touches[0]), h.button && 2 == h.button || !g.active || (g.stop(), d = a.$(h.target).is("a") ? a.$(h.target) : a.$(h.target).parents("a:first"), e = !1, d.length && d.one("click", function (a) {
                        e && a.preventDefault()
                    }), c = function (a) {
                        e = !0, b = g, f = {
                            touchx: parseInt(a.pageX, 10),
                            dir: 1,
                            focus: g.focus,
                            base: g.options.center ? "center" : "area"
                        }, a.originalEvent && a.originalEvent.touches && (a = a.originalEvent.touches[0]), b.element.data({
                            "pointer-start": {
                                x: parseInt(a.pageX, 10),
                                y: parseInt(a.pageY, 10)
                            },
                            "pointer-pos-start": g.pos
                        }), g.container.addClass("uk-drag"), c = !1
                    }, c.x = parseInt(h.pageX, 10), c.threshold = g.options.threshold)
                },
                mouseenter: function () {
                    g.options.pauseOnHover && (g.hovering = !0)
                },
                mouseleave: function () {
                    g.hovering = !1
                }
            }), this.update(!0), this.on("display.uk.check", function () {
                g.element.is(":visible") && g.update(!0)
            }), this.element.find("a,img").attr("draggable", "false"), this.options.autoplay && this.start(), a.domObserve(this.element, function () {
                g.element.children(":not([data-slider-slide])").length && g.update(!0)
            })
        },
        update: function (b) {
            var f, g, h, i, c = this,
                d = 0,
                e = 0;
            return this.items = this.container.children().filter(":visible"), this.vp = this.element[0].getBoundingClientRect().width, this.container.css({
                "min-width": "",
                "min-height": ""
            }), this.items.each(function (b) {
                f = a.$(this).attr("data-slider-slide", b), i = f.css({
                    left: "",
                    width: ""
                })[0].getBoundingClientRect(), g = i.width, h = f.width(), e = Math.max(e, i.height), f.css({
                    left: d,
                    width: g
                }).data({
                    idx: b,
                    left: d,
                    width: g,
                    cwidth: h,
                    area: d + g,
                    center: d - (c.vp / 2 - h / 2)
                }), d += g
            }), this.container.css({
                "min-width": d,
                "min-height": e
            }), this.options.infinite && (d <= 2 * this.vp || this.items.length < 5) && !this.itemsResized ? (this.container.children().each(function (a) {
                c.container.append(c.items.eq(a).clone(!0).attr("id", ""))
            }).each(function (a) {
                c.container.append(c.items.eq(a).clone(!0).attr("id", ""))
            }), this.itemsResized = !0, this.update()) : (this.cw = d, this.pos = 0, this.active = d >= this.vp, this.container.css({
                "-ms-transform": "",
                "-webkit-transform": "",
                transform: ""
            }), void(b && this.updateFocus(this.focus)))
        },
        updatePos: function (a) {
            this.pos = a, this.container.css({
                "-ms-transform": "translateX(" + a + "px)",
                "-webkit-transform": "translateX(" + a + "px)",
                transform: "translateX(" + a + "px)"
            })
        },
        updateFocus: function (b, c) {
            if (this.active) {
                c = c || (b > this.focus ? 1 : -1);
                var e, f, d = this.items.eq(b);
                if (this.options.infinite && this.infinite(b, c), this.options.center) this.updatePos(-1 * d.data("center")), this.items.filter("." + this.options.activecls).removeClass(this.options.activecls), d.addClass(this.options.activecls);
                else if (this.options.infinite) this.updatePos(-1 * d.data("left"));
                else {
                    for (e = 0, f = b; f < this.items.length; f++) e += this.items.eq(f).data("width");
                    if (e > this.vp) this.updatePos(-1 * d.data("left"));
                    else if (1 == c) {
                        for (e = 0, f = this.items.length - 1; f >= 0; f--) {
                            if (e += this.items.eq(f).data("width"), e == this.vp) {
                                b = f;
                                break
                            }
                            if (e > this.vp) {
                                b = f < this.items.length - 1 ? f + 1 : f;
                                break
                            }
                        }
                        this.updatePos(e > this.vp ? -1 * (this.container.width() - this.vp) : -1 * this.items.eq(b).data("left"))
                    }
                }
                var g = this.items.eq(b).data("left");
                this.items.removeClass("uk-slide-before uk-slide-after").each(function (c) {
                    c !== b && a.$(this).addClass(a.$(this).data("left") < g ? "uk-slide-before" : "uk-slide-after")
                }), this.focus = b, this.trigger("focusitem.uk.slider", [b, this.items.eq(b), this])
            }
        },
        next: function () {
            var a = this.items[this.focus + 1] ? this.focus + 1 : this.options.infinite ? 0 : this.focus;
            this.updateFocus(a, 1)
        },
        previous: function () {
            var a = this.items[this.focus - 1] ? this.focus - 1 : this.options.infinite ? this.items[this.focus - 1] ? this.items - 1 : this.items.length - 1 : this.focus;
            this.updateFocus(a, -1)
        },
        start: function () {
            this.stop();
            var a = this;
            this.interval = setInterval(function () {
                a.hovering || a.next()
            }, this.options.autoplayInterval)
        },
        stop: function () {
            this.interval && clearInterval(this.interval)
        },
        infinite: function (a, b) {
            var e, c = this,
                d = this.items.eq(a),
                f = a,
                g = [],
                h = 0;
            if (1 == b) {
                for (e = 0; e < this.items.length && (f != a && (h += this.items.eq(f).data("width"), g.push(this.items.eq(f))), !(h > this.vp)); e++) f = f + 1 == this.items.length ? 0 : f + 1;
                g.length && g.forEach(function (a) {
                    var b = d.data("area");
                    a.css({
                        left: b
                    }).data({
                        left: b,
                        area: b + a.data("width"),
                        center: b - (c.vp / 2 - a.data("cwidth") / 2)
                    }), d = a
                })
            } else {
                for (e = this.items.length - 1; e > -1 && (h += this.items.eq(f).data("width"), f != a && g.push(this.items.eq(f)), !(h > this.vp)); e--) f = f - 1 == -1 ? this.items.length - 1 : f - 1;
                g.length && g.forEach(function (a) {
                    var b = d.data("left") - a.data("width");
                    a.css({
                        left: b
                    }).data({
                        left: b,
                        area: b + a.data("width"),
                        center: b - (c.vp / 2 - a.data("cwidth") / 2)
                    }), d = a
                })
            }
        }
    }), a.$doc.on("mousemove.uk.slider touchmove.uk.slider", function (a) {
        if (a.originalEvent && a.originalEvent.touches && (a = a.originalEvent.touches[0]), c && Math.abs(a.pageX - c.x) > c.threshold && (window.getSelection().toString() ? b = c = !1 : c(a)), b) {
            var d, e, g, h, i, j, l, m, n, o;
            if (a.clientX || a.clientY ? d = a.clientX : (a.pageX || a.pageY) && (d = a.pageX - document.body.scrollLeft - document.documentElement.scrollLeft), i = f.focus, e = d - b.element.data("pointer-start").x, g = b.element.data("pointer-pos-start") + e, h = d > b.element.data("pointer-start").x ? -1 : 1, j = b.items.eq(f.focus), 1 == h)
                for (l = j.data("left") + Math.abs(e), m = 0, n = f.focus; m < b.items.length; m++) {
                    if (o = b.items.eq(n), n != f.focus && o.data("left") < l && o.data("area") > l) {
                        i = n;
                        break
                    }
                    n = n + 1 == b.items.length ? 0 : n + 1
                } else
                    for (l = j.data("left") - Math.abs(e), m = 0, n = f.focus; m < b.items.length; m++) {
                        if (o = b.items.eq(n), n != f.focus && o.data("area") <= j.data("left") && o.data("center") < l) {
                            i = n;
                            break
                        }
                        n = n - 1 == -1 ? b.items.length - 1 : n - 1
                    }
            b.options.infinite && i != f._focus && b.infinite(i, h), b.updatePos(g), f.dir = h, f._focus = i, f.touchx = parseInt(a.pageX, 10), f.diff = l
        }
    }), a.$doc.on("mouseup.uk.slider touchend.uk.slider", function () {
        if (b) {
            b.container.removeClass("uk-drag"), b.items.eq(f.focus);
            var d, g, h, e = !1;
            if (1 == f.dir) {
                for (g = 0, h = f.focus; g < b.items.length; g++) {
                    if (d = b.items.eq(h), h != f.focus && d.data("left") > f.diff) {
                        e = h;
                        break
                    }
                    h = h + 1 == b.items.length ? 0 : h + 1
                }
                b.options.infinite || e || (e = b.items.length)
            } else {
                for (g = 0, h = f.focus; g < b.items.length; g++) {
                    if (d = b.items.eq(h), h != f.focus && d.data("left") < f.diff) {
                        e = h;
                        break
                    }
                    h = h - 1 == -1 ? b.items.length - 1 : h - 1
                }
                b.options.infinite || e || (e = 0)
            }
            b.updateFocus(e !== !1 ? e : f._focus)
        }
        b = c = !1
    }), a.slider
});