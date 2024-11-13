// dark mode

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check if user preference exists in local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  body.classList.add(currentTheme);
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Store user preference in local storage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.setItem("theme", "");
  }
});

// форма заполнения

(diffview = {
  buildView: function (d) {
    var n = d.baseTextLines,
      p = d.newTextLines,
      l = d.opcodes,
      A = d.baseTextName ? d.baseTextName : "Base Text",
      z = d.newTextName ? d.newTextName : "New Text",
      v = d.contextSize,
      m = d.viewType == 0 || d.viewType == 1 ? d.viewType : 0,
      h,
      a,
      i,
      r,
      b,
      e,
      t,
      g,
      u,
      x,
      o,
      s,
      c,
      q,
      B;
    if (n == null)
      throw "Cannot build diff view; baseTextLines is not defined.";
    if (p == null) throw "Cannot build diff view; newTextLines is not defined.";
    if (!l) throw "Canno build diff view; opcodes is not defined.";
    function w(b, c) {
      var a = document.createElement(b);
      return (a.className = c), a;
    }
    function j(b, c) {
      var a = document.createElement(b);
      return a.appendChild(document.createTextNode(c)), a;
    }
    function f(b, c, d) {
      var a = document.createElement(b);
      return (a.className = c), a.appendChild(document.createTextNode(d)), a;
    }
    (h = document.createElement("thead")),
      (a = document.createElement("tr")),
      h.appendChild(a),
      m
        ? (a.appendChild(document.createElement("th")),
          a.appendChild(document.createElement("th")),
          a.appendChild(f("th", "texttitle", A + " vs. " + z)))
        : (a.appendChild(document.createElement("th")),
          a.appendChild(f("th", "texttitle", A)),
          a.appendChild(document.createElement("th")),
          a.appendChild(f("th", "texttitle", z))),
      (h = [h]),
      (i = []);
    function y(b, a, c, d, e) {
      return a < c
        ? (b.appendChild(j("th", (a + 1).toString())),
          b.appendChild(
            f("td", e, d[a].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0"))
          ),
          a + 1)
        : (b.appendChild(document.createElement("th")),
          b.appendChild(w("td", "empty")),
          a);
    }
    function k(b, a, c, d, e) {
      b.appendChild(j("th", a == null ? "" : (a + 1).toString())),
        b.appendChild(j("th", c == null ? "" : (c + 1).toString())),
        b.appendChild(
          f(
            "td",
            e,
            d[a != null ? a : c].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")
          )
        );
    }
    for (b = 0; b < l.length; b++) {
      (code = l[b]),
        (change = code[0]),
        (e = code[1]),
        (t = code[2]),
        (g = code[3]),
        (u = code[4]),
        (x = Math.max(t - e, u - g)),
        (o = []),
        (s = []);
      for (c = 0; c < x; c++) {
        if (
          v &&
          l.length > 1 &&
          ((b > 0 && c == v) || (b == 0 && c == 0)) &&
          change == "equal"
        )
          if (((q = x - (b == 0 ? 1 : 2) * v), q > 1)) {
            if (
              (o.push((a = document.createElement("tr"))),
              (e += q),
              (g += q),
              (c += q - 1),
              a.appendChild(j("th", "...")),
              m || a.appendChild(f("td", "skip", "")),
              a.appendChild(j("th", "...")),
              a.appendChild(f("td", "skip", "")),
              b + 1 == l.length)
            )
              break;
            continue;
          }
        o.push((a = document.createElement("tr"))),
          m
            ? change == "insert"
              ? k(a, null, g++, p, change)
              : change == "replace"
              ? (s.push((r = document.createElement("tr"))),
                e < t && k(a, e++, null, n, "delete"),
                g < u && k(r, null, g++, p, "insert"))
              : change == "delete"
              ? k(a, e++, null, n, change)
              : k(a, e++, g++, n, change)
            : ((e = y(a, e, t, n, change)), (g = y(a, g, u, p, change)));
      }
      for (c = 0; c < o.length; c++) i.push(o[c]);
      for (c = 0; c < s.length; c++) i.push(s[c]);
    }
    i.push((a = f("th", "author", ""))),
      a.setAttribute("colspan", m ? 3 : 4),
      a.appendChild((r = j("a", ""))),
      r.setAttribute("href", ""),
      h.push((a = document.createElement("tbody")));
    for (b in i) i.hasOwnProperty(b) && a.appendChild(i[b]);
    a = w("table", "diff" + (m ? " inlinediff" : ""));
    for (b in h) h.hasOwnProperty(b) && a.appendChild(h[b]);
    return (
      (B = document.createElement("colgroup")),
      (tableThead = a.querySelector("thead")),
      (B.innerHTML =
        '<col class="diff__col-1"><col class="diff__col-2"><col class="diff__col-3"><col class="diff__col-4">'),
      a.insertBefore(B, tableThead),
      a
    );
  },
}),
  (__whitespace = {
    " ": !0,
    "\t": !0,
    "\n": !0,
    "\f": !0,
    "\r": !0,
  }),
  (difflib = {
    defaultJunkFunction: function (a) {
      return __whitespace.hasOwnProperty(a);
    },
    stripLinebreaks: function (a) {
      return a.replace(/^[\n\r]*|[\n\r]*$/g, "");
    },
    stringAsLines: function (c) {
      for (
        var e = c.indexOf("\n"),
          d = c.indexOf("\r"),
          f = (e > -1 && d > -1) || d < 0 ? "\n" : "\r",
          a = c.split(f),
          b = 0;
        b < a.length;
        b++
      )
        a[b] = difflib.stripLinebreaks(a[b]);
      return a;
    },
    __reduce: function (e, c, d) {
      var a, b;
      if (d != null) (a = d), (b = 0);
      else if (c) (a = c[0]), (b = 1);
      else return null;
      for (; b < c.length; b++) a = e(a, c[b]);
      return a;
    },
    __ntuplecomp: function (b, c) {
      for (var d = Math.max(b.length, c.length), a = 0; a < d; a++) {
        if (b[a] < c[a]) return -1;
        if (b[a] > c[a]) return 1;
      }
      return b.length == c.length ? 0 : b.length < c.length ? -1 : 1;
    },
    __calculate_ratio: function (b, a) {
      return a ? (2 * b) / a : 1;
    },
    __isindict: function (a) {
      return function (b) {
        return a.hasOwnProperty(b);
      };
    },
    __dictget: function (a, b, c) {
      return a.hasOwnProperty(b) ? a[b] : c;
    },
    SequenceMatcher: function (b, c, a) {
      (this.set_seqs = function (a, b) {
        this.set_seq1(a), this.set_seq2(b);
      }),
        (this.set_seq1 = function (a) {
          if (a == this.a) return;
          (this.a = a), (this.matching_blocks = this.opcodes = null);
        }),
        (this.set_seq2 = function (a) {
          if (a == this.b) return;
          (this.b = a),
            (this.matching_blocks = this.opcodes = this.fullbcount = null),
            this.__chain_b();
        }),
        (this.__chain_b = function () {
          for (
            var e = this.b,
              i = e.length,
              b = (this.b2j = {}),
              c = {},
              d = 0,
              a,
              h,
              f,
              g;
            d < e.length;
            d++
          )
            (a = e[d]),
              b.hasOwnProperty(a)
                ? ((h = b[a]),
                  i >= 200 && h.length * 100 > i
                    ? ((c[a] = 1), delete b[a])
                    : h.push(d))
                : (b[a] = [d]);
          for (a in c) c.hasOwnProperty(a) && delete b[a];
          if (((f = this.isjunk), (g = {}), f)) {
            for (a in c)
              c.hasOwnProperty(a) && f(a) && ((g[a] = 1), delete c[a]);
            for (a in b)
              b.hasOwnProperty(a) && f(a) && ((g[a] = 1), delete b[a]);
          }
          (this.isbjunk = difflib.__isindict(g)),
            (this.isbpopular = difflib.__isindict(c));
        }),
        (this.find_longest_match = function (j, n, i, m) {
          for (
            var f = this.a,
              d = this.b,
              s = this.b2j,
              h = this.isbjunk,
              c = j,
              b = i,
              a = 0,
              e = null,
              o = {},
              r = [],
              g = j,
              p,
              l,
              q;
            g < n;
            g++
          ) {
            (p = {}), (l = difflib.__dictget(s, f[g], r));
            for (q in l)
              if (l.hasOwnProperty(q)) {
                if (((e = l[q]), e < i)) continue;
                if (e >= m) break;
                (p[e] = k = difflib.__dictget(o, e - 1, 0) + 1),
                  k > a && ((c = g - k + 1), (b = e - k + 1), (a = k));
              }
            o = p;
          }
          while (c > j && b > i && !h(d[b - 1]) && f[c - 1] == d[b - 1])
            c--, b--, a++;
          while (c + a < n && b + a < m && !h(d[b + a]) && f[c + a] == d[b + a])
            a++;
          while (c > j && b > i && h(d[b - 1]) && f[c - 1] == d[b - 1])
            c--, b--, a++;
          while (c + a < n && b + a < m && h(d[b + a]) && f[c + a] == d[b + a])
            a++;
          return [c, b, a];
        }),
        (this.get_matching_blocks = function () {
          var n, o, k, d, j, i, g, h, f, e, c, a, b, m, l, p;
          if (this.matching_blocks != null) return this.matching_blocks;
          for (
            n = this.a.length, o = this.b.length, k = [[0, n, 0, o]], d = [];
            k.length;

          )
            (f = k.pop()),
              (j = f[0]),
              (i = f[1]),
              (g = f[2]),
              (h = f[3]),
              (b = this.find_longest_match(j, i, g, h)),
              (e = b[0]),
              (c = b[1]),
              (a = b[2]),
              a &&
                (d.push(b),
                j < e && g < c && k.push([j, e, g, c]),
                e + a < i && c + a < h && k.push([e + a, i, c + a, h]));
          d.sort(difflib.__ntuplecomp), (m = j1 = k1 = block = 0), (l = []);
          for (p in d)
            d.hasOwnProperty(p) &&
              ((block = d[p]),
              (i2 = block[0]),
              (j2 = block[1]),
              (k2 = block[2]),
              m + k1 == i2 && j1 + k1 == j2
                ? (k1 += k2)
                : (k1 && l.push([m, j1, k1]), (m = i2), (j1 = j2), (k1 = k2)));
          return (
            k1 && l.push([m, j1, k1]),
            l.push([n, o, 0]),
            (this.matching_blocks = l),
            this.matching_blocks
          );
        }),
        (this.get_opcodes = function () {
          var d, e, f, g, b, c, h, a, i, j;
          if (this.opcodes != null) return this.opcodes;
          (d = 0),
            (e = 0),
            (f = []),
            (this.opcodes = f),
            (i = this.get_matching_blocks());
          for (j in i)
            i.hasOwnProperty(j) &&
              ((g = i[j]),
              (b = g[0]),
              (c = g[1]),
              (h = g[2]),
              (a = ""),
              d < b && e < c
                ? (a = "replace")
                : d < b
                ? (a = "delete")
                : e < c && (a = "insert"),
              a && f.push([a, d, b, e, c]),
              (d = b + h),
              (e = c + h),
              h && f.push(["equal", b, d, c, e]));
          return f;
        }),
        (this.get_grouped_opcodes = function (d) {
          var b, a, h, c, f, e, g, l, i, j, k;
          d || (d = 3),
            (b = this.get_opcodes()),
            b || (b = [["equal", 0, 1, 0, 1]]),
            b[0][0] == "equal" &&
              ((a = b[0]),
              (h = a[0]),
              (c = a[1]),
              (f = a[2]),
              (e = a[3]),
              (g = a[4]),
              (b[0] = [h, Math.max(c, f - d), f, Math.max(e, g - d), g])),
            b[b.length - 1][0] == "equal" &&
              ((a = b[b.length - 1]),
              (h = a[0]),
              (c = a[1]),
              (f = a[2]),
              (e = a[3]),
              (g = a[4]),
              (b[b.length - 1] = [
                h,
                c,
                Math.min(f, c + d),
                e,
                Math.min(g, e + d),
              ])),
            (l = d + d),
            (i = []),
            (j = []);
          for (k in b)
            b.hasOwnProperty(k) &&
              ((a = b[k]),
              (h = a[0]),
              (c = a[1]),
              (f = a[2]),
              (e = a[3]),
              (g = a[4]),
              h == "equal" &&
                f - c > l &&
                (i.push([h, c, Math.min(f, c + d), e, Math.min(g, e + d)]),
                j.push(i),
                (i = []),
                (c = Math.max(c, f - d)),
                (e = Math.max(e, g - d))),
              i.push([h, c, f, e, g]));
          return i && !(i.length == 1 && i[0][0] == "equal") && j.push(i), j;
        }),
        (this.ratio = function () {
          return (
            (matches = difflib.__reduce(
              function (b, a) {
                return b + a[a.length - 1];
              },
              this.get_matching_blocks(),
              0
            )),
            difflib.__calculate_ratio(matches, this.a.length + this.b.length)
          );
        }),
        (this.quick_ratio = function () {
          var c, a, b, d, f, e;
          if (this.fullbcount == null) {
            this.fullbcount = c = {};
            for (b = 0; b < this.b.length; b++)
              (a = this.b[b]), (c[a] = difflib.__dictget(c, a, 0) + 1);
          }
          (c = this.fullbcount),
            (d = {}),
            (f = difflib.__isindict(d)),
            (e = numb = 0);
          for (b = 0; b < this.a.length; b++)
            (a = this.a[b]),
              f(a) ? (numb = d[a]) : (numb = difflib.__dictget(c, a, 0)),
              (d[a] = numb - 1),
              numb > 0 && e++;
          return difflib.__calculate_ratio(e, this.a.length + this.b.length);
        }),
        (this.real_quick_ratio = function () {
          var a = this.a.length,
            b = this.b.length;
          return _calculate_ratio(Math.min(a, b), a + b);
        }),
        (this.isjunk = a || difflib.defaultJunkFunction),
        (this.a = this.b = null),
        this.set_seqs(b, c);
    },
  });
function diffUsingJS(n) {
  "use strict";
  var a = function (a) {
      return document.getElementById(a);
    },
    d = difflib.stringAsLines(a("baseText").value),
    e = difflib.stringAsLines(a("newText").value),
    l = new difflib.SequenceMatcher(d, e),
    h = l.get_opcodes(),
    c = a("diffoutput"),
    g = null,
    i,
    j,
    k,
    f,
    m,
    b;
  (c.innerHTML = ""),
    c.appendChild(
      diffview.buildView({
        baseTextLines: d,
        newTextLines: e,
        opcodes: h,
        baseTextName: "Оригинальный текст",
        newTextName: "Изменённый текст",
        contextSize: g,
        viewType: n,
      })
    ),
    (i = document.querySelectorAll("#diffoutput .replace")),
    (j = document.querySelectorAll("#diffoutput .empty")),
    (k = document.querySelectorAll("#diffoutput .delete")),
    (f = document.querySelector(".message__identical")),
    f !== null && (f.remove(), diffUsingJS(0), diffUsingJS(0)),
    i.length === 0 &&
      j.length === 0 &&
      k.length === 0 &&
      ((m = document.querySelector(".message")),
      (b = document.createElement("div")),
      (b.className = "message__identical"),
      (b.innerHTML = "Тексты идентичны."),
      m.appendChild(b));
}
var compareButton = document.querySelector(".code-diff__button-compare");
compareButton.addEventListener("click", function () {
  diffUsingJS(0);
});
