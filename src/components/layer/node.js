export function getRect(element) {
    const documentElement = document.documentElement
    return element === document ? {
        left: 0,
        top: 0,
        right: documentElement.clientWidth,
        bottom: documentElement.clientHeight,
        width: documentElement.clientWidth,
        height: documentElement.clientHeight
    }: element.getBoundingClientRect()
}

export function getTarget() {
    
}
function getStyleProperty(obj) {
    return "fixed" === obj.getPropertyValue("position")
}

function getOverflow(obj) {
    const overflowX = obj.getPropertyValue("overflow-x")
    const overflowY = obj.getPropertyValue("overflow-y")
    return !("visible" === overflowX || "" === overflowX) || !("visible" === overflowY || "" === overflowY)
}
export function getBoundsParent(element) {
    for(var el = element, computed = void 0; el;) {
        if(el === document.body) {
            return null
        }
        if(computed = window.getComputedStyle(el), getStyleProperty(computed)) {
            return null
        }
        if(getOverflow(computed)) {
            return el
        }
        el = el.parentNode
    }
    return null
}
function getPlacment(rect, target, position, direction) {
    if(direction.forceDirection) {
        return direction.dir
    }
    const offsetWidth = rect.width + rect.extraOffset
    const offsetHeight = rect.height + rect.extraOffset
    const width = rect.width
    const height = rect.height
    const deltWidth = rect.width * offsetHeight
    const deltHeight = rect.height * offsetWidth
    const placment = {
        top: function() {
            const ps = width * Math.min(target.top - position.top, offsetHeight)
            return {
                s: ps,
                enough: ps >= deltWidth
            }
        },
        bottom: function() {
            const ps = width * Math.min(position.bottom - target.bottom, offsetHeight)
            return {
                s: ps,
                enough: ps >= deltWidth
            }
        },
        left: function() {
            const ps = height * Math.min(target.left - position.left, offsetWidth)
            return {
                s: ps,
                enough: ps >= deltHeight
            }
        },
        right: function() {
            const ps = height * Math.min(position.right - target.right, offsetWidth)
            return {
                s: ps,
                enough: ps >= deltHeight
            }
        }
    }

    let positionKey = ["top", "bottom", "right", "left"]

    if(direction.dir) {
        const dir = positionKey.indexOf(direction.dir)
        dir > - 1 && (positionKey.splice(dir, 1))
        positionKey.unshift(direction.dir)
    }

    for(var i = 0, dir = positionKey[0], j = 0, len = positionKey.length; j < len; j++) {
        const key = positionKey[j]
        const fn = placment[key]();
        const { s, enough } = fn
        if(enough) {
            return key
        }
        s > i && (i = s, dir = key)
    }
    return dir
     
}
const f = function() {
    function e(e, t) {
        var n = []
          , r = !0
          , o = !1
          , i = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value),
            !t || n.length !== t); r = !0)
                ;
        } catch (e) {
            o = !0,
            i = e
        } finally {
            try {
                !r && s.return && s.return()
            } finally {
                if (o)
                    throw i
            }
        }
        return n
    }
    return function(t, n) {
        if (Array.isArray(t))
            return t;
        if (Symbol.iterator in Object(t))
            return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}();
function getDirection(position) {
    if(!position) {
        return {}
    }
    const ps = "!" === position[0]
    ps && (position = position.substr(1))
    const reg = position.split(/\s+/)
    const toArr = f(reg, 2)
    let dir = toArr[0]
    let offset = toArr[1]
    let forceDirection = !1
    let forceOffset = !1
    "center" === dir && (
        dir = "auto",
        offset || (offset = "center")
    )
    ps && (dir && "auto" !== dir && (forceDirection = !0), offset && "auto" !== offset && (forceOffset = !0));

    return {
        dir: dir,
        offset: offset,
        forceDirection: forceDirection,
        forceOffset: forceOffset
    }

}
export function resolveLayerPosition(shellTarget, targetTarget, rect, position) {
    shellTarget = {
        extraOffset: 0,
        top: shellTarget.top,
        right: shellTarget.right,
        left: shellTarget.left,
        bottom: shellTarget.bottom,
        height: shellTarget.height,
        width: shellTarget.width
    }

    const direction = getDirection(position)
    const placment = getPlacment(shellTarget, targetTarget, rect, direction)
    let top = void 0;
    let left = void 0;
    let height = void 0;

    if("top" === placment || "bottom" === placment) {
        "top" === placment ? (
            top = targetTarget.top - shellTarget.extraOffset - shellTarget.height, 
            height = targetTarget.top - shellTarget.extraOffset
        ): (
            top= targetTarget.bottom + shellTarget.extraOffset,
            height = window.innerHeight - top
        );
        const offsetRight = targetTarget.right - shellTarget.width
        const targetLeft = targetTarget.left
        left = "left" === direction.offset ? targetLeft: offsetRight
        direction.forceOffset || (left = Math.max(Math.min(rect.right - shellTarget.width, left), offsetRight), left = Math.min(Math.max(rect.left, left), targetLeft))
    } else {
        left = "left" === placment ? targetTarget.left - shellTarget.extraOffset - shellTarget.width: targetTarget.right + shellTarget.extraOffset
        const deltTop = targetTarget.bottom - shellTarget.height
        const targetTop = targetTarget.top
        top = "top" === direction.offset ? targetTop: deltTop
        direction.forceOffset || (top = Math.max(Math.min(rect.bottom - shellTarget.height, top), deltTop), top =Math.min(Math.max(rect.top, top), targetTop))
        height = window.innerHeight - top
    }

    return {
        left: left,
        top: top,
        height: height
    }

}