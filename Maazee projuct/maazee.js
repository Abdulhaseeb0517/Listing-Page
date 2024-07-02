const X = Object.create(null);
X.open = "0";
X.close = "1";
X.ping = "2";
X.pong = "3";
X.message = "4";
X.upgrade = "5";
X.noop = "6";
const ut = Object.create(null);
Object.keys(X).forEach(s=>{
    ut[X[s]] = s
}
);
const te = {
    type: "error",
    data: "parser error"
}
  , ee = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]"
  , se = typeof ArrayBuffer == "function"
  , ne = s=>typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s && s.buffer instanceof ArrayBuffer
  , Pt = ({type: s, data: t},e,n)=>ee && t instanceof Blob ? e ? n(t) : Ct(t, n) : se && (t instanceof ArrayBuffer || ne(t)) ? e ? n(t) : Ct(new Blob([t]), n) : n(X[s] + (t || ""))
  , Ct = (s,t)=>{
    const e = new FileReader;
    return e.onload = function() {
        const n = e.result.split(",")[1];
        t("b" + (n || ""))
    }
    ,
    e.readAsDataURL(s)
}
  , Dt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  , ot = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let s = 0; s < Dt.length; s++)
    ot[Dt.charCodeAt(s)] = s;
const ie = s=>{
    let t = s.length * .75, e = s.length, n, i = 0, o, u, d, g;
    s[s.length - 1] === "=" && (t--,
    s[s.length - 2] === "=" && t--);
    const b = new ArrayBuffer(t)
      , C = new Uint8Array(b);
    for (n = 0; n < e; n += 4)
        o = ot[s.charCodeAt(n)],
        u = ot[s.charCodeAt(n + 1)],
        d = ot[s.charCodeAt(n + 2)],
        g = ot[s.charCodeAt(n + 3)],
        C[i++] = o << 2 | u >> 4,
        C[i++] = (u & 15) << 4 | d >> 2,
        C[i++] = (d & 3) << 6 | g & 63;
    return b
}
  , re = typeof ArrayBuffer == "function"
  , It = (s,t)=>{
    if (typeof s != "string")
        return {
            type: "message",
            data: Ht(s, t)
        };
    const e = s.charAt(0);
    return e === "b" ? {
        type: "message",
        data: oe(s.substring(1), t)
    } : ut[e] ? s.length > 1 ? {
        type: ut[e],
        data: s.substring(1)
    } : {
        type: ut[e]
    } : te
}
  , oe = (s,t)=>{
    if (re) {
        const e = ie(s);
        return Ht(e, t)
    } else
        return {
            base64: !0,
            data: s
        }
}
  , Ht = (s,t)=>{
    switch (t) {
    case "blob":
        return s instanceof ArrayBuffer ? new Blob([s]) : s;
    case "arraybuffer":
    default:
        return s
    }
}
  , qt = String.fromCharCode(30)
  , ae = (s,t)=>{
    const e = s.length
      , n = new Array(e);
    let i = 0;
    s.forEach((o,u)=>{
        Pt(o, !1, d=>{
            n[u] = d,
            ++i === e && t(n.join(qt))
        }
        )
    }
    )
}
  , ce = (s,t)=>{
    const e = s.split(qt)
      , n = [];
    for (let i = 0; i < e.length; i++) {
        const o = It(e[i], t);
        if (n.push(o),
        o.type === "error")
            break
    }
    return n
}
  , zt = 4;
function I(s) {
    if (s)
        return he(s)
}
function he(s) {
    for (var t in I.prototype)
        s[t] = I.prototype[t];
    return s
}
I.prototype.on = I.prototype.addEventListener = function(s, t) {
    return this._callbacks = this._callbacks || {},
    (this._callbacks["$" + s] = this._callbacks["$" + s] || []).push(t),
    this
}
;
I.prototype.once = function(s, t) {
    function e() {
        this.off(s, e),
        t.apply(this, arguments)
    }
    return e.fn = t,
    this.on(s, e),
    this
}
;
I.prototype.off = I.prototype.removeListener = I.prototype.removeAllListeners = I.prototype.removeEventListener = function(s, t) {
    if (this._callbacks = this._callbacks || {},
    arguments.length == 0)
        return this._callbacks = {},
        this;
    var e = this._callbacks["$" + s];
    if (!e)
        return this;
    if (arguments.length == 1)
        return delete this._callbacks["$" + s],
        this;
    for (var n, i = 0; i < e.length; i++)
        if (n = e[i],
        n === t || n.fn === t) {
            e.splice(i, 1);
            break
        }
    return e.length === 0 && delete this._callbacks["$" + s],
    this
}
;
I.prototype.emit = function(s) {
    this._callbacks = this._callbacks || {};
    for (var t = new Array(arguments.length - 1), e = this._callbacks["$" + s], n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
    if (e) {
        e = e.slice(0);
        for (var n = 0, i = e.length; n < i; ++n)
            e[n].apply(this, t)
    }
    return this
}
;
I.prototype.emitReserved = I.prototype.emit;
I.prototype.listeners = function(s) {
    return this._callbacks = this._callbacks || {},
    this._callbacks["$" + s] || []
}
;
I.prototype.hasListeners = function(s) {
    return !!this.listeners(s).length
}
;
const tt = (()=>typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")())();
function Ut(s, ...t) {
    return t.reduce((e,n)=>(s.hasOwnProperty(n) && (e[n] = s[n]),
    e), {})
}
const ue = setTimeout
  , fe = clearTimeout;
function dt(s, t) {
    t.useNativeTimers ? (s.setTimeoutFn = ue.bind(tt),
    s.clearTimeoutFn = fe.bind(tt)) : (s.setTimeoutFn = setTimeout.bind(tt),
    s.clearTimeoutFn = clearTimeout.bind(tt))
}
const le = 1.33;
function de(s) {
    return typeof s == "string" ? pe(s) : Math.ceil((s.byteLength || s.size) * le)
}
function pe(s) {
    let t = 0
      , e = 0;
    for (let n = 0, i = s.length; n < i; n++)
        t = s.charCodeAt(n),
        t < 128 ? e += 1 : t < 2048 ? e += 2 : t < 55296 || t >= 57344 ? e += 3 : (n++,
        e += 4);
    return e
}
class me extends Error {
    constructor(t, e, n) {
        super(t),
        this.description = e,
        this.context = n,
        this.type = "TransportError"
    }
}
class Ft extends I {
    constructor(t) {
        super(),
        this.writable = !1,
        dt(this, t),
        this.opts = t,
        this.query = t.query,
        this.readyState = "",
        this.socket = t.socket
    }
    onError(t, e, n) {
        return super.emitReserved("error", new me(t,e,n)),
        this
    }
    open() {
        return (this.readyState === "closed" || this.readyState === "") && (this.readyState = "opening",
        this.doOpen()),
        this
    }
    close() {
        return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(),
        this.onClose()),
        this
    }
    send(t) {
        this.readyState === "open" && this.write(t)
    }
    onOpen() {
        this.readyState = "open",
        this.writable = !0,
        super.emitReserved("open")
    }
    onData(t) {
        const e = It(t, this.socket.binaryType);
        this.onPacket(e)
    }
    onPacket(t) {
        super.emitReserved("packet", t)
    }
    onClose(t) {
        this.readyState = "closed",
        super.emitReserved("close", t)
    }
}
const Vt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("")
  , gt = 64
  , ye = {};
let Mt = 0, ct = 0, Rt;
function Bt(s) {
    let t = "";
    do
        t = Vt[s % gt] + t,
        s = Math.floor(s / gt);
    while (s > 0);
    return t
}
function Wt() {
    const s = Bt(+new Date);
    return s !== Rt ? (Mt = 0,
    Rt = s) : s + "." + Bt(Mt++)
}
for (; ct < gt; ct++)
    ye[Vt[ct]] = ct;
function Kt(s) {
    let t = "";
    for (let e in s)
        s.hasOwnProperty(e) && (t.length && (t += "&"),
        t += encodeURIComponent(e) + "=" + encodeURIComponent(s[e]));
    return t
}
function ge(s) {
    let t = {}
      , e = s.split("&");
    for (let n = 0, i = e.length; n < i; n++) {
        let o = e[n].split("=");
        t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
    }
    return t
}
let Zt = !1;
try {
    Zt = typeof XMLHttpRequest < "u" && "withCredentials"in new XMLHttpRequest
} catch {}
const ve = Zt;
function Jt(s) {
    const t = s.xdomain;
    try {
        if (typeof XMLHttpRequest < "u" && (!t || ve))
            return new XMLHttpRequest
    } catch {}
    if (!t)
        try {
            return new tt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")
        } catch {}
}
function we() {}
const be = function() {
    return new Jt({
        xdomain: !1
    }).responseType != null
}();
class $e extends Ft {
    constructor(t) {
        if (super(t),
        this.polling = !1,
        typeof location < "u") {
            const n = location.protocol === "https:";
            let i = location.port;
            i || (i = n ? "443" : "80"),
            this.xd = typeof location < "u" && t.hostname !== location.hostname || i !== t.port,
            this.xs = t.secure !== n
        }
        const e = t && t.forceBase64;
        this.supportsBinary = be && !e
    }
    get name() {
        return "polling"
    }
    doOpen() {
        this.poll()
    }
    pause(t) {
        this.readyState = "pausing";
        const e = ()=>{
            this.readyState = "paused",
            t()
        }
        ;
        if (this.polling || !this.writable) {
            let n = 0;
            this.polling && (n++,
            this.once("pollComplete", function() {
                --n || e()
            })),
            this.writable || (n++,
            this.once("drain", function() {
                --n || e()
            }))
        } else
            e()
    }
    poll() {
        this.polling = !0,
        this.doPoll(),
        this.emitReserved("poll")
    }
    onData(t) {
        const e = n=>{
            if (this.readyState === "opening" && n.type === "open" && this.onOpen(),
            n.type === "close")
                return this.onClose({
                    description: "transport closed by the server"
                }),
                !1;
            this.onPacket(n)
        }
        ;
        ce(t, this.socket.binaryType).forEach(e),
        this.readyState !== "closed" && (this.polling = !1,
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this.poll())
    }
    doClose() {
        const t = ()=>{
            this.write([{
                type: "close"
            }])
        }
        ;
        this.readyState === "open" ? t() : this.once("open", t)
    }
    write(t) {
        this.writable = !1,
        ae(t, e=>{
            this.doWrite(e, ()=>{
                this.writable = !0,
                this.emitReserved("drain")
            }
            )
        }
        )
    }
    uri() {
        let t = this.query || {};
        const e = this.opts.secure ? "https" : "http";
        let n = "";
        this.opts.timestampRequests !== !1 && (t[this.opts.timestampParam] = Wt()),
        !this.supportsBinary && !t.sid && (t.b64 = 1),
        this.opts.port && (e === "https" && Number(this.opts.port) !== 443 || e === "http" && Number(this.opts.port) !== 80) && (n = ":" + this.opts.port);
        const i = Kt(t)
          , o = this.opts.hostname.indexOf(":") !== -1;
        return e + "://" + (o ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + (i.length ? "?" + i : "")
    }
    request(t={}) {
        return Object.assign(t, {
            xd: this.xd,
            xs: this.xs
        }, this.opts),
        new J(this.uri(),t)
    }
    doWrite(t, e) {
        const n = this.request({
            method: "POST",
            data: t
        });
        n.on("success", e),
        n.on("error", (i,o)=>{
            this.onError("xhr post error", i, o)
        }
        )
    }
    doPoll() {
        const t = this.request();
        t.on("data", this.onData.bind(this)),
        t.on("error", (e,n)=>{
            this.onError("xhr poll error", e, n)
        }
        ),
        this.pollXhr = t
    }
}
class J extends I {
    constructor(t, e) {
        super(),
        dt(this, e),
        this.opts = e,
        this.method = e.method || "GET",
        this.uri = t,
        this.async = e.async !== !1,
        this.data = e.data !== void 0 ? e.data : null,
        this.create()
    }
    create() {
        const t = Ut(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        t.xdomain = !!this.opts.xd,
        t.xscheme = !!this.opts.xs;
        const e = this.xhr = new Jt(t);
        try {
            e.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0);
                    for (let n in this.opts.extraHeaders)
                        this.opts.extraHeaders.hasOwnProperty(n) && e.setRequestHeader(n, this.opts.extraHeaders[n])
                }
            } catch {}
            if (this.method === "POST")
                try {
                    e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                } catch {}
            try {
                e.setRequestHeader("Accept", "*/*")
            } catch {}
            "withCredentials"in e && (e.withCredentials = this.opts.withCredentials),
            this.opts.requestTimeout && (e.timeout = this.opts.requestTimeout),
            e.onreadystatechange = ()=>{
                e.readyState === 4 && (e.status === 200 || e.status === 1223 ? this.onLoad() : this.setTimeoutFn(()=>{
                    this.onError(typeof e.status == "number" ? e.status : 0)
                }
                , 0))
            }
            ,
            e.send(this.data)
        } catch (n) {
            this.setTimeoutFn(()=>{
                this.onError(n)
            }
            , 0);
            return
        }
        typeof document < "u" && (this.index = J.requestsCount++,
        J.requests[this.index] = this)
    }
    onError(t) {
        this.emitReserved("error", t, this.xhr),
        this.cleanup(!0)
    }
    cleanup(t) {
        if (!(typeof this.xhr > "u" || this.xhr === null)) {
            if (this.xhr.onreadystatechange = we,
            t)
                try {
                    this.xhr.abort()
                } catch {}
            typeof document < "u" && delete J.requests[this.index],
            this.xhr = null
        }
    }
    onLoad() {
        const t = this.xhr.responseText;
        t !== null && (this.emitReserved("data", t),
        this.emitReserved("success"),
        this.cleanup())
    }
    abort() {
        this.cleanup()
    }
}
J.requestsCount = 0;
J.requests = {};
if (typeof document < "u") {
    if (typeof attachEvent == "function")
        attachEvent("onunload", Lt);
    else if (typeof addEventListener == "function") {
        const s = "onpagehide"in tt ? "pagehide" : "unload";
        addEventListener(s, Lt, !1)
    }
}
function Lt() {
    for (let s in J.requests)
        J.requests.hasOwnProperty(s) && J.requests[s].abort()
}
const Xt = (()=>typeof Promise == "function" && typeof Promise.resolve == "function" ? t=>Promise.resolve().then(t) : (t,e)=>e(t, 0))()
  , ht = tt.WebSocket || tt.MozWebSocket
  , Nt = !0
  , Se = "arraybuffer"
  , Yt = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Oe extends Ft {
    constructor(t) {
        super(t),
        this.supportsBinary = !t.forceBase64
    }
    get name() {
        return "websocket"
    }
    doOpen() {
        if (!this.check())
            return;
        const t = this.uri()
          , e = this.opts.protocols
          , n = Yt ? {} : Ut(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        this.opts.extraHeaders && (n.headers = this.opts.extraHeaders);
        try {
            this.ws = Nt && !Yt ? e ? new ht(t,e) : new ht(t) : new ht(t,e,n)
        } catch (i) {
            return this.emitReserved("error", i)
        }
        this.ws.binaryType = this.socket.binaryType || Se,
        this.addEventListeners()
    }
    addEventListeners() {
        this.ws.onopen = ()=>{
            this.opts.autoUnref && this.ws._socket.unref(),
            this.onOpen()
        }
        ,
        this.ws.onclose = t=>this.onClose({
            description: "websocket connection closed",
            context: t
        }),
        this.ws.onmessage = t=>this.onData(t.data),
        this.ws.onerror = t=>this.onError("websocket error", t)
    }
    write(t) {
        this.writable = !1;
        for (let e = 0; e < t.length; e++) {
            const n = t[e]
              , i = e === t.length - 1;
            Pt(n, this.supportsBinary, o=>{
                const u = {};
                try {
                    Nt && this.ws.send(o)
                } catch {}
                i && Xt(()=>{
                    this.writable = !0,
                    this.emitReserved("drain")
                }
                , this.setTimeoutFn)
            }
            )
        }
    }
    doClose() {
        typeof this.ws < "u" && (this.ws.close(),
        this.ws = null)
    }
    uri() {
        let t = this.query || {};
        const e = this.opts.secure ? "wss" : "ws";
        let n = "";
        this.opts.port && (e === "wss" && Number(this.opts.port) !== 443 || e === "ws" && Number(this.opts.port) !== 80) && (n = ":" + this.opts.port),
        this.opts.timestampRequests && (t[this.opts.timestampParam] = Wt()),
        this.supportsBinary || (t.b64 = 1);
        const i = Kt(t)
          , o = this.opts.hostname.indexOf(":") !== -1;
        return e + "://" + (o ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + (i.length ? "?" + i : "")
    }
    check() {
        return !!ht
    }
}
const ke = {
    websocket: Oe,
    polling: $e
}
  , Ee = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  , _e = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
function vt(s) {
    const t = s
      , e = s.indexOf("[")
      , n = s.indexOf("]");
    e != -1 && n != -1 && (s = s.substring(0, e) + s.substring(e, n).replace(/:/g, ";") + s.substring(n, s.length));
    let i = Ee.exec(s || "")
      , o = {}
      , u = 14;
    for (; u--; )
        o[_e[u]] = i[u] || "";
    return e != -1 && n != -1 && (o.source = t,
    o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"),
    o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
    o.ipv6uri = !0),
    o.pathNames = xe(o, o.path),
    o.queryKey = Te(o, o.query),
    o
}
function xe(s, t) {
    const e = /\/{2,9}/g
      , n = t.replace(e, "/").split("/");
    return (t.slice(0, 1) == "/" || t.length === 0) && n.splice(0, 1),
    t.slice(-1) == "/" && n.splice(n.length - 1, 1),
    n
}
function Te(s, t) {
    const e = {};
    return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(n, i, o) {
        i && (e[i] = o)
    }),
    e
}
let nt = class extends I {
    constructor(t, e={}) {
        super(),
        t && typeof t == "object" && (e = t,
        t = null),
        t ? (t = vt(t),
        e.hostname = t.host,
        e.secure = t.protocol === "https" || t.protocol === "wss",
        e.port = t.port,
        t.query && (e.query = t.query)) : e.host && (e.hostname = vt(e.host).host),
        dt(this, e),
        this.secure = e.secure != null ? e.secure : typeof location < "u" && location.protocol === "https:",
        e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
        this.hostname = e.hostname || (typeof location < "u" ? location.hostname : "localhost"),
        this.port = e.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"),
        this.transports = e.transports || ["polling", "websocket"],
        this.readyState = "",
        this.writeBuffer = [],
        this.prevBufferLen = 0,
        this.opts = Object.assign({
            path: "/engine.io",
            agent: !1,
            withCredentials: !1,
            upgrade: !0,
            timestampParam: "t",
            rememberUpgrade: !1,
            rejectUnauthorized: !0,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: !0
        }, e),
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/",
        typeof this.opts.query == "string" && (this.opts.query = ge(this.opts.query)),
        this.id = null,
        this.upgrades = null,
        this.pingInterval = null,
        this.pingTimeout = null,
        this.pingTimeoutTimer = null,
        typeof addEventListener == "function" && (this.opts.closeOnBeforeunload && (this.beforeunloadEventListener = ()=>{
            this.transport && (this.transport.removeAllListeners(),
            this.transport.close())
        }
        ,
        addEventListener("beforeunload", this.beforeunloadEventListener, !1)),
        this.hostname !== "localhost" && (this.offlineEventListener = ()=>{
            this.onClose("transport close", {
                description: "network connection lost"
            })
        }
        ,
        addEventListener("offline", this.offlineEventListener, !1))),
        this.open()
    }
    createTransport(t) {
        const e = Object.assign({}, this.opts.query);
        e.EIO = zt,
        e.transport = t,
        this.id && (e.sid = this.id);
        const n = Object.assign({}, this.opts.transportOptions[t], this.opts, {
            query: e,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        });
        return new ke[t](n)
    }
    open() {
        let t;
        if (this.opts.rememberUpgrade && nt.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1)
            t = "websocket";
        else if (this.transports.length === 0) {
            this.setTimeoutFn(()=>{
                this.emitReserved("error", "No transports available")
            }
            , 0);
            return
        } else
            t = this.transports[0];
        this.readyState = "opening";
        try {
            t = this.createTransport(t)
        } catch {
            this.transports.shift(),
            this.open();
            return
        }
        t.open(),
        this.setTransport(t)
    }
    setTransport(t) {
        this.transport && this.transport.removeAllListeners(),
        this.transport = t,
        t.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", e=>this.onClose("transport close", e))
    }
    probe(t) {
        let e = this.createTransport(t)
          , n = !1;
        nt.priorWebsocketSuccess = !1;
        const i = ()=>{
            n || (e.send([{
                type: "ping",
                data: "probe"
            }]),
            e.once("packet", T=>{
                if (!n)
                    if (T.type === "pong" && T.data === "probe") {
                        if (this.upgrading = !0,
                        this.emitReserved("upgrading", e),
                        !e)
                            return;
                        nt.priorWebsocketSuccess = e.name === "websocket",
                        this.transport.pause(()=>{
                            n || this.readyState !== "closed" && (C(),
                            this.setTransport(e),
                            e.send([{
                                type: "upgrade"
                            }]),
                            this.emitReserved("upgrade", e),
                            e = null,
                            this.upgrading = !1,
                            this.flush())
                        }
                        )
                    } else {
                        const O = new Error("probe error");
                        O.transport = e.name,
                        this.emitReserved("upgradeError", O)
                    }
            }
            ))
        }
        ;
        function o() {
            n || (n = !0,
            C(),
            e.close(),
            e = null)
        }
        const u = T=>{
            const O = new Error("probe error: " + T);
            O.transport = e.name,
            o(),
            this.emitReserved("upgradeError", O)
        }
        ;
        function d() {
            u("transport closed")
        }
        function g() {
            u("socket closed")
        }
        function b(T) {
            e && T.name !== e.name && o()
        }
        const C = ()=>{
            e.removeListener("open", i),
            e.removeListener("error", u),
            e.removeListener("close", d),
            this.off("close", g),
            this.off("upgrading", b)
        }
        ;
        e.once("open", i),
        e.once("error", u),
        e.once("close", d),
        this.once("close", g),
        this.once("upgrading", b),
        e.open()
    }
    onOpen() {
        if (this.readyState = "open",
        nt.priorWebsocketSuccess = this.transport.name === "websocket",
        this.emitReserved("open"),
        this.flush(),
        this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
            let t = 0;
            const e = this.upgrades.length;
            for (; t < e; t++)
                this.probe(this.upgrades[t])
        }
    }
    onPacket(t) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
            switch (this.emitReserved("packet", t),
            this.emitReserved("heartbeat"),
            t.type) {
            case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
            case "ping":
                this.resetPingTimeout(),
                this.sendPacket("pong"),
                this.emitReserved("ping"),
                this.emitReserved("pong");
                break;
            case "error":
                const e = new Error("server error");
                e.code = t.data,
                this.onError(e);
                break;
            case "message":
                this.emitReserved("data", t.data),
                this.emitReserved("message", t.data);
                break
            }
    }
    onHandshake(t) {
        this.emitReserved("handshake", t),
        this.id = t.sid,
        this.transport.query.sid = t.sid,
        this.upgrades = this.filterUpgrades(t.upgrades),
        this.pingInterval = t.pingInterval,
        this.pingTimeout = t.pingTimeout,
        this.maxPayload = t.maxPayload,
        this.onOpen(),
        this.readyState !== "closed" && this.resetPingTimeout()
    }
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer),
        this.pingTimeoutTimer = this.setTimeoutFn(()=>{
            this.onClose("ping timeout")
        }
        , this.pingInterval + this.pingTimeout),
        this.opts.autoUnref && this.pingTimeoutTimer.unref()
    }
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen),
        this.prevBufferLen = 0,
        this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush()
    }
    flush() {
        if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const t = this.getWritablePackets();
            this.transport.send(t),
            this.prevBufferLen = t.length,
            this.emitReserved("flush")
        }
    }
    getWritablePackets() {
        if (!(this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
            return this.writeBuffer;
        let e = 1;
        for (let n = 0; n < this.writeBuffer.length; n++) {
            const i = this.writeBuffer[n].data;
            if (i && (e += de(i)),
            n > 0 && e > this.maxPayload)
                return this.writeBuffer.slice(0, n);
            e += 2
        }
        return this.writeBuffer
    }
    write(t, e, n) {
        return this.sendPacket("message", t, e, n),
        this
    }
    send(t, e, n) {
        return this.sendPacket("message", t, e, n),
        this
    }
    sendPacket(t, e, n, i) {
        if (typeof e == "function" && (i = e,
        e = void 0),
        typeof n == "function" && (i = n,
        n = null),
        this.readyState === "closing" || this.readyState === "closed")
            return;
        n = n || {},
        n.compress = n.compress !== !1;
        const o = {
            type: t,
            data: e,
            options: n
        };
        this.emitReserved("packetCreate", o),
        this.writeBuffer.push(o),
        i && this.once("flush", i),
        this.flush()
    }
    close() {
        const t = ()=>{
            this.onClose("forced close"),
            this.transport.close()
        }
          , e = ()=>{
            this.off("upgrade", e),
            this.off("upgradeError", e),
            t()
        }
          , n = ()=>{
            this.once("upgrade", e),
            this.once("upgradeError", e)
        }
        ;
        return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing",
        this.writeBuffer.length ? this.once("drain", ()=>{
            this.upgrading ? n() : t()
        }
        ) : this.upgrading ? n() : t()),
        this
    }
    onError(t) {
        nt.priorWebsocketSuccess = !1,
        this.emitReserved("error", t),
        this.onClose("transport error", t)
    }
    onClose(t, e) {
        (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") && (this.clearTimeoutFn(this.pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        typeof removeEventListener == "function" && (removeEventListener("beforeunload", this.beforeunloadEventListener, !1),
        removeEventListener("offline", this.offlineEventListener, !1)),
        this.readyState = "closed",
        this.id = null,
        this.emitReserved("close", t, e),
        this.writeBuffer = [],
        this.prevBufferLen = 0)
    }
    filterUpgrades(t) {
        const e = [];
        let n = 0;
        const i = t.length;
        for (; n < i; n++)
            ~this.transports.indexOf(t[n]) && e.push(t[n]);
        return e
    }
}
;
nt.protocol = zt;
function Ae(s, t="", e) {
    let n = s;
    e = e || typeof location < "u" && location,
    s == null && (s = e.protocol + "//" + e.host),
    typeof s == "string" && (s.charAt(0) === "/" && (s.charAt(1) === "/" ? s = e.protocol + s : s = e.host + s),
    /^(https?|wss?):\/\//.test(s) || (typeof e < "u" ? s = e.protocol + "//" + s : s = "https://" + s),
    n = vt(s)),
    n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
    n.path = n.path || "/";
    const o = n.host.indexOf(":") !== -1 ? "[" + n.host + "]" : n.host;
    return n.id = n.protocol + "://" + o + ":" + n.port + t,
    n.href = n.protocol + "://" + o + (e && e.port === n.port ? "" : ":" + n.port),
    n
}
const Ce = typeof ArrayBuffer == "function"
  , De = s=>typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(s) : s.buffer instanceof ArrayBuffer
  , Gt = Object.prototype.toString
  , Me = typeof Blob == "function" || typeof Blob < "u" && Gt.call(Blob) === "[object BlobConstructor]"
  , Re = typeof File == "function" || typeof File < "u" && Gt.call(File) === "[object FileConstructor]";
function xt(s) {
    return Ce && (s instanceof ArrayBuffer || De(s)) || Me && s instanceof Blob || Re && s instanceof File
}
function ft(s, t) {
    if (!s || typeof s != "object")
        return !1;
    if (Array.isArray(s)) {
        for (let e = 0, n = s.length; e < n; e++)
            if (ft(s[e]))
                return !0;
        return !1
    }
    if (xt(s))
        return !0;
    if (s.toJSON && typeof s.toJSON == "function" && arguments.length === 1)
        return ft(s.toJSON(), !0);
    for (const e in s)
        if (Object.prototype.hasOwnProperty.call(s, e) && ft(s[e]))
            return !0;
    return !1
}
function Be(s) {
    const t = []
      , e = s.data
      , n = s;
    return n.data = wt(e, t),
    n.attachments = t.length,
    {
        packet: n,
        buffers: t
    }
}
function wt(s, t) {
    if (!s)
        return s;
    if (xt(s)) {
        const e = {
            _placeholder: !0,
            num: t.length
        };
        return t.push(s),
        e
    } else if (Array.isArray(s)) {
        const e = new Array(s.length);
        for (let n = 0; n < s.length; n++)
            e[n] = wt(s[n], t);
        return e
    } else if (typeof s == "object" && !(s instanceof Date)) {
        const e = {};
        for (const n in s)
            Object.prototype.hasOwnProperty.call(s, n) && (e[n] = wt(s[n], t));
        return e
    }
    return s
}
function Le(s, t) {
    return s.data = bt(s.data, t),
    delete s.attachments,
    s
}
function bt(s, t) {
    if (!s)
        return s;
    if (s && s._placeholder === !0) {
        if (typeof s.num == "number" && s.num >= 0 && s.num < t.length)
            return t[s.num];
        throw new Error("illegal attachments")
    } else if (Array.isArray(s))
        for (let e = 0; e < s.length; e++)
            s[e] = bt(s[e], t);
    else if (typeof s == "object")
        for (const e in s)
            Object.prototype.hasOwnProperty.call(s, e) && (s[e] = bt(s[e], t));
    return s
}
const Ne = 5;
var k;
(function(s) {
    s[s.CONNECT = 0] = "CONNECT",
    s[s.DISCONNECT = 1] = "DISCONNECT",
    s[s.EVENT = 2] = "EVENT",
    s[s.ACK = 3] = "ACK",
    s[s.CONNECT_ERROR = 4] = "CONNECT_ERROR",
    s[s.BINARY_EVENT = 5] = "BINARY_EVENT",
    s[s.BINARY_ACK = 6] = "BINARY_ACK"
}
)(k || (k = {}));
class Ye {
    constructor(t) {
        this.replacer = t
    }
    encode(t) {
        return (t.type === k.EVENT || t.type === k.ACK) && ft(t) ? this.encodeAsBinary({
            type: t.type === k.EVENT ? k.BINARY_EVENT : k.BINARY_ACK,
            nsp: t.nsp,
            data: t.data,
            id: t.id
        }) : [this.encodeAsString(t)]
    }
    encodeAsString(t) {
        let e = "" + t.type;
        return (t.type === k.BINARY_EVENT || t.type === k.BINARY_ACK) && (e += t.attachments + "-"),
        t.nsp && t.nsp !== "/" && (e += t.nsp + ","),
        t.id != null && (e += t.id),
        t.data != null && (e += JSON.stringify(t.data, this.replacer)),
        e
    }
    encodeAsBinary(t) {
        const e = Be(t)
          , n = this.encodeAsString(e.packet)
          , i = e.buffers;
        return i.unshift(n),
        i
    }
}
class Tt extends I {
    constructor(t) {
        super(),
        this.reviver = t
    }
    add(t) {
        let e;
        if (typeof t == "string") {
            if (this.reconstructor)
                throw new Error("got plaintext data when reconstructing a packet");
            e = this.decodeString(t);
            const n = e.type === k.BINARY_EVENT;
            n || e.type === k.BINARY_ACK ? (e.type = n ? k.EVENT : k.ACK,
            this.reconstructor = new Pe(e),
            e.attachments === 0 && super.emitReserved("decoded", e)) : super.emitReserved("decoded", e)
        } else if (xt(t) || t.base64)
            if (this.reconstructor)
                e = this.reconstructor.takeBinaryData(t),
                e && (this.reconstructor = null,
                super.emitReserved("decoded", e));
            else
                throw new Error("got binary data when not reconstructing a packet");
        else
            throw new Error("Unknown type: " + t)
    }
    decodeString(t) {
        let e = 0;
        const n = {
            type: Number(t.charAt(0))
        };
        if (k[n.type] === void 0)
            throw new Error("unknown packet type " + n.type);
        if (n.type === k.BINARY_EVENT || n.type === k.BINARY_ACK) {
            const o = e + 1;
            for (; t.charAt(++e) !== "-" && e != t.length; )
                ;
            const u = t.substring(o, e);
            if (u != Number(u) || t.charAt(e) !== "-")
                throw new Error("Illegal attachments");
            n.attachments = Number(u)
        }
        if (t.charAt(e + 1) === "/") {
            const o = e + 1;
            for (; ++e && !(t.charAt(e) === "," || e === t.length); )
                ;
            n.nsp = t.substring(o, e)
        } else
            n.nsp = "/";
        const i = t.charAt(e + 1);
        if (i !== "" && Number(i) == i) {
            const o = e + 1;
            for (; ++e; ) {
                const u = t.charAt(e);
                if (u == null || Number(u) != u) {
                    --e;
                    break
                }
                if (e === t.length)
                    break
            }
            n.id = Number(t.substring(o, e + 1))
        }
        if (t.charAt(++e)) {
            const o = this.tryParse(t.substr(e));
            if (Tt.isPayloadValid(n.type, o))
                n.data = o;
            else
                throw new Error("invalid payload")
        }
        return n
    }
    tryParse(t) {
        try {
            return JSON.parse(t, this.reviver)
        } catch {
            return !1
        }
    }
    static isPayloadValid(t, e) {
        switch (t) {
        case k.CONNECT:
            return typeof e == "object";
        case k.DISCONNECT:
            return e === void 0;
        case k.CONNECT_ERROR:
            return typeof e == "string" || typeof e == "object";
        case k.EVENT:
        case k.BINARY_EVENT:
            return Array.isArray(e) && e.length > 0;
        case k.ACK:
        case k.BINARY_ACK:
            return Array.isArray(e)
        }
    }
    destroy() {
        this.reconstructor && (this.reconstructor.finishedReconstruction(),
        this.reconstructor = null)
    }
}
class Pe {
    constructor(t) {
        this.packet = t,
        this.buffers = [],
        this.reconPack = t
    }
    takeBinaryData(t) {
        if (this.buffers.push(t),
        this.buffers.length === this.reconPack.attachments) {
            const e = Le(this.reconPack, this.buffers);
            return this.finishedReconstruction(),
            e
        }
        return null
    }
    finishedReconstruction() {
        this.reconPack = null,
        this.buffers = []
    }
}
const Ie = Object.freeze(Object.defineProperty({
    __proto__: null,
    Decoder: Tt,
    Encoder: Ye,
    get PacketType() {
        return k
    },
    protocol: Ne
}, Symbol.toStringTag, {
    value: "Module"
}));
function W(s, t, e) {
    return s.on(t, e),
    function() {
        s.off(t, e)
    }
}
const He = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1
});
class Qt extends I {
    constructor(t, e, n) {
        super(),
        this.connected = !1,
        this.receiveBuffer = [],
        this.sendBuffer = [],
        this.ids = 0,
        this.acks = {},
        this.flags = {},
        this.io = t,
        this.nsp = e,
        n && n.auth && (this.auth = n.auth),
        this.io._autoConnect && this.open()
    }
    get disconnected() {
        return !this.connected
    }
    subEvents() {
        if (this.subs)
            return;
        const t = this.io;
        this.subs = [W(t, "open", this.onopen.bind(this)), W(t, "packet", this.onpacket.bind(this)), W(t, "error", this.onerror.bind(this)), W(t, "close", this.onclose.bind(this))]
    }
    get active() {
        return !!this.subs
    }
    connect() {
        return this.connected ? this : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this)
    }
    open() {
        return this.connect()
    }
    send(...t) {
        return t.unshift("message"),
        this.emit.apply(this, t),
        this
    }
    emit(t, ...e) {
        if (He.hasOwnProperty(t))
            throw new Error('"' + t.toString() + '" is a reserved event name');
        e.unshift(t);
        const n = {
            type: k.EVENT,
            data: e
        };
        if (n.options = {},
        n.options.compress = this.flags.compress !== !1,
        typeof e[e.length - 1] == "function") {
            const u = this.ids++
              , d = e.pop();
            this._registerAckCallback(u, d),
            n.id = u
        }
        const i = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        return this.flags.volatile && (!i || !this.connected) || (this.connected ? (this.notifyOutgoingListeners(n),
        this.packet(n)) : this.sendBuffer.push(n)),
        this.flags = {},
        this
    }
    _registerAckCallback(t, e) {
        const n = this.flags.timeout;
        if (n === void 0) {
            this.acks[t] = e;
            return
        }
        const i = this.io.setTimeoutFn(()=>{
            delete this.acks[t];
            for (let o = 0; o < this.sendBuffer.length; o++)
                this.sendBuffer[o].id === t && this.sendBuffer.splice(o, 1);
            e.call(this, new Error("operation has timed out"))
        }
        , n);
        this.acks[t] = (...o)=>{
            this.io.clearTimeoutFn(i),
            e.apply(this, [null, ...o])
        }
    }
    packet(t) {
        t.nsp = this.nsp,
        this.io._packet(t)
    }
    onopen() {
        typeof this.auth == "function" ? this.auth(t=>{
            this.packet({
                type: k.CONNECT,
                data: t
            })
        }
        ) : this.packet({
            type: k.CONNECT,
            data: this.auth
        })
    }
    onerror(t) {
        this.connected || this.emitReserved("connect_error", t)
    }
    onclose(t, e) {
        this.connected = !1,
        delete this.id,
        this.emitReserved("disconnect", t, e)
    }
    onpacket(t) {
        if (t.nsp === this.nsp)
            switch (t.type) {
            case k.CONNECT:
                if (t.data && t.data.sid) {
                    const i = t.data.sid;
                    this.onconnect(i)
                } else
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                break;
            case k.EVENT:
            case k.BINARY_EVENT:
                this.onevent(t);
                break;
            case k.ACK:
            case k.BINARY_ACK:
                this.onack(t);
                break;
            case k.DISCONNECT:
                this.ondisconnect();
                break;
            case k.CONNECT_ERROR:
                this.destroy();
                const n = new Error(t.data.message);
                n.data = t.data.data,
                this.emitReserved("connect_error", n);
                break
            }
    }
    onevent(t) {
        const e = t.data || [];
        t.id != null && e.push(this.ack(t.id)),
        this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e))
    }
    emitEvent(t) {
        if (this._anyListeners && this._anyListeners.length) {
            const e = this._anyListeners.slice();
            for (const n of e)
                n.apply(this, t)
        }
        super.emit.apply(this, t)
    }
    ack(t) {
        const e = this;
        let n = !1;
        return function(...i) {
            n || (n = !0,
            e.packet({
                type: k.ACK,
                id: t,
                data: i
            }))
        }
    }
    onack(t) {
        const e = this.acks[t.id];
        typeof e == "function" && (e.apply(this, t.data),
        delete this.acks[t.id])
    }
    onconnect(t) {
        this.id = t,
        this.connected = !0,
        this.emitBuffered(),
        this.emitReserved("connect")
    }
    emitBuffered() {
        this.receiveBuffer.forEach(t=>this.emitEvent(t)),
        this.receiveBuffer = [],
        this.sendBuffer.forEach(t=>{
            this.notifyOutgoingListeners(t),
            this.packet(t)
        }
        ),
        this.sendBuffer = []
    }
    ondisconnect() {
        this.destroy(),
        this.onclose("io server disconnect")
    }
    destroy() {
        this.subs && (this.subs.forEach(t=>t()),
        this.subs = void 0),
        this.io._destroy(this)
    }
    disconnect() {
        return this.connected && this.packet({
            type: k.DISCONNECT
        }),
        this.destroy(),
        this.connected && this.onclose("io client disconnect"),
        this
    }
    close() {
        return this.disconnect()
    }
    compress(t) {
        return this.flags.compress = t,
        this
    }
    get volatile() {
        return this.flags.volatile = !0,
        this
    }
    timeout(t) {
        return this.flags.timeout = t,
        this
    }
    onAny(t) {
        return this._anyListeners = this._anyListeners || [],
        this._anyListeners.push(t),
        this
    }
    prependAny(t) {
        return this._anyListeners = this._anyListeners || [],
        this._anyListeners.unshift(t),
        this
    }
    offAny(t) {
        if (!this._anyListeners)
            return this;
        if (t) {
            const e = this._anyListeners;
            for (let n = 0; n < e.length; n++)
                if (t === e[n])
                    return e.splice(n, 1),
                    this
        } else
            this._anyListeners = [];
        return this
    }
    listenersAny() {
        return this._anyListeners || []
    }
    onAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [],
        this._anyOutgoingListeners.push(t),
        this
    }
    prependAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [],
        this._anyOutgoingListeners.unshift(t),
        this
    }
    offAnyOutgoing(t) {
        if (!this._anyOutgoingListeners)
            return this;
        if (t) {
            const e = this._anyOutgoingListeners;
            for (let n = 0; n < e.length; n++)
                if (t === e[n])
                    return e.splice(n, 1),
                    this
        } else
            this._anyOutgoingListeners = [];
        return this
    }
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || []
    }
    notifyOutgoingListeners(t) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const e = this._anyOutgoingListeners.slice();
            for (const n of e)
                n.apply(this, t.data)
        }
    }
}
function it(s) {
    s = s || {},
    this.ms = s.min || 100,
    this.max = s.max || 1e4,
    this.factor = s.factor || 2,
    this.jitter = s.jitter > 0 && s.jitter <= 1 ? s.jitter : 0,
    this.attempts = 0
}
it.prototype.duration = function() {
    var s = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var t = Math.random()
          , e = Math.floor(t * this.jitter * s);
        s = Math.floor(t * 10) & 1 ? s + e : s - e
    }
    return Math.min(s, this.max) | 0
}
;
it.prototype.reset = function() {
    this.attempts = 0
}
;
it.prototype.setMin = function(s) {
    this.ms = s
}
;
it.prototype.setMax = function(s) {
    this.max = s
}
;
it.prototype.setJitter = function(s) {
    this.jitter = s
}
;
class $t extends I {
    constructor(t, e) {
        var n;
        super(),
        this.nsps = {},
        this.subs = [],
        t && typeof t == "object" && (e = t,
        t = void 0),
        e = e || {},
        e.path = e.path || "/socket.io",
        this.opts = e,
        dt(this, e),
        this.reconnection(e.reconnection !== !1),
        this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
        this.reconnectionDelay(e.reconnectionDelay || 1e3),
        this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
        this.randomizationFactor((n = e.randomizationFactor) !== null && n !== void 0 ? n : .5),
        this.backoff = new it({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }),
        this.timeout(e.timeout == null ? 2e4 : e.timeout),
        this._readyState = "closed",
        this.uri = t;
        const i = e.parser || Ie;
        this.encoder = new i.Encoder,
        this.decoder = new i.Decoder,
        this._autoConnect = e.autoConnect !== !1,
        this._autoConnect && this.open()
    }
    reconnection(t) {
        return arguments.length ? (this._reconnection = !!t,
        this) : this._reconnection
    }
    reconnectionAttempts(t) {
        return t === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = t,
        this)
    }
    reconnectionDelay(t) {
        var e;
        return t === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = t,
        (e = this.backoff) === null || e === void 0 || e.setMin(t),
        this)
    }
    randomizationFactor(t) {
        var e;
        return t === void 0 ? this._randomizationFactor : (this._randomizationFactor = t,
        (e = this.backoff) === null || e === void 0 || e.setJitter(t),
        this)
    }
    reconnectionDelayMax(t) {
        var e;
        return t === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t,
        (e = this.backoff) === null || e === void 0 || e.setMax(t),
        this)
    }
    timeout(t) {
        return arguments.length ? (this._timeout = t,
        this) : this._timeout
    }
    maybeReconnectOnOpen() {
        !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect()
    }
    open(t) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new nt(this.uri,this.opts);
        const e = this.engine
          , n = this;
        this._readyState = "opening",
        this.skipReconnect = !1;
        const i = W(e, "open", function() {
            n.onopen(),
            t && t()
        })
          , o = W(e, "error", u=>{
            n.cleanup(),
            n._readyState = "closed",
            this.emitReserved("error", u),
            t ? t(u) : n.maybeReconnectOnOpen()
        }
        );
        if (this._timeout !== !1) {
            const u = this._timeout;
            u === 0 && i();
            const d = this.setTimeoutFn(()=>{
                i(),
                e.close(),
                e.emit("error", new Error("timeout"))
            }
            , u);
            this.opts.autoUnref && d.unref(),
            this.subs.push(function() {
                clearTimeout(d)
            })
        }
        return this.subs.push(i),
        this.subs.push(o),
        this
    }
    connect(t) {
        return this.open(t)
    }
    onopen() {
        this.cleanup(),
        this._readyState = "open",
        this.emitReserved("open");
        const t = this.engine;
        this.subs.push(W(t, "ping", this.onping.bind(this)), W(t, "data", this.ondata.bind(this)), W(t, "error", this.onerror.bind(this)), W(t, "close", this.onclose.bind(this)), W(this.decoder, "decoded", this.ondecoded.bind(this)))
    }
    onping() {
        this.emitReserved("ping")
    }
    ondata(t) {
        try {
            this.decoder.add(t)
        } catch (e) {
            this.onclose("parse error", e)
        }
    }
    ondecoded(t) {
        Xt(()=>{
            this.emitReserved("packet", t)
        }
        , this.setTimeoutFn)
    }
    onerror(t) {
        this.emitReserved("error", t)
    }
    socket(t, e) {
        let n = this.nsps[t];
        return n || (n = new Qt(this,t,e),
        this.nsps[t] = n),
        n
    }
    _destroy(t) {
        const e = Object.keys(this.nsps);
        for (const n of e)
            if (this.nsps[n].active)
                return;
        this._close()
    }
    _packet(t) {
        const e = this.encoder.encode(t);
        for (let n = 0; n < e.length; n++)
            this.engine.write(e[n], t.options)
    }
    cleanup() {
        this.subs.forEach(t=>t()),
        this.subs.length = 0,
        this.decoder.destroy()
    }
    _close() {
        this.skipReconnect = !0,
        this._reconnecting = !1,
        this.onclose("forced close"),
        this.engine && this.engine.close()
    }
    disconnect() {
        return this._close()
    }
    onclose(t, e) {
        this.cleanup(),
        this.backoff.reset(),
        this._readyState = "closed",
        this.emitReserved("close", t, e),
        this._reconnection && !this.skipReconnect && this.reconnect()
    }
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts)
            this.backoff.reset(),
            this.emitReserved("reconnect_failed"),
            this._reconnecting = !1;
        else {
            const e = this.backoff.duration();
            this._reconnecting = !0;
            const n = this.setTimeoutFn(()=>{
                t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts),
                !t.skipReconnect && t.open(i=>{
                    i ? (t._reconnecting = !1,
                    t.reconnect(),
                    this.emitReserved("reconnect_error", i)) : t.onreconnect()
                }
                ))
            }
            , e);
            this.opts.autoUnref && n.unref(),
            this.subs.push(function() {
                clearTimeout(n)
            })
        }
    }
    onreconnect() {
        const t = this.backoff.attempts;
        this._reconnecting = !1,
        this.backoff.reset(),
        this.emitReserved("reconnect", t)
    }
}
const rt = {};
function lt(s, t) {
    typeof s == "object" && (t = s,
    s = void 0),
    t = t || {};
    const e = Ae(s, t.path || "/socket.io")
      , n = e.source
      , i = e.id
      , o = e.path
      , u = rt[i] && o in rt[i].nsps
      , d = t.forceNew || t["force new connection"] || t.multiplex === !1 || u;
    let g;
    return d ? g = new $t(n,t) : (rt[i] || (rt[i] = new $t(n,t)),
    g = rt[i]),
    e.query && !t.query && (t.query = e.queryKey),
    g.socket(e.path, t)
}
Object.assign(lt, {
    Manager: $t,
    Socket: Qt,
    io: lt,
    connect: lt
});
var at = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , St = {}
  , qe = {
    get exports() {
        return St
    },
    set exports(s) {
        St = s
    }
};
(function(s, t) {
    (function(e, n) {
        s.exports = n()
    }
    )(at, function() {
        var e = 1e3
          , n = 6e4
          , i = 36e5
          , o = "millisecond"
          , u = "second"
          , d = "minute"
          , g = "hour"
          , b = "day"
          , C = "week"
          , T = "month"
          , O = "quarter"
          , D = "year"
          , A = "date"
          , r = "Invalid Date"
          , f = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
          , S = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
          , v = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            ordinal: function(p) {
                var c = ["th", "st", "nd", "rd"]
                  , a = p % 100;
                return "[" + p + (c[(a - 20) % 10] || c[a] || c[0]) + "]"
            }
        }
          , x = function(p, c, a) {
            var y = String(p);
            return !y || y.length >= c ? p : "" + Array(c + 1 - y.length).join(a) + p
        }
          , Y = {
            s: x,
            z: function(p) {
                var c = -p.utcOffset()
                  , a = Math.abs(c)
                  , y = Math.floor(a / 60)
                  , h = a % 60;
                return (c <= 0 ? "+" : "-") + x(y, 2, "0") + ":" + x(h, 2, "0")
            },
            m: function p(c, a) {
                if (c.date() < a.date())
                    return -p(a, c);
                var y = 12 * (a.year() - c.year()) + (a.month() - c.month())
                  , h = c.clone().add(y, T)
                  , m = a - h < 0
                  , l = c.clone().add(y + (m ? -1 : 1), T);
                return +(-(y + (a - h) / (m ? h - l : l - h)) || 0)
            },
            a: function(p) {
                return p < 0 ? Math.ceil(p) || 0 : Math.floor(p)
            },
            p: function(p) {
                return {
                    M: T,
                    y: D,
                    w: C,
                    d: b,
                    D: A,
                    h: g,
                    m: d,
                    s: u,
                    ms: o,
                    Q: O
                }[p] || String(p || "").toLowerCase().replace(/s$/, "")
            },
            u: function(p) {
                return p === void 0
            }
        }
          , M = "en"
          , N = {};
        N[M] = v;
        var B = function(p) {
            return p instanceof H
        }
          , P = function p(c, a, y) {
            var h;
            if (!c)
                return M;
            if (typeof c == "string") {
                var m = c.toLowerCase();
                N[m] && (h = m),
                a && (N[m] = a,
                h = m);
                var l = c.split("-");
                if (!h && l.length > 1)
                    return p(l[0])
            } else {
                var _ = c.name;
                N[_] = c,
                h = _
            }
            return !y && h && (M = h),
            h || !y && M
        }
          , E = function(p, c) {
            if (B(p))
                return p.clone();
            var a = typeof c == "object" ? c : {};
            return a.date = p,
            a.args = arguments,
            new H(a)
        }
          , w = Y;
        w.l = P,
        w.i = B,
        w.w = function(p, c) {
            return E(p, {
                locale: c.$L,
                utc: c.$u,
                x: c.$x,
                $offset: c.$offset
            })
        }
        ;
        var H = function() {
            function p(a) {
                this.$L = P(a.locale, null, !0),
                this.parse(a)
            }
            var c = p.prototype;
            return c.parse = function(a) {
                this.$d = function(y) {
                    var h = y.date
                      , m = y.utc;
                    if (h === null)
                        return new Date(NaN);
                    if (w.u(h))
                        return new Date;
                    if (h instanceof Date)
                        return new Date(h);
                    if (typeof h == "string" && !/Z$/i.test(h)) {
                        var l = h.match(f);
                        if (l) {
                            var _ = l[2] - 1 || 0
                              , R = (l[7] || "0").substring(0, 3);
                            return m ? new Date(Date.UTC(l[1], _, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, R)) : new Date(l[1],_,l[3] || 1,l[4] || 0,l[5] || 0,l[6] || 0,R)
                        }
                    }
                    return new Date(h)
                }(a),
                this.$x = a.x || {},
                this.init()
            }
            ,
            c.init = function() {
                var a = this.$d;
                this.$y = a.getFullYear(),
                this.$M = a.getMonth(),
                this.$D = a.getDate(),
                this.$W = a.getDay(),
                this.$H = a.getHours(),
                this.$m = a.getMinutes(),
                this.$s = a.getSeconds(),
                this.$ms = a.getMilliseconds()
            }
            ,
            c.$utils = function() {
                return w
            }
            ,
            c.isValid = function() {
                return this.$d.toString() !== r
            }
            ,
            c.isSame = function(a, y) {
                var h = E(a);
                return this.startOf(y) <= h && h <= this.endOf(y)
            }
            ,
            c.isAfter = function(a, y) {
                return E(a) < this.startOf(y)
            }
            ,
            c.isBefore = function(a, y) {
                return this.endOf(y) < E(a)
            }
            ,
            c.$g = function(a, y, h) {
                return w.u(a) ? this[y] : this.set(h, a)
            }
            ,
            c.unix = function() {
                return Math.floor(this.valueOf() / 1e3)
            }
            ,
            c.valueOf = function() {
                return this.$d.getTime()
            }
            ,
            c.startOf = function(a, y) {
                var h = this
                  , m = !!w.u(y) || y
                  , l = w.p(a)
                  , _ = function(Z, z) {
                    var F = w.w(h.$u ? Date.UTC(h.$y, z, Z) : new Date(h.$y,z,Z), h);
                    return m ? F : F.endOf(b)
                }
                  , R = function(Z, z) {
                    return w.w(h.toDate()[Z].apply(h.toDate("s"), (m ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(z)), h)
                }
                  , L = this.$W
                  , q = this.$M
                  , K = this.$D
                  , V = "set" + (this.$u ? "UTC" : "");
                switch (l) {
                case D:
                    return m ? _(1, 0) : _(31, 11);
                case T:
                    return m ? _(1, q) : _(0, q + 1);
                case C:
                    var st = this.$locale().weekStart || 0
                      , G = (L < st ? L + 7 : L) - st;
                    return _(m ? K - G : K + (6 - G), q);
                case b:
                case A:
                    return R(V + "Hours", 0);
                case g:
                    return R(V + "Minutes", 1);
                case d:
                    return R(V + "Seconds", 2);
                case u:
                    return R(V + "Milliseconds", 3);
                default:
                    return this.clone()
                }
            }
            ,
            c.endOf = function(a) {
                return this.startOf(a, !1)
            }
            ,
            c.$set = function(a, y) {
                var h, m = w.p(a), l = "set" + (this.$u ? "UTC" : ""), _ = (h = {},
                h[b] = l + "Date",
                h[A] = l + "Date",
                h[T] = l + "Month",
                h[D] = l + "FullYear",
                h[g] = l + "Hours",
                h[d] = l + "Minutes",
                h[u] = l + "Seconds",
                h[o] = l + "Milliseconds",
                h)[m], R = m === b ? this.$D + (y - this.$W) : y;
                if (m === T || m === D) {
                    var L = this.clone().set(A, 1);
                    L.$d[_](R),
                    L.init(),
                    this.$d = L.set(A, Math.min(this.$D, L.daysInMonth())).$d
                } else
                    _ && this.$d[_](R);
                return this.init(),
                this
            }
            ,
            c.set = function(a, y) {
                return this.clone().$set(a, y)
            }
            ,
            c.get = function(a) {
                return this[w.p(a)]()
            }
            ,
            c.add = function(a, y) {
                var h, m = this;
                a = Number(a);
                var l = w.p(y)
                  , _ = function(q) {
                    var K = E(m);
                    return w.w(K.date(K.date() + Math.round(q * a)), m)
                };
                if (l === T)
                    return this.set(T, this.$M + a);
                if (l === D)
                    return this.set(D, this.$y + a);
                if (l === b)
                    return _(1);
                if (l === C)
                    return _(7);
                var R = (h = {},
                h[d] = n,
                h[g] = i,
                h[u] = e,
                h)[l] || 1
                  , L = this.$d.getTime() + a * R;
                return w.w(L, this)
            }
            ,
            c.subtract = function(a, y) {
                return this.add(-1 * a, y)
            }
            ,
            c.format = function(a) {
                var y = this
                  , h = this.$locale();
                if (!this.isValid())
                    return h.invalidDate || r;
                var m = a || "YYYY-MM-DDTHH:mm:ssZ"
                  , l = w.z(this)
                  , _ = this.$H
                  , R = this.$m
                  , L = this.$M
                  , q = h.weekdays
                  , K = h.months
                  , V = function(z, F, Q, j) {
                    return z && (z[F] || z(y, m)) || Q[F].slice(0, j)
                }
                  , st = function(z) {
                    return w.s(_ % 12 || 12, z, "0")
                }
                  , G = h.meridiem || function(z, F, Q) {
                    var j = z < 12 ? "AM" : "PM";
                    return Q ? j.toLowerCase() : j
                }
                  , Z = {
                    YY: String(this.$y).slice(-2),
                    YYYY: this.$y,
                    M: L + 1,
                    MM: w.s(L + 1, 2, "0"),
                    MMM: V(h.monthsShort, L, K, 3),
                    MMMM: V(K, L),
                    D: this.$D,
                    DD: w.s(this.$D, 2, "0"),
                    d: String(this.$W),
                    dd: V(h.weekdaysMin, this.$W, q, 2),
                    ddd: V(h.weekdaysShort, this.$W, q, 3),
                    dddd: q[this.$W],
                    H: String(_),
                    HH: w.s(_, 2, "0"),
                    h: st(1),
                    hh: st(2),
                    a: G(_, R, !0),
                    A: G(_, R, !1),
                    m: String(R),
                    mm: w.s(R, 2, "0"),
                    s: String(this.$s),
                    ss: w.s(this.$s, 2, "0"),
                    SSS: w.s(this.$ms, 3, "0"),
                    Z: l
                };
                return m.replace(S, function(z, F) {
                    return F || Z[z] || l.replace(":", "")
                })
            }
            ,
            c.utcOffset = function() {
                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
            }
            ,
            c.diff = function(a, y, h) {
                var m, l = w.p(y), _ = E(a), R = (_.utcOffset() - this.utcOffset()) * n, L = this - _, q = w.m(this, _);
                return q = (m = {},
                m[D] = q / 12,
                m[T] = q,
                m[O] = q / 3,
                m[C] = (L - R) / 6048e5,
                m[b] = (L - R) / 864e5,
                m[g] = L / i,
                m[d] = L / n,
                m[u] = L / e,
                m)[l] || L,
                h ? q : w.a(q)
            }
            ,
            c.daysInMonth = function() {
                return this.endOf(T).$D
            }
            ,
            c.$locale = function() {
                return N[this.$L]
            }
            ,
            c.locale = function(a, y) {
                if (!a)
                    return this.$L;
                var h = this.clone()
                  , m = P(a, y, !0);
                return m && (h.$L = m),
                h
            }
            ,
            c.clone = function() {
                return w.w(this.$d, this)
            }
            ,
            c.toDate = function() {
                return new Date(this.valueOf())
            }
            ,
            c.toJSON = function() {
                return this.isValid() ? this.toISOString() : null
            }
            ,
            c.toISOString = function() {
                return this.$d.toISOString()
            }
            ,
            c.toString = function() {
                return this.$d.toUTCString()
            }
            ,
            p
        }()
          , U = H.prototype;
        return E.prototype = U,
        [["$ms", o], ["$s", u], ["$m", d], ["$H", g], ["$W", b], ["$M", T], ["$y", D], ["$D", A]].forEach(function(p) {
            U[p[1]] = function(c) {
                return this.$g(c, p[0], p[1])
            }
        }),
        E.extend = function(p, c) {
            return p.$i || (p(c, H, E),
            p.$i = !0),
            E
        }
        ,
        E.locale = P,
        E.isDayjs = B,
        E.unix = function(p) {
            return E(1e3 * p)
        }
        ,
        E.en = N[M],
        E.Ls = N,
        E.p = {},
        E
    })
}
)(qe);
const et = St;
var Ot = {}
  , ze = {
    get exports() {
        return Ot
    },
    set exports(s) {
        Ot = s
    }
};
(function(s, t) {
    (function(e, n) {
        s.exports = n()
    }
    )(at, function() {
        var e = "minute"
          , n = /[+-]\d\d(?::?\d\d)?/g
          , i = /([+-]|\d\d)/g;
        return function(o, u, d) {
            var g = u.prototype;
            d.utc = function(r) {
                var f = {
                    date: r,
                    utc: !0,
                    args: arguments
                };
                return new u(f)
            }
            ,
            g.utc = function(r) {
                var f = d(this.toDate(), {
                    locale: this.$L,
                    utc: !0
                });
                return r ? f.add(this.utcOffset(), e) : f
            }
            ,
            g.local = function() {
                return d(this.toDate(), {
                    locale: this.$L,
                    utc: !1
                })
            }
            ;
            var b = g.parse;
            g.parse = function(r) {
                r.utc && (this.$u = !0),
                this.$utils().u(r.$offset) || (this.$offset = r.$offset),
                b.call(this, r)
            }
            ;
            var C = g.init;
            g.init = function() {
                if (this.$u) {
                    var r = this.$d;
                    this.$y = r.getUTCFullYear(),
                    this.$M = r.getUTCMonth(),
                    this.$D = r.getUTCDate(),
                    this.$W = r.getUTCDay(),
                    this.$H = r.getUTCHours(),
                    this.$m = r.getUTCMinutes(),
                    this.$s = r.getUTCSeconds(),
                    this.$ms = r.getUTCMilliseconds()
                } else
                    C.call(this)
            }
            ;
            var T = g.utcOffset;
            g.utcOffset = function(r, f) {
                var S = this.$utils().u;
                if (S(r))
                    return this.$u ? 0 : S(this.$offset) ? T.call(this) : this.$offset;
                if (typeof r == "string" && (r = function(M) {
                    M === void 0 && (M = "");
                    var N = M.match(n);
                    if (!N)
                        return null;
                    var B = ("" + N[0]).match(i) || ["-", 0, 0]
                      , P = B[0]
                      , E = 60 * +B[1] + +B[2];
                    return E === 0 ? 0 : P === "+" ? E : -E
                }(r),
                r === null))
                    return this;
                var v = Math.abs(r) <= 16 ? 60 * r : r
                  , x = this;
                if (f)
                    return x.$offset = v,
                    x.$u = r === 0,
                    x;
                if (r !== 0) {
                    var Y = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                    (x = this.local().add(v + Y, e)).$offset = v,
                    x.$x.$localOffset = Y
                } else
                    x = this.utc();
                return x
            }
            ;
            var O = g.format;
            g.format = function(r) {
                var f = r || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return O.call(this, f)
            }
            ,
            g.valueOf = function() {
                var r = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                return this.$d.valueOf() - 6e4 * r
            }
            ,
            g.isUTC = function() {
                return !!this.$u
            }
            ,
            g.toISOString = function() {
                return this.toDate().toISOString()
            }
            ,
            g.toString = function() {
                return this.toDate().toUTCString()
            }
            ;
            var D = g.toDate;
            g.toDate = function(r) {
                return r === "s" && this.$offset ? d(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : D.call(this)
            }
            ;
            var A = g.diff;
            g.diff = function(r, f, S) {
                if (r && this.$u === r.$u)
                    return A.call(this, r, f, S);
                var v = this.local()
                  , x = d(r).local();
                return A.call(v, x, f, S)
            }
        }
    })
}
)(ze);
const Ue = Ot;
var kt = {}
  , Fe = {
    get exports() {
        return kt
    },
    set exports(s) {
        kt = s
    }
};
(function(s, t) {
    (function(e, n) {
        s.exports = n()
    }
    )(at, function() {
        var e = {
            year: 0,
            month: 1,
            day: 2,
            hour: 3,
            minute: 4,
            second: 5
        }
          , n = {};
        return function(i, o, u) {
            var d, g = function(O, D, A) {
                A === void 0 && (A = {});
                var r = new Date(O)
                  , f = function(S, v) {
                    v === void 0 && (v = {});
                    var x = v.timeZoneName || "short"
                      , Y = S + "|" + x
                      , M = n[Y];
                    return M || (M = new Intl.DateTimeFormat("en-US",{
                        hour12: !1,
                        timeZone: S,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZoneName: x
                    }),
                    n[Y] = M),
                    M
                }(D, A);
                return f.formatToParts(r)
            }, b = function(O, D) {
                for (var A = g(O, D), r = [], f = 0; f < A.length; f += 1) {
                    var S = A[f]
                      , v = S.type
                      , x = S.value
                      , Y = e[v];
                    Y >= 0 && (r[Y] = parseInt(x, 10))
                }
                var M = r[3]
                  , N = M === 24 ? 0 : M
                  , B = r[0] + "-" + r[1] + "-" + r[2] + " " + N + ":" + r[4] + ":" + r[5] + ":000"
                  , P = +O;
                return (u.utc(B).valueOf() - (P -= P % 1e3)) / 6e4
            }, C = o.prototype;
            C.tz = function(O, D) {
                O === void 0 && (O = d);
                var A = this.utcOffset()
                  , r = this.toDate()
                  , f = r.toLocaleString("en-US", {
                    timeZone: O
                })
                  , S = Math.round((r - new Date(f)) / 1e3 / 60)
                  , v = u(f).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(r.getTimezoneOffset() / 15) - S, !0);
                if (D) {
                    var x = v.utcOffset();
                    v = v.add(A - x, "minute")
                }
                return v.$x.$timezone = O,
                v
            }
            ,
            C.offsetName = function(O) {
                var D = this.$x.$timezone || u.tz.guess()
                  , A = g(this.valueOf(), D, {
                    timeZoneName: O
                }).find(function(r) {
                    return r.type.toLowerCase() === "timezonename"
                });
                return A && A.value
            }
            ;
            var T = C.startOf;
            C.startOf = function(O, D) {
                if (!this.$x || !this.$x.$timezone)
                    return T.call(this, O, D);
                var A = u(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
                return T.call(A, O, D).tz(this.$x.$timezone, !0)
            }
            ,
            u.tz = function(O, D, A) {
                var r = A && D
                  , f = A || D || d
                  , S = b(+u(), f);
                if (typeof O != "string")
                    return u(O).tz(f);
                var v = function(N, B, P) {
                    var E = N - 60 * B * 1e3
                      , w = b(E, P);
                    if (B === w)
                        return [E, B];
                    var H = b(E -= 60 * (w - B) * 1e3, P);
                    return w === H ? [E, w] : [N - 60 * Math.min(w, H) * 1e3, Math.max(w, H)]
                }(u.utc(O, r).valueOf(), S, f)
                  , x = v[0]
                  , Y = v[1]
                  , M = u(x).utcOffset(Y);
                return M.$x.$timezone = f,
                M
            }
            ,
            u.tz.guess = function() {
                return Intl.DateTimeFormat().resolvedOptions().timeZone
            }
            ,
            u.tz.setDefault = function(O) {
                d = O
            }
        }
    })
}
)(Fe);
const Ve = kt;
var Et = {}
  , We = {
    get exports() {
        return Et
    },
    set exports(s) {
        Et = s
    }
};
(function(s, t) {
    (function(e, n) {
        s.exports = n()
    }
    )(at, function() {
        return function(e, n, i) {
            n.prototype.isBetween = function(o, u, d, g) {
                var b = i(o)
                  , C = i(u)
                  , T = (g = g || "()")[0] === "("
                  , O = g[1] === ")";
                return (T ? this.isAfter(b, d) : !this.isBefore(b, d)) && (O ? this.isBefore(C, d) : !this.isAfter(C, d)) || (T ? this.isBefore(b, d) : !this.isAfter(b, d)) && (O ? this.isAfter(C, d) : !this.isBefore(C, d))
            }
        }
    })
}
)(We);
const Ke = Et;
var _t = {}
  , Ze = {
    get exports() {
        return _t
    },
    set exports(s) {
        _t = s
    }
};
(function(s, t) {
    (function(e, n) {
        s.exports = n()
    }
    )(at, function() {
        var e = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }
          , n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g
          , i = /\d\d/
          , o = /\d\d?/
          , u = /\d*[^-_:/,()\s\d]+/
          , d = {}
          , g = function(r) {
            return (r = +r) + (r > 68 ? 1900 : 2e3)
        }
          , b = function(r) {
            return function(f) {
                this[r] = +f
            }
        }
          , C = [/[+-]\d\d:?(\d\d)?|Z/, function(r) {
            (this.zone || (this.zone = {})).offset = function(f) {
                if (!f || f === "Z")
                    return 0;
                var S = f.match(/([+-]|\d\d)/g)
                  , v = 60 * S[1] + (+S[2] || 0);
                return v === 0 ? 0 : S[0] === "+" ? -v : v
            }(r)
        }
        ]
          , T = function(r) {
            var f = d[r];
            return f && (f.indexOf ? f : f.s.concat(f.f))
        }
          , O = function(r, f) {
            var S, v = d.meridiem;
            if (v) {
                for (var x = 1; x <= 24; x += 1)
                    if (r.indexOf(v(x, 0, f)) > -1) {
                        S = x > 12;
                        break
                    }
            } else
                S = r === (f ? "pm" : "PM");
            return S
        }
          , D = {
            A: [u, function(r) {
                this.afternoon = O(r, !1)
            }
            ],
            a: [u, function(r) {
                this.afternoon = O(r, !0)
            }
            ],
            S: [/\d/, function(r) {
                this.milliseconds = 100 * +r
            }
            ],
            SS: [i, function(r) {
                this.milliseconds = 10 * +r
            }
            ],
            SSS: [/\d{3}/, function(r) {
                this.milliseconds = +r
            }
            ],
            s: [o, b("seconds")],
            ss: [o, b("seconds")],
            m: [o, b("minutes")],
            mm: [o, b("minutes")],
            H: [o, b("hours")],
            h: [o, b("hours")],
            HH: [o, b("hours")],
            hh: [o, b("hours")],
            D: [o, b("day")],
            DD: [i, b("day")],
            Do: [u, function(r) {
                var f = d.ordinal
                  , S = r.match(/\d+/);
                if (this.day = S[0],
                f)
                    for (var v = 1; v <= 31; v += 1)
                        f(v).replace(/\[|\]/g, "") === r && (this.day = v)
            }
            ],
            M: [o, b("month")],
            MM: [i, b("month")],
            MMM: [u, function(r) {
                var f = T("months")
                  , S = (T("monthsShort") || f.map(function(v) {
                    return v.slice(0, 3)
                })).indexOf(r) + 1;
                if (S < 1)
                    throw new Error;
                this.month = S % 12 || S
            }
            ],
            MMMM: [u, function(r) {
                var f = T("months").indexOf(r) + 1;
                if (f < 1)
                    throw new Error;
                this.month = f % 12 || f
            }
            ],
            Y: [/[+-]?\d+/, b("year")],
            YY: [i, function(r) {
                this.year = g(r)
            }
            ],
            YYYY: [/\d{4}/, b("year")],
            Z: C,
            ZZ: C
        };
        function A(r) {
            var f, S;
            f = r,
            S = d && d.formats;
            for (var v = (r = f.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(E, w, H) {
                var U = H && H.toUpperCase();
                return w || S[H] || e[H] || S[U].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(p, c, a) {
                    return c || a.slice(1)
                })
            })).match(n), x = v.length, Y = 0; Y < x; Y += 1) {
                var M = v[Y]
                  , N = D[M]
                  , B = N && N[0]
                  , P = N && N[1];
                v[Y] = P ? {
                    regex: B,
                    parser: P
                } : M.replace(/^\[|\]$/g, "")
            }
            return function(E) {
                for (var w = {}, H = 0, U = 0; H < x; H += 1) {
                    var p = v[H];
                    if (typeof p == "string")
                        U += p.length;
                    else {
                        var c = p.regex
                          , a = p.parser
                          , y = E.slice(U)
                          , h = c.exec(y)[0];
                        a.call(w, h),
                        E = E.replace(h, "")
                    }
                }
                return function(m) {
                    var l = m.afternoon;
                    if (l !== void 0) {
                        var _ = m.hours;
                        l ? _ < 12 && (m.hours += 12) : _ === 12 && (m.hours = 0),
                        delete m.afternoon
                    }
                }(w),
                w
            }
        }
        return function(r, f, S) {
            S.p.customParseFormat = !0,
            r && r.parseTwoDigitYear && (g = r.parseTwoDigitYear);
            var v = f.prototype
              , x = v.parse;
            v.parse = function(Y) {
                var M = Y.date
                  , N = Y.utc
                  , B = Y.args;
                this.$u = N;
                var P = B[1];
                if (typeof P == "string") {
                    var E = B[2] === !0
                      , w = B[3] === !0
                      , H = E || w
                      , U = B[2];
                    w && (U = B[2]),
                    d = this.$locale(),
                    !E && U && (d = S.Ls[U]),
                    this.$d = function(y, h, m) {
                        try {
                            if (["x", "X"].indexOf(h) > -1)
                                return new Date((h === "X" ? 1e3 : 1) * y);
                            var l = A(h)(y)
                              , _ = l.year
                              , R = l.month
                              , L = l.day
                              , q = l.hours
                              , K = l.minutes
                              , V = l.seconds
                              , st = l.milliseconds
                              , G = l.zone
                              , Z = new Date
                              , z = L || (_ || R ? 1 : Z.getDate())
                              , F = _ || Z.getFullYear()
                              , Q = 0;
                            _ && !R || (Q = R > 0 ? R - 1 : Z.getMonth());
                            var j = q || 0
                              , pt = K || 0
                              , mt = V || 0
                              , yt = st || 0;
                            return G ? new Date(Date.UTC(F, Q, z, j, pt, mt, yt + 60 * G.offset * 1e3)) : m ? new Date(Date.UTC(F, Q, z, j, pt, mt, yt)) : new Date(F,Q,z,j,pt,mt,yt)
                        } catch {
                            return new Date("")
                        }
                    }(M, P, N),
                    this.init(),
                    U && U !== !0 && (this.$L = this.locale(U).$L),
                    H && M != this.format(P) && (this.$d = new Date("")),
                    d = {}
                } else if (P instanceof Array)
                    for (var p = P.length, c = 1; c <= p; c += 1) {
                        B[1] = P[c - 1];
                        var a = S.apply(this, B);
                        if (a.isValid()) {
                            this.$d = a.$d,
                            this.$L = a.$L,
                            this.init();
                            break
                        }
                        c === p && (this.$d = new Date(""))
                    }
                else
                    x.call(this, Y)
            }
        }
    })
}
)(Ze);
const Je = _t;
et.extend(Ue);
et.extend(Ve);
et.extend(Je);
et.extend(Ke);
et.tz.setDefault("Asia/Karachi");
const Xe = lozad();
Xe.observe();
function At() {
    const s = new XMLHttpRequest;
    s.onreadystatechange = function() {
        this.readyState === 4 && this.status === 200 && (document.getElementById("online-users").innerText = `Online users: ${this.responseText}`)
    }
    ,
    s.open("GET", `${window.location.origin}/visitors.php`),
    s.send()
}
setInterval(function() {
    document.getElementById("localdate").innerHTML = et().tz("Asia/Karachi").format("DD-MM-YYYY h:mm:ss")
}, 1e3);
$(".tournament").click(function(s) {
    window.location.href = s.target.href
});
async function Ge() {
    try {
        const s = document.getElementById("results")
          , t = s.querySelector("thead")
          , e = t.querySelectorAll("th")
          , n = s.querySelector("tbody");
        let i = $("#total-h a")[0], o = i.textContent, u;
        if (o !== "add row") {
            for (; i.nodeName !== "TH"; )
                i = i.parentNode;
            u = Array.prototype.indexOf.call(e, i),
            tinysort(n.querySelectorAll("tr"), {
                selector: "td:nth-child(" + (u + 1) + ")",
                data: "total",
                order: "desc"
            })
        }
    } catch (s) {
        console.log(s)
    } finally {
        At()
    }
}
function Qe() {
    $("table tr").each(function(s) {
        $(this).find("td:nth-child(1)").html(s)
    })
}
$(document).ready(function() {
    setTimeout(function() {
        At(),
        jt()
    }, 100)
});
function jt() {
    $("#table-body tr").each(function() {
        $(this).find("td").each(function() {
            if ($(this).attr("data-timestamp") !== void 0) {
                let s = $(this).attr("data-timestamp");
                s = et(s);
                const t = et().tz("Asia/Karachi")
                  , e = s.add(20, "m")
                  , n = s.subtract(20, "m");
                t.isBetween(e, n) ? $(this).addClass("blink") : $(this).removeClass("blink")
            }
        })
    })
}
setInterval(function() {
    At()
}, 3e4);
const je = lt("https://live.i1yas.top", {
    transports: ["websocket", "polling"]
});
async function ts(s) {
    s.on("welcome", function(t) {
        console.log(t)
    }),
    s.on("score-updated:piplan", async function(t) {
        $(`#${t.id}`).empty(),
        $(`#${t.totalId}`).empty(),
        $(`#${t.id}`).append(t.time),
        $(`#${t.id}`).addClass("blink"),
        $(`#${t.id}`).attr("data-timestamp", t.timestamp),
        $(`#${t.totalId}`).append(t.total),
        $(`#${t.totalId}`).attr("data-total", `${t.totalInSeconds}`),
        await Ge(),
        await Qe(),
        await jt()
    })
}
ts(je);
