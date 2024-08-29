var vi = Object.defineProperty;
var gi = (fe, he, ke) => he in fe ? vi(fe, he, { enumerable: !0, configurable: !0, writable: !0, value: ke }) : fe[he] = ke;
var We = (fe, he, ke) => (gi(fe, typeof he != "symbol" ? he + "" : he, ke), ke);
import { defineComponent as Ht, ref as yt, reactive as yi, onMounted as Wn, openBlock as qe, createElementBlock as ze, createElementVNode as ce, unref as xt, withDirectives as Jt, vModelText as Xt, normalizeClass as bi, toDisplayString as tt, createCommentVNode as nt, createStaticVNode as wi, createVNode as Ei, createBlock as Un, createTextVNode as ki, Fragment as Si, renderList as Li } from "vue";
var _i = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ci(fe) {
  return fe && fe.__esModule && Object.prototype.hasOwnProperty.call(fe, "default") ? fe.default : fe;
}
var zn = { exports: {} };
(function(fe, he) {
  (function(ke, be) {
    fe.exports = be();
  })(_i, () => (() => {
    var ke = { 471: (Z) => {
        var L = function() {
            this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = 0.5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = 0.5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
          }, y = -1;
        L.Diff = function(l, m) {
          return [l, m];
        }, L.prototype.diff_main = function(l, m, c, b) {
          b === void 0 && (b = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : /* @__PURE__ */ new Date().getTime() + 1e3 * this.Diff_Timeout);
          var s = b;
          if (l == null || m == null)
            throw new Error("Null input. (diff_main)");
          if (l == m)
            return l ? [new L.Diff(0, l)] : [];
          c === void 0 && (c = !0);
          var u = c, f = this.diff_commonPrefix(l, m), w = l.substring(0, f);
          l = l.substring(f), m = m.substring(f), f = this.diff_commonSuffix(l, m);
          var _ = l.substring(l.length - f);
          l = l.substring(0, l.length - f), m = m.substring(0, m.length - f);
          var S = this.diff_compute_(l, m, u, s);
          return w && S.unshift(new L.Diff(0, w)), _ && S.push(new L.Diff(0, _)), this.diff_cleanupMerge(S), S;
        }, L.prototype.diff_compute_ = function(l, m, c, b) {
          var s;
          if (!l)
            return [new L.Diff(1, m)];
          if (!m)
            return [new L.Diff(y, l)];
          var u = l.length > m.length ? l : m, f = l.length > m.length ? m : l, w = u.indexOf(f);
          if (w != -1)
            return s = [new L.Diff(1, u.substring(0, w)), new L.Diff(0, f), new L.Diff(1, u.substring(w + f.length))], l.length > m.length && (s[0][0] = s[2][0] = y), s;
          if (f.length == 1)
            return [new L.Diff(y, l), new L.Diff(1, m)];
          var _ = this.diff_halfMatch_(l, m);
          if (_) {
            var S = _[0], M = _[1], E = _[2], k = _[3], p = _[4], x = this.diff_main(S, E, c, b), I = this.diff_main(M, k, c, b);
            return x.concat([new L.Diff(0, p)], I);
          }
          return c && l.length > 100 && m.length > 100 ? this.diff_lineMode_(l, m, b) : this.diff_bisect_(l, m, b);
        }, L.prototype.diff_lineMode_ = function(l, m, c) {
          var b = this.diff_linesToChars_(l, m);
          l = b.chars1, m = b.chars2;
          var s = b.lineArray, u = this.diff_main(l, m, !1, c);
          this.diff_charsToLines_(u, s), this.diff_cleanupSemantic(u), u.push(new L.Diff(0, ""));
          for (var f = 0, w = 0, _ = 0, S = "", M = ""; f < u.length; ) {
            switch (u[f][0]) {
            case 1:
              _++, M += u[f][1];
              break;
            case y:
              w++, S += u[f][1];
              break;
            case 0:
              if (w >= 1 && _ >= 1) {
                u.splice(f - w - _, w + _), f = f - w - _;
                for (var E = this.diff_main(S, M, !1, c), k = E.length - 1; k >= 0; k--)
                  u.splice(f, 0, E[k]);
                f += E.length;
              }
              _ = 0, w = 0, S = "", M = "";
            }
            f++;
          }
          return u.pop(), u;
        }, L.prototype.diff_bisect_ = function(l, m, c) {
          for (var b = l.length, s = m.length, u = Math.ceil((b + s) / 2), f = u, w = 2 * u, _ = new Array(w), S = new Array(w), M = 0; M < w; M++)
            _[M] = -1, S[M] = -1;
          _[f + 1] = 0, S[f + 1] = 0;
          for (var E = b - s, k = E % 2 != 0, p = 0, x = 0, I = 0, W = 0, N = 0; N < u && !(/* @__PURE__ */ new Date().getTime() > c); N++) {
            for (var $ = -N + p; $ <= N - x; $ += 2) {
              for (var ne = f + $, me = (Me = $ == -N || $ != N && _[ne - 1] < _[ne + 1] ? _[ne + 1] : _[ne - 1] + 1) - $; Me < b && me < s && l.charAt(Me) == m.charAt(me); )
                Me++, me++;
              if (_[ne] = Me, Me > b)
                x += 2;
              else if (me > s)
                p += 2;
              else if (k && (ve = f + E - $) >= 0 && ve < w && S[ve] != -1 && Me >= (le = b - S[ve]))
                return this.diff_bisectSplit_(l, m, Me, me, c);
            }
            for (var de = -N + I; de <= N - W; de += 2) {
              for (var le, ve = f + de, xe = (le = de == -N || de != N && S[ve - 1] < S[ve + 1] ? S[ve + 1] : S[ve - 1] + 1) - de; le < b && xe < s && l.charAt(b - le - 1) == m.charAt(s - xe - 1); )
                le++, xe++;
              if (S[ve] = le, le > b)
                W += 2;
              else if (xe > s)
                I += 2;
              else if (!k && (ne = f + E - de) >= 0 && ne < w && _[ne] != -1) {
                var Me;
                if (me = f + (Me = _[ne]) - ne, Me >= (le = b - le))
                  return this.diff_bisectSplit_(l, m, Me, me, c);
              }
            }
          }
          return [new L.Diff(y, l), new L.Diff(1, m)];
        }, L.prototype.diff_bisectSplit_ = function(l, m, c, b, s) {
          var u = l.substring(0, c), f = m.substring(0, b), w = l.substring(c), _ = m.substring(b), S = this.diff_main(u, f, !1, s), M = this.diff_main(w, _, !1, s);
          return S.concat(M);
        }, L.prototype.diff_linesToChars_ = function(l, m) {
          var c = [], b = {};
          function s(w) {
            for (var _ = "", S = 0, M = -1, E = c.length; M < w.length - 1; ) {
              (M = w.indexOf(`
`, S)) == -1 && (M = w.length - 1);
              var k = w.substring(S, M + 1);
              (b.hasOwnProperty ? b.hasOwnProperty(k) : b[k] !== void 0) ? _ += String.fromCharCode(b[k]) : (E == u && (k = w.substring(S), M = w.length), _ += String.fromCharCode(E), b[k] = E, c[E++] = k), S = M + 1;
            }
            return _;
          }
          c[0] = "";
          var u = 4e4, f = s(l);
          return u = 65535, { chars1: f, chars2: s(m), lineArray: c };
        }, L.prototype.diff_charsToLines_ = function(l, m) {
          for (var c = 0; c < l.length; c++) {
            for (var b = l[c][1], s = [], u = 0; u < b.length; u++)
              s[u] = m[b.charCodeAt(u)];
            l[c][1] = s.join("");
          }
        }, L.prototype.diff_commonPrefix = function(l, m) {
          if (!l || !m || l.charAt(0) != m.charAt(0))
            return 0;
          for (var c = 0, b = Math.min(l.length, m.length), s = b, u = 0; c < s; )
            l.substring(u, s) == m.substring(u, s) ? u = c = s : b = s, s = Math.floor((b - c) / 2 + c);
          return s;
        }, L.prototype.diff_commonSuffix = function(l, m) {
          if (!l || !m || l.charAt(l.length - 1) != m.charAt(m.length - 1))
            return 0;
          for (var c = 0, b = Math.min(l.length, m.length), s = b, u = 0; c < s; )
            l.substring(l.length - s, l.length - u) == m.substring(m.length - s, m.length - u) ? u = c = s : b = s, s = Math.floor((b - c) / 2 + c);
          return s;
        }, L.prototype.diff_commonOverlap_ = function(l, m) {
          var c = l.length, b = m.length;
          if (c == 0 || b == 0)
            return 0;
          c > b ? l = l.substring(c - b) : c < b && (m = m.substring(0, c));
          var s = Math.min(c, b);
          if (l == m)
            return s;
          for (var u = 0, f = 1; ; ) {
            var w = l.substring(s - f), _ = m.indexOf(w);
            if (_ == -1)
              return u;
            f += _, _ != 0 && l.substring(s - f) != m.substring(0, f) || (u = f, f++);
          }
        }, L.prototype.diff_halfMatch_ = function(l, m) {
          if (this.Diff_Timeout <= 0)
            return null;
          var c = l.length > m.length ? l : m, b = l.length > m.length ? m : l;
          if (c.length < 4 || 2 * b.length < c.length)
            return null;
          var s = this;
          function u(p, x, I) {
            for (var W, N, $, ne, me = p.substring(I, I + Math.floor(p.length / 4)), de = -1, le = ""; (de = x.indexOf(me, de + 1)) != -1; ) {
              var ve = s.diff_commonPrefix(p.substring(I), x.substring(de)), xe = s.diff_commonSuffix(p.substring(0, I), x.substring(0, de));
              le.length < xe + ve && (le = x.substring(de - xe, de) + x.substring(de, de + ve), W = p.substring(0, I - xe), N = p.substring(I + ve), $ = x.substring(0, de - xe), ne = x.substring(de + ve));
            }
            return 2 * le.length >= p.length ? [W, N, $, ne, le] : null;
          }
          var f, w, _, S, M, E = u(c, b, Math.ceil(c.length / 4)), k = u(c, b, Math.ceil(c.length / 2));
          return E || k ? (f = k ? E && E[4].length > k[4].length ? E : k : E, l.length > m.length ? (w = f[0], _ = f[1], S = f[2], M = f[3]) : (S = f[0], M = f[1], w = f[2], _ = f[3]), [w, _, S, M, f[4]]) : null;
        }, L.prototype.diff_cleanupSemantic = function(l) {
          for (var m = !1, c = [], b = 0, s = null, u = 0, f = 0, w = 0, _ = 0, S = 0; u < l.length; )
            l[u][0] == 0 ? (c[b++] = u, f = _, w = S, _ = 0, S = 0, s = l[u][1]) : (l[u][0] == 1 ? _ += l[u][1].length : S += l[u][1].length, s && s.length <= Math.max(f, w) && s.length <= Math.max(_, S) && (l.splice(c[b - 1], 0, new L.Diff(y, s)), l[c[b - 1] + 1][0] = 1, b--, u = --b > 0 ? c[b - 1] : -1, f = 0, w = 0, _ = 0, S = 0, s = null, m = !0)), u++;
          for (m && this.diff_cleanupMerge(l), this.diff_cleanupSemanticLossless(l), u = 1; u < l.length; ) {
            if (l[u - 1][0] == y && l[u][0] == 1) {
              var M = l[u - 1][1], E = l[u][1], k = this.diff_commonOverlap_(M, E), p = this.diff_commonOverlap_(E, M);
              k >= p ? (k >= M.length / 2 || k >= E.length / 2) && (l.splice(u, 0, new L.Diff(0, E.substring(0, k))), l[u - 1][1] = M.substring(0, M.length - k), l[u + 1][1] = E.substring(k), u++) : (p >= M.length / 2 || p >= E.length / 2) && (l.splice(u, 0, new L.Diff(0, M.substring(0, p))), l[u - 1][0] = 1, l[u - 1][1] = E.substring(0, E.length - p), l[u + 1][0] = y, l[u + 1][1] = M.substring(p), u++), u++;
            }
            u++;
          }
        }, L.prototype.diff_cleanupSemanticLossless = function(l) {
          function m(p, x) {
            if (!p || !x)
              return 6;
            var I = p.charAt(p.length - 1), W = x.charAt(0), N = I.match(L.nonAlphaNumericRegex_), $ = W.match(L.nonAlphaNumericRegex_), ne = N && I.match(L.whitespaceRegex_), me = $ && W.match(L.whitespaceRegex_), de = ne && I.match(L.linebreakRegex_), le = me && W.match(L.linebreakRegex_), ve = de && p.match(L.blanklineEndRegex_), xe = le && x.match(L.blanklineStartRegex_);
            return ve || xe ? 5 : de || le ? 4 : N && !ne && me ? 3 : ne || me ? 2 : N || $ ? 1 : 0;
          }
          for (var c = 1; c < l.length - 1; ) {
            if (l[c - 1][0] == 0 && l[c + 1][0] == 0) {
              var b = l[c - 1][1], s = l[c][1], u = l[c + 1][1], f = this.diff_commonSuffix(b, s);
              if (f) {
                var w = s.substring(s.length - f);
                b = b.substring(0, b.length - f), s = w + s.substring(0, s.length - f), u = w + u;
              }
              for (var _ = b, S = s, M = u, E = m(b, s) + m(s, u); s.charAt(0) === u.charAt(0); ) {
                b += s.charAt(0), s = s.substring(1) + u.charAt(0), u = u.substring(1);
                var k = m(b, s) + m(s, u);
                k >= E && (E = k, _ = b, S = s, M = u);
              }
              l[c - 1][1] != _ && (_ ? l[c - 1][1] = _ : (l.splice(c - 1, 1), c--), l[c][1] = S, M ? l[c + 1][1] = M : (l.splice(c + 1, 1), c--));
            }
            c++;
          }
        }, L.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, L.whitespaceRegex_ = /\s/, L.linebreakRegex_ = /[\r\n]/, L.blanklineEndRegex_ = /\n\r?\n$/, L.blanklineStartRegex_ = /^\r?\n\r?\n/, L.prototype.diff_cleanupEfficiency = function(l) {
          for (var m = !1, c = [], b = 0, s = null, u = 0, f = !1, w = !1, _ = !1, S = !1; u < l.length; )
            l[u][0] == 0 ? (l[u][1].length < this.Diff_EditCost && (_ || S) ? (c[b++] = u, f = _, w = S, s = l[u][1]) : (b = 0, s = null), _ = S = !1) : (l[u][0] == y ? S = !0 : _ = !0, s && (f && w && _ && S || s.length < this.Diff_EditCost / 2 && f + w + _ + S == 3) && (l.splice(c[b - 1], 0, new L.Diff(y, s)), l[c[b - 1] + 1][0] = 1, b--, s = null, f && w ? (_ = S = !0, b = 0) : (u = --b > 0 ? c[b - 1] : -1, _ = S = !1), m = !0)), u++;
          m && this.diff_cleanupMerge(l);
        }, L.prototype.diff_cleanupMerge = function(l) {
          l.push(new L.Diff(0, ""));
          for (var m, c = 0, b = 0, s = 0, u = "", f = ""; c < l.length; )
            switch (l[c][0]) {
            case 1:
              s++, f += l[c][1], c++;
              break;
            case y:
              b++, u += l[c][1], c++;
              break;
            case 0:
              b + s > 1 ? (b !== 0 && s !== 0 && ((m = this.diff_commonPrefix(f, u)) !== 0 && (c - b - s > 0 && l[c - b - s - 1][0] == 0 ? l[c - b - s - 1][1] += f.substring(0, m) : (l.splice(0, 0, new L.Diff(0, f.substring(0, m))), c++), f = f.substring(m), u = u.substring(m)), (m = this.diff_commonSuffix(f, u)) !== 0 && (l[c][1] = f.substring(f.length - m) + l[c][1], f = f.substring(0, f.length - m), u = u.substring(0, u.length - m))), c -= b + s, l.splice(c, b + s), u.length && (l.splice(c, 0, new L.Diff(y, u)), c++), f.length && (l.splice(c, 0, new L.Diff(1, f)), c++), c++) : c !== 0 && l[c - 1][0] == 0 ? (l[c - 1][1] += l[c][1], l.splice(c, 1)) : c++, s = 0, b = 0, u = "", f = "";
            }
          l[l.length - 1][1] === "" && l.pop();
          var w = !1;
          for (c = 1; c < l.length - 1; )
            l[c - 1][0] == 0 && l[c + 1][0] == 0 && (l[c][1].substring(l[c][1].length - l[c - 1][1].length) == l[c - 1][1] ? (l[c][1] = l[c - 1][1] + l[c][1].substring(0, l[c][1].length - l[c - 1][1].length), l[c + 1][1] = l[c - 1][1] + l[c + 1][1], l.splice(c - 1, 1), w = !0) : l[c][1].substring(0, l[c + 1][1].length) == l[c + 1][1] && (l[c - 1][1] += l[c + 1][1], l[c][1] = l[c][1].substring(l[c + 1][1].length) + l[c + 1][1], l.splice(c + 1, 1), w = !0)), c++;
          w && this.diff_cleanupMerge(l);
        }, L.prototype.diff_xIndex = function(l, m) {
          var c, b = 0, s = 0, u = 0, f = 0;
          for (c = 0; c < l.length && (l[c][0] !== 1 && (b += l[c][1].length), l[c][0] !== y && (s += l[c][1].length), !(b > m)); c++)
            u = b, f = s;
          return l.length != c && l[c][0] === y ? f : f + (m - u);
        }, L.prototype.diff_prettyHtml = function(l) {
          for (var m = [], c = /&/g, b = /</g, s = />/g, u = /\n/g, f = 0; f < l.length; f++) {
            var w = l[f][0], _ = l[f][1].replace(c, "&amp;").replace(b, "&lt;").replace(s, "&gt;").replace(u, "&para;<br>");
            switch (w) {
            case 1:
              m[f] = "<ins style=\"background:#e6ffe6;\">" + _ + "</ins>";
              break;
            case y:
              m[f] = "<del style=\"background:#ffe6e6;\">" + _ + "</del>";
              break;
            case 0:
              m[f] = "<span>" + _ + "</span>";
            }
          }
          return m.join("");
        }, L.prototype.diff_text1 = function(l) {
          for (var m = [], c = 0; c < l.length; c++)
            l[c][0] !== 1 && (m[c] = l[c][1]);
          return m.join("");
        }, L.prototype.diff_text2 = function(l) {
          for (var m = [], c = 0; c < l.length; c++)
            l[c][0] !== y && (m[c] = l[c][1]);
          return m.join("");
        }, L.prototype.diff_levenshtein = function(l) {
          for (var m = 0, c = 0, b = 0, s = 0; s < l.length; s++) {
            var u = l[s][0], f = l[s][1];
            switch (u) {
            case 1:
              c += f.length;
              break;
            case y:
              b += f.length;
              break;
            case 0:
              m += Math.max(c, b), c = 0, b = 0;
            }
          }
          return m += Math.max(c, b);
        }, L.prototype.diff_toDelta = function(l) {
          for (var m = [], c = 0; c < l.length; c++)
            switch (l[c][0]) {
            case 1:
              m[c] = "+" + encodeURI(l[c][1]);
              break;
            case y:
              m[c] = "-" + l[c][1].length;
              break;
            case 0:
              m[c] = "=" + l[c][1].length;
            }
          return m.join("	").replace(/%20/g, " ");
        }, L.prototype.diff_fromDelta = function(l, m) {
          for (var c = [], b = 0, s = 0, u = m.split(/\t/g), f = 0; f < u.length; f++) {
            var w = u[f].substring(1);
            switch (u[f].charAt(0)) {
            case "+":
              try {
                c[b++] = new L.Diff(1, decodeURI(w));
              } catch {
                throw new Error("Illegal escape in diff_fromDelta: " + w);
              }
              break;
            case "-":
            case "=":
              var _ = parseInt(w, 10);
              if (isNaN(_) || _ < 0)
                throw new Error("Invalid number in diff_fromDelta: " + w);
              var S = l.substring(s, s += _);
              u[f].charAt(0) == "=" ? c[b++] = new L.Diff(0, S) : c[b++] = new L.Diff(y, S);
              break;
            default:
              if (u[f])
                throw new Error("Invalid diff operation in diff_fromDelta: " + u[f]);
            }
          }
          if (s != l.length)
            throw new Error("Delta length (" + s + ") does not equal source text length (" + l.length + ").");
          return c;
        }, L.prototype.match_main = function(l, m, c) {
          if (l == null || m == null || c == null)
            throw new Error("Null input. (match_main)");
          return c = Math.max(0, Math.min(c, l.length)), l == m ? 0 : l.length ? l.substring(c, c + m.length) == m ? c : this.match_bitap_(l, m, c) : -1;
        }, L.prototype.match_bitap_ = function(l, m, c) {
          if (m.length > this.Match_MaxBits)
            throw new Error("Pattern too long for this browser.");
          var b = this.match_alphabet_(m), s = this;
          function u(me, de) {
            var le = me / m.length, ve = Math.abs(c - de);
            return s.Match_Distance ? le + ve / s.Match_Distance : ve ? 1 : le;
          }
          var f = this.Match_Threshold, w = l.indexOf(m, c);
          w != -1 && (f = Math.min(u(0, w), f), (w = l.lastIndexOf(m, c + m.length)) != -1 && (f = Math.min(u(0, w), f)));
          var _, S, M = 1 << m.length - 1;
          w = -1;
          for (var E, k = m.length + l.length, p = 0; p < m.length; p++) {
            for (_ = 0, S = k; _ < S; )
              u(p, c + S) <= f ? _ = S : k = S, S = Math.floor((k - _) / 2 + _);
            k = S;
            var x = Math.max(1, c - S + 1), I = Math.min(c + S, l.length) + m.length, W = Array(I + 2);
            W[I + 1] = (1 << p) - 1;
            for (var N = I; N >= x; N--) {
              var $ = b[l.charAt(N - 1)];
              if (W[N] = p === 0 ? (W[N + 1] << 1 | 1) & $ : (W[N + 1] << 1 | 1) & $ | (E[N + 1] | E[N]) << 1 | 1 | E[N + 1], W[N] & M) {
                var ne = u(p, N - 1);
                if (ne <= f) {
                  if (f = ne, !((w = N - 1) > c))
                    break;
                  x = Math.max(1, 2 * c - w);
                }
              }
            }
            if (u(p + 1, c) > f)
              break;
            E = W;
          }
          return w;
        }, L.prototype.match_alphabet_ = function(l) {
          for (var m = {}, c = 0; c < l.length; c++)
            m[l.charAt(c)] = 0;
          for (c = 0; c < l.length; c++)
            m[l.charAt(c)] |= 1 << l.length - c - 1;
          return m;
        }, L.prototype.patch_addContext_ = function(l, m) {
          if (m.length != 0) {
            if (l.start2 === null)
              throw Error("patch not initialized");
            for (var c = m.substring(l.start2, l.start2 + l.length1), b = 0; m.indexOf(c) != m.lastIndexOf(c) && c.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin; )
              b += this.Patch_Margin, c = m.substring(l.start2 - b, l.start2 + l.length1 + b);
            b += this.Patch_Margin;
            var s = m.substring(l.start2 - b, l.start2);
            s && l.diffs.unshift(new L.Diff(0, s));
            var u = m.substring(l.start2 + l.length1, l.start2 + l.length1 + b);
            u && l.diffs.push(new L.Diff(0, u)), l.start1 -= s.length, l.start2 -= s.length, l.length1 += s.length + u.length, l.length2 += s.length + u.length;
          }
        }, L.prototype.patch_make = function(l, m, c) {
          var b, s;
          if (typeof l == "string" && typeof m == "string" && c === void 0)
            b = l, (s = this.diff_main(b, m, !0)).length > 2 && (this.diff_cleanupSemantic(s), this.diff_cleanupEfficiency(s));
          else if (l && typeof l == "object" && m === void 0 && c === void 0)
            s = l, b = this.diff_text1(s);
          else if (typeof l == "string" && m && typeof m == "object" && c === void 0)
            b = l, s = m;
          else {
            if (typeof l != "string" || typeof m != "string" || !c || typeof c != "object")
              throw new Error("Unknown call format to patch_make.");
            b = l, s = c;
          }
          if (s.length === 0)
            return [];
          for (var u = [], f = new L.patch_obj(), w = 0, _ = 0, S = 0, M = b, E = b, k = 0; k < s.length; k++) {
            var p = s[k][0], x = s[k][1];
            switch (w || p === 0 || (f.start1 = _, f.start2 = S), p) {
            case 1:
              f.diffs[w++] = s[k], f.length2 += x.length, E = E.substring(0, S) + x + E.substring(S);
              break;
            case y:
              f.length1 += x.length, f.diffs[w++] = s[k], E = E.substring(0, S) + E.substring(S + x.length);
              break;
            case 0:
              x.length <= 2 * this.Patch_Margin && w && s.length != k + 1 ? (f.diffs[w++] = s[k], f.length1 += x.length, f.length2 += x.length) : x.length >= 2 * this.Patch_Margin && w && (this.patch_addContext_(f, M), u.push(f), f = new L.patch_obj(), w = 0, M = E, _ = S);
            }
            p !== 1 && (_ += x.length), p !== y && (S += x.length);
          }
          return w && (this.patch_addContext_(f, M), u.push(f)), u;
        }, L.prototype.patch_deepCopy = function(l) {
          for (var m = [], c = 0; c < l.length; c++) {
            var b = l[c], s = new L.patch_obj();
            s.diffs = [];
            for (var u = 0; u < b.diffs.length; u++)
              s.diffs[u] = new L.Diff(b.diffs[u][0], b.diffs[u][1]);
            s.start1 = b.start1, s.start2 = b.start2, s.length1 = b.length1, s.length2 = b.length2, m[c] = s;
          }
          return m;
        }, L.prototype.patch_apply = function(l, m) {
          if (l.length == 0)
            return [m, []];
          l = this.patch_deepCopy(l);
          var c = this.patch_addPadding(l);
          m = c + m + c, this.patch_splitMax(l);
          for (var b = 0, s = [], u = 0; u < l.length; u++) {
            var f, w, _ = l[u].start2 + b, S = this.diff_text1(l[u].diffs), M = -1;
            if (S.length > this.Match_MaxBits ? (f = this.match_main(m, S.substring(0, this.Match_MaxBits), _)) != -1 && ((M = this.match_main(m, S.substring(S.length - this.Match_MaxBits), _ + S.length - this.Match_MaxBits)) == -1 || f >= M) && (f = -1) : f = this.match_main(m, S, _), f == -1)
              s[u] = !1, b -= l[u].length2 - l[u].length1;
            else if (s[u] = !0, b = f - _, S == (w = M == -1 ? m.substring(f, f + S.length) : m.substring(f, M + this.Match_MaxBits)))
              m = m.substring(0, f) + this.diff_text2(l[u].diffs) + m.substring(f + S.length);
            else {
              var E = this.diff_main(S, w, !1);
              if (S.length > this.Match_MaxBits && this.diff_levenshtein(E) / S.length > this.Patch_DeleteThreshold)
                s[u] = !1;
              else {
                this.diff_cleanupSemanticLossless(E);
                for (var k, p = 0, x = 0; x < l[u].diffs.length; x++) {
                  var I = l[u].diffs[x];
                  I[0] !== 0 && (k = this.diff_xIndex(E, p)), I[0] === 1 ? m = m.substring(0, f + k) + I[1] + m.substring(f + k) : I[0] === y && (m = m.substring(0, f + k) + m.substring(f + this.diff_xIndex(E, p + I[1].length))), I[0] !== y && (p += I[1].length);
                }
              }
            }
          }
          return [m = m.substring(c.length, m.length - c.length), s];
        }, L.prototype.patch_addPadding = function(l) {
          for (var m = this.Patch_Margin, c = "", b = 1; b <= m; b++)
            c += String.fromCharCode(b);
          for (b = 0; b < l.length; b++)
            l[b].start1 += m, l[b].start2 += m;
          var s = l[0], u = s.diffs;
          if (u.length == 0 || u[0][0] != 0)
            u.unshift(new L.Diff(0, c)), s.start1 -= m, s.start2 -= m, s.length1 += m, s.length2 += m;
          else if (m > u[0][1].length) {
            var f = m - u[0][1].length;
            u[0][1] = c.substring(u[0][1].length) + u[0][1], s.start1 -= f, s.start2 -= f, s.length1 += f, s.length2 += f;
          }
          return (u = (s = l[l.length - 1]).diffs).length == 0 || u[u.length - 1][0] != 0 ? (u.push(new L.Diff(0, c)), s.length1 += m, s.length2 += m) : m > u[u.length - 1][1].length && (f = m - u[u.length - 1][1].length, u[u.length - 1][1] += c.substring(0, f), s.length1 += f, s.length2 += f), c;
        }, L.prototype.patch_splitMax = function(l) {
          for (var m = this.Match_MaxBits, c = 0; c < l.length; c++)
            if (!(l[c].length1 <= m)) {
              var b = l[c];
              l.splice(c--, 1);
              for (var s = b.start1, u = b.start2, f = ""; b.diffs.length !== 0; ) {
                var w = new L.patch_obj(), _ = !0;
                for (w.start1 = s - f.length, w.start2 = u - f.length, f !== "" && (w.length1 = w.length2 = f.length, w.diffs.push(new L.Diff(0, f))); b.diffs.length !== 0 && w.length1 < m - this.Patch_Margin; ) {
                  var S = b.diffs[0][0], M = b.diffs[0][1];
                  S === 1 ? (w.length2 += M.length, u += M.length, w.diffs.push(b.diffs.shift()), _ = !1) : S === y && w.diffs.length == 1 && w.diffs[0][0] == 0 && M.length > 2 * m ? (w.length1 += M.length, s += M.length, _ = !1, w.diffs.push(new L.Diff(S, M)), b.diffs.shift()) : (M = M.substring(0, m - w.length1 - this.Patch_Margin), w.length1 += M.length, s += M.length, S === 0 ? (w.length2 += M.length, u += M.length) : _ = !1, w.diffs.push(new L.Diff(S, M)), M == b.diffs[0][1] ? b.diffs.shift() : b.diffs[0][1] = b.diffs[0][1].substring(M.length));
                }
                f = (f = this.diff_text2(w.diffs)).substring(f.length - this.Patch_Margin);
                var E = this.diff_text1(b.diffs).substring(0, this.Patch_Margin);
                E !== "" && (w.length1 += E.length, w.length2 += E.length, w.diffs.length !== 0 && w.diffs[w.diffs.length - 1][0] === 0 ? w.diffs[w.diffs.length - 1][1] += E : w.diffs.push(new L.Diff(0, E))), _ || l.splice(++c, 0, w);
              }
            }
        }, L.prototype.patch_toText = function(l) {
          for (var m = [], c = 0; c < l.length; c++)
            m[c] = l[c];
          return m.join("");
        }, L.prototype.patch_fromText = function(l) {
          var m = [];
          if (!l)
            return m;
          for (var c = l.split(`
`), b = 0, s = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; b < c.length; ) {
            var u = c[b].match(s);
            if (!u)
              throw new Error("Invalid patch string: " + c[b]);
            var f = new L.patch_obj();
            for (m.push(f), f.start1 = parseInt(u[1], 10), u[2] === "" ? (f.start1--, f.length1 = 1) : u[2] == "0" ? f.length1 = 0 : (f.start1--, f.length1 = parseInt(u[2], 10)), f.start2 = parseInt(u[3], 10), u[4] === "" ? (f.start2--, f.length2 = 1) : u[4] == "0" ? f.length2 = 0 : (f.start2--, f.length2 = parseInt(u[4], 10)), b++; b < c.length; ) {
              var w = c[b].charAt(0);
              try {
                var _ = decodeURI(c[b].substring(1));
              } catch {
                throw new Error("Illegal escape in patch_fromText: " + _);
              }
              if (w == "-")
                f.diffs.push(new L.Diff(y, _));
              else if (w == "+")
                f.diffs.push(new L.Diff(1, _));
              else if (w == " ")
                f.diffs.push(new L.Diff(0, _));
              else {
                if (w == "@")
                  break;
                if (w !== "")
                  throw new Error("Invalid patch mode \"" + w + "\" in: " + _);
              }
              b++;
            }
          }
          return m;
        }, (L.patch_obj = function() {
          this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
        }).prototype.toString = function() {
          for (var l, m = ["@@ -" + (this.length1 === 0 ? this.start1 + ",0" : this.length1 == 1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1) + " +" + (this.length2 === 0 ? this.start2 + ",0" : this.length2 == 1 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2) + ` @@
`], c = 0; c < this.diffs.length; c++) {
            switch (this.diffs[c][0]) {
            case 1:
              l = "+";
              break;
            case y:
              l = "-";
              break;
            case 0:
              l = " ";
            }
            m[c + 1] = l + encodeURI(this.diffs[c][1]) + `
`;
          }
          return m.join("").replace(/%20/g, " ");
        }, Z.exports = L, Z.exports.diff_match_patch = L, Z.exports.DIFF_DELETE = y, Z.exports.DIFF_INSERT = 1, Z.exports.DIFF_EQUAL = 0;
      }, 872: (Z, L, y) => {
        y.d(L, { default: () => bt });
        var l = y(478), m = y(156), c = y(314), b = y(730), s = y(66), u = y(218), f = y(702), w = function(K) {
            K === void 0 && (K = document);
            var ge = function(V) {
              var j = document.createElement("img");
              j.src = V.getAttribute("data-src"), j.addEventListener("load", function() {
                V.getAttribute("style") || V.getAttribute("class") || V.getAttribute("width") || V.getAttribute("height") || j.naturalHeight > j.naturalWidth && j.naturalWidth / j.naturalHeight < document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) && j.naturalHeight > window.innerHeight - 40 && (V.style.height = window.innerHeight - 40 + "px"), V.src = j.src;
              }), V.removeAttribute("data-src");
            };
            if (!("IntersectionObserver" in window))
              return K.querySelectorAll("img").forEach(function(V) {
                V.getAttribute("data-src") && ge(V);
              }), !1;
            window.vditorImageIntersectionObserver ? (window.vditorImageIntersectionObserver.disconnect(), K.querySelectorAll("img").forEach(function(V) {
              window.vditorImageIntersectionObserver.observe(V);
            })) : (window.vditorImageIntersectionObserver = new IntersectionObserver(function(V) {
              V.forEach(function(j) {
                (j.isIntersecting === void 0 ? j.intersectionRatio !== 0 : j.isIntersecting) && j.target.getAttribute("data-src") && ge(j.target);
              });
            }), K.querySelectorAll("img").forEach(function(V) {
              window.vditorImageIntersectionObserver.observe(V);
            }));
          }, _ = y(466), S = y(554), M = y(40), E = y(563), k = y(749), p = y(818), x = y(408), I = y(54), W = y(227), N = y(526), $ = y(827), ne = y(640), me = y(895), de = y(393), le = function(K, ge) {
            if (ge === void 0 && (ge = "zh_CN"), typeof speechSynthesis < "u" && typeof SpeechSynthesisUtterance < "u") {
              var V = function() {
                  var pe, ue;
                  return speechSynthesis.getVoices().forEach(function(Q) {
                    Q.lang === ge.replace("_", "-") && (pe = Q), Q.default && (ue = Q);
                  }), pe || (pe = ue), pe;
                }, j = "<svg><use xlink:href=\"#vditor-icon-play\"></use></svg>", ie = "<svg><use xlink:href=\"#vditor-icon-pause\"></use></svg>";
              document.getElementById("vditorIconScript") || (j = "<svg viewBox=\"0 0 32 32\"><path d=\"M3.436 0l25.128 16-25.128 16v-32z\"></path></svg>", ie = "<svg viewBox=\"0 0 32 32\"><path d=\"M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z\"></path></svg>");
              var se = document.querySelector(".vditor-speech");
              se || ((se = document.createElement("button")).className = "vditor-speech", K.insertAdjacentElement("beforeend", se), speechSynthesis.onvoiceschanged !== void 0 && (speechSynthesis.onvoiceschanged = V));
              var oe = V(), Ne = new SpeechSynthesisUtterance();
              Ne.voice = oe, Ne.onend = Ne.onerror = function() {
                se.style.display = "none", speechSynthesis.cancel(), se.classList.remove("vditor-speech--current"), se.innerHTML = j;
              }, K.addEventListener(window.ontouchstart !== void 0 ? "touchend" : "click", function(pe) {
                var ue = pe.target;
                if (ue.classList.contains("vditor-speech") || ue.parentElement.classList.contains("vditor-speech"))
                  return se.classList.contains("vditor-speech--current") ? speechSynthesis.speaking && (speechSynthesis.paused ? (speechSynthesis.resume(), se.innerHTML = ie) : (speechSynthesis.pause(), se.innerHTML = j)) : (Ne.text = se.getAttribute("data-text"), speechSynthesis.speak(Ne), se.classList.add("vditor-speech--current"), se.innerHTML = ie), (0, de.Hc)(window.vditorSpeechRange), void K.focus();
                if (se.style.display = "none", speechSynthesis.cancel(), se.classList.remove("vditor-speech--current"), se.innerHTML = j, getSelection().rangeCount !== 0) {
                  var Q = getSelection().getRangeAt(0), Ke = Q.toString().trim();
                  if (Ke) {
                    window.vditorSpeechRange = Q.cloneRange();
                    var Xe = Q.getBoundingClientRect();
                    se.innerHTML = j, se.style.display = "block", se.style.top = Xe.top + Xe.height + document.querySelector("html").scrollTop - 20 + "px", window.ontouchstart !== void 0 ? se.style.left = pe.changedTouches[pe.changedTouches.length - 1].pageX + 2 + "px" : se.style.left = pe.clientX + 2 + "px", se.setAttribute("data-text", Ke);
                  }
                }
              });
            }
          }, ve = function(K, ge, V, j) {
            return new (V || (V = Promise))(function(ie, se) {
              function oe(ue) {
                try {
                  pe(j.next(ue));
                } catch (Q) {
                  se(Q);
                }
              }
              function Ne(ue) {
                try {
                  pe(j.throw(ue));
                } catch (Q) {
                  se(Q);
                }
              }
              function pe(ue) {
                var Q;
                ue.done ? ie(ue.value) : (Q = ue.value, Q instanceof V ? Q : new V(function(Ke) {
                  Ke(Q);
                })).then(oe, Ne);
              }
              pe((j = j.apply(K, [])).next());
            });
          }, xe = function(K, ge) {
            var V, j, ie, se, oe = { label: 0, sent: function() {
              if (1 & ie[0])
                throw ie[1];
              return ie[1];
            }, trys: [], ops: [] };
            return se = { next: Ne(0), throw: Ne(1), return: Ne(2) }, typeof Symbol == "function" && (se[Symbol.iterator] = function() {
              return this;
            }), se;
            function Ne(pe) {
              return function(ue) {
                return function(Q) {
                  if (V)
                    throw new TypeError("Generator is already executing.");
                  for (; oe; )
                    try {
                      if (V = 1, j && (ie = 2 & Q[0] ? j.return : Q[0] ? j.throw || ((ie = j.return) && ie.call(j), 0) : j.next) && !(ie = ie.call(j, Q[1])).done)
                        return ie;
                      switch (j = 0, ie && (Q = [2 & Q[0], ie.value]), Q[0]) {
                      case 0:
                      case 1:
                        ie = Q;
                        break;
                      case 4:
                        return oe.label++, { value: Q[1], done: !1 };
                      case 5:
                        oe.label++, j = Q[1], Q = [0];
                        continue;
                      case 7:
                        Q = oe.ops.pop(), oe.trys.pop();
                        continue;
                      default:
                        if (ie = oe.trys, !((ie = ie.length > 0 && ie[ie.length - 1]) || Q[0] !== 6 && Q[0] !== 2)) {
                          oe = 0;
                          continue;
                        }
                        if (Q[0] === 3 && (!ie || Q[1] > ie[0] && Q[1] < ie[3])) {
                          oe.label = Q[1];
                          break;
                        }
                        if (Q[0] === 6 && oe.label < ie[1]) {
                          oe.label = ie[1], ie = Q;
                          break;
                        }
                        if (ie && oe.label < ie[2]) {
                          oe.label = ie[2], oe.ops.push(Q);
                          break;
                        }
                        ie[2] && oe.ops.pop(), oe.trys.pop();
                        continue;
                      }
                      Q = ge.call(K, oe);
                    } catch (Ke) {
                      Q = [6, Ke], j = 0;
                    } finally {
                      V = ie = 0;
                    }
                  if (5 & Q[0])
                    throw Q[1];
                  return { value: Q[0] ? Q[1] : void 0, done: !0 };
                }([pe, ue]);
              };
            }
          }, Me = function(K) {
            var ge, V = { anchor: 0, cdn: I.g.CDN, customEmoji: {}, emojiPath: I.g.CDN + "/dist/images/emoji", hljs: I.g.HLJS_OPTIONS, icon: "ant", lang: "zh_CN", markdown: I.g.MARKDOWN_OPTIONS, math: I.g.MATH_OPTIONS, mode: "light", speech: { enable: !1 }, render: { media: { enable: !0 } }, theme: I.g.THEME_OPTIONS };
            return K.cdn && (!((ge = K.theme) === null || ge === void 0) && ge.path || (V.theme.path = K.cdn + "/dist/css/content-theme"), K.emojiPath || (V.emojiPath = K.cdn + "/dist/images/emoji")), (0, ne.T)(V, K);
          }, $e = function(K, ge) {
            var V = Me(ge);
            return (0, N.G)(V.cdn + "/dist/js/lute/lute.min.js", "vditorLuteScript").then(function() {
              var j = (0, me.X)({ autoSpace: V.markdown.autoSpace, gfmAutoLink: V.markdown.gfmAutoLink, codeBlockPreview: V.markdown.codeBlockPreview, emojiSite: V.emojiPath, emojis: V.customEmoji, fixTermTypo: V.markdown.fixTermTypo, footnotes: V.markdown.footnotes, headingAnchor: V.anchor !== 0, inlineMathDigit: V.math.inlineDigit, lazyLoadImage: V.lazyLoadImage, linkBase: V.markdown.linkBase, linkPrefix: V.markdown.linkPrefix, listStyle: V.markdown.listStyle, mark: V.markdown.mark, mathBlockPreview: V.markdown.mathBlockPreview, paragraphBeginningSpace: V.markdown.paragraphBeginningSpace, sanitize: V.markdown.sanitize, toc: V.markdown.toc });
              return ge != null && ge.renderers && j.SetJSRenderers({ renderers: { Md2HTML: ge.renderers } }), j.SetHeadingID(!0), j.Md2HTML(K);
            });
          }, Ce = function(K, ge, V) {
            return ve(void 0, void 0, void 0, function() {
              var j, ie, se;
              return xe(this, function(oe) {
                switch (oe.label) {
                case 0:
                  return j = Me(V), [4, $e(ge, j)];
                case 1:
                  if (ie = oe.sent(), j.transform && (ie = j.transform(ie)), K.innerHTML = ie, K.classList.add("vditor-reset"), j.i18n)
                    return [3, 5];
                  if (["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(j.lang))
                    return [3, 2];
                  throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
                case 2:
                  return se = "vditorI18nScript" + j.lang, document.querySelectorAll("head script[id^=\"vditorI18nScript\"]").forEach(function(pe) {
                    pe.id !== se && document.head.removeChild(pe);
                  }), [4, (0, N.G)(j.cdn + "/dist/js/i18n/" + j.lang + ".js", se)];
                case 3:
                  oe.sent(), oe.label = 4;
                case 4:
                  return [3, 6];
                case 5:
                  window.VditorI18n = j.i18n, oe.label = 6;
                case 6:
                  return j.icon ? [4, (0, N.G)(j.cdn + "/dist/js/icons/" + j.icon + ".js", "vditorIconScript")] : [3, 8];
                case 7:
                  oe.sent(), oe.label = 8;
                case 8:
                  return (0, W.Z)(j.theme.current, j.theme.path), j.anchor === 1 && K.classList.add("vditor-reset--anchor"), (0, b.O)(K, j.hljs), (0, f.s)(j.hljs, K, j.cdn), (0, _.H)(K, { cdn: j.cdn, math: j.math }), (0, M.i)(K, j.cdn, j.mode), (0, E.K)(K, j.cdn, j.mode), (0, s.P)(K, j.cdn), (0, u.v)(K, j.cdn), (0, c.p)(K, j.cdn, j.mode), (0, k.P)(K, j.cdn, j.mode), (0, x.B)(K, j.cdn), (0, l.Q)(K, j.cdn), j.render.media.enable && (0, S.Y)(K), j.speech.enable && le(K), j.anchor !== 0 && (Ne = j.anchor, document.querySelectorAll(".vditor-anchor").forEach(function(pe) {
                    Ne === 1 && pe.classList.add("vditor-anchor--left"), pe.onclick = function() {
                      var ue = pe.getAttribute("href").substr(1), Q = document.getElementById("vditorAnchor-" + ue).offsetTop;
                      document.querySelector("html").scrollTop = Q;
                    };
                  }), window.onhashchange = function() {
                    var pe = document.getElementById("vditorAnchor-" + decodeURIComponent(window.location.hash.substr(1)));
                    pe && (document.querySelector("html").scrollTop = pe.offsetTop);
                  }), j.after && j.after(), j.lazyLoadImage && w(K), K.addEventListener("click", function(pe) {
                    var ue = (0, $.lG)(pe.target, "SPAN");
                    if (ue && (0, $.fb)(ue, "vditor-toc")) {
                      var Q = K.querySelector("#" + ue.getAttribute("data-target-id"));
                      Q && window.scrollTo(window.scrollX, Q.offsetTop);
                    }
                  }), [2];
                }
                var Ne;
              });
            });
          }, T = y(863), Ve = y(312);
        const bt = function() {
          function K() {
          }
          return K.adapterRender = m, K.previewImage = T.E, K.codeRender = b.O, K.graphvizRender = u.v, K.highlightRender = f.s, K.mathRender = _.H, K.mermaidRender = M.i, K.markmapRender = E.K, K.flowchartRender = s.P, K.chartRender = c.p, K.abcRender = l.Q, K.mindmapRender = k.P, K.plantumlRender = x.B, K.outlineRender = p.k, K.mediaRender = S.Y, K.speechRender = le, K.lazyLoadImageRender = w, K.md2html = $e, K.preview = Ce, K.setCodeTheme = Ve.Y, K.setContentTheme = W.Z, K;
        }();
      }, 54: (Z, L, y) => {
        y.d(L, { H: () => l, g: () => m });
        var l = "3.10.4", m = function() {
          function c() {
          }
          return c.ZWSP = "​", c.DROP_EDITOR = "application/editor", c.MOBILE_WIDTH = 520, c.CLASS_MENU_DISABLED = "vditor-menu--disabled", c.EDIT_TOOLBARS = ["emoji", "headings", "bold", "italic", "strike", "link", "list", "ordered-list", "outdent", "indent", "check", "line", "quote", "code", "inline-code", "insert-after", "insert-before", "upload", "record", "table"], c.CODE_THEME = ["abap", "algol", "algol_nu", "arduino", "autumn", "borland", "bw", "colorful", "dracula", "emacs", "friendly", "fruity", "github", "igor", "lovelace", "manni", "monokai", "monokailight", "murphy", "native", "paraiso-dark", "paraiso-light", "pastie", "perldoc", "pygments", "rainbow_dash", "rrt", "solarized-dark", "solarized-dark256", "solarized-light", "swapoff", "tango", "trac", "vim", "vs", "xcode", "ant-design"], c.CODE_LANGUAGES = ["mermaid", "echarts", "mindmap", "plantuml", "abc", "graphviz", "flowchart", "apache", "js", "ts", "html", "markmap", "properties", "apache", "bash", "c", "csharp", "cpp", "css", "coffeescript", "diff", "go", "xml", "http", "json", "java", "javascript", "kotlin", "less", "lua", "makefile", "markdown", "nginx", "objectivec", "php", "php-template", "perl", "plaintext", "python", "python-repl", "r", "ruby", "rust", "scss", "sql", "shell", "swift", "ini", "typescript", "vbnet", "yaml", "ada", "clojure", "dart", "erb", "fortran", "gradle", "haskell", "julia", "julia-repl", "lisp", "matlab", "pgsql", "powershell", "sql_more", "stata", "cmake", "mathematica", "solidity", "yul"], c.CDN = "https://unpkg.com/vditor@3.10.4", c.MARKDOWN_OPTIONS = { autoSpace: !1, gfmAutoLink: !0, codeBlockPreview: !0, fixTermTypo: !1, footnotes: !0, linkBase: "", linkPrefix: "", listStyle: !1, mark: !1, mathBlockPreview: !0, paragraphBeginningSpace: !1, sanitize: !0, toc: !1 }, c.HLJS_OPTIONS = { enable: !0, lineNumber: !1, defaultLang: "", style: "github" }, c.MATH_OPTIONS = { engine: "KaTeX", inlineDigit: !1, macros: {} }, c.THEME_OPTIONS = { current: "light", list: { "ant-design": "Ant Design", dark: "Dark", light: "Light", wechat: "WeChat" }, path: c.CDN + "/dist/css/content-theme" }, c;
        }();
      }, 478: (Z, L, y) => {
        y.d(L, { Q: () => b });
        var l = y(54), m = y(526), c = y(156), b = function(s, u) {
          s === void 0 && (s = document), u === void 0 && (u = l.g.CDN);
          var f = c.abcRenderAdapter.getElements(s);
          f.length > 0 && (0, m.G)(u + "/dist/js/abcjs/abcjs_basic.min.js", "vditorAbcjsScript").then(function() {
            f.forEach(function(w) {
              w.parentElement.classList.contains("vditor-wysiwyg__pre") || w.parentElement.classList.contains("vditor-ir__marker--pre") || w.getAttribute("data-processed") !== "true" && (ABCJS.renderAbc(w, c.abcRenderAdapter.getCode(w).trim()), w.style.overflowX = "auto", w.setAttribute("data-processed", "true"));
            });
          });
        };
      }, 156: (Z, L, y) => {
        y.r(L), y.d(L, { abcRenderAdapter: () => u, chartRenderAdapter: () => s, flowchartRenderAdapter: () => w, graphvizRenderAdapter: () => f, markmapRenderAdapter: () => c, mathRenderAdapter: () => l, mermaidRenderAdapter: () => m, mindmapRenderAdapter: () => b, plantumlRenderAdapter: () => _ });
        var l = { getCode: function(S) {
            return S.textContent;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-math");
          } }, m = { getCode: function(S) {
            return S.textContent;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-mermaid");
          } }, c = { getCode: function(S) {
            return S.textContent;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-markmap");
          } }, b = { getCode: function(S) {
            return S.getAttribute("data-code");
          }, getElements: function(S) {
            return S.querySelectorAll(".language-mindmap");
          } }, s = { getCode: function(S) {
            return S.innerText;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-echarts");
          } }, u = { getCode: function(S) {
            return S.textContent;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-abc");
          } }, f = { getCode: function(S) {
            return S.textContent;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-graphviz");
          } }, w = { getCode: function(S) {
            return S.textContent;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-flowchart");
          } }, _ = { getCode: function(S) {
            return S.textContent;
          }, getElements: function(S) {
            return S.querySelectorAll(".language-plantuml");
          } };
      }, 314: (Z, L, y) => {
        y.d(L, { p: () => b });
        var l = y(54), m = y(526), c = y(156), b = function(s, u, f) {
          s === void 0 && (s = document), u === void 0 && (u = l.g.CDN);
          var w = c.chartRenderAdapter.getElements(s);
          w.length > 0 && (0, m.G)(u + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
            w.forEach(function(_) {
              if (!_.parentElement.classList.contains("vditor-wysiwyg__pre") && !_.parentElement.classList.contains("vditor-ir__marker--pre")) {
                var S = c.chartRenderAdapter.getCode(_).trim();
                if (S)
                  try {
                    if (_.getAttribute("data-processed") === "true")
                      return;
                    var M = JSON.parse(S);
                    echarts.init(_, f === "dark" ? "dark" : void 0).setOption(M), _.setAttribute("data-processed", "true");
                  } catch (E) {
                    _.className = "vditor-reset--error", _.innerHTML = "echarts render error: <br>" + E;
                  }
              }
            });
          });
        };
      }, 730: (Z, L, y) => {
        y.d(L, { O: () => c });
        var l = y(51), m = y(54), c = function(b, s) {
          Array.from(b.querySelectorAll("pre > code")).filter(function(u, f) {
            return !u.parentElement.classList.contains("vditor-wysiwyg__pre") && !u.parentElement.classList.contains("vditor-ir__marker--pre") && !(u.classList.contains("language-mermaid") || u.classList.contains("language-flowchart") || u.classList.contains("language-echarts") || u.classList.contains("language-mindmap") || u.classList.contains("language-plantuml") || u.classList.contains("language-markmap") || u.classList.contains("language-abc") || u.classList.contains("language-graphviz") || u.classList.contains("language-math")) && !(u.style.maxHeight.indexOf("px") > -1) && !(b.classList.contains("vditor-preview") && f > 5);
          }).forEach(function(u) {
            var f, w, _, S = u.innerText;
            if (u.classList.contains("highlight-chroma")) {
              var M = u.cloneNode(!0);
              M.querySelectorAll(".highlight-ln").forEach(function(x) {
                x.remove();
              }), S = M.innerText;
            } else
              S.endsWith(`
`) && (S = S.substr(0, S.length - 1));
            var E = "<svg><use xlink:href=\"#vditor-icon-copy\"></use></svg>";
            document.getElementById("vditorIconScript") || (E = "<svg viewBox=\"0 0 32 32\"><path d=\"M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z\"></path></svg>");
            var k = document.createElement("div");
            k.className = "vditor-copy", k.innerHTML = "<span aria-label=\"" + (((f = window.VditorI18n) === null || f === void 0 ? void 0 : f.copy) || "复制") + `"
onmouseover="this.setAttribute('aria-label', '` + (((w = window.VditorI18n) === null || w === void 0 ? void 0 : w.copy) || "复制") + `')"
class="vditor-tooltipped vditor-tooltipped__w"
onclick="this.previousElementSibling.select();document.execCommand('copy');this.setAttribute('aria-label', '` + (((_ = window.VditorI18n) === null || _ === void 0 ? void 0 : _.copied) || "已复制") + "');this.previousElementSibling.blur()\">" + E + "</span>";
            var p = document.createElement("textarea");
            p.value = (0, l.X)(S), k.insertAdjacentElement("afterbegin", p), s && s.renderMenu && s.renderMenu(u, k), u.before(k), u.style.maxHeight = window.outerHeight - 40 + "px", u.insertAdjacentHTML("afterend", "<span style=\"position: absolute\">" + m.g.ZWSP + "</span>");
          });
        };
      }, 66: (Z, L, y) => {
        y.d(L, { P: () => b });
        var l = y(54), m = y(526), c = y(156), b = function(s, u) {
          u === void 0 && (u = l.g.CDN);
          var f = c.flowchartRenderAdapter.getElements(s);
          f.length !== 0 && (0, m.G)(u + "/dist/js/flowchart.js/flowchart.min.js", "vditorFlowchartScript").then(function() {
            f.forEach(function(w) {
              if (w.getAttribute("data-processed") !== "true") {
                var _ = flowchart.parse(c.flowchartRenderAdapter.getCode(w));
                w.innerHTML = "", _.drawSVG(w), w.setAttribute("data-processed", "true");
              }
            });
          });
        };
      }, 218: (Z, L, y) => {
        y.d(L, { v: () => b });
        var l = y(54), m = y(526), c = y(156), b = function(s, u) {
          u === void 0 && (u = l.g.CDN);
          var f = c.graphvizRenderAdapter.getElements(s);
          f.length !== 0 && (0, m.G)(u + "/dist/js/graphviz/viz.js", "vditorGraphVizScript").then(function() {
            f.forEach(function(w) {
              var _ = c.graphvizRenderAdapter.getCode(w);
              if (!w.parentElement.classList.contains("vditor-wysiwyg__pre") && !w.parentElement.classList.contains("vditor-ir__marker--pre") && w.getAttribute("data-processed") !== "true" && _.trim() !== "") {
                try {
                  var S = new Blob(["importScripts('" + document.getElementById("vditorGraphVizScript").src.replace("viz.js", "full.render.js") + "');"], { type: "application/javascript" }), M = (window.URL || window.webkitURL).createObjectURL(S), E = new Worker(M);
                  new Viz({ worker: E }).renderSVGElement(_).then(function(k) {
                    w.innerHTML = k.outerHTML;
                  }).catch(function(k) {
                    w.innerHTML = "graphviz render error: <br>" + k, w.className = "vditor-reset--error";
                  });
                } catch (k) {
                  console.error("graphviz error", k);
                }
                w.setAttribute("data-processed", "true");
              }
            });
          });
        };
      }, 702: (Z, L, y) => {
        y.d(L, { s: () => b });
        var l = y(54), m = y(526), c = y(578), b = function(s, u, f) {
          u === void 0 && (u = document), f === void 0 && (f = l.g.CDN);
          var w = s.style;
          l.g.CODE_THEME.includes(w) || (w = "github");
          var _ = document.getElementById("vditorHljsStyle"), S = f + "/dist/js/highlight.js/styles/" + w + ".css";
          _ && _.getAttribute("href") !== S && _.remove(), (0, c.c)(f + "/dist/js/highlight.js/styles/" + w + ".css", "vditorHljsStyle"), s.enable !== !1 && u.querySelectorAll("pre > code").length !== 0 && (0, m.G)(f + "/dist/js/highlight.js/highlight.pack.js", "vditorHljsScript").then(function() {
            (0, m.G)(f + "/dist/js/highlight.js/solidity.min.js", "vditorHljsSolidityScript").then(function() {
              (0, m.G)(f + "/dist/js/highlight.js/yul.min.js", "vditorHljsYulScript").then(function() {
                u.querySelectorAll("pre > code").forEach(function(M) {
                  if (!M.parentElement.classList.contains("vditor-ir__marker--pre") && !M.parentElement.classList.contains("vditor-wysiwyg__pre") && !(M.classList.contains("language-mermaid") || M.classList.contains("language-flowchart") || M.classList.contains("language-echarts") || M.classList.contains("language-mindmap") || M.classList.contains("language-plantuml") || M.classList.contains("language-abc") || M.classList.contains("language-graphviz") || M.classList.contains("language-math")) && (s.defaultLang !== "" && M.className.indexOf("language-") === -1 && M.classList.add("language-" + s.defaultLang), hljs.highlightElement(M), s.lineNumber)) {
                    M.classList.add("vditor-linenumber");
                    var E = M.querySelector(".vditor-linenumber__temp");
                    E || ((E = document.createElement("div")).className = "vditor-linenumber__temp", M.insertAdjacentElement("beforeend", E));
                    var k = getComputedStyle(M).whiteSpace, p = !1;
                    k !== "pre-wrap" && k !== "pre-line" || (p = !0);
                    var x = "", I = M.textContent.split(/\r\n|\r|\n/g);
                    I.pop(), I.map(function(W) {
                      var N = "";
                      p && (E.textContent = W || `
`, N = " style=\"height:" + E.getBoundingClientRect().height + "px\""), x += "<span" + N + "></span>";
                    }), E.style.display = "none", x = "<span class=\"vditor-linenumber__rows\">" + x + "</span>", M.insertAdjacentHTML("beforeend", x);
                  }
                });
              });
            });
          });
        };
      }, 563: (Z, L, y) => {
        y.d(L, { K: () => u });
        var l = y(54), m = y(526), c = y(156), b = {}, s = function(f, w) {
            var _ = window.markmap, S = _.Transformer, M = _.Markmap, E = _.deriveOptions, k = (_.globalCSS, new S());
            f.innerHTML = "<svg style=\"width:100%\"></svg>";
            var p = f.firstChild, x = M.create(p, null), I = function(ne, me) {
                var de = ne.transform(me), le = Object.keys(de.features).filter(function(Ce) {
                  return !b[Ce];
                });
                le.forEach(function(Ce) {
                  b[Ce] = !0;
                });
                var ve = ne.getAssets(le), xe = ve.styles, Me = ve.scripts, $e = window.markmap;
                return xe && $e.loadCSS(xe), Me && $e.loadJS(Me), de;
              }(k, w), W = I.root, N = I.frontmatter, $ = E(N == null ? void 0 : N.markmap);
            x.setData(W, $), x.fit();
          }, u = function(f, w, _) {
            w === void 0 && (w = l.g.CDN);
            var S = c.markmapRenderAdapter.getElements(f);
            S.length !== 0 && (0, m.G)(w + "/dist/js/markmap/markmap.min.js", "vditorMermaidScript").then(function() {
              S.forEach(function(M) {
                var E = c.markmapRenderAdapter.getCode(M);
                if (M.getAttribute("data-processed") !== "true" && E.trim() !== "") {
                  var k = document.createElement("div");
                  k.className = "language-markmap", M.parentNode.appendChild(k), s(k, E), M.parentNode.childNodes[0].nodeName == "CODE" && M.parentNode.removeChild(M.parentNode.childNodes[0]);
                }
              });
            });
          };
      }, 466: (Z, L, y) => {
        y.d(L, { H: () => u });
        var l = y(54), m = y(526), c = y(578), b = y(51), s = y(156), u = function(f, w) {
          var _ = s.mathRenderAdapter.getElements(f);
          if (_.length !== 0) {
            var S = { cdn: l.g.CDN, math: { engine: "KaTeX", inlineDigit: !1, macros: {} } };
            if (w && w.math && (w.math = Object.assign({}, S.math, w.math)), (w = Object.assign({}, S, w)).math.engine === "KaTeX")
              (0, c.c)(w.cdn + "/dist/js/katex/katex.min.css?v=0.16.9", "vditorKatexStyle"), (0, m.G)(w.cdn + "/dist/js/katex/katex.min.js?v=0.16.9", "vditorKatexScript").then(function() {
                (0, m.G)(w.cdn + "/dist/js/katex/mhchem.min.js?v=0.16.9", "vditorKatexChemScript").then(function() {
                  _.forEach(function(E) {
                    if (!E.parentElement.classList.contains("vditor-wysiwyg__pre") && !E.parentElement.classList.contains("vditor-ir__marker--pre") && !E.getAttribute("data-math")) {
                      var k = (0, b.X)(s.mathRenderAdapter.getCode(E));
                      E.setAttribute("data-math", k);
                      try {
                        E.innerHTML = katex.renderToString(k, { displayMode: E.tagName === "DIV", output: "html", macros: w.math.macros });
                      } catch (p) {
                        E.innerHTML = p.message, E.className = "language-math vditor-reset--error";
                      }
                      E.addEventListener("copy", function(p) {
                        p.stopPropagation(), p.preventDefault();
                        var x = p.currentTarget.closest(".language-math");
                        p.clipboardData.setData("text/html", x.innerHTML), p.clipboardData.setData("text/plain", x.getAttribute("data-math"));
                      });
                    }
                  });
                });
              });
            else if (w.math.engine === "MathJax") {
              window.MathJax || (window.MathJax = { loader: { paths: { mathjax: w.cdn + "/dist/js/mathjax" } }, startup: { typeset: !1 }, tex: { macros: w.math.macros } }, Object.assign(window.MathJax, w.math.mathJaxOptions)), (0, m.J)(w.cdn + "/dist/js/mathjax/tex-svg-full.js", "protyleMathJaxScript");
              var M = function(E, k) {
                var p = (0, b.X)(E.textContent).trim(), x = window.MathJax.getMetricsFor(E);
                x.display = E.tagName === "DIV", window.MathJax.tex2svgPromise(p, x).then(function(I) {
                  E.innerHTML = "", E.setAttribute("data-math", p), E.append(I), window.MathJax.startup.document.clear(), window.MathJax.startup.document.updateDocument();
                  var W = I.querySelector("[data-mml-node=\"merror\"]");
                  W && W.textContent.trim() !== "" && (E.innerHTML = W.textContent.trim(), E.className = "vditor-reset--error"), k && k();
                });
              };
              window.MathJax.startup.promise.then(function() {
                for (var E = [], k = function(x) {
                    var I = _[x];
                    I.parentElement.classList.contains("vditor-wysiwyg__pre") || I.parentElement.classList.contains("vditor-ir__marker--pre") || I.getAttribute("data-math") || !(0, b.X)(I.textContent).trim() || E.push(function(W) {
                      x === _.length - 1 ? M(I) : M(I, W);
                    });
                  }, p = 0; p < _.length; p++)
                  k(p);
                (function(x) {
                  if (x.length !== 0) {
                    var I = 0, W = x[x.length - 1], N = function() {
                      var $ = x[I++];
                      $ === W ? $() : $(N);
                    };
                    N();
                  }
                })(E);
              });
            }
          }
        };
      }, 554: (Z, L, y) => {
        y.d(L, { Y: () => m });
        var l = y(835), m = function(c) {
          c && c.querySelectorAll("a").forEach(function(b) {
            var s = b.getAttribute("href");
            s && (s.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/) ? function(u, f) {
              u.insertAdjacentHTML("afterend", "<video controls=\"controls\" src=\"" + f + "\"></video>"), u.remove();
            }(b, s) : s.match(/^.+.(mp3|wav|flac)$/) ? function(u, f) {
              u.insertAdjacentHTML("afterend", "<audio controls=\"controls\" src=\"" + f + "\"></audio>"), u.remove();
            }(b, s) : function(u, f) {
              var w = f.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/), _ = f.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/), S = f.match(/\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/), M = f.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/), E = f.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/), k = f.match(/.+dailymotion.com\/(video|hub)\/(\w+)\?/), p = f.match(/(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/), x = f.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
              if (w && w[1].length === 11)
                u.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"//www.youtube.com/embed/" + w[1] + (w[2] ? "?start=" + w[2] : "") + "\"></iframe>"), u.remove();
              else if (_ && _[1])
                u.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"//player.youku.com/embed/" + _[1] + "\"></iframe>"), u.remove();
              else if (S && S[1])
                u.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"https://v.qq.com/txp/iframe/player.html?vid=" + S[1] + "\"></iframe>"), u.remove();
              else if (M && M[1])
                u.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="//coub.com/embed/` + M[1] + "?muted=false&autostart=false&originalSize=true&startWithHD=true\"></iframe>"), u.remove();
              else if (E && E[0])
                u.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.facebook.com/plugins/video.php?href=` + encodeURIComponent(E[0]) + "\"></iframe>"), u.remove();
              else if (k && k[2])
                u.insertAdjacentHTML("afterend", `<iframe class="iframe__video"
 src="https://www.dailymotion.com/embed/video/` + k[2] + "\"></iframe>"), u.remove();
              else if (f.indexOf("bilibili.com") > -1 && (f.indexOf("bvid=") > -1 || p && p[1])) {
                var I = { bvid: (0, l.o)("bvid", f) || p && p[1], page: "1", high_quality: "1", as_wide: "1", allowfullscreen: "true", autoplay: "0" };
                new URL(f.startsWith("http") ? f : "https:" + f).search.split("&").forEach(function($, ne) {
                  if ($) {
                    ne === 0 && ($ = $.substr(1));
                    var me = $.split("=");
                    I[me[0]] = me[1];
                  }
                });
                var W = "https://player.bilibili.com/player.html?", N = Object.keys(I);
                N.forEach(function($, ne) {
                  W += $ + "=" + I[$], ne < N.length - 1 && (W += "&");
                }), u.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"" + W + "\"></iframe>"), u.remove();
              } else
                x && x[1] && (u.insertAdjacentHTML("afterend", "<iframe class=\"iframe__video\" src=\"//embed.ted.com/talks/" + x[1] + "\"></iframe>"), u.remove());
            }(b, s));
          });
        };
      }, 40: (Z, L, y) => {
        y.d(L, { i: () => f });
        var l = y(54), m = y(526), c = y(156), b = y(835), s = function(w, _, S, M) {
            return new (S || (S = Promise))(function(E, k) {
              function p(W) {
                try {
                  I(M.next(W));
                } catch (N) {
                  k(N);
                }
              }
              function x(W) {
                try {
                  I(M.throw(W));
                } catch (N) {
                  k(N);
                }
              }
              function I(W) {
                var N;
                W.done ? E(W.value) : (N = W.value, N instanceof S ? N : new S(function($) {
                  $(N);
                })).then(p, x);
              }
              I((M = M.apply(w, [])).next());
            });
          }, u = function(w, _) {
            var S, M, E, k, p = { label: 0, sent: function() {
              if (1 & E[0])
                throw E[1];
              return E[1];
            }, trys: [], ops: [] };
            return k = { next: x(0), throw: x(1), return: x(2) }, typeof Symbol == "function" && (k[Symbol.iterator] = function() {
              return this;
            }), k;
            function x(I) {
              return function(W) {
                return function(N) {
                  if (S)
                    throw new TypeError("Generator is already executing.");
                  for (; p; )
                    try {
                      if (S = 1, M && (E = 2 & N[0] ? M.return : N[0] ? M.throw || ((E = M.return) && E.call(M), 0) : M.next) && !(E = E.call(M, N[1])).done)
                        return E;
                      switch (M = 0, E && (N = [2 & N[0], E.value]), N[0]) {
                      case 0:
                      case 1:
                        E = N;
                        break;
                      case 4:
                        return p.label++, { value: N[1], done: !1 };
                      case 5:
                        p.label++, M = N[1], N = [0];
                        continue;
                      case 7:
                        N = p.ops.pop(), p.trys.pop();
                        continue;
                      default:
                        if (E = p.trys, !((E = E.length > 0 && E[E.length - 1]) || N[0] !== 6 && N[0] !== 2)) {
                          p = 0;
                          continue;
                        }
                        if (N[0] === 3 && (!E || N[1] > E[0] && N[1] < E[3])) {
                          p.label = N[1];
                          break;
                        }
                        if (N[0] === 6 && p.label < E[1]) {
                          p.label = E[1], E = N;
                          break;
                        }
                        if (E && p.label < E[2]) {
                          p.label = E[2], p.ops.push(N);
                          break;
                        }
                        E[2] && p.ops.pop(), p.trys.pop();
                        continue;
                      }
                      N = _.call(w, p);
                    } catch ($) {
                      N = [6, $], M = 0;
                    } finally {
                      S = E = 0;
                    }
                  if (5 & N[0])
                    throw N[1];
                  return { value: N[0] ? N[1] : void 0, done: !0 };
                }([I, W]);
              };
            }
          }, f = function(w, _, S) {
            _ === void 0 && (_ = l.g.CDN);
            var M = c.mermaidRenderAdapter.getElements(w);
            M.length !== 0 && (0, m.G)(_ + "/dist/js/mermaid/mermaid.min.js", "vditorMermaidScript").then(function() {
              var E = { securityLevel: "loose", altFontFamily: "sans-serif", fontFamily: "sans-serif", startOnLoad: !1, flowchart: { htmlLabels: !0, useMaxWidth: !0 }, sequence: { useMaxWidth: !0, diagramMarginX: 8, diagramMarginY: 8, boxMargin: 8, showSequenceNumbers: !0 }, gantt: { leftPadding: 75, rightPadding: 20 } };
              S === "dark" && (E.theme = "dark"), mermaid.initialize(E), M.forEach(function(k) {
                return s(void 0, void 0, void 0, function() {
                  var p, x, I, W, N;
                  return u(this, function($) {
                    switch ($.label) {
                    case 0:
                      if (p = c.mermaidRenderAdapter.getCode(k), k.getAttribute("data-processed") === "true" || p.trim() === "")
                        return [2];
                      x = "mermaid" + (0, b.W)(), $.label = 1;
                    case 1:
                      return $.trys.push([1, 3, , 4]), [4, mermaid.render(x, k.textContent)];
                    case 2:
                      return I = $.sent(), k.innerHTML = I.svg, [3, 4];
                    case 3:
                      return W = $.sent(), N = document.querySelector("#" + x), k.innerHTML = N.outerHTML + `<br>
<div style="text-align: left"><small>` + W.message.replace(/\n/, "<br>") + "</small></div>", N.parentElement.remove(), [3, 4];
                    case 4:
                      return k.setAttribute("data-processed", "true"), [2];
                    }
                  });
                });
              });
            });
          };
      }, 749: (Z, L, y) => {
        y.d(L, { P: () => b });
        var l = y(54), m = y(526), c = y(156), b = function(s, u, f) {
          s === void 0 && (s = document), u === void 0 && (u = l.g.CDN);
          var w = c.mindmapRenderAdapter.getElements(s);
          w.length > 0 && (0, m.G)(u + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
            w.forEach(function(_) {
              if (!_.parentElement.classList.contains("vditor-wysiwyg__pre") && !_.parentElement.classList.contains("vditor-ir__marker--pre")) {
                var S = c.mindmapRenderAdapter.getCode(_);
                if (S)
                  try {
                    if (_.getAttribute("data-processed") === "true")
                      return;
                    echarts.init(_, f === "dark" ? "dark" : void 0).setOption({ series: [{ data: [JSON.parse(decodeURIComponent(S))], initialTreeDepth: -1, itemStyle: { borderWidth: 0, color: "#4285f4" }, label: { backgroundColor: "#f6f8fa", borderColor: "#d1d5da", borderRadius: 5, borderWidth: 0.5, color: "#586069", lineHeight: 20, offset: [-5, 0], padding: [0, 5], position: "insideRight" }, lineStyle: { color: "#d1d5da", width: 1 }, roam: !0, symbol: function(M, E) {
                      var k;
                      return !((k = E == null ? void 0 : E.data) === null || k === void 0) && k.children ? "circle" : "path://";
                    }, type: "tree" }], tooltip: { trigger: "item", triggerOn: "mousemove" } }), _.setAttribute("data-processed", "true");
                  } catch (M) {
                    _.className = "vditor-reset--error", _.innerHTML = "mindmap render error: <br>" + M;
                  }
              }
            });
          });
        };
      }, 818: (Z, L, y) => {
        y.d(L, { k: () => c });
        var l = y(64), m = y(466), c = function(b, s, u) {
          var f = "", w = [];
          if (Array.from(b.children).forEach(function(E, k) {
            if ((0, l.W)(E)) {
              if (u) {
                var p = E.id.lastIndexOf("_");
                E.id = E.id.substring(0, p === -1 ? void 0 : p) + "_" + k;
              }
              w.push(E.id), f += E.outerHTML.replace("<wbr>", "");
            }
          }), f === "")
            return s.innerHTML = "", "";
          var _ = document.createElement("div");
          if (u)
            u.lute.SetToC(!0), u.currentMode !== "wysiwyg" || u.preview.element.contains(b) ? u.currentMode !== "ir" || u.preview.element.contains(b) ? _.innerHTML = u.lute.HTML2VditorDOM("<p>[ToC]</p>" + f) : _.innerHTML = u.lute.SpinVditorIRDOM("<p>[ToC]</p>" + f) : _.innerHTML = u.lute.SpinVditorDOM("<p>[ToC]</p>" + f), u.lute.SetToC(u.options.preview.markdown.toc);
          else {
            s.classList.add("vditor-outline");
            var S = Lute.New();
            S.SetToC(!0), _.innerHTML = S.HTML2VditorDOM("<p>[ToC]</p>" + f);
          }
          var M = _.firstElementChild.querySelectorAll("li > span[data-target-id]");
          return M.forEach(function(E, k) {
            if (E.nextElementSibling && E.nextElementSibling.tagName === "UL") {
              var p = "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
              document.getElementById("vditorIconScript") || (p = "<svg class=\"vditor-outline__action\" viewBox=\"0 0 32 32\"><path d=\"M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z\"></path></svg>"), E.innerHTML = p + "<span>" + E.innerHTML + "</span>";
            } else
              E.innerHTML = "<svg></svg><span>" + E.innerHTML + "</span>";
            E.setAttribute("data-target-id", w[k]);
          }), f = _.firstElementChild.innerHTML, M.length === 0 ? (s.innerHTML = "", f) : (s.innerHTML = f, u && (0, m.H)(s, { cdn: u.options.cdn, math: u.options.preview.math }), s.firstElementChild.addEventListener("click", function(E) {
            for (var k = E.target; k && !k.isEqualNode(s); ) {
              if (k.classList.contains("vditor-outline__action")) {
                k.classList.contains("vditor-outline__action--close") ? (k.classList.remove("vditor-outline__action--close"), k.parentElement.nextElementSibling.setAttribute("style", "display:block")) : (k.classList.add("vditor-outline__action--close"), k.parentElement.nextElementSibling.setAttribute("style", "display:none")), E.preventDefault(), E.stopPropagation();
                break;
              }
              if (k.getAttribute("data-target-id")) {
                E.preventDefault(), E.stopPropagation();
                var p = document.getElementById(k.getAttribute("data-target-id"));
                if (!p)
                  return;
                if (u)
                  if (u.options.height === "auto") {
                    var x = p.offsetTop + u.element.offsetTop;
                    u.options.toolbarConfig.pin || (x += u.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, x);
                  } else
                    u.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, u.element.offsetTop), u.preview.element.contains(b) ? b.parentElement.scrollTop = p.offsetTop : b.scrollTop = p.offsetTop;
                else
                  window.scrollTo(window.scrollX, p.offsetTop);
                break;
              }
              k = k.parentElement;
            }
          }), f);
        };
      }, 408: (Z, L, y) => {
        y.d(L, { B: () => b });
        var l = y(54), m = y(526), c = y(156), b = function(s, u) {
          s === void 0 && (s = document), u === void 0 && (u = l.g.CDN);
          var f = c.plantumlRenderAdapter.getElements(s);
          f.length !== 0 && (0, m.G)(u + "/dist/js/plantuml/plantuml-encoder.min.js", "vditorPlantumlScript").then(function() {
            f.forEach(function(w) {
              if (!w.parentElement.classList.contains("vditor-wysiwyg__pre") && !w.parentElement.classList.contains("vditor-ir__marker--pre")) {
                var _ = c.plantumlRenderAdapter.getCode(w).trim();
                if (_)
                  try {
                    w.innerHTML = "<object type=\"image/svg+xml\" data=\"https://www.plantuml.com/plantuml/svg/~1" + plantumlEncoder.encode(_) + "\"/>";
                  } catch (S) {
                    w.className = "vditor-reset--error", w.innerHTML = "plantuml render error: <br>" + S;
                  }
              }
            });
          });
        };
      }, 895: (Z, L, y) => {
        y.d(L, { X: () => l });
        var l = function(m) {
          var c = Lute.New();
          return c.PutEmojis(m.emojis), c.SetEmojiSite(m.emojiSite), c.SetHeadingAnchor(m.headingAnchor), c.SetInlineMathAllowDigitAfterOpenMarker(m.inlineMathDigit), c.SetAutoSpace(m.autoSpace), c.SetToC(m.toc), c.SetFootnotes(m.footnotes), c.SetFixTermTypo(m.fixTermTypo), c.SetVditorCodeBlockPreview(m.codeBlockPreview), c.SetVditorMathBlockPreview(m.mathBlockPreview), c.SetSanitize(m.sanitize), c.SetChineseParagraphBeginningSpace(m.paragraphBeginningSpace), c.SetRenderListStyle(m.listStyle), c.SetLinkBase(m.linkBase), c.SetLinkPrefix(m.linkPrefix), c.SetMark(m.mark), c.SetGFMAutoLink(m.gfmAutoLink), m.lazyLoadImage && c.SetImageLazyLoading(m.lazyLoadImage), c;
        };
      }, 863: (Z, L, y) => {
        y.d(L, { E: () => l });
        var l = function(m, c, b) {
          b === void 0 && (b = "classic");
          var s = m.getBoundingClientRect();
          document.body.insertAdjacentHTML("beforeend", "<div class=\"vditor vditor-img" + (b === "dark" ? " vditor--dark" : "") + `">
    <div class="vditor-img__bar">
      <span class="vditor-img__btn" data-deg="0">
        <svg><use xlink:href="#vditor-icon-redo"></use></svg>
        ` + window.VditorI18n.spin + `
      </span>
      <span class="vditor-img__btn"  onclick="this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''">
        X &nbsp;` + window.VditorI18n.close + `
      </span>
    </div>
    <div class="vditor-img__img" onclick="this.parentElement.outerHTML = '';document.body.style.overflow = ''">
      <img style="width: ` + m.width + "px;height:" + m.height + "px;transform: translate3d(" + s.left + "px, " + (s.top - 36) + "px, 0)\" src=\"" + m.getAttribute("src") + `">
    </div>
</div>`), document.body.style.overflow = "hidden";
          var u = document.querySelector(".vditor-img img"), f = "translate3d(" + Math.max(0, window.innerWidth - m.naturalWidth) / 2 + "px, " + Math.max(0, window.innerHeight - 36 - m.naturalHeight) / 2 + "px, 0)";
          setTimeout(function() {
            u.setAttribute("style", "transition: transform .3s ease-in-out;transform: " + f), setTimeout(function() {
              u.parentElement.scrollTo((u.parentElement.scrollWidth - u.parentElement.clientWidth) / 2, (u.parentElement.scrollHeight - u.parentElement.clientHeight) / 2);
            }, 400);
          });
          var w = document.querySelector(".vditor-img__btn");
          w.addEventListener("click", function() {
            var _ = parseInt(w.getAttribute("data-deg"), 10) + 90;
            _ / 90 % 2 == 1 && m.naturalWidth > u.parentElement.clientHeight ? u.style.transform = "translate3d(" + Math.max(0, window.innerWidth - m.naturalWidth) / 2 + "px, " + (m.naturalWidth / 2 - m.naturalHeight / 2) + "px, 0) rotateZ(" + _ + "deg)" : u.style.transform = f + " rotateZ(" + _ + "deg)", w.setAttribute("data-deg", _.toString()), setTimeout(function() {
              u.parentElement.scrollTo((u.parentElement.scrollWidth - u.parentElement.clientWidth) / 2, (u.parentElement.scrollHeight - u.parentElement.clientHeight) / 2);
            }, 400);
          });
        };
      }, 312: (Z, L, y) => {
        y.d(L, { Y: () => c });
        var l = y(54), m = y(578), c = function(b, s) {
          s === void 0 && (s = l.g.CDN), l.g.CODE_THEME.includes(b) || (b = "github");
          var u = document.getElementById("vditorHljsStyle"), f = s + "/dist/js/highlight.js/styles/" + b + ".css";
          u ? u.getAttribute("href") !== f && (u.remove(), (0, m.c)(f, "vditorHljsStyle")) : (0, m.c)(f, "vditorHljsStyle");
        };
      }, 227: (Z, L, y) => {
        y.d(L, { Z: () => m });
        var l = y(578), m = function(c, b) {
          if (c && b) {
            var s = document.getElementById("vditorContentTheme"), u = b + "/" + c + ".css";
            s ? s.getAttribute("href") !== u && (s.remove(), (0, l.c)(u, "vditorContentTheme")) : (0, l.c)(u, "vditorContentTheme");
          }
        };
      }, 526: (Z, L, y) => {
        y.d(L, { G: () => m, J: () => l });
        var l = function(c, b) {
            if (document.getElementById(b))
              return !1;
            var s = new XMLHttpRequest();
            s.open("GET", c, !1), s.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"), s.send("");
            var u = document.createElement("script");
            u.type = "text/javascript", u.text = s.responseText, u.id = b, document.head.appendChild(u);
          }, m = function(c, b) {
            return new Promise(function(s, u) {
              if (document.getElementById(b))
                return s(), !1;
              var f = document.createElement("script");
              f.src = c, f.async = !0, document.head.appendChild(f), f.onerror = function(w) {
                u(w);
              }, f.onload = function() {
                if (document.getElementById(b))
                  return f.remove(), s(), !1;
                f.id = b, s();
              };
            });
          };
      }, 578: (Z, L, y) => {
        y.d(L, { c: () => l });
        var l = function(m, c) {
          if (!document.getElementById(c)) {
            var b = document.createElement("link");
            b.id = c, b.rel = "stylesheet", b.type = "text/css", b.href = m, document.getElementsByTagName("head")[0].appendChild(b);
          }
        };
      }, 51: (Z, L, y) => {
        y.d(L, { X: () => l });
        var l = function(m) {
          return m.replace(/\u00a0/g, " ");
        };
      }, 794: (Z, L, y) => {
        y.d(L, { G6: () => l, Le: () => b, i7: () => f, ns: () => u, pK: () => c, vU: () => m, yl: () => s });
        var l = function() {
            return navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1;
          }, m = function() {
            return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
          }, c = function() {
            try {
              return typeof localStorage < "u";
            } catch {
              return !1;
            }
          }, b = function() {
            return navigator.userAgent.indexOf("iPhone") > -1 ? "touchstart" : "click";
          }, s = function(w) {
            return navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? !(!w.metaKey || w.ctrlKey) : !(w.metaKey || !w.ctrlKey);
          }, u = function(w) {
            return /Mac/.test(navigator.platform) || navigator.platform === "iPhone" ? w.indexOf("⇧") > -1 && m() && (w = w.replace(";", ":").replace("=", "+").replace("-", "_")) : (w = (w = w.startsWith("⌘") ? w.replace("⌘", "⌘+") : w.startsWith("⌥") && w.substr(1, 1) !== "⌘" ? w.replace("⌥", "⌥+") : w.replace("⇧⌘", "⌘+⇧+").replace("⌥⌘", "⌥+⌘+")).replace("⌘", "Ctrl").replace("⇧", "Shift").replace("⌥", "Alt")).indexOf("Shift") > -1 && (w = w.replace(";", ":").replace("=", "+").replace("-", "_")), w;
          }, f = function() {
            return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
          };
      }, 835: (Z, L, y) => {
        y.d(L, { W: () => l, o: () => m });
        var l = function() {
            return ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(c) {
              return (parseInt(c, 10) ^ window.crypto.getRandomValues(new Uint32Array(1))[0] & 15 >> parseInt(c, 10) / 4).toString(16);
            });
          }, m = function(c, b) {
            b === void 0 && (b = window.location.search);
            var s = b.substring(b.indexOf("?")), u = s.indexOf("#");
            return new URLSearchParams(s.substring(0, u >= 0 ? u : void 0)).get(c);
          };
      }, 827: (Z, L, y) => {
        y.d(L, { DX: () => _, E2: () => c, F9: () => u, JQ: () => m, O9: () => b, a1: () => s, fb: () => w, lG: () => f });
        var l = y(64), m = function(S, M) {
            for (var E = w(S, M), k = !1, p = !1; E && !E.classList.contains("vditor-reset") && !p; )
              (k = w(E.parentElement, M)) ? E = k : p = !0;
            return E || !1;
          }, c = function(S, M) {
            for (var E = (0, l.S)(S, M), k = !1, p = !1; E && !E.classList.contains("vditor-reset") && !p; )
              (k = (0, l.S)(E.parentElement, M)) ? E = k : p = !0;
            return E || !1;
          }, b = function(S) {
            var M = c(S, "UL"), E = c(S, "OL"), k = M;
            return E && (!M || M && E.contains(M)) && (k = E), k;
          }, s = function(S, M, E) {
            if (!S)
              return !1;
            S.nodeType === 3 && (S = S.parentElement);
            for (var k = S, p = !1; k && !p && !k.classList.contains("vditor-reset"); )
              k.getAttribute(M) === E ? p = !0 : k = k.parentElement;
            return p && k;
          }, u = function(S) {
            if (!S)
              return !1;
            S.nodeType === 3 && (S = S.parentElement);
            var M = S, E = !1, k = s(S, "data-block", "0");
            if (k)
              return k;
            for (; M && !E && !M.classList.contains("vditor-reset"); )
              M.tagName === "H1" || M.tagName === "H2" || M.tagName === "H3" || M.tagName === "H4" || M.tagName === "H5" || M.tagName === "H6" || M.tagName === "P" || M.tagName === "BLOCKQUOTE" || M.tagName === "OL" || M.tagName === "UL" ? E = !0 : M = M.parentElement;
            return E && M;
          }, f = function(S, M) {
            if (!S)
              return !1;
            S.nodeType === 3 && (S = S.parentElement);
            for (var E = S, k = !1; E && !k && !E.classList.contains("vditor-reset"); )
              E.nodeName === M ? k = !0 : E = E.parentElement;
            return k && E;
          }, w = function(S, M) {
            if (!S)
              return !1;
            S.nodeType === 3 && (S = S.parentElement);
            for (var E = S, k = !1; E && !k && !E.classList.contains("vditor-reset"); )
              E.classList.contains(M) ? k = !0 : E = E.parentElement;
            return k && E;
          }, _ = function(S) {
            for (; S && S.lastChild; )
              S = S.lastChild;
            return S;
          };
      }, 64: (Z, L, y) => {
        y.d(L, { S: () => l, W: () => m });
        var l = function(c, b) {
            if (!c)
              return !1;
            c.nodeType === 3 && (c = c.parentElement);
            for (var s = c, u = !1; s && !u && !s.classList.contains("vditor-reset"); )
              s.nodeName.indexOf(b) === 0 ? u = !0 : s = s.parentElement;
            return u && s;
          }, m = function(c) {
            var b = l(c, "H");
            return !(!b || b.tagName.length !== 2 || b.tagName === "HR") && b;
          };
      }, 640: (Z, L, y) => {
        y.d(L, { T: () => l });
        var l = function() {
          for (var m = [], c = 0; c < arguments.length; c++)
            m[c] = arguments[c];
          for (var b = {}, s = function(f) {
              for (var w in f)
                f.hasOwnProperty(w) && (Object.prototype.toString.call(f[w]) === "[object Object]" ? b[w] = l(b[w], f[w]) : b[w] = f[w]);
            }, u = 0; u < m.length; u++)
            s(m[u]);
          return b;
        };
      }, 393: (Z, L, y) => {
        y.d(L, { $j: () => _, Gb: () => u, Hc: () => f, Ny: () => s, ib: () => S, im: () => w, oC: () => M, zh: () => b });
        var l = y(54), m = y(794), c = y(827), b = function(E) {
            var k, p = E[E.currentMode].element;
            return getSelection().rangeCount > 0 && (k = getSelection().getRangeAt(0), p.isEqualNode(k.startContainer) || p.contains(k.startContainer)) ? k : E[E.currentMode].range ? E[E.currentMode].range : (p.focus(), (k = p.ownerDocument.createRange()).setStart(p, 0), k.collapse(!0), k);
          }, s = function(E) {
            var k = window.getSelection().getRangeAt(0);
            if (!E.contains(k.startContainer) && !(0, c.fb)(k.startContainer, "vditor-panel--none"))
              return { left: 0, top: 0 };
            var p, x = E.parentElement.getBoundingClientRect();
            if (k.getClientRects().length === 0)
              if (k.startContainer.nodeType === 3) {
                var I = k.startContainer.parentElement;
                if (!(I && I.getClientRects().length > 0))
                  return { left: 0, top: 0 };
                p = I.getClientRects()[0];
              } else {
                var W = k.startContainer.children;
                if (W[k.startOffset] && W[k.startOffset].getClientRects().length > 0)
                  p = W[k.startOffset].getClientRects()[0];
                else if (k.startContainer.childNodes.length > 0) {
                  var N = k.cloneRange();
                  k.selectNode(k.startContainer.childNodes[Math.max(0, k.startOffset - 1)]), p = k.getClientRects()[0], k.setEnd(N.endContainer, N.endOffset), k.setStart(N.startContainer, N.startOffset);
                } else
                  p = k.startContainer.getClientRects()[0];
                if (!p) {
                  for (var $ = k.startContainer.childNodes[k.startOffset]; !$.getClientRects || $.getClientRects && $.getClientRects().length === 0; )
                    $ = $.parentElement;
                  p = $.getClientRects()[0];
                }
              }
            else
              p = k.getClientRects()[0];
            return { left: p.left - x.left, top: p.top - x.top };
          }, u = function(E, k) {
            if (!k) {
              if (getSelection().rangeCount === 0)
                return !1;
              k = getSelection().getRangeAt(0);
            }
            var p = k.commonAncestorContainer;
            return E.isEqualNode(p) || E.contains(p);
          }, f = function(E) {
            var k = window.getSelection();
            k.removeAllRanges(), k.addRange(E);
          }, w = function(E, k, p) {
            var x = { end: 0, start: 0 };
            if (!p) {
              if (getSelection().rangeCount === 0)
                return x;
              p = window.getSelection().getRangeAt(0);
            }
            if (u(k, p)) {
              var I = p.cloneRange();
              E.childNodes[0] && E.childNodes[0].childNodes[0] ? I.setStart(E.childNodes[0].childNodes[0], 0) : I.selectNodeContents(E), I.setEnd(p.startContainer, p.startOffset), x.start = I.toString().length, x.end = x.start + p.toString().length;
            }
            return x;
          }, _ = function(E, k, p) {
            var x = 0, I = 0, W = p.childNodes[I], N = !1, $ = !1;
            E = Math.max(0, E), k = Math.max(0, k);
            var ne = p.ownerDocument.createRange();
            for (ne.setStart(W || p, 0), ne.collapse(!0); !$ && W; ) {
              var me = x + W.textContent.length;
              if (!N && E >= x && E <= me && (E === 0 ? ne.setStart(W, 0) : W.childNodes[0].nodeType === 3 ? ne.setStart(W.childNodes[0], E - x) : W.nextSibling ? ne.setStartBefore(W.nextSibling) : ne.setStartAfter(W), N = !0, E === k)) {
                $ = !0;
                break;
              }
              N && k >= x && k <= me && (k === 0 ? ne.setEnd(W, 0) : W.childNodes[0].nodeType === 3 ? ne.setEnd(W.childNodes[0], k - x) : W.nextSibling ? ne.setEndBefore(W.nextSibling) : ne.setEndAfter(W), $ = !0), x = me, W = p.childNodes[++I];
            }
            return !$ && p.childNodes[I - 1] && ne.setStartBefore(p.childNodes[I - 1]), f(ne), ne;
          }, S = function(E, k) {
            var p = E.querySelector("wbr");
            if (p) {
              if (p.previousElementSibling)
                if (p.previousElementSibling.isSameNode(p.previousSibling)) {
                  if (p.previousElementSibling.lastChild)
                    return k.setStartBefore(p), k.collapse(!0), f(k), !(0, m.i7)() || p.previousElementSibling.tagName !== "EM" && p.previousElementSibling.tagName !== "STRONG" && p.previousElementSibling.tagName !== "S" || (k.insertNode(document.createTextNode(l.g.ZWSP)), k.collapse(!1)), void p.remove();
                  k.setStartAfter(p.previousElementSibling);
                } else
                  k.setStart(p.previousSibling, p.previousSibling.textContent.length);
              else
                p.previousSibling ? k.setStart(p.previousSibling, p.previousSibling.textContent.length) : p.nextSibling ? p.nextSibling.nodeType === 3 ? k.setStart(p.nextSibling, 0) : k.setStartBefore(p.nextSibling) : k.setStart(p.parentElement, 0);
              k.collapse(!0), p.remove(), f(k);
            }
          }, M = function(E, k) {
            var p = document.createElement("div");
            p.innerHTML = E;
            var x = p.querySelectorAll("p");
            x.length === 1 && !x[0].previousSibling && !x[0].nextSibling && k[k.currentMode].element.children.length > 0 && p.firstElementChild.tagName === "P" && (E = x[0].innerHTML.trim());
            var I = document.createElement("div");
            I.innerHTML = E;
            var W = b(k);
            if (W.toString() !== "" && (k[k.currentMode].preventInput = !0, document.execCommand("delete", !1, "")), I.firstElementChild && I.firstElementChild.getAttribute("data-block") === "0") {
              I.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
              var N = (0, c.F9)(W.startContainer);
              N ? N.insertAdjacentHTML("afterend", I.innerHTML) : k[k.currentMode].element.insertAdjacentHTML("beforeend", I.innerHTML), S(k[k.currentMode].element, W);
            } else {
              var $ = document.createElement("template");
              $.innerHTML = E, W.insertNode($.content.cloneNode(!0)), W.collapse(!1), f(W);
            }
          };
      } }, be = {};
    function J(Z) {
      var L = be[Z];
      if (L !== void 0)
        return L.exports;
      var y = be[Z] = { exports: {} };
      return ke[Z](y, y.exports, J), y.exports;
    }
    J.d = (Z, L) => {
      for (var y in L)
        J.o(L, y) && !J.o(Z, y) && Object.defineProperty(Z, y, { enumerable: !0, get: L[y] });
    }, J.o = (Z, L) => Object.prototype.hasOwnProperty.call(Z, L), J.r = (Z) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(Z, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(Z, "__esModule", { value: !0 });
    };
    var Se = {};
    return (() => {
      J.d(Se, { default: () => hi });
      var Z, L = J(872), y = J(54), l = J(51), m = function(e) {
          return e.currentMode === "sv" ? (0, l.X)((e.sv.element.textContent + `
`).replace(/\n\n$/, `
`)) : e.currentMode === "wysiwyg" ? e.lute.VditorDOM2Md(e.wysiwyg.element.innerHTML) : e.currentMode === "ir" ? e.lute.VditorIRDOM2Md(e.ir.element.innerHTML) : "";
        }, c = J(526), b = function() {
          function e() {
            this.element = document.createElement("div"), this.element.className = "vditor-devtools", this.element.innerHTML = "<div class=\"vditor-reset--error\"></div><div style=\"height: 100%;\"></div>";
          }
          return e.prototype.renderEchart = function(t) {
            var n = this;
            t.devtools.element.style.display === "block" && (0, c.G)(t.options.cdn + "/dist/js/echarts/echarts.min.js", "vditorEchartsScript").then(function() {
              n.ASTChart || (n.ASTChart = echarts.init(t.devtools.element.lastElementChild));
              try {
                n.element.lastElementChild.style.display = "block", n.element.firstElementChild.innerHTML = "", n.ASTChart.setOption({ series: [{ data: JSON.parse(t.lute.RenderEChartsJSON(m(t))), initialTreeDepth: -1, label: { align: "left", backgroundColor: "rgba(68, 77, 86, .68)", borderRadius: 3, color: "#d1d5da", fontSize: 12, lineHeight: 12, offset: [9, 12], padding: [2, 4, 2, 4], position: "top", verticalAlign: "middle" }, lineStyle: { color: "#4285f4", type: "curve", width: 1 }, orient: "vertical", roam: !0, type: "tree" }], toolbox: { bottom: 25, emphasis: { iconStyle: { color: "#4285f4" } }, feature: { restore: { show: !0 }, saveAsImage: { show: !0 } }, right: 15, show: !0 } }), n.ASTChart.resize();
              } catch (i) {
                n.element.lastElementChild.style.display = "none", n.element.firstElementChild.innerHTML = i;
              }
            });
          }, e;
        }(), s = J(794), u = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var i = e[n].children[0];
              i && i.classList.contains("vditor-menu--current") && i.classList.remove("vditor-menu--current");
            }
          });
        }, f = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var i = e[n].children[0];
              i && !i.classList.contains("vditor-menu--current") && i.classList.add("vditor-menu--current");
            }
          });
        }, w = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var i = e[n].children[0];
              i && i.classList.contains(y.g.CLASS_MENU_DISABLED) && i.classList.remove(y.g.CLASS_MENU_DISABLED);
            }
          });
        }, _ = function(e, t) {
          t.forEach(function(n) {
            if (e[n]) {
              var i = e[n].children[0];
              i && !i.classList.contains(y.g.CLASS_MENU_DISABLED) && i.classList.add(y.g.CLASS_MENU_DISABLED);
            }
          });
        }, S = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "none");
          });
        }, M = function(e, t) {
          t.forEach(function(n) {
            e[n] && e[n] && (e[n].style.display = "block");
          });
        }, E = function(e, t, n) {
          t.includes("subToolbar") && (e.toolbar.element.querySelectorAll(".vditor-hint").forEach(function(i) {
            n && i.isEqualNode(n) || (i.style.display = "none");
          }), e.toolbar.elements.emoji && (e.toolbar.elements.emoji.lastElementChild.style.display = "none")), t.includes("hint") && (e.hint.element.style.display = "none"), e.wysiwyg.popover && t.includes("popover") && (e.wysiwyg.popover.style.display = "none");
        }, k = function(e, t, n, i) {
          n.addEventListener((0, s.Le)(), function(r) {
            r.preventDefault(), r.stopPropagation(), n.classList.contains(y.g.CLASS_MENU_DISABLED) || (e.toolbar.element.querySelectorAll(".vditor-hint--current").forEach(function(o) {
              o.classList.remove("vditor-hint--current");
            }), t.style.display === "block" ? t.style.display = "none" : (E(e, ["subToolbar", "hint", "popover"], n.parentElement.parentElement), n.classList.contains("vditor-tooltipped") || n.classList.add("vditor-hint--current"), t.style.display = "block", e.toolbar.element.getBoundingClientRect().right - n.getBoundingClientRect().right < 250 ? t.classList.add("vditor-panel--left") : t.classList.remove("vditor-panel--left")));
          });
        }, p = J(827), x = J(64), I = function(e, t, n, i) {
          i && console.log(e + " - " + n + ": " + t);
        }, W = J(478), N = J(314), $ = J(730), ne = J(66), me = J(218), de = J(702), le = J(466), ve = J(40), xe = J(563), Me = J(749), $e = J(408), Ce = function(e, t) {
          if (e)
            if (e.parentElement.getAttribute("data-type") !== "html-block") {
              var n = e.firstElementChild.className.replace("language-", "");
              n === "abc" ? (0, W.Q)(e, t.options.cdn) : n === "mermaid" ? (0, ve.i)(e, t.options.cdn, t.options.theme) : n === "markmap" ? (0, xe.K)(e, t.options.cdn, t.options.theme) : n === "flowchart" ? (0, ne.P)(e, t.options.cdn) : n === "echarts" ? (0, N.p)(e, t.options.cdn, t.options.theme) : n === "mindmap" ? (0, Me.P)(e, t.options.cdn, t.options.theme) : n === "plantuml" ? (0, $e.B)(e, t.options.cdn) : n === "graphviz" ? (0, me.v)(e, t.options.cdn) : n === "math" ? (0, le.H)(e, { cdn: t.options.cdn, math: t.options.preview.math }) : t.options.customRenders.find(function(i) {
                if (i.language === n)
                  return i.render(e, t), !0;
              }) || ((0, de.s)(Object.assign({}, t.options.preview.hljs), e, t.options.cdn), (0, $.O)(e, t.options.preview.hljs)), e.setAttribute("data-render", "1");
            } else
              e.setAttribute("data-render", "1");
        }, T = J(393), Ve = function(e) {
          if (e.currentMode !== "sv") {
            var t = e[e.currentMode].element, n = e.outline.render(e);
            n === "" && (n = "[ToC]"), t.querySelectorAll("[data-type=\"toc-block\"]").forEach(function(i) {
              i.innerHTML = n, (0, le.H)(i, { cdn: e.options.cdn, math: e.options.preview.math });
            });
          }
        }, bt = function(e, t) {
          var n = (0, p.lG)(e.target, "SPAN");
          if (n && (0, p.fb)(n, "vditor-toc")) {
            var i = t[t.currentMode].element.querySelector("#" + n.getAttribute("data-target-id"));
            if (i)
              if (t.options.height === "auto") {
                var r = i.offsetTop + t.element.offsetTop;
                t.options.toolbarConfig.pin || (r += t.toolbar.element.offsetHeight), window.scrollTo(window.scrollX, r);
              } else
                t.element.offsetTop < window.scrollY && window.scrollTo(window.scrollX, t.element.offsetTop), t[t.currentMode].element.scrollTop = i.offsetTop;
          }
        }, K = function(e, t, n, i) {
          if (e.previousElementSibling && e.previousElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Backspace" && (0, T.im)(e, t[t.currentMode].element, i).start === 0)
              return e.previousElementSibling.remove(), ae(t), !0;
            if (at(t, n, i, e, e.previousElementSibling))
              return !0;
          }
          if (e.nextElementSibling && e.nextElementSibling.classList.contains("vditor-toc")) {
            if (n.key === "Delete" && (0, T.im)(e, t[t.currentMode].element, i).start >= e.textContent.trimRight().length)
              return e.nextElementSibling.remove(), ae(t), !0;
            if (ht(t, n, i, e, e.nextElementSibling))
              return !0;
          }
          if (n.key === "Backspace" || n.key === "Delete") {
            var r = (0, p.fb)(i.startContainer, "vditor-toc");
            if (r)
              return r.remove(), ae(t), !0;
          }
        }, ge = function(e, t, n, i) {
          n === void 0 && (n = !1);
          var r = (0, p.F9)(t.startContainer);
          if (r && !n && r.getAttribute("data-type") !== "code-block") {
            if (zt(r.innerHTML) && r.previousElementSibling || Kt(r.innerHTML))
              return;
            for (var o = (0, T.im)(r, e.ir.element, t).start, a = !0, d = o - 1; d > r.textContent.substr(0, o).lastIndexOf(`
`); d--)
              if (r.textContent.charAt(d) !== " " && r.textContent.charAt(d) !== "	") {
                a = !1;
                break;
              }
            o === 0 && (a = !1);
            var v = !0;
            for (d = o - 1; d < r.textContent.length; d++)
              if (r.textContent.charAt(d) !== " " && r.textContent.charAt(d) !== `
`) {
                v = !1;
                break;
              }
            if (a)
              return void (typeof e.options.input == "function" && e.options.input(m(e)));
            if (v && !(0, p.fb)(t.startContainer, "vditor-ir__marker")) {
              var g = t.startContainer.previousSibling;
              return g && g.nodeType !== 3 && g.classList.contains("vditor-ir__node--expand") && g.classList.remove("vditor-ir__node--expand"), void (typeof e.options.input == "function" && e.options.input(m(e)));
            }
          }
          if (e.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(F) {
            F.classList.remove("vditor-ir__node--expand");
          }), r || (r = e.ir.element), !r.querySelector("wbr")) {
            var h = (0, p.fb)(t.startContainer, "vditor-ir__preview");
            h ? h.previousElementSibling.insertAdjacentHTML("beforeend", "<wbr>") : t.insertNode(document.createElement("wbr"));
          }
          r.querySelectorAll("[style]").forEach(function(F) {
            F.removeAttribute("style");
          }), r.getAttribute("data-type") === "link-ref-defs-block" && (r = e.ir.element);
          var A, O = r.isEqualNode(e.ir.element), U = (0, p.a1)(r, "data-type", "footnotes-block"), C = "";
          if (O)
            C = r.innerHTML;
          else {
            var R = (0, x.S)(t.startContainer, "BLOCKQUOTE"), q = (0, p.O9)(t.startContainer);
            if (q && (r = q), R && (!q || q && !R.contains(q)) && (r = R), U && (r = U), C = r.outerHTML, r.tagName === "UL" || r.tagName === "OL") {
              var D = r.previousElementSibling, B = r.nextElementSibling;
              !D || D.tagName !== "UL" && D.tagName !== "OL" || (C = D.outerHTML + C, D.remove()), !B || B.tagName !== "UL" && B.tagName !== "OL" || (C += B.outerHTML, B.remove()), C = C.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
            } else
              r.previousElementSibling && r.previousElementSibling.textContent.replace(y.g.ZWSP, "") !== "" && i && i.inputType === "insertParagraph" && (C = r.previousElementSibling.outerHTML + C, r.previousElementSibling.remove());
            r.innerText.startsWith("```") || (e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(F) {
              F && !r.isEqualNode(F) && (C += F.outerHTML, F.remove());
            }), e.ir.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(F) {
              F && !r.isEqualNode(F) && (C += F.outerHTML, F.remove());
            }));
          }
          if (I("SpinVditorIRDOM", C, "argument", e.options.debugger), C = e.lute.SpinVditorIRDOM(C), I("SpinVditorIRDOM", C, "result", e.options.debugger), O)
            r.innerHTML = C;
          else if (r.outerHTML = C, U) {
            var P = (0, p.a1)(e.ir.element.querySelector("wbr"), "data-type", "footnotes-def");
            if (P) {
              var H = P.textContent, G = H.substring(1, H.indexOf("]:")), te = e.ir.element.querySelector("sup[data-type=\"footnotes-ref\"][data-footnotes-label=\"" + G + "\"]");
              te && te.setAttribute("aria-label", H.substr(G.length + 3).trim().substr(0, 24));
            }
          }
          var X, ee = e.ir.element.querySelectorAll("[data-type='link-ref-defs-block']");
          ee.forEach(function(F, re) {
            re === 0 ? A = F : (A.insertAdjacentHTML("beforeend", F.innerHTML), F.remove());
          }), ee.length > 0 && e.ir.element.insertAdjacentElement("beforeend", ee[0]);
          var Y = e.ir.element.querySelectorAll("[data-type='footnotes-block']");
          Y.forEach(function(F, re) {
            re === 0 ? X = F : (X.insertAdjacentHTML("beforeend", F.innerHTML), F.remove());
          }), Y.length > 0 && e.ir.element.insertAdjacentElement("beforeend", Y[0]), (0, T.ib)(e.ir.element, t), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(F) {
            Ce(F, e);
          }), Ve(e), Fe(e, { enableAddUndoStack: !0, enableHint: !0, enableInput: !0 });
        }, V = function(e, t) {
          if (e === "")
            return !1;
          if (e.indexOf("⇧") === -1 && e.indexOf("⌘") === -1 && e.indexOf("⌥") === -1)
            return !((0, s.yl)(t) || t.altKey || t.shiftKey || t.code !== e);
          if (e === "⇧Tab")
            return !((0, s.yl)(t) || t.altKey || !t.shiftKey || t.code !== "Tab");
          var n = e.split("");
          if (e.startsWith("⌥")) {
            var i = n.length === 3 ? n[2] : n[1];
            return !((n.length === 3 ? !(0, s.yl)(t) : (0, s.yl)(t)) || !t.altKey || t.shiftKey || t.code !== (/^[0-9]$/.test(i) ? "Digit" : "Key") + i);
          }
          e === "⌘Enter" && (n = ["⌘", "Enter"]);
          var r = n.length > 2 && n[0] === "⇧", o = r ? n[2] : n[1];
          return !r || !(0, s.vU)() && /Mac/.test(navigator.platform) || (o === "-" ? o = "_" : o === "=" && (o = "+")), !(!(0, s.yl)(t) || t.key.toLowerCase() !== o.toLowerCase() || t.altKey || !(!r && !t.shiftKey || r && t.shiftKey));
        }, j = function(e, t) {
          t.ir.element.querySelectorAll(".vditor-ir__node--expand").forEach(function(a) {
            a.classList.remove("vditor-ir__node--expand");
          });
          var n = (0, p.JQ)(e.startContainer, "vditor-ir__node"), i = !e.collapsed && (0, p.JQ)(e.endContainer, "vditor-ir__node");
          if (e.collapsed || n && n === i) {
            n && (n.classList.add("vditor-ir__node--expand"), n.classList.remove("vditor-ir__node--hidden"), (0, T.Hc)(e));
            var r = function(a) {
              var d = a.startContainer;
              if (d.nodeType === 3 && d.nodeValue.length !== a.startOffset)
                return !1;
              for (var v = d.nextSibling; v && v.textContent === ""; )
                v = v.nextSibling;
              if (!v) {
                var g = (0, p.fb)(d, "vditor-ir__marker");
                if (g && !g.nextSibling) {
                  var h = d.parentElement.parentElement.nextSibling;
                  if (h && h.nodeType !== 3 && h.classList.contains("vditor-ir__node"))
                    return h;
                }
                return !1;
              }
              return !(!v || v.nodeType === 3 || !v.classList.contains("vditor-ir__node") || v.getAttribute("data-block")) && v;
            }(e);
            if (r)
              return r.classList.add("vditor-ir__node--expand"), void r.classList.remove("vditor-ir__node--hidden");
            var o = function(a) {
              var d = a.startContainer, v = d.previousSibling;
              return !(d.nodeType !== 3 || a.startOffset !== 0 || !v || v.nodeType === 3 || !v.classList.contains("vditor-ir__node") || v.getAttribute("data-block")) && v;
            }(e);
            return o ? (o.classList.add("vditor-ir__node--expand"), void o.classList.remove("vditor-ir__node--hidden")) : void 0;
          }
        }, ie = J(863), se = function(e, t) {
          e.querySelectorAll("[data-type=footnotes-link]").forEach(function(n) {
            for (var i = n.parentElement, r = i.nextSibling; r && r.textContent.startsWith("    "); ) {
              var o = r;
              o.childNodes.forEach(function(a) {
                i.append(a.cloneNode(!0));
              }), r = r.nextSibling, o.remove();
            }
            t && t(i);
          });
        }, oe = function(e, t) {
          var n, i = getSelection().getRangeAt(0).cloneRange(), r = i.startContainer;
          i.startContainer.nodeType !== 3 && i.startContainer.tagName === "DIV" && (r = i.startContainer.childNodes[i.startOffset - 1]);
          var o = (0, p.a1)(r, "data-block", "0");
          if (o && t && (t.inputType === "deleteContentBackward" || t.data === " ")) {
            for (var a = (0, T.im)(o, e.sv.element, i).start, d = !0, v = a - 1; v > o.textContent.substr(0, a).lastIndexOf(`
`); v--)
              if (o.textContent.charAt(v) !== " " && o.textContent.charAt(v) !== "	") {
                d = !1;
                break;
              }
            if (a === 0 && (d = !1), d)
              return void He(e);
            if (t.inputType === "deleteContentBackward") {
              var g = (0, p.a1)(r, "data-type", "code-block-open-marker") || (0, p.a1)(r, "data-type", "code-block-close-marker");
              if (g) {
                var h;
                if (g.getAttribute("data-type") === "code-block-close-marker" && (h = Et(r, "code-block-open-marker")) || g.getAttribute("data-type") === "code-block-open-marker" && (h = Et(r, "code-block-close-marker", !1)))
                  return h.textContent = g.textContent, void He(e);
              }
              var A = (0, p.a1)(r, "data-type", "math-block-open-marker");
              if (A) {
                var O = A.nextElementSibling.nextElementSibling;
                return void (O && O.getAttribute("data-type") === "math-block-close-marker" && (O.remove(), He(e)));
              }
              o.querySelectorAll("[data-type=\"code-block-open-marker\"]").forEach(function(D) {
                D.textContent.length === 1 && D.remove();
              }), o.querySelectorAll("[data-type=\"code-block-close-marker\"]").forEach(function(D) {
                D.textContent.length === 1 && D.remove();
              });
              var U = (0, p.a1)(r, "data-type", "heading-marker");
              if (U && U.textContent.indexOf("#") === -1)
                return void He(e);
            }
            if ((t.data === " " || t.inputType === "deleteContentBackward") && ((0, p.a1)(r, "data-type", "padding") || (0, p.a1)(r, "data-type", "li-marker") || (0, p.a1)(r, "data-type", "task-marker") || (0, p.a1)(r, "data-type", "blockquote-marker")))
              return void He(e);
          }
          if (o && o.textContent.trimRight() === "$$")
            He(e);
          else {
            o || (o = e.sv.element), ((n = o.firstElementChild) === null || n === void 0 ? void 0 : n.getAttribute("data-type")) === "link-ref-defs-block" && (o = e.sv.element), (0, p.a1)(r, "data-type", "footnotes-link") && (o = e.sv.element), o.textContent.indexOf(Lute.Caret) === -1 && i.insertNode(document.createTextNode(Lute.Caret)), o.querySelectorAll("[style]").forEach(function(D) {
              D.removeAttribute("style");
            }), o.querySelectorAll("font").forEach(function(D) {
              D.outerHTML = D.innerHTML;
            });
            var C = o.textContent, R = o.isEqualNode(e.sv.element);
            if (R)
              C = o.textContent;
            else {
              o.previousElementSibling && (C = o.previousElementSibling.textContent + C, o.previousElementSibling.remove()), o.previousElementSibling && C.indexOf(`---
`) === 0 && (C = o.previousElementSibling.textContent + C, o.previousElementSibling.remove());
              var q = "";
              e.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(D, B) {
                D && !o.isEqualNode(D.parentElement) && (q += D.parentElement.textContent + `
`, D.parentElement.remove());
              }), e.sv.element.querySelectorAll("[data-type='footnotes-link']").forEach(function(D, B) {
                D && !o.isEqualNode(D.parentElement) && (q += D.parentElement.textContent + `
`, D.parentElement.remove());
              }), C = q + C;
            }
            C = cn(C, e), R ? o.innerHTML = C : o.outerHTML = C, e.sv.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(D) {
              e.sv.element.insertAdjacentElement("beforeend", D.parentElement);
            }), se(e.sv.element, function(D) {
              e.sv.element.insertAdjacentElement("beforeend", D);
            }), (0, T.ib)(e.sv.element, i), Te(e), He(e, { enableAddUndoStack: !0, enableHint: !0, enableInput: !0 });
          }
        }, Ne = J(227), pe = function(e) {
          e.options.theme === "dark" ? e.element.classList.add("vditor--dark") : e.element.classList.remove("vditor--dark");
        }, ue = function(e) {
          var t = window.innerWidth <= y.g.MOBILE_WIDTH ? 10 : 35;
          if (e.wysiwyg.element.parentElement.style.display !== "none") {
            var n = (e.wysiwyg.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2;
            e.wysiwyg.element.style.padding = "10px " + Math.max(t, n) + "px";
          }
          e.ir.element.parentElement.style.display !== "none" && (n = (e.ir.element.parentElement.clientWidth - e.options.preview.maxWidth) / 2, e.ir.element.style.padding = "10px " + Math.max(t, n) + "px"), e.preview.element.style.display !== "block" ? e.toolbar.element.style.paddingLeft = Math.max(5, parseInt(e[e.currentMode].element.style.paddingLeft || "0", 10) + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0)) + "px" : e.toolbar.element.style.paddingLeft = 5 + (e.options.outline.position === "left" ? e.outline.element.offsetWidth : 0) + "px";
        }, Q = function(e) {
          if (e.options.typewriterMode) {
            var t = window.innerHeight;
            typeof e.options.height == "number" ? (t = e.options.height, typeof e.options.minHeight == "number" && (t = Math.max(t, e.options.minHeight)), t = Math.min(window.innerHeight, t)) : t = e.element.clientHeight, e.element.classList.contains("vditor--fullscreen") && (t = window.innerHeight), e[e.currentMode].element.style.setProperty("--editor-bottom", (t - e.toolbar.element.offsetHeight) / 2 + "px");
          }
        };
      function Ke() {
        window.removeEventListener("resize", Z);
      }
      var Xe, en, Kn = function(e) {
          Q(e), Ke(), window.addEventListener("resize", Z = function() {
            ue(e), Q(e);
          });
          var t = (0, s.pK)() && localStorage.getItem(e.options.cache.id);
          return e.options.cache.enable && t || (e.options.value ? t = e.options.value : e.originalInnerHTML ? t = e.lute.HTML2Md(e.originalInnerHTML) : e.options.cache.enable || (t = "")), t || "";
        }, ut = function(e) {
          clearTimeout(e[e.currentMode].hlToolbarTimeoutId), e[e.currentMode].hlToolbarTimeoutId = window.setTimeout(function() {
            if (e[e.currentMode].element.getAttribute("contenteditable") !== "false" && (0, T.Gb)(e[e.currentMode].element)) {
              u(e.toolbar.elements, y.g.EDIT_TOOLBARS), w(e.toolbar.elements, y.g.EDIT_TOOLBARS);
              var t = (0, T.zh)(e), n = t.startContainer;
              t.startContainer.nodeType === 3 && (n = t.startContainer.parentElement), n.classList.contains("vditor-reset") && (n = n.childNodes[t.startOffset]), (e.currentMode === "sv" ? (0, p.a1)(n, "data-type", "heading") : (0, x.W)(n)) && f(e.toolbar.elements, ["headings"]), (e.currentMode === "sv" ? (0, p.a1)(n, "data-type", "blockquote") : (0, p.lG)(n, "BLOCKQUOTE")) && f(e.toolbar.elements, ["quote"]), (0, p.a1)(n, "data-type", "strong") && f(e.toolbar.elements, ["bold"]), (0, p.a1)(n, "data-type", "em") && f(e.toolbar.elements, ["italic"]), (0, p.a1)(n, "data-type", "s") && f(e.toolbar.elements, ["strike"]), (0, p.a1)(n, "data-type", "a") && f(e.toolbar.elements, ["link"]);
              var i = (0, p.lG)(n, "LI");
              i ? (i.classList.contains("vditor-task") ? f(e.toolbar.elements, ["check"]) : i.parentElement.tagName === "OL" ? f(e.toolbar.elements, ["ordered-list"]) : i.parentElement.tagName === "UL" && f(e.toolbar.elements, ["list"]), w(e.toolbar.elements, ["outdent", "indent"])) : _(e.toolbar.elements, ["outdent", "indent"]), (0, p.a1)(n, "data-type", "code-block") && (_(e.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "inline-code", "upload", "link", "table", "record"]), f(e.toolbar.elements, ["code"])), (0, p.a1)(n, "data-type", "code") && (_(e.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "upload", "link", "table", "record"]), f(e.toolbar.elements, ["inline-code"])), (0, p.a1)(n, "data-type", "table") && _(e.toolbar.elements, ["headings", "list", "ordered-list", "check", "line", "quote", "code", "table"]);
            }
          }, 200);
        }, we = function(e, t) {
          t === void 0 && (t = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }), t.enableHint && e.hint.render(e), clearTimeout(e.wysiwyg.afterRenderTimeoutId), e.wysiwyg.afterRenderTimeoutId = window.setTimeout(function() {
            if (!e.wysiwyg.composingLock) {
              var n = m(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, s.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, tn = function(e) {
          for (var t = "", n = e.nextSibling; n; )
            n.nodeType === 3 ? t += n.textContent : t += n.outerHTML, n = n.nextSibling;
          return t;
        }, nn = function(e) {
          for (var t = "", n = e.previousSibling; n; )
            t = n.nodeType === 3 ? n.textContent + t : n.outerHTML + t, n = n.previousSibling;
          return t;
        }, rn = function(e, t) {
          Array.from(e.wysiwyg.element.childNodes).find(function(n) {
            if (n.nodeType === 3) {
              var i = document.createElement("p");
              i.setAttribute("data-block", "0"), i.textContent = n.textContent;
              var r = t.startContainer.nodeType === 3 ? t.startOffset : n.textContent.length;
              return n.parentNode.insertBefore(i, n), n.remove(), t.setStart(i.firstChild, Math.min(i.firstChild.textContent.length, r)), t.collapse(!0), (0, T.Hc)(t), !0;
            }
            if (!n.getAttribute("data-block"))
              return n.tagName === "P" ? n.remove() : (n.tagName === "DIV" ? (t.insertNode(document.createElement("wbr")), n.outerHTML = "<p data-block=\"0\">" + n.innerHTML + "</p>") : n.tagName === "BR" ? n.outerHTML = "<p data-block=\"0\">" + n.outerHTML + "<wbr></p>" : (t.insertNode(document.createElement("wbr")), n.outerHTML = "<p data-block=\"0\">" + n.outerHTML + "</p>"), (0, T.ib)(e.wysiwyg.element, t), t = getSelection().getRangeAt(0)), !0;
          });
        }, wt = function(e, t) {
          var n = (0, T.zh)(e), i = (0, p.F9)(n.startContainer);
          i || (i = n.startContainer.childNodes[n.startOffset]), i || e.wysiwyg.element.children.length !== 0 || (i = e.wysiwyg.element), i && !i.classList.contains("vditor-wysiwyg__block") && (n.insertNode(document.createElement("wbr")), i.innerHTML.trim() === "<wbr>" && (i.innerHTML = "<wbr><br>"), i.tagName === "BLOCKQUOTE" || i.classList.contains("vditor-reset") ? i.innerHTML = "<" + t + " data-block=\"0\">" + i.innerHTML.trim() + "</" + t + ">" : i.outerHTML = "<" + t + " data-block=\"0\">" + i.innerHTML.trim() + "</" + t + ">", (0, T.ib)(e.wysiwyg.element, n), Ve(e));
        }, Dt = function(e) {
          var t = getSelection().getRangeAt(0), n = (0, p.F9)(t.startContainer);
          n || (n = t.startContainer.childNodes[t.startOffset]), n && (t.insertNode(document.createElement("wbr")), n.outerHTML = "<p data-block=\"0\">" + n.innerHTML + "</p>", (0, T.ib)(e.wysiwyg.element, t)), e.wysiwyg.popover.style.display = "none";
        }, pt = function(e, t, n) {
          n === void 0 && (n = !0);
          var i = e.previousElementSibling, r = i.ownerDocument.createRange();
          i.tagName === "CODE" ? (i.style.display = "inline-block", n ? r.setStart(i.firstChild, 1) : r.selectNodeContents(i)) : (i.style.display = "block", i.firstChild.firstChild || i.firstChild.appendChild(document.createTextNode("")), r.selectNodeContents(i.firstChild)), n ? r.collapse(!0) : r.collapse(!1), (0, T.Hc)(r), e.firstElementChild.classList.contains("language-mindmap") || Te(t);
        }, De = function(e, t) {
          if (V("⇧⌘X", t)) {
            var n = e.wysiwyg.popover.querySelector("[data-type=\"remove\"]");
            return n && n.click(), t.preventDefault(), !0;
          }
        }, Qe = function(e) {
          clearTimeout(e.wysiwyg.hlToolbarTimeoutId), e.wysiwyg.hlToolbarTimeoutId = window.setTimeout(function() {
            if (e.wysiwyg.element.getAttribute("contenteditable") !== "false" && (0, T.Gb)(e.wysiwyg.element)) {
              u(e.toolbar.elements, y.g.EDIT_TOOLBARS), w(e.toolbar.elements, y.g.EDIT_TOOLBARS);
              var t = getSelection().getRangeAt(0), n = t.startContainer;
              n = t.startContainer.nodeType === 3 ? t.startContainer.parentElement : n.childNodes[t.startOffset >= n.childNodes.length ? n.childNodes.length - 1 : t.startOffset];
              var i = (0, p.a1)(n, "data-type", "footnotes-block");
              if (i)
                return e.wysiwyg.popover.innerHTML = "", Re(i, e), void je(e, i);
              var r = (0, p.lG)(n, "LI");
              r ? (r.classList.contains("vditor-task") ? f(e.toolbar.elements, ["check"]) : r.parentElement.tagName === "OL" ? f(e.toolbar.elements, ["ordered-list"]) : r.parentElement.tagName === "UL" && f(e.toolbar.elements, ["list"]), w(e.toolbar.elements, ["outdent", "indent"])) : _(e.toolbar.elements, ["outdent", "indent"]), (0, p.lG)(n, "BLOCKQUOTE") && f(e.toolbar.elements, ["quote"]), ((0, p.lG)(n, "B") || (0, p.lG)(n, "STRONG")) && f(e.toolbar.elements, ["bold"]), ((0, p.lG)(n, "I") || (0, p.lG)(n, "EM")) && f(e.toolbar.elements, ["italic"]), ((0, p.lG)(n, "STRIKE") || (0, p.lG)(n, "S")) && f(e.toolbar.elements, ["strike"]), e.wysiwyg.element.querySelectorAll(".vditor-comment--focus").forEach(function(z) {
                z.classList.remove("vditor-comment--focus");
              });
              var o = (0, p.fb)(n, "vditor-comment");
              if (o) {
                var a = o.getAttribute("data-cmtids").split(" ");
                if (a.length > 1 && o.nextSibling.isSameNode(o.nextElementSibling)) {
                  var d = o.nextElementSibling.getAttribute("data-cmtids").split(" ");
                  a.find(function(z) {
                    if (d.includes(z))
                      return a = [z], !0;
                  });
                }
                e.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(z) {
                  z.getAttribute("data-cmtids").indexOf(a[0]) > -1 && z.classList.add("vditor-comment--focus");
                });
              }
              var v = (0, p.lG)(n, "A");
              v && f(e.toolbar.elements, ["link"]);
              var g = (0, p.lG)(n, "TABLE"), h = (0, x.W)(n);
              (0, p.lG)(n, "CODE") ? (0, p.lG)(n, "PRE") ? (_(e.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "inline-code", "upload", "link", "table", "record"]), f(e.toolbar.elements, ["code"])) : (_(e.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote", "list", "ordered-list", "check", "code", "upload", "link", "table", "record"]), f(e.toolbar.elements, ["inline-code"])) : h ? (_(e.toolbar.elements, ["bold"]), f(e.toolbar.elements, ["headings"])) : g && _(e.toolbar.elements, ["table"]);
              var A = (0, p.fb)(n, "vditor-toc");
              if (A)
                return e.wysiwyg.popover.innerHTML = "", Re(A, e), void je(e, A);
              var O = (0, x.S)(n, "BLOCKQUOTE");
              if (O && (e.wysiwyg.popover.innerHTML = "", rt(t, O, e), it(t, O, e), Re(O, e), je(e, O)), r && (e.wysiwyg.popover.innerHTML = "", rt(t, r, e), it(t, r, e), Re(r, e), je(e, r)), g) {
                e.options.lang, e.options, e.wysiwyg.popover.innerHTML = "";
                var U = function() {
                    var z = g.rows.length, Ee = g.rows[0].cells.length, et = parseInt(re.value, 10) || z, Ze = parseInt(_e.value, 10) || Ee;
                    if (et !== z || Ee !== Ze) {
                      if (Ee !== Ze)
                        for (var Pn = Ze - Ee, ct = 0; ct < g.rows.length; ct++)
                          if (Pn > 0)
                            for (var qn = 0; qn < Pn; qn++)
                              ct === 0 ? g.rows[ct].lastElementChild.insertAdjacentHTML("afterend", "<th> </th>") : g.rows[ct].lastElementChild.insertAdjacentHTML("afterend", "<td> </td>");
                          else
                            for (var Zt = Ee - 1; Zt >= Ze; Zt--)
                              g.rows[ct].cells[Zt].remove();
                      if (z !== et) {
                        var Bn = et - z;
                        if (Bn > 0) {
                          for (var $t = "<tr>", dt = 0; dt < Ze; dt++)
                            $t += "<td> </td>";
                          for (var Vn = 0; Vn < Bn; Vn++)
                            g.querySelector("tbody") ? g.querySelector("tbody").insertAdjacentHTML("beforeend", $t) : g.querySelector("thead").insertAdjacentHTML("afterend", $t + "</tr>");
                        } else
                          for (dt = z - 1; dt >= et; dt--)
                            g.rows[dt].remove(), g.rows.length === 1 && g.querySelector("tbody").remove();
                      }
                      typeof e.options.input == "function" && e.options.input(m(e));
                    }
                  }, C = function(z) {
                    _t(g, z), z === "right" ? (B.classList.remove("vditor-icon--current"), P.classList.remove("vditor-icon--current"), H.classList.add("vditor-icon--current")) : z === "center" ? (B.classList.remove("vditor-icon--current"), H.classList.remove("vditor-icon--current"), P.classList.add("vditor-icon--current")) : (P.classList.remove("vditor-icon--current"), H.classList.remove("vditor-icon--current"), B.classList.add("vditor-icon--current")), (0, T.Hc)(t), we(e);
                  }, R = (0, p.lG)(n, "TD"), q = (0, p.lG)(n, "TH"), D = "left";
                R ? D = R.getAttribute("align") || "left" : q && (D = q.getAttribute("align") || "center");
                var B = document.createElement("button");
                B.setAttribute("type", "button"), B.setAttribute("aria-label", window.VditorI18n.alignLeft + "<" + (0, s.ns)("⇧⌘L") + ">"), B.setAttribute("data-type", "left"), B.innerHTML = "<svg><use xlink:href=\"#vditor-icon-align-left\"></use></svg>", B.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (D === "left" ? " vditor-icon--current" : ""), B.onclick = function() {
                  C("left");
                };
                var P = document.createElement("button");
                P.setAttribute("type", "button"), P.setAttribute("aria-label", window.VditorI18n.alignCenter + "<" + (0, s.ns)("⇧⌘C") + ">"), P.setAttribute("data-type", "center"), P.innerHTML = "<svg><use xlink:href=\"#vditor-icon-align-center\"></use></svg>", P.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (D === "center" ? " vditor-icon--current" : ""), P.onclick = function() {
                  C("center");
                };
                var H = document.createElement("button");
                H.setAttribute("type", "button"), H.setAttribute("aria-label", window.VditorI18n.alignRight + "<" + (0, s.ns)("⇧⌘R") + ">"), H.setAttribute("data-type", "right"), H.innerHTML = "<svg><use xlink:href=\"#vditor-icon-align-right\"></use></svg>", H.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n" + (D === "right" ? " vditor-icon--current" : ""), H.onclick = function() {
                  C("right");
                };
                var G = document.createElement("button");
                G.setAttribute("type", "button"), G.setAttribute("aria-label", window.VditorI18n.insertRowBelow + "<" + (0, s.ns)("⌘=") + ">"), G.setAttribute("data-type", "insertRow"), G.innerHTML = "<svg><use xlink:href=\"#vditor-icon-insert-row\"></use></svg>", G.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", G.onclick = function() {
                  var z = getSelection().getRangeAt(0).startContainer, Ee = (0, p.lG)(z, "TD") || (0, p.lG)(z, "TH");
                  Ee && wn(e, t, Ee);
                };
                var te = document.createElement("button");
                te.setAttribute("type", "button"), te.setAttribute("aria-label", window.VditorI18n.insertRowAbove + "<" + (0, s.ns)("⇧⌘F") + ">"), te.setAttribute("data-type", "insertRow"), te.innerHTML = "<svg><use xlink:href=\"#vditor-icon-insert-rowb\"></use></svg>", te.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", te.onclick = function() {
                  var z = getSelection().getRangeAt(0).startContainer, Ee = (0, p.lG)(z, "TD") || (0, p.lG)(z, "TH");
                  Ee && En(e, t, Ee);
                };
                var X = document.createElement("button");
                X.setAttribute("type", "button"), X.setAttribute("aria-label", window.VditorI18n.insertColumnRight + "<" + (0, s.ns)("⇧⌘=") + ">"), X.setAttribute("data-type", "insertColumn"), X.innerHTML = "<svg><use xlink:href=\"#vditor-icon-insert-column\"></use></svg>", X.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", X.onclick = function() {
                  var z = getSelection().getRangeAt(0).startContainer, Ee = (0, p.lG)(z, "TD") || (0, p.lG)(z, "TH");
                  Ee && Ct(e, g, Ee);
                };
                var ee = document.createElement("button");
                ee.setAttribute("type", "button"), ee.setAttribute("aria-label", window.VditorI18n.insertColumnLeft + "<" + (0, s.ns)("⇧⌘G") + ">"), ee.setAttribute("data-type", "insertColumn"), ee.innerHTML = "<svg><use xlink:href=\"#vditor-icon-insert-columnb\"></use></svg>", ee.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", ee.onclick = function() {
                  var z = getSelection().getRangeAt(0).startContainer, Ee = (0, p.lG)(z, "TD") || (0, p.lG)(z, "TH");
                  Ee && Ct(e, g, Ee, "beforebegin");
                };
                var Y = document.createElement("button");
                Y.setAttribute("type", "button"), Y.setAttribute("aria-label", window.VditorI18n["delete-row"] + "<" + (0, s.ns)("⌘-") + ">"), Y.setAttribute("data-type", "deleteRow"), Y.innerHTML = "<svg><use xlink:href=\"#vditor-icon-delete-row\"></use></svg>", Y.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", Y.onclick = function() {
                  var z = getSelection().getRangeAt(0).startContainer, Ee = (0, p.lG)(z, "TD") || (0, p.lG)(z, "TH");
                  Ee && kn(e, t, Ee);
                };
                var F = document.createElement("button");
                F.setAttribute("type", "button"), F.setAttribute("aria-label", window.VditorI18n["delete-column"] + "<" + (0, s.ns)("⇧⌘-") + ">"), F.setAttribute("data-type", "deleteColumn"), F.innerHTML = "<svg><use xlink:href=\"#vditor-icon-delete-column\"></use></svg>", F.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", F.onclick = function() {
                  var z = getSelection().getRangeAt(0).startContainer, Ee = (0, p.lG)(z, "TD") || (0, p.lG)(z, "TH");
                  Ee && Sn(e, t, g, Ee);
                }, (Pe = document.createElement("span")).setAttribute("aria-label", window.VditorI18n.row), Pe.className = "vditor-tooltipped vditor-tooltipped__n";
                var re = document.createElement("input");
                Pe.appendChild(re), re.type = "number", re.min = "1", re.className = "vditor-input", re.style.width = "42px", re.style.textAlign = "center", re.setAttribute("placeholder", window.VditorI18n.row), re.value = g.rows.length.toString(), re.oninput = function() {
                  U();
                }, re.onkeydown = function(z) {
                  if (!z.isComposing)
                    return z.key === "Tab" ? (_e.focus(), _e.select(), void z.preventDefault()) : void (De(e, z) || Ue(z, t));
                };
                var ye = document.createElement("span");
                ye.setAttribute("aria-label", window.VditorI18n.column), ye.className = "vditor-tooltipped vditor-tooltipped__n";
                var _e = document.createElement("input");
                ye.appendChild(_e), _e.type = "number", _e.min = "1", _e.className = "vditor-input", _e.style.width = "42px", _e.style.textAlign = "center", _e.setAttribute("placeholder", window.VditorI18n.column), _e.value = g.rows[0].cells.length.toString(), _e.oninput = function() {
                  U();
                }, _e.onkeydown = function(z) {
                  if (!z.isComposing)
                    return z.key === "Tab" ? (re.focus(), re.select(), void z.preventDefault()) : void (De(e, z) || Ue(z, t));
                }, rt(t, g, e), it(t, g, e), Re(g, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", B), e.wysiwyg.popover.insertAdjacentElement("beforeend", P), e.wysiwyg.popover.insertAdjacentElement("beforeend", H), e.wysiwyg.popover.insertAdjacentElement("beforeend", te), e.wysiwyg.popover.insertAdjacentElement("beforeend", G), e.wysiwyg.popover.insertAdjacentElement("beforeend", ee), e.wysiwyg.popover.insertAdjacentElement("beforeend", X), e.wysiwyg.popover.insertAdjacentElement("beforeend", Y), e.wysiwyg.popover.insertAdjacentElement("beforeend", F), e.wysiwyg.popover.insertAdjacentElement("beforeend", Pe), e.wysiwyg.popover.insertAdjacentHTML("beforeend", " x "), e.wysiwyg.popover.insertAdjacentElement("beforeend", ye), je(e, g);
              }
              var Ge = (0, p.a1)(n, "data-type", "link-ref");
              Ge && on(e, Ge, t);
              var Oe = (0, p.a1)(n, "data-type", "footnotes-ref");
              if (Oe) {
                e.options.lang, e.options, e.wysiwyg.popover.innerHTML = "", (Pe = document.createElement("span")).setAttribute("aria-label", window.VditorI18n.footnoteRef + "<" + (0, s.ns)("⌥Enter") + ">"), Pe.className = "vditor-tooltipped vditor-tooltipped__n";
                var Ie = document.createElement("input");
                Pe.appendChild(Ie), Ie.className = "vditor-input", Ie.setAttribute("placeholder", window.VditorI18n.footnoteRef + "<" + (0, s.ns)("⌥Enter") + ">"), Ie.style.width = "120px", Ie.value = Oe.getAttribute("data-footnotes-label"), Ie.oninput = function() {
                  Ie.value.trim() !== "" && Oe.setAttribute("data-footnotes-label", Ie.value), typeof e.options.input == "function" && e.options.input(m(e));
                }, Ie.onkeydown = function(z) {
                  z.isComposing || De(e, z) || Ue(z, t);
                }, Re(Oe, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Pe), je(e, Oe);
              }
              var Ae = (0, p.fb)(n, "vditor-wysiwyg__block"), st = !!Ae && Ae.getAttribute("data-type").indexOf("block") > -1;
              if (e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(z) {
                (!Ae || Ae && st && !Ae.contains(z)) && (z.previousElementSibling.style.display = "none");
              }), Ae && st) {
                if (e.wysiwyg.popover.innerHTML = "", rt(t, Ae, e), it(t, Ae, e), Re(Ae, e), Ae.getAttribute("data-type") === "code-block") {
                  var At = document.createElement("span");
                  At.setAttribute("aria-label", window.VditorI18n.language + "<" + (0, s.ns)("⌥Enter") + ">"), At.className = "vditor-tooltipped vditor-tooltipped__n";
                  var Be = document.createElement("input");
                  At.appendChild(Be);
                  var gt = Ae.firstElementChild.firstElementChild;
                  Be.className = "vditor-input", Be.setAttribute("placeholder", window.VditorI18n.language + "<" + (0, s.ns)("⌥Enter") + ">"), Be.value = gt.className.indexOf("language-") > -1 ? gt.className.split("-")[1].split(" ")[0] : "", Be.oninput = function(z) {
                    Be.value.trim() !== "" ? gt.className = "language-" + Be.value : (gt.className = "", e.hint.recentLanguage = ""), Ae.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (Ae.lastElementChild.innerHTML = Ae.firstElementChild.innerHTML, Ce(Ae.lastElementChild, e)), we(e), z.detail === 1 && (t.setStart(gt.firstChild, 0), t.collapse(!0), (0, T.Hc)(t));
                  }, Be.onkeydown = function(z) {
                    if (!z.isComposing && !De(e, z)) {
                      if (z.key === "Escape" && e.hint.element.style.display === "block")
                        return e.hint.element.style.display = "none", void z.preventDefault();
                      e.hint.select(z, e), Ue(z, t);
                    }
                  }, Be.onkeyup = function(z) {
                    if (!z.isComposing && z.key !== "Enter" && z.key !== "ArrowUp" && z.key !== "Escape" && z.key !== "ArrowDown") {
                      var Ee = [], et = Be.value.substring(0, Be.selectionStart);
                      (e.options.preview.hljs.langs || y.g.CODE_LANGUAGES).forEach(function(Ze) {
                        Ze.indexOf(et.toLowerCase()) > -1 && Ee.push({ html: Ze, value: Ze });
                      }), e.hint.genHTML(Ee, et, e), z.preventDefault();
                    }
                  }, e.wysiwyg.popover.insertAdjacentElement("beforeend", At);
                }
                je(e, Ae);
              } else
                Ae = void 0;
              if (h) {
                var Pe;
                e.wysiwyg.popover.innerHTML = "", (Pe = document.createElement("span")).setAttribute("aria-label", "ID<" + (0, s.ns)("⌥Enter") + ">"), Pe.className = "vditor-tooltipped vditor-tooltipped__n";
                var Je = document.createElement("input");
                Pe.appendChild(Je), Je.className = "vditor-input", Je.setAttribute("placeholder", "ID<" + (0, s.ns)("⌥Enter") + ">"), Je.style.width = "120px", Je.value = h.getAttribute("data-id") || "", Je.oninput = function() {
                  h.setAttribute("data-id", Je.value), typeof e.options.input == "function" && e.options.input(m(e));
                }, Je.onkeydown = function(z) {
                  z.isComposing || De(e, z) || Ue(z, t);
                }, rt(t, h, e), it(t, h, e), Re(h, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", Pe), je(e, h);
              }
              if (v && Ot(e, v, t), !(O || r || g || Ae || v || Ge || Oe || h || A)) {
                var lt = (0, p.a1)(n, "data-block", "0");
                lt && lt.parentElement.isEqualNode(e.wysiwyg.element) ? (e.wysiwyg.popover.innerHTML = "", rt(t, lt, e), it(t, lt, e), Re(lt, e), je(e, lt)) : e.wysiwyg.popover.style.display = "none";
              }
              e.wysiwyg.element.querySelectorAll("span[data-type=\"backslash\"] > span").forEach(function(z) {
                z.style.display = "none";
              });
              var Rn = (0, p.a1)(t.startContainer, "data-type", "backslash");
              Rn && (Rn.querySelector("span").style.display = "inline");
            }
          }, 200);
        }, je = function(e, t) {
          var n = t, i = (0, p.lG)(t, "TABLE");
          i && (n = i), e.wysiwyg.popover.style.left = "0", e.wysiwyg.popover.style.display = "block", e.wysiwyg.popover.style.top = Math.max(-8, n.offsetTop - 21 - e.wysiwyg.element.scrollTop) + "px", e.wysiwyg.popover.style.left = Math.min(n.offsetLeft, e.wysiwyg.element.clientWidth - e.wysiwyg.popover.clientWidth) + "px", e.wysiwyg.popover.setAttribute("data-top", (n.offsetTop - 21).toString());
        }, on = function(e, t, n) {
          n === void 0 && (n = getSelection().getRangeAt(0)), e.wysiwyg.popover.innerHTML = "";
          var i = function() {
              o.value.trim() !== "" && (t.tagName === "IMG" ? t.setAttribute("alt", o.value) : t.textContent = o.value), d.value.trim() !== "" && t.setAttribute("data-link-label", d.value), typeof e.options.input == "function" && e.options.input(m(e));
            }, r = document.createElement("span");
          r.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), r.className = "vditor-tooltipped vditor-tooltipped__n";
          var o = document.createElement("input");
          r.appendChild(o), o.className = "vditor-input", o.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), o.style.width = "120px", o.value = t.getAttribute("alt") || t.textContent, o.oninput = function() {
            i();
          }, o.onkeydown = function(v) {
            De(e, v) || Ue(v, n) || mt(e, t, v, d);
          };
          var a = document.createElement("span");
          a.setAttribute("aria-label", window.VditorI18n.linkRef), a.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          a.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.linkRef), d.value = t.getAttribute("data-link-label"), d.oninput = function() {
            i();
          }, d.onkeydown = function(v) {
            De(e, v) || Ue(v, n) || mt(e, t, v, o);
          }, Re(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", r), e.wysiwyg.popover.insertAdjacentElement("beforeend", a), je(e, t);
        }, rt = function(e, t, n) {
          var i = t.previousElementSibling;
          if (i && (t.parentElement.isEqualNode(n.wysiwyg.element) || t.tagName === "LI")) {
            var r = document.createElement("button");
            r.setAttribute("type", "button"), r.setAttribute("data-type", "up"), r.setAttribute("aria-label", window.VditorI18n.up + "<" + (0, s.ns)("⇧⌘U") + ">"), r.innerHTML = "<svg><use xlink:href=\"#vditor-icon-up\"></use></svg>", r.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", r.onclick = function() {
              e.insertNode(document.createElement("wbr")), i.insertAdjacentElement("beforebegin", t), (0, T.ib)(n.wysiwyg.element, e), we(n), Qe(n), Te(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", r);
          }
        }, it = function(e, t, n) {
          var i = t.nextElementSibling;
          if (i && (t.parentElement.isEqualNode(n.wysiwyg.element) || t.tagName === "LI")) {
            var r = document.createElement("button");
            r.setAttribute("type", "button"), r.setAttribute("data-type", "down"), r.setAttribute("aria-label", window.VditorI18n.down + "<" + (0, s.ns)("⇧⌘D") + ">"), r.innerHTML = "<svg><use xlink:href=\"#vditor-icon-down\"></use></svg>", r.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", r.onclick = function() {
              e.insertNode(document.createElement("wbr")), i.insertAdjacentElement("afterend", t), (0, T.ib)(n.wysiwyg.element, e), we(n), Qe(n), Te(n);
            }, n.wysiwyg.popover.insertAdjacentElement("beforeend", r);
          }
        }, Re = function(e, t) {
          var n = document.createElement("button");
          n.setAttribute("type", "button"), n.setAttribute("data-type", "remove"), n.setAttribute("aria-label", window.VditorI18n.remove + "<" + (0, s.ns)("⇧⌘X") + ">"), n.innerHTML = "<svg><use xlink:href=\"#vditor-icon-trashcan\"></use></svg>", n.className = "vditor-icon vditor-tooltipped vditor-tooltipped__n", n.onclick = function() {
            var i = (0, T.zh)(t);
            i.setStartAfter(e), (0, T.Hc)(i), e.remove(), we(t), Qe(t), ["H1", "H2", "H3", "H4", "H5", "H6"].includes(e.tagName) && Ve(t);
          }, t.wysiwyg.popover.insertAdjacentElement("beforeend", n);
        }, mt = function(e, t, n, i) {
          if (!n.isComposing) {
            if (n.key === "Tab")
              return i.focus(), i.select(), void n.preventDefault();
            if (!(0, s.yl)(n) && !n.shiftKey && n.altKey && n.key === "Enter") {
              var r = (0, T.zh)(e);
              t.insertAdjacentHTML("afterend", y.g.ZWSP), r.setStartAfter(t.nextSibling), r.collapse(!0), (0, T.Hc)(r), n.preventDefault();
            }
          }
        }, Ot = function(e, t, n) {
          e.wysiwyg.popover.innerHTML = "";
          var i = function() {
            o.value.trim() !== "" && (t.innerHTML = o.value), t.setAttribute("href", d.value), t.setAttribute("title", g.value), we(e);
          };
          t.querySelectorAll("[data-marker]").forEach(function(h) {
            h.removeAttribute("data-marker");
          });
          var r = document.createElement("span");
          r.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty), r.className = "vditor-tooltipped vditor-tooltipped__n";
          var o = document.createElement("input");
          r.appendChild(o), o.className = "vditor-input", o.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty), o.style.width = "120px", o.value = t.innerHTML || "", o.oninput = function() {
            i();
          }, o.onkeydown = function(h) {
            De(e, h) || Ue(h, n) || mt(e, t, h, d);
          };
          var a = document.createElement("span");
          a.setAttribute("aria-label", window.VditorI18n.link), a.className = "vditor-tooltipped vditor-tooltipped__n";
          var d = document.createElement("input");
          a.appendChild(d), d.className = "vditor-input", d.setAttribute("placeholder", window.VditorI18n.link), d.value = t.getAttribute("href") || "", d.oninput = function() {
            i();
          }, d.onkeydown = function(h) {
            De(e, h) || Ue(h, n) || mt(e, t, h, g);
          };
          var v = document.createElement("span");
          v.setAttribute("aria-label", window.VditorI18n.tooltipText), v.className = "vditor-tooltipped vditor-tooltipped__n";
          var g = document.createElement("input");
          v.appendChild(g), g.className = "vditor-input", g.setAttribute("placeholder", window.VditorI18n.tooltipText), g.style.width = "60px", g.value = t.getAttribute("title") || "", g.oninput = function() {
            i();
          }, g.onkeydown = function(h) {
            De(e, h) || Ue(h, n) || mt(e, t, h, o);
          }, Re(t, e), e.wysiwyg.popover.insertAdjacentElement("beforeend", r), e.wysiwyg.popover.insertAdjacentElement("beforeend", a), e.wysiwyg.popover.insertAdjacentElement("beforeend", v), je(e, t);
        }, Ue = function(e, t) {
          if (!(0, s.yl)(e) && !e.shiftKey && e.key === "Enter" || e.key === "Escape")
            return t && (0, T.Hc)(t), e.preventDefault(), e.stopPropagation(), !0;
        }, ot = function(e) {
          e.currentMode === "wysiwyg" ? Qe(e) : e.currentMode === "ir" && ut(e);
        }, an = function(e, t, n) {
          n === void 0 && (n = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 });
          var i = e.wysiwyg.element;
          i.innerHTML = e.lute.Md2VditorDOM(t), i.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(r) {
            Ce(r, e), r.previousElementSibling.setAttribute("style", "display:none");
          }), we(e, n);
        }, Fn = function(e, t, n) {
          for (var i = e.startContainer.parentElement, r = !1, o = "", a = "", d = function(C) {
              var R = nn(C.startContainer), q = tn(C.startContainer), D = C.startContainer.textContent, B = C.startOffset, P = "", H = "";
              return (D.substr(0, B) !== "" && D.substr(0, B) !== y.g.ZWSP || R) && (P = "" + R + D.substr(0, B)), (D.substr(B) !== "" && D.substr(B) !== y.g.ZWSP || q) && (H = "" + D.substr(B) + q), { afterHTML: H, beforeHTML: P };
            }(e), v = d.beforeHTML, g = d.afterHTML; i && !r; ) {
            var h = i.tagName;
            if (h === "STRIKE" && (h = "S"), h === "I" && (h = "EM"), h === "B" && (h = "STRONG"), h === "S" || h === "STRONG" || h === "EM") {
              var A = "", O = "", U = "";
              i.parentElement.getAttribute("data-block") !== "0" && (O = nn(i), U = tn(i)), (v || O) && (v = A = O + "<" + h + ">" + v + "</" + h + ">"), (n === "bold" && h === "STRONG" || n === "italic" && h === "EM" || n === "strikeThrough" && h === "S") && (A += "" + o + y.g.ZWSP + "<wbr>" + a, r = !0), (g || U) && (A += g = "<" + h + ">" + g + "</" + h + ">" + U), i.parentElement.getAttribute("data-block") !== "0" ? (i = i.parentElement).innerHTML = A : (i.outerHTML = A, i = i.parentElement), o = "<" + h + ">" + o, a = "</" + h + ">" + a;
            } else
              r = !0;
          }
          (0, T.ib)(t.wysiwyg.element, e);
        }, Le = function(e, t) {
          var n, i = this;
          this.element = document.createElement("div"), t.className && (n = this.element.classList).add.apply(n, t.className.split(" "));
          var r = t.hotkey ? " <" + (0, s.ns)(t.hotkey) + ">" : "";
          t.level === 2 && (r = t.hotkey ? " &lt;" + (0, s.ns)(t.hotkey) + "&gt;" : "");
          var o = t.tip ? t.tip + r : "" + window.VditorI18n[t.name] + r, a = t.name === "upload" ? "div" : "button";
          if (t.level === 2)
            this.element.innerHTML = "<" + a + " data-type=\"" + t.name + "\">" + o + "</" + a + ">";
          else {
            this.element.classList.add("vditor-toolbar__item");
            var d = document.createElement(a);
            d.setAttribute("data-type", t.name), d.className = "vditor-tooltipped vditor-tooltipped__" + t.tipPosition, d.setAttribute("aria-label", o), d.innerHTML = t.icon, this.element.appendChild(d);
          }
          t.prefix && this.element.children[0].addEventListener((0, s.Le)(), function(v) {
            v.preventDefault(), i.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) || (e.currentMode === "wysiwyg" ? function(g, h, A) {
              if (!(g.wysiwyg.composingLock && A instanceof CustomEvent)) {
                var O = !0, U = !0;
                g.wysiwyg.element.querySelector("wbr") && g.wysiwyg.element.querySelector("wbr").remove();
                var C = (0, T.zh)(g), R = h.getAttribute("data-type");
                if (h.classList.contains("vditor-menu--current"))
                  if (R === "strike" && (R = "strikeThrough"), R === "quote") {
                    var q = (0, p.lG)(C.startContainer, "BLOCKQUOTE");
                    q || (q = C.startContainer.childNodes[C.startOffset]), q && (O = !1, h.classList.remove("vditor-menu--current"), C.insertNode(document.createElement("wbr")), q.outerHTML = q.innerHTML.trim() === "" ? "<p data-block=\"0\">" + q.innerHTML + "</p>" : q.innerHTML, (0, T.ib)(g.wysiwyg.element, C));
                  } else if (R === "inline-code") {
                    var D = (0, p.lG)(C.startContainer, "CODE");
                    D || (D = C.startContainer.childNodes[C.startOffset]), D && (D.outerHTML = D.innerHTML.replace(y.g.ZWSP, "") + "<wbr>", (0, T.ib)(g.wysiwyg.element, C));
                  } else
                    R === "link" ? (C.collapsed && C.selectNode(C.startContainer.parentElement), document.execCommand("unlink", !1, "")) : R === "check" || R === "list" || R === "ordered-list" ? (Lt(g, C, R), (0, T.ib)(g.wysiwyg.element, C), O = !1, h.classList.remove("vditor-menu--current")) : (O = !1, h.classList.remove("vditor-menu--current"), C.toString() === "" ? Fn(C, g, R) : document.execCommand(R, !1, ""));
                else {
                  g.wysiwyg.element.childNodes.length === 0 && (g.wysiwyg.element.innerHTML = "<p data-block=\"0\"><wbr></p>", (0, T.ib)(g.wysiwyg.element, C));
                  var B = (0, p.F9)(C.startContainer);
                  if (R === "quote") {
                    if (B || (B = C.startContainer.childNodes[C.startOffset]), B) {
                      O = !1, h.classList.add("vditor-menu--current"), C.insertNode(document.createElement("wbr"));
                      var P = (0, p.lG)(C.startContainer, "LI");
                      P && B.contains(P) ? P.innerHTML = "<blockquote data-block=\"0\">" + P.innerHTML + "</blockquote>" : B.outerHTML = "<blockquote data-block=\"0\">" + B.outerHTML + "</blockquote>", (0, T.ib)(g.wysiwyg.element, C);
                    }
                  } else if (R === "check" || R === "list" || R === "ordered-list")
                    Lt(g, C, R, !1), (0, T.ib)(g.wysiwyg.element, C), O = !1, u(g.toolbar.elements, ["check", "list", "ordered-list"]), h.classList.add("vditor-menu--current");
                  else if (R === "inline-code") {
                    if (C.toString() === "")
                      (H = document.createElement("code")).textContent = y.g.ZWSP, C.insertNode(H), C.setStart(H.firstChild, 1), C.collapse(!0), (0, T.Hc)(C);
                    else if (C.startContainer.nodeType === 3) {
                      var H = document.createElement("code");
                      C.surroundContents(H), C.insertNode(H), (0, T.Hc)(C);
                    }
                    h.classList.add("vditor-menu--current");
                  } else if (R === "code")
                    (H = document.createElement("div")).className = "vditor-wysiwyg__block", H.setAttribute("data-type", "code-block"), H.setAttribute("data-block", "0"), H.setAttribute("data-marker", "```"), C.toString() === "" ? H.innerHTML = `<pre><code><wbr>
</code></pre>` : (H.innerHTML = "<pre><code>" + C.toString() + "<wbr></code></pre>", C.deleteContents()), C.insertNode(H), B && (B.outerHTML = g.lute.SpinVditorDOM(B.outerHTML)), (0, T.ib)(g.wysiwyg.element, C), g.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(_e) {
                      Ce(_e, g);
                    }), h.classList.add("vditor-menu--disabled");
                  else if (R === "link") {
                    if (C.toString() === "") {
                      var G = document.createElement("a");
                      G.innerText = y.g.ZWSP, C.insertNode(G), C.setStart(G.firstChild, 1), C.collapse(!0), Ot(g, G, C);
                      var te = g.wysiwyg.popover.querySelector("input");
                      te.value = "", te.focus(), U = !1;
                    } else {
                      (H = document.createElement("a")).setAttribute("href", ""), H.innerHTML = C.toString(), C.surroundContents(H), C.insertNode(H), (0, T.Hc)(C), Ot(g, H, C);
                      var X = g.wysiwyg.popover.querySelectorAll("input");
                      X[0].value = H.innerText, X[1].focus();
                    }
                    O = !1, h.classList.add("vditor-menu--current");
                  } else if (R === "table") {
                    var ee = "<table data-block=\"0\"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>";
                    if (C.toString().trim() === "")
                      B && B.innerHTML.trim().replace(y.g.ZWSP, "") === "" ? B.outerHTML = ee : document.execCommand("insertHTML", !1, ee), C.selectNode(g.wysiwyg.element.querySelector("wbr").previousSibling), g.wysiwyg.element.querySelector("wbr").remove(), (0, T.Hc)(C);
                    else {
                      ee = "<table data-block=\"0\"><thead><tr>";
                      var Y = C.toString().split(`
`), F = Y[0].split(",").length > Y[0].split("	").length ? "," : "	";
                      Y.forEach(function(_e, Ge) {
                        Ge === 0 ? (_e.split(F).forEach(function(Oe, Ie) {
                          ee += Ie === 0 ? "<th>" + Oe + "<wbr></th>" : "<th>" + Oe + "</th>";
                        }), ee += "</tr></thead>") : (ee += Ge === 1 ? "<tbody><tr>" : "<tr>", _e.split(F).forEach(function(Oe) {
                          ee += "<td>" + Oe + "</td>";
                        }), ee += "</tr>");
                      }), ee += "</tbody></table>", document.execCommand("insertHTML", !1, ee), (0, T.ib)(g.wysiwyg.element, C);
                    }
                    O = !1, h.classList.add("vditor-menu--disabled");
                  } else if (R === "line") {
                    if (B) {
                      var re = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                      B.innerHTML.trim() === "" ? B.outerHTML = re : B.insertAdjacentHTML("afterend", re), (0, T.ib)(g.wysiwyg.element, C);
                    }
                  } else if (O = !1, h.classList.add("vditor-menu--current"), R === "strike" && (R = "strikeThrough"), C.toString() !== "" || R !== "bold" && R !== "italic" && R !== "strikeThrough")
                    document.execCommand(R, !1, "");
                  else {
                    var ye = "strong";
                    R === "italic" ? ye = "em" : R === "strikeThrough" && (ye = "s"), (H = document.createElement(ye)).textContent = y.g.ZWSP, C.insertNode(H), H.previousSibling && H.previousSibling.textContent === y.g.ZWSP && (H.previousSibling.textContent = ""), C.setStart(H.firstChild, 1), C.collapse(!0), (0, T.Hc)(C);
                  }
                }
                O && Qe(g), U && we(g);
              }
            }(e, i.element.children[0], v) : e.currentMode === "ir" ? or(e, i.element.children[0], t.prefix || "", t.suffix || "") : Jn(e, i.element.children[0], t.prefix || "", t.suffix || ""));
          });
        }, Gn = (Xe = function(e, t) {
          return Xe = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, i) {
            n.__proto__ = i;
          } || function(n, i) {
            for (var r in i)
              i.hasOwnProperty(r) && (n[r] = i[r]);
          }, Xe(e, t);
        }, function(e, t) {
          function n() {
            this.constructor = e;
          }
          Xe(e, t), e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
        }), Ye = function(e, t, n) {
          var i;
          if (typeof n != "string" ? (E(e, ["subToolbar", "hint"]), n.preventDefault(), i = m(e)) : i = n, e.currentMode !== t || typeof n == "string") {
            if (e.devtools && e.devtools.renderEchart(e), e.options.preview.mode === "both" && t === "sv" ? e.preview.element.style.display = "block" : e.preview.element.style.display = "none", w(e.toolbar.elements, y.g.EDIT_TOOLBARS), u(e.toolbar.elements, y.g.EDIT_TOOLBARS), _(e.toolbar.elements, ["outdent", "indent"]), t === "ir")
              S(e.toolbar.elements, ["both"]), M(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "block", e.lute.SetVditorIR(!0), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!1), e.currentMode = "ir", e.ir.element.innerHTML = e.lute.Md2VditorIRDOM(i), Fe(e, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 }), ue(e), e.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(o) {
                Ce(o, e);
              }), e.ir.element.querySelectorAll(".vditor-toc").forEach(function(o) {
                (0, le.H)(o, { cdn: e.options.cdn, math: e.options.preview.math });
              });
            else if (t === "wysiwyg")
              S(e.toolbar.elements, ["both"]), M(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.sv.element.style.display = "none", e.wysiwyg.element.parentElement.style.display = "block", e.ir.element.parentElement.style.display = "none", e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!0), e.lute.SetVditorSV(!1), e.currentMode = "wysiwyg", ue(e), an(e, i, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 }), e.wysiwyg.element.querySelectorAll(".vditor-toc").forEach(function(o) {
                (0, le.H)(o, { cdn: e.options.cdn, math: e.options.preview.math });
              }), e.wysiwyg.popover.style.display = "none";
            else if (t === "sv") {
              M(e.toolbar.elements, ["both"]), S(e.toolbar.elements, ["outdent", "indent", "outline", "insert-before", "insert-after"]), e.wysiwyg.element.parentElement.style.display = "none", e.ir.element.parentElement.style.display = "none", (e.options.preview.mode === "both" || e.options.preview.mode === "editor") && (e.sv.element.style.display = "block"), e.lute.SetVditorIR(!1), e.lute.SetVditorWYSIWYG(!1), e.lute.SetVditorSV(!0), e.currentMode = "sv";
              var r = cn(i, e);
              r === "<div data-block='0'></div>" && (r = ""), e.sv.element.innerHTML = r, se(e.sv.element), He(e, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 }), ue(e);
            }
            e.undo.resetIcon(e), typeof n != "string" && (e[e.currentMode].element.focus(), ot(e)), Ve(e), Q(e), e.toolbar.elements["edit-mode"] && (e.toolbar.elements["edit-mode"].querySelectorAll("button").forEach(function(o) {
              o.classList.remove("vditor-menu--current");
            }), e.toolbar.elements["edit-mode"].querySelector("button[data-mode=\"" + e.currentMode + "\"]").classList.add("vditor-menu--current")), e.outline.toggle(e, e.currentMode !== "sv" && e.options.outline.enable, typeof n != "string");
          }
        }, Zn = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this, o = document.createElement("div");
            return o.className = "vditor-hint" + (i.level === 2 ? "" : " vditor-panel--arrow"), o.innerHTML = "<button data-mode=\"wysiwyg\">" + window.VditorI18n.wysiwyg + " &lt;" + (0, s.ns)("⌥⌘7") + `></button>
<button data-mode="ir">` + window.VditorI18n.instantRendering + " &lt;" + (0, s.ns)("⌥⌘8") + `></button>
<button data-mode="sv">` + window.VditorI18n.splitView + " &lt;" + (0, s.ns)("⌥⌘9") + "></button>", r.element.appendChild(o), r._bindEvent(n, o, i), r;
          }
          return Gn(t, e), t.prototype._bindEvent = function(n, i, r) {
            var o = this.element.children[0];
            k(n, i, o, r.level), i.children.item(0).addEventListener((0, s.Le)(), function(a) {
              Ye(n, "wysiwyg", a), a.preventDefault(), a.stopPropagation();
            }), i.children.item(1).addEventListener((0, s.Le)(), function(a) {
              Ye(n, "ir", a), a.preventDefault(), a.stopPropagation();
            }), i.children.item(2).addEventListener((0, s.Le)(), function(a) {
              Ye(n, "sv", a), a.preventDefault(), a.stopPropagation();
            });
          }, t;
        }(Le), ft = function(e, t) {
          return (0, T.Gb)(e, t) ? getSelection().toString() : "";
        }, It = function(e, t) {
          t.addEventListener("focus", function() {
            e.options.focus && e.options.focus(m(e)), E(e, ["subToolbar", "hint"]);
          });
        }, sn = function(e, t) {
          t.addEventListener("dblclick", function(n) {
            n.target.tagName === "IMG" && (e.options.image.preview ? e.options.image.preview(n.target) : e.options.image.isPreview && (0, ie.E)(n.target, e.options.lang, e.options.theme));
          });
        }, jt = function(e, t) {
          t.addEventListener("blur", function(n) {
            if (e.currentMode === "ir") {
              var i = e.ir.element.querySelector(".vditor-ir__node--expand");
              i && i.classList.remove("vditor-ir__node--expand");
            } else
              e.currentMode !== "wysiwyg" || e.wysiwyg.selectPopover.contains(n.relatedTarget) || e.wysiwyg.hideComment();
            e[e.currentMode].range = (0, T.zh)(e), e.options.blur && e.options.blur(m(e));
          });
        }, Rt = function(e, t) {
          t.addEventListener("dragstart", function(n) {
            n.dataTransfer.setData(y.g.DROP_EDITOR, y.g.DROP_EDITOR);
          }), t.addEventListener("drop", function(n) {
            n.dataTransfer.getData(y.g.DROP_EDITOR) ? ae(e) : (n.dataTransfer.types.includes("Files") || n.dataTransfer.types.includes("text/html")) && Mt(e, n, { pasteCode: function(i) {
              document.execCommand("insertHTML", !1, i);
            } });
          });
        }, Pt = function(e, t, n) {
          t.addEventListener("copy", function(i) {
            return n(i, e);
          });
        }, qt = function(e, t, n) {
          t.addEventListener("cut", function(i) {
            n(i, e), e.options.comment.enable && e.currentMode === "wysiwyg" && e.wysiwyg.getComments(e), document.execCommand("delete");
          });
        }, Te = function(e) {
          if (e.currentMode === "wysiwyg" && e.options.comment.enable && e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)), e.options.typewriterMode) {
            var t = e[e.currentMode].element, n = (0, T.Ny)(t).top;
            e.options.height !== "auto" || e.element.classList.contains("vditor--fullscreen") || window.scrollTo(window.scrollX, n + e.element.offsetTop + e.toolbar.element.offsetHeight - window.innerHeight / 2 + 10), (e.options.height !== "auto" || e.element.classList.contains("vditor--fullscreen")) && (t.scrollTop = n + t.scrollTop - t.clientHeight / 2 + 10);
          }
        }, Bt = function(e, t) {
          t.addEventListener("keydown", function(n) {
            if (!n.isComposing && e.options.keydown && e.options.keydown(n), !(e.options.hint.extend.length > 1 || e.toolbar.elements.emoji) || !e.hint.select(n, e)) {
              if (e.options.comment.enable && e.currentMode === "wysiwyg" && (n.key === "Backspace" || V("⌘X", n)) && e.wysiwyg.getComments(e), e.currentMode === "sv") {
                if (function(r, o) {
                  var a, d, v, g, h;
                  if (r.sv.composingLock = o.isComposing, o.isComposing || (o.key.indexOf("Arrow") !== -1 || o.key === "Meta" || o.key === "Control" || o.key === "Alt" || o.key === "Shift" || o.key === "CapsLock" || o.key === "Escape" || /^F\d{1,2}$/.test(o.key) || r.undo.recordFirstPosition(r, o), o.key !== "Enter" && o.key !== "Tab" && o.key !== "Backspace" && o.key.indexOf("Arrow") === -1 && !(0, s.yl)(o) && o.key !== "Escape"))
                    return !1;
                  var A = (0, T.zh)(r), O = A.startContainer;
                  A.startContainer.nodeType !== 3 && A.startContainer.tagName === "DIV" && (O = A.startContainer.childNodes[A.startOffset - 1]);
                  var U = (0, p.a1)(O, "data-type", "text"), C = (0, p.a1)(O, "data-type", "blockquote-marker");
                  if (!C && A.startOffset === 0 && U && U.previousElementSibling && U.previousElementSibling.getAttribute("data-type") === "blockquote-marker" && (C = U.previousElementSibling), C && o.key === "Enter" && !(0, s.yl)(o) && !o.altKey && C.nextElementSibling.textContent.trim() === "" && (0, T.im)(C, r.sv.element, A).start === C.textContent.length)
                    return ((a = C.previousElementSibling) === null || a === void 0 ? void 0 : a.getAttribute("data-type")) === "padding" && C.previousElementSibling.setAttribute("data-action", "enter-remove"), C.remove(), He(r), o.preventDefault(), !0;
                  var R = (0, p.a1)(O, "data-type", "li-marker"), q = (0, p.a1)(O, "data-type", "task-marker"), D = R;
                  if (D || q && q.nextElementSibling.getAttribute("data-type") !== "task-marker" && (D = q), D || A.startOffset !== 0 || !U || !U.previousElementSibling || U.previousElementSibling.getAttribute("data-type") !== "li-marker" && U.previousElementSibling.getAttribute("data-type") !== "task-marker" || (D = U.previousElementSibling), D) {
                    var B = (0, T.im)(D, r.sv.element, A).start, P = D.getAttribute("data-type") === "task-marker", H = D;
                    if (P && (H = D.previousElementSibling.previousElementSibling.previousElementSibling), B === D.textContent.length) {
                      if (o.key === "Enter" && !(0, s.yl)(o) && !o.altKey && !o.shiftKey && D.nextElementSibling.textContent.trim() === "")
                        return ((d = H.previousElementSibling) === null || d === void 0 ? void 0 : d.getAttribute("data-type")) === "padding" ? (H.previousElementSibling.remove(), oe(r)) : (P && (H.remove(), D.previousElementSibling.previousElementSibling.remove(), D.previousElementSibling.remove()), D.nextElementSibling.remove(), D.remove(), He(r)), o.preventDefault(), !0;
                      if (o.key === "Tab")
                        return H.insertAdjacentHTML("beforebegin", "<span data-type=\"padding\">" + H.textContent.replace(/\S/g, " ") + "</span>"), /^\d/.test(H.textContent) && (H.textContent = H.textContent.replace(/^\d{1,}/, "1"), A.selectNodeContents(D.firstChild), A.collapse(!1)), oe(r), o.preventDefault(), !0;
                    }
                  }
                  if (Ft(r, A, o))
                    return !0;
                  var G = (0, p.a1)(O, "data-block", "0"), te = (0, x.S)(O, "SPAN");
                  if (o.key === "Enter" && !(0, s.yl)(o) && !o.altKey && !o.shiftKey && G) {
                    var X = !1, ee = G.textContent.match(/^\n+/);
                    (0, T.im)(G, r.sv.element).start <= (ee ? ee[0].length : 0) && (X = !0);
                    var Y = `
`;
                    if (te) {
                      if (((v = te.previousElementSibling) === null || v === void 0 ? void 0 : v.getAttribute("data-action")) === "enter-remove")
                        return te.previousElementSibling.remove(), He(r), o.preventDefault(), !0;
                      Y += $n(te);
                    }
                    return A.insertNode(document.createTextNode(Y)), A.collapse(!1), G && G.textContent.trim() !== "" && !X ? oe(r) : He(r), o.preventDefault(), !0;
                  }
                  if (o.key === "Backspace" && !(0, s.yl)(o) && !o.altKey && !o.shiftKey) {
                    if (te && ((g = te.previousElementSibling) === null || g === void 0 ? void 0 : g.getAttribute("data-type")) === "newline" && (0, T.im)(te, r.sv.element, A).start === 1 && te.getAttribute("data-type").indexOf("code-block-") === -1)
                      return A.setStart(te, 0), A.extractContents(), te.textContent.trim() !== "" ? oe(r) : He(r), o.preventDefault(), !0;
                    if (G && (0, T.im)(G, r.sv.element, A).start === 0 && G.previousElementSibling) {
                      A.extractContents();
                      var F = G.previousElementSibling.lastElementChild;
                      return F.getAttribute("data-type") === "newline" && (F.remove(), F = G.previousElementSibling.lastElementChild), F.getAttribute("data-type") !== "newline" && (F.insertAdjacentHTML("afterend", G.innerHTML), G.remove()), G.textContent.trim() === "" || !((h = G.previousElementSibling) === null || h === void 0) && h.querySelector("[data-type=\"code-block-open-marker\"]") ? (F.getAttribute("data-type") !== "newline" && (A.selectNodeContents(F.lastChild), A.collapse(!1)), He(r)) : oe(r), o.preventDefault(), !0;
                    }
                  }
                  return !1;
                }(e, n))
                  return;
              } else if (e.currentMode === "wysiwyg") {
                if (function(r, o) {
                  if (r.wysiwyg.composingLock = o.isComposing, o.isComposing)
                    return !1;
                  o.key.indexOf("Arrow") !== -1 || o.key === "Meta" || o.key === "Control" || o.key === "Alt" || o.key === "Shift" || o.key === "CapsLock" || o.key === "Escape" || /^F\d{1,2}$/.test(o.key) || r.undo.recordFirstPosition(r, o);
                  var a = (0, T.zh)(r), d = a.startContainer;
                  if (!mn(o, r, d) || (fn(a, r, o), An(a), o.key !== "Enter" && o.key !== "Tab" && o.key !== "Backspace" && o.key.indexOf("Arrow") === -1 && !(0, s.yl)(o) && o.key !== "Escape" && o.key !== "Delete"))
                    return !1;
                  var v = (0, p.F9)(d), g = (0, p.lG)(d, "P");
                  if (bn(o, r, g, a) || yn(a, r, g, o) || Ln(r, o, a))
                    return !0;
                  var h = (0, p.fb)(d, "vditor-wysiwyg__block");
                  if (h) {
                    if (o.key === "Escape" && h.children.length === 2)
                      return r.wysiwyg.popover.style.display = "none", h.firstElementChild.style.display = "none", r.wysiwyg.element.blur(), o.preventDefault(), !0;
                    if (!(0, s.yl)(o) && !o.shiftKey && o.altKey && o.key === "Enter" && h.getAttribute("data-type") === "code-block") {
                      var A = r.wysiwyg.popover.querySelector(".vditor-input");
                      return A.focus(), A.select(), o.preventDefault(), !0;
                    }
                    if (h.getAttribute("data-block") === "0" && (_n(r, o, h.firstElementChild, a) || ht(r, o, a, h.firstElementChild, h) || h.getAttribute("data-type") !== "yaml-front-matter" && at(r, o, a, h.firstElementChild, h)))
                      return !0;
                  }
                  if (Cn(r, a, o, g))
                    return !0;
                  var O = (0, p.E2)(d, "BLOCKQUOTE");
                  if (O && !o.shiftKey && o.altKey && o.key === "Enter") {
                    (0, s.yl)(o) ? a.setStartBefore(O) : a.setStartAfter(O), (0, T.Hc)(a);
                    var U = document.createElement("p");
                    return U.setAttribute("data-block", "0"), U.innerHTML = `
`, a.insertNode(U), a.collapse(!0), (0, T.Hc)(a), we(r), Te(r), o.preventDefault(), !0;
                  }
                  var C, R = (0, x.W)(d);
                  if (R) {
                    if (R.tagName === "H6" && d.textContent.length === a.startOffset && !(0, s.yl)(o) && !o.shiftKey && !o.altKey && o.key === "Enter") {
                      var q = document.createElement("p");
                      return q.textContent = `
`, q.setAttribute("data-block", "0"), d.parentElement.insertAdjacentElement("afterend", q), a.setStart(q, 0), (0, T.Hc)(a), we(r), Te(r), o.preventDefault(), !0;
                    }
                    var D;
                    if (V("⌘=", o))
                      return (D = parseInt(R.tagName.substr(1), 10) - 1) > 0 && (wt(r, "h" + D), we(r)), o.preventDefault(), !0;
                    if (V("⌘-", o))
                      return (D = parseInt(R.tagName.substr(1), 10) + 1) < 7 && (wt(r, "h" + D), we(r)), o.preventDefault(), !0;
                    o.key !== "Backspace" || (0, s.yl)(o) || o.shiftKey || o.altKey || R.textContent.length !== 1 || Dt(r);
                  }
                  if (Mn(r, a, o))
                    return !0;
                  if (o.altKey && o.key === "Enter" && !(0, s.yl)(o) && !o.shiftKey) {
                    var B = (0, p.lG)(d, "A"), P = (0, p.a1)(d, "data-type", "link-ref"), H = (0, p.a1)(d, "data-type", "footnotes-ref");
                    if (B || P || H || R && R.tagName.length === 2) {
                      var G = r.wysiwyg.popover.querySelector("input");
                      G.focus(), G.select();
                    }
                  }
                  if (De(r, o))
                    return !0;
                  if (V("⇧⌘U", o) && (C = r.wysiwyg.popover.querySelector("[data-type=\"up\"]")) || V("⇧⌘D", o) && (C = r.wysiwyg.popover.querySelector("[data-type=\"down\"]")))
                    return C.click(), o.preventDefault(), !0;
                  if (Ft(r, a, o))
                    return !0;
                  if (!(0, s.yl)(o) && o.shiftKey && !o.altKey && o.key === "Enter" && d.parentElement.tagName !== "LI" && d.parentElement.tagName !== "P")
                    return ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(d.parentElement.tagName) ? a.insertNode(document.createTextNode(`
` + y.g.ZWSP)) : a.insertNode(document.createTextNode(`
`)), a.collapse(!1), (0, T.Hc)(a), we(r), Te(r), o.preventDefault(), !0;
                  if (o.key === "Backspace" && !(0, s.yl)(o) && !o.shiftKey && !o.altKey && a.toString() === "") {
                    if (Tn(r, a, o, g))
                      return !0;
                    if (v) {
                      if (v.previousElementSibling && v.previousElementSibling.classList.contains("vditor-wysiwyg__block") && v.previousElementSibling.getAttribute("data-block") === "0" && v.tagName !== "UL" && v.tagName !== "OL") {
                        var te = (0, T.im)(v, r.wysiwyg.element, a).start;
                        if (te === 0 && a.startOffset === 0 || te === 1 && v.innerText.startsWith(y.g.ZWSP))
                          return pt(v.previousElementSibling.lastElementChild, r, !1), v.innerHTML.trim().replace(y.g.ZWSP, "") === "" && (v.remove(), we(r)), o.preventDefault(), !0;
                      }
                      var X = a.startOffset;
                      if (a.toString() === "" && d.nodeType === 3 && d.textContent.charAt(X - 2) === `
` && d.textContent.charAt(X - 1) !== y.g.ZWSP && ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(d.parentElement.tagName))
                        return d.textContent = d.textContent.substring(0, X - 1) + y.g.ZWSP, a.setStart(d, X), a.collapse(!0), we(r), o.preventDefault(), !0;
                      d.textContent === y.g.ZWSP && a.startOffset === 1 && !d.previousSibling && function(Y) {
                        for (var F = Y.startContainer.nextSibling; F && F.textContent === ""; )
                          F = F.nextSibling;
                        return !(!F || F.nodeType === 3 || F.tagName !== "CODE" && F.getAttribute("data-type") !== "math-inline" && F.getAttribute("data-type") !== "html-entity" && F.getAttribute("data-type") !== "html-inline");
                      }(a) && (d.textContent = ""), v.querySelectorAll("span.vditor-wysiwyg__block[data-type='math-inline']").forEach(function(Y) {
                        Y.firstElementChild.style.display = "inline", Y.lastElementChild.style.display = "none";
                      }), v.querySelectorAll("span.vditor-wysiwyg__block[data-type='html-entity']").forEach(function(Y) {
                        Y.firstElementChild.style.display = "inline", Y.lastElementChild.style.display = "none";
                      });
                    }
                  }
                  if ((0, s.vU)() && a.startOffset === 1 && d.textContent.indexOf(y.g.ZWSP) > -1 && d.previousSibling && d.previousSibling.nodeType !== 3 && d.previousSibling.tagName === "CODE" && (o.key === "Backspace" || o.key === "ArrowLeft"))
                    return a.selectNodeContents(d.previousSibling), a.collapse(!1), o.preventDefault(), !0;
                  if (xn(o, v, a))
                    return o.preventDefault(), !0;
                  if (hn(a, o.key), o.key === "ArrowDown") {
                    var ee = d.nextSibling;
                    ee && ee.nodeType !== 3 && ee.getAttribute("data-type") === "math-inline" && a.setStartAfter(ee);
                  }
                  return !(!v || !K(v, r, o, a) || (o.preventDefault(), 0));
                }(e, n))
                  return;
              } else if (e.currentMode === "ir" && function(r, o) {
                if (r.ir.composingLock = o.isComposing, o.isComposing)
                  return !1;
                o.key.indexOf("Arrow") !== -1 || o.key === "Meta" || o.key === "Control" || o.key === "Alt" || o.key === "Shift" || o.key === "CapsLock" || o.key === "Escape" || /^F\d{1,2}$/.test(o.key) || r.undo.recordFirstPosition(r, o);
                var a = (0, T.zh)(r), d = a.startContainer;
                if (!mn(o, r, d) || (fn(a, r, o), An(a), o.key !== "Enter" && o.key !== "Tab" && o.key !== "Backspace" && o.key.indexOf("Arrow") === -1 && !(0, s.yl)(o) && o.key !== "Escape" && o.key !== "Delete"))
                  return !1;
                var v = (0, p.a1)(d, "data-newline", "1");
                if (!(0, s.yl)(o) && !o.altKey && !o.shiftKey && o.key === "Enter" && v && a.startOffset < v.textContent.length) {
                  var g = v.previousElementSibling;
                  g && (a.insertNode(document.createTextNode(g.textContent)), a.collapse(!1));
                  var h = v.nextSibling;
                  h && (a.insertNode(document.createTextNode(h.textContent)), a.collapse(!0));
                }
                var A = (0, p.lG)(d, "P");
                if (bn(o, r, A, a) || yn(a, r, A, o) || Cn(r, a, o, A))
                  return !0;
                var O = (0, p.fb)(d, "vditor-ir__marker--pre");
                if (O && O.tagName === "PRE") {
                  var U = O.firstChild;
                  if (_n(r, o, O, a) || (U.getAttribute("data-type") === "math-block" || U.getAttribute("data-type") === "html-block") && at(r, o, a, U, O.parentElement) || ht(r, o, a, U, O.parentElement))
                    return !0;
                }
                var C = (0, p.a1)(d, "data-type", "code-block-info");
                if (C) {
                  if (o.key === "Enter" || o.key === "Tab")
                    return a.selectNodeContents(C.nextElementSibling.firstChild), a.collapse(!0), o.preventDefault(), E(r, ["hint"]), !0;
                  if (o.key === "Backspace") {
                    var R = (0, T.im)(C, r.ir.element).start;
                    R === 1 && a.setStart(d, 0), R === 2 && (r.hint.recentLanguage = "");
                  }
                  if (at(r, o, a, C, C.parentElement))
                    return E(r, ["hint"]), !0;
                }
                var q = (0, p.lG)(d, "TD") || (0, p.lG)(d, "TH");
                if (o.key.indexOf("Arrow") > -1 && q) {
                  var D = rr(q);
                  if (D && at(r, o, a, q, D))
                    return !0;
                  var B = ir(q);
                  if (B && ht(r, o, a, q, B))
                    return !0;
                }
                if (Ln(r, o, a) || Mn(r, a, o) || Ft(r, a, o))
                  return !0;
                var P = (0, x.W)(d);
                if (P) {
                  var H;
                  if (V("⌘=", o))
                    return (H = P.querySelector(".vditor-ir__marker--heading")) && H.textContent.trim().length > 1 && vt(r, H.textContent.substr(1)), o.preventDefault(), !0;
                  if (V("⌘-", o))
                    return (H = P.querySelector(".vditor-ir__marker--heading")) && H.textContent.trim().length < 6 && vt(r, H.textContent.trim() + "# "), o.preventDefault(), !0;
                }
                var G = (0, p.F9)(d);
                if (o.key === "Backspace" && !(0, s.yl)(o) && !o.shiftKey && !o.altKey && a.toString() === "") {
                  if (Tn(r, a, o, A))
                    return !0;
                  if (G && G.previousElementSibling && G.tagName !== "UL" && G.tagName !== "OL" && (G.previousElementSibling.getAttribute("data-type") === "code-block" || G.previousElementSibling.getAttribute("data-type") === "math-block")) {
                    var te = (0, T.im)(G, r.ir.element, a).start;
                    if (te === 0 || te === 1 && G.innerText.startsWith(y.g.ZWSP))
                      return a.selectNodeContents(G.previousElementSibling.querySelector(".vditor-ir__marker--pre code")), a.collapse(!1), j(a, r), G.textContent.trim().replace(y.g.ZWSP, "") === "" && (G.remove(), Fe(r)), o.preventDefault(), !0;
                  }
                  if (P) {
                    var X = P.firstElementChild.textContent.length;
                    (0, T.im)(P, r.ir.element).start === X && (a.setStart(P.firstElementChild.firstChild, X - 1), a.collapse(!0), (0, T.Hc)(a));
                  }
                }
                return !((o.key !== "ArrowUp" && o.key !== "ArrowDown" || !G || (G.querySelectorAll(".vditor-ir__node").forEach(function(ee) {
                  ee.contains(d) || ee.classList.add("vditor-ir__node--hidden");
                }), !xn(o, G, a))) && (hn(a, o.key), !G || !K(G, r, o, a) || (o.preventDefault(), 0)));
              }(e, n))
                return;
              if (e.options.ctrlEnter && V("⌘Enter", n))
                return e.options.ctrlEnter(m(e)), void n.preventDefault();
              if (V("⌘Z", n) && !e.toolbar.elements.undo)
                return e.undo.undo(e), void n.preventDefault();
              if (V("⌘Y", n) && !e.toolbar.elements.redo)
                return e.undo.redo(e), void n.preventDefault();
              if (n.key === "Escape")
                return e.hint.element.style.display === "block" ? e.hint.element.style.display = "none" : e.options.esc && !n.isComposing && e.options.esc(m(e)), void n.preventDefault();
              if ((0, s.yl)(n) && n.altKey && !n.shiftKey && /^Digit[1-6]$/.test(n.code)) {
                if (e.currentMode === "wysiwyg") {
                  var i = n.code.replace("Digit", "H");
                  (0, p.lG)(getSelection().getRangeAt(0).startContainer, i) ? Dt(e) : wt(e, i), we(e);
                } else
                  e.currentMode === "sv" ? dn(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ") : e.currentMode === "ir" && vt(e, "#".repeat(parseInt(n.code.replace("Digit", ""), 10)) + " ");
                return n.preventDefault(), !0;
              }
              if ((0, s.yl)(n) && n.altKey && !n.shiftKey && /^Digit[7-9]$/.test(n.code))
                return n.code === "Digit7" ? Ye(e, "wysiwyg", n) : n.code === "Digit8" ? Ye(e, "ir", n) : n.code === "Digit9" && Ye(e, "sv", n), !0;
              e.options.toolbar.find(function(r) {
                return !r.hotkey || r.toolbar ? !!r.toolbar && !!r.toolbar.find(function(o) {
                  return !!o.hotkey && (V(o.hotkey, n) ? (e.toolbar.elements[o.name].children[0].dispatchEvent(new CustomEvent((0, s.Le)())), n.preventDefault(), !0) : void 0);
                }) : V(r.hotkey, n) ? (e.toolbar.elements[r.name].children[0].dispatchEvent(new CustomEvent((0, s.Le)())), n.preventDefault(), !0) : void 0;
              });
            }
          });
        }, Vt = function(e, t) {
          t.addEventListener("selectstart", function(n) {
            t.onmouseup = function() {
              setTimeout(function() {
                var i = ft(e[e.currentMode].element);
                i.trim() ? (e.currentMode === "wysiwyg" && e.options.comment.enable && ((0, p.a1)(n.target, "data-type", "footnotes-block") || (0, p.a1)(n.target, "data-type", "link-ref-defs-block") ? e.wysiwyg.hideComment() : e.wysiwyg.showComment()), e.options.select && e.options.select(i)) : e.currentMode === "wysiwyg" && e.options.comment.enable && e.wysiwyg.hideComment();
              });
            };
          });
        }, ln = function(e, t) {
          var n = (0, T.zh)(e);
          n.extractContents(), n.insertNode(document.createTextNode(Lute.Caret)), n.insertNode(document.createTextNode(t));
          var i = (0, p.a1)(n.startContainer, "data-block", "0");
          i || (i = e.sv.element);
          var r = e.lute.SpinVditorSVDOM(i.textContent);
          r = "<div data-block='0'>" + r.replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", i.isEqualNode(e.sv.element) ? i.innerHTML = r : i.outerHTML = r, se(e.sv.element), (0, T.ib)(e.sv.element, n), Te(e);
        }, Et = function(e, t, n) {
          n === void 0 && (n = !0);
          var i = e;
          for (i.nodeType === 3 && (i = i.parentElement); i; ) {
            if (i.getAttribute("data-type") === t)
              return i;
            i = n ? i.previousElementSibling : i.nextElementSibling;
          }
          return !1;
        }, cn = function(e, t) {
          return I("SpinVditorSVDOM", e, "argument", t.options.debugger), e = "<div data-block='0'>" + t.lute.SpinVditorSVDOM(e).replace(/<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g, `<span data-type="newline"><br /><span style="display: none">
</span></span><span data-type="newline"><br /><span style="display: none">
</span></span></div><div data-block="0"><`) + "</div>", I("SpinVditorSVDOM", e, "result", t.options.debugger), e;
        }, $n = function(e) {
          var t = e.getAttribute("data-type"), n = e.previousElementSibling, i = t && t !== "text" && t !== "table" && t !== "heading-marker" && t !== "newline" && t !== "yaml-front-matter-open-marker" && t !== "yaml-front-matter-close-marker" && t !== "code-block-info" && t !== "code-block-close-marker" && t !== "code-block-open-marker" ? e.textContent : "", r = !1;
          for (t === "newline" && (r = !0); n && !r; ) {
            var o = n.getAttribute("data-type");
            if (o === "li-marker" || o === "blockquote-marker" || o === "task-marker" || o === "padding") {
              var a = n.textContent;
              if (o !== "li-marker" || t !== "code-block-open-marker" && t !== "code-block-info")
                if (t === "code-block-close-marker" && n.nextElementSibling.isSameNode(e)) {
                  var d = Et(e, "code-block-open-marker");
                  d && d.previousElementSibling && (n = d.previousElementSibling, i = a + i);
                } else
                  i = a + i;
              else
                i = a.replace(/\S/g, " ") + i;
            } else
              o === "newline" && (r = !0);
            n = n.previousElementSibling;
          }
          return i;
        }, He = function(e, t) {
          t === void 0 && (t = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }), t.enableHint && e.hint.render(e), e.preview.render(e);
          var n = m(e);
          typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, s.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), clearTimeout(e.sv.processTimeoutId), e.sv.processTimeoutId = window.setTimeout(function() {
            t.enableAddUndoStack && !e.sv.composingLock && e.undo.addToUndoStack(e);
          }, e.options.undoDelay);
        }, dn = function(e, t) {
          var n = (0, T.zh)(e), i = (0, x.S)(n.startContainer, "SPAN");
          i && i.textContent.trim() !== "" && (t = `
` + t), n.collapse(!0), document.execCommand("insertHTML", !1, t);
        }, Jn = function(e, t, n, i) {
          var r = (0, T.zh)(e), o = t.getAttribute("data-type");
          e.sv.element.childNodes.length === 0 && (e.sv.element.innerHTML = `<span data-type="p" data-block="0"><span data-type="text"><wbr></span></span><span data-type="newline"><br><span style="display: none">
</span></span>`, (0, T.ib)(e.sv.element, r));
          var a = (0, p.F9)(r.startContainer), d = (0, x.S)(r.startContainer, "SPAN");
          if (a) {
            if (o === "link") {
              var v = void 0;
              return v = r.toString() === "" ? "" + n + Lute.Caret + i : "" + n + r.toString() + i.replace(")", Lute.Caret + ")"), void document.execCommand("insertHTML", !1, v);
            }
            if (o === "italic" || o === "bold" || o === "strike" || o === "inline-code" || o === "code" || o === "table" || o === "line")
              return v = void 0, v = r.toString() === "" ? "" + n + Lute.Caret + (o === "code" ? "" : i) : "" + n + r.toString() + Lute.Caret + (o === "code" ? "" : i), o === "table" || o === "code" && d && d.textContent !== "" ? v = `

` + v : o === "line" && (v = `

` + n + `
` + Lute.Caret), void document.execCommand("insertHTML", !1, v);
            if ((o === "check" || o === "list" || o === "ordered-list" || o === "quote") && d) {
              var g = "* ";
              o === "check" ? g = "* [ ] " : o === "ordered-list" ? g = "1. " : o === "quote" && (g = "> ");
              var h = Et(d, "newline");
              return h ? h.insertAdjacentText("afterend", g) : a.insertAdjacentText("afterbegin", g), void oe(e);
            }
            (0, T.ib)(e.sv.element, r), He(e);
          }
        }, un = function(e) {
          switch (e.currentMode) {
          case "ir":
            return e.ir.element;
          case "wysiwyg":
            return e.wysiwyg.element;
          case "sv":
            return e.sv.element;
          }
        }, pn = function(e, t) {
          e.options.upload.setHeaders && (e.options.upload.headers = e.options.upload.setHeaders()), e.options.upload.headers && Object.keys(e.options.upload.headers).forEach(function(n) {
            t.setRequestHeader(n, e.options.upload.headers[n]);
          });
        }, Xn = function(e, t, n, i) {
          return new (n || (n = Promise))(function(r, o) {
            function a(g) {
              try {
                v(i.next(g));
              } catch (h) {
                o(h);
              }
            }
            function d(g) {
              try {
                v(i.throw(g));
              } catch (h) {
                o(h);
              }
            }
            function v(g) {
              var h;
              g.done ? r(g.value) : (h = g.value, h instanceof n ? h : new n(function(A) {
                A(h);
              })).then(a, d);
            }
            v((i = i.apply(e, [])).next());
          });
        }, Qn = function(e, t) {
          var n, i, r, o, a = { label: 0, sent: function() {
            if (1 & r[0])
              throw r[1];
            return r[1];
          }, trys: [], ops: [] };
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(v) {
            return function(g) {
              return function(h) {
                if (n)
                  throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (n = 1, i && (r = 2 & h[0] ? i.return : h[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, h[1])).done)
                      return r;
                    switch (i = 0, r && (h = [2 & h[0], r.value]), h[0]) {
                    case 0:
                    case 1:
                      r = h;
                      break;
                    case 4:
                      return a.label++, { value: h[1], done: !1 };
                    case 5:
                      a.label++, i = h[1], h = [0];
                      continue;
                    case 7:
                      h = a.ops.pop(), a.trys.pop();
                      continue;
                    default:
                      if (r = a.trys, !((r = r.length > 0 && r[r.length - 1]) || h[0] !== 6 && h[0] !== 2)) {
                        a = 0;
                        continue;
                      }
                      if (h[0] === 3 && (!r || h[1] > r[0] && h[1] < r[3])) {
                        a.label = h[1];
                        break;
                      }
                      if (h[0] === 6 && a.label < r[1]) {
                        a.label = r[1], r = h;
                        break;
                      }
                      if (r && a.label < r[2]) {
                        a.label = r[2], a.ops.push(h);
                        break;
                      }
                      r[2] && a.ops.pop(), a.trys.pop();
                      continue;
                    }
                    h = t.call(e, a);
                  } catch (A) {
                    h = [6, A], i = 0;
                  } finally {
                    n = r = 0;
                  }
                if (5 & h[0])
                  throw h[1];
                return { value: h[0] ? h[1] : void 0, done: !0 };
              }([v, g]);
            };
          }
        }, Yn = function() {
          this.isUploading = !1, this.element = document.createElement("div"), this.element.className = "vditor-upload";
        }, Ut = function(e, t, n) {
          return Xn(void 0, void 0, void 0, function() {
            var i, r, o, a, d, v, g, h, A, O, U, C, R, q;
            return Qn(this, function(D) {
              switch (D.label) {
              case 0:
                for (i = [], r = e.options.upload.multiple === !0 ? t.length : 1, C = 0; C < r; C++)
                  (o = t[C]) instanceof DataTransferItem && (o = o.getAsFile()), i.push(o);
                return e.options.upload.handler ? [4, e.options.upload.handler(i)] : [3, 2];
              case 1:
                return a = D.sent(), n && (n.value = ""), typeof a == "string" ? (e.tip.show(a), [2]) : [2];
              case 2:
                return e.options.upload.url && e.upload ? e.options.upload.file ? [4, e.options.upload.file(i)] : [3, 4] : (n && (n.value = ""), e.tip.show("please config: options.upload.url"), [2]);
              case 3:
                i = D.sent(), D.label = 4;
              case 4:
                if (e.options.upload.validate && typeof (a = e.options.upload.validate(i)) == "string")
                  return e.tip.show(a), [2];
                if (d = un(e), e.upload.range = (0, T.zh)(e), v = function(B, P) {
                  B.tip.hide();
                  for (var H = [], G = "", te = "", X = (B.options.lang, B.options, function(F, re) {
                      var ye = P[re], _e = !0;
                      ye.name || (G += "<li>" + window.VditorI18n.nameEmpty + "</li>", _e = !1), ye.size > B.options.upload.max && (G += "<li>" + ye.name + " " + window.VditorI18n.over + " " + B.options.upload.max / 1024 / 1024 + "M</li>", _e = !1);
                      var Ge = ye.name.lastIndexOf("."), Oe = ye.name.substr(Ge), Ie = B.options.upload.filename(ye.name.substr(0, Ge)) + Oe;
                      B.options.upload.accept && (B.options.upload.accept.split(",").some(function(Ae) {
                        var st = Ae.trim();
                        if (st.indexOf(".") === 0) {
                          if (Oe.toLowerCase() === st.toLowerCase())
                            return !0;
                        } else if (ye.type.split("/")[0] === st.split("/")[0])
                          return !0;
                        return !1;
                      }) || (G += "<li>" + ye.name + " " + window.VditorI18n.fileTypeError + "</li>", _e = !1)), _e && (H.push(ye), te += "<li>" + Ie + " " + window.VditorI18n.uploading + "</li>");
                    }), ee = P.length, Y = 0; Y < ee; Y++)
                    X(0, Y);
                  return B.tip.show("<ul>" + G + te + "</ul>"), H;
                }(e, i), v.length === 0)
                  return n && (n.value = ""), [2];
                for (g = new FormData(), h = e.options.upload.extraData, A = 0, O = Object.keys(h); A < O.length; A++)
                  U = O[A], g.append(U, h[U]);
                for (C = 0, R = v.length; C < R; C++)
                  g.append(e.options.upload.fieldName, v[C]);
                return (q = new XMLHttpRequest()).open("POST", e.options.upload.url), e.options.upload.token && q.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (q.withCredentials = !0), pn(e, q), e.upload.isUploading = !0, d.setAttribute("contenteditable", "false"), q.onreadystatechange = function() {
                  if (q.readyState === XMLHttpRequest.DONE) {
                    if (e.upload.isUploading = !1, d.setAttribute("contenteditable", "true"), q.status >= 200 && q.status < 300)
                      if (e.options.upload.success)
                        e.options.upload.success(d, q.responseText);
                      else {
                        var B = q.responseText;
                        e.options.upload.format && (B = e.options.upload.format(t, q.responseText)), function(P, H) {
                          un(H).focus();
                          var G = JSON.parse(P), te = "";
                          G.code === 1 && (te = "" + G.msg), G.data.errFiles && G.data.errFiles.length > 0 && (te = "<ul><li>" + te + "</li>", G.data.errFiles.forEach(function(ee) {
                            var Y = ee.lastIndexOf("."), F = H.options.upload.filename(ee.substr(0, Y)) + ee.substr(Y);
                            te += "<li>" + F + " " + window.VditorI18n.uploadError + "</li>";
                          }), te += "</ul>"), te ? H.tip.show(te) : H.tip.hide();
                          var X = "";
                          Object.keys(G.data.succMap).forEach(function(ee) {
                            var Y = G.data.succMap[ee], F = ee.lastIndexOf("."), re = ee.substr(F), ye = H.options.upload.filename(ee.substr(0, F)) + re;
                            (re = re.toLowerCase()).indexOf(".wav") === 0 || re.indexOf(".mp3") === 0 || re.indexOf(".ogg") === 0 ? H.currentMode === "wysiwyg" ? X += `<div class="vditor-wysiwyg__block" data-type="html-block"
 data-block="0"><pre><code>&lt;audio controls="controls" src="` + Y + "\"&gt;&lt;/audio&gt;</code></pre><pre class=\"vditor-wysiwyg__preview\" data-render=\"1\"><audio controls=\"controls\" src=\"" + Y + `"></audio></pre></div>
` : H.currentMode === "ir" ? X += "<audio controls=\"controls\" src=\"" + Y + `"></audio>
` : X += "[" + ye + "](" + Y + `)
` : re.indexOf(".apng") === 0 || re.indexOf(".bmp") === 0 || re.indexOf(".gif") === 0 || re.indexOf(".ico") === 0 || re.indexOf(".cur") === 0 || re.indexOf(".jpg") === 0 || re.indexOf(".jpeg") === 0 || re.indexOf(".jfif") === 0 || re.indexOf(".pjp") === 0 || re.indexOf(".pjpeg") === 0 || re.indexOf(".png") === 0 || re.indexOf(".svg") === 0 || re.indexOf(".webp") === 0 ? H.currentMode === "wysiwyg" ? X += "<img alt=\"" + ye + "\" src=\"" + Y + `">
` : X += "![" + ye + "](" + Y + `)
` : H.currentMode === "wysiwyg" ? X += "<a href=\"" + Y + "\">" + ye + `</a>
` : X += "[" + ye + "](" + Y + `)
`;
                          }), (0, T.Hc)(H.upload.range), document.execCommand("insertHTML", !1, X), H.upload.range = getSelection().getRangeAt(0).cloneRange();
                        }(B, e);
                      }
                    else
                      e.options.upload.error ? e.options.upload.error(q.responseText) : e.tip.show(q.responseText);
                    n && (n.value = ""), e.upload.element.style.display = "none";
                  }
                }, q.upload.onprogress = function(B) {
                  if (B.lengthComputable) {
                    var P = B.loaded / B.total * 100;
                    e.upload.element.style.display = "block", e.upload.element.style.width = P + "%";
                  }
                }, q.send(g), [2];
              }
            });
          });
        }, kt = function(e, t, n) {
          var i, r = (0, p.F9)(t.startContainer);
          if (r || (r = e.wysiwyg.element), n && n.inputType !== "formatItalic" && n.inputType !== "deleteByDrag" && n.inputType !== "insertFromDrop" && n.inputType !== "formatBold" && n.inputType !== "formatRemove" && n.inputType !== "formatStrikeThrough" && n.inputType !== "insertUnorderedList" && n.inputType !== "insertOrderedList" && n.inputType !== "formatOutdent" && n.inputType !== "formatIndent" && n.inputType !== "" || !n) {
            var o = function(P) {
              for (var H = P.previousSibling; H; ) {
                if (H.nodeType !== 3 && H.tagName === "A" && !H.previousSibling && H.innerHTML.replace(y.g.ZWSP, "") === "" && H.nextSibling)
                  return H;
                H = H.previousSibling;
              }
              return !1;
            }(t.startContainer);
            o && o.remove(), e.wysiwyg.element.querySelectorAll("wbr").forEach(function(P) {
              P.remove();
            }), t.insertNode(document.createElement("wbr")), r.querySelectorAll("[style]").forEach(function(P) {
              P.removeAttribute("style");
            }), r.querySelectorAll(".vditor-comment").forEach(function(P) {
              P.textContent.trim() === "" && (P.classList.remove("vditor-comment", "vditor-comment--focus"), P.removeAttribute("data-cmtids"));
            }), (i = r.previousElementSibling) === null || i === void 0 || i.querySelectorAll(".vditor-comment").forEach(function(P) {
              P.textContent.trim() === "" && (P.classList.remove("vditor-comment", "vditor-comment--focus"), P.removeAttribute("data-cmtids"));
            });
            var a = "";
            r.getAttribute("data-type") === "link-ref-defs-block" && (r = e.wysiwyg.element);
            var d, v = r.isEqualNode(e.wysiwyg.element), g = (0, p.a1)(r, "data-type", "footnotes-block");
            if (v)
              a = r.innerHTML;
            else {
              var h = (0, p.O9)(t.startContainer);
              if (h && !g) {
                var A = (0, x.S)(t.startContainer, "BLOCKQUOTE");
                r = A ? (0, p.F9)(t.startContainer) || r : h;
              }
              if (g && (r = g), a = r.outerHTML, r.tagName === "UL" || r.tagName === "OL") {
                var O = r.previousElementSibling, U = r.nextElementSibling;
                !O || O.tagName !== "UL" && O.tagName !== "OL" || (a = O.outerHTML + a, O.remove()), !U || U.tagName !== "UL" && U.tagName !== "OL" || (a += U.outerHTML, U.remove()), a = a.replace("<div><wbr><br></div>", "<li><p><wbr><br></p></li>");
              }
              r.innerText.startsWith("```") || (e.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']").forEach(function(P) {
                P && !r.isEqualNode(P) && (a += P.outerHTML, P.remove());
              }), e.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']").forEach(function(P) {
                P && !r.isEqualNode(P) && (a += P.outerHTML, P.remove());
              }));
            }
            if ((a = a.replace(/<\/(strong|b)><strong data-marker="\W{2}">/g, "").replace(/<\/(em|i)><em data-marker="\W{1}">/g, "").replace(/<\/(s|strike)><s data-marker="~{1,2}">/g, "")) === "<p data-block=\"0\">```<wbr></p>" && e.hint.recentLanguage && (a = "<p data-block=\"0\">```<wbr></p>".replace("```", "```" + e.hint.recentLanguage)), I("SpinVditorDOM", a, "argument", e.options.debugger), a = e.lute.SpinVditorDOM(a), I("SpinVditorDOM", a, "result", e.options.debugger), v)
              r.innerHTML = a;
            else if (r.outerHTML = a, g) {
              var C = (0, p.E2)(e.wysiwyg.element.querySelector("wbr"), "LI");
              if (C) {
                var R = e.wysiwyg.element.querySelector("sup[data-type=\"footnotes-ref\"][data-footnotes-label=\"" + C.getAttribute("data-marker") + "\"]");
                R && R.setAttribute("aria-label", C.textContent.trim().substr(0, 24));
              }
            }
            var q, D = e.wysiwyg.element.querySelectorAll("[data-type='link-ref-defs-block']");
            D.forEach(function(P, H) {
              H === 0 ? d = P : (d.insertAdjacentHTML("beforeend", P.innerHTML), P.remove());
            }), D.length > 0 && e.wysiwyg.element.insertAdjacentElement("beforeend", D[0]);
            var B = e.wysiwyg.element.querySelectorAll("[data-type='footnotes-block']");
            B.forEach(function(P, H) {
              H === 0 ? q = P : (q.insertAdjacentHTML("beforeend", P.innerHTML), P.remove());
            }), B.length > 0 && e.wysiwyg.element.insertAdjacentElement("beforeend", B[0]), (0, T.ib)(e.wysiwyg.element, t), e.wysiwyg.element.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach(function(P) {
              Ce(P, e);
            }), n && (n.inputType === "deleteContentBackward" || n.inputType === "deleteContentForward") && e.options.comment.enable && (e.wysiwyg.triggerRemoveComment(e), e.options.comment.adjustTop(e.wysiwyg.getComments(e, !0)));
          }
          Ve(e), we(e, { enableAddUndoStack: !0, enableHint: !0, enableInput: !0 });
        }, er = function(e, t) {
          return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
        }, tr = function(e, t, n, i) {
          return new (n || (n = Promise))(function(r, o) {
            function a(g) {
              try {
                v(i.next(g));
              } catch (h) {
                o(h);
              }
            }
            function d(g) {
              try {
                v(i.throw(g));
              } catch (h) {
                o(h);
              }
            }
            function v(g) {
              var h;
              g.done ? r(g.value) : (h = g.value, h instanceof n ? h : new n(function(A) {
                A(h);
              })).then(a, d);
            }
            v((i = i.apply(e, [])).next());
          });
        }, nr = function(e, t) {
          var n, i, r, o, a = { label: 0, sent: function() {
            if (1 & r[0])
              throw r[1];
            return r[1];
          }, trys: [], ops: [] };
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(v) {
            return function(g) {
              return function(h) {
                if (n)
                  throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (n = 1, i && (r = 2 & h[0] ? i.return : h[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, h[1])).done)
                      return r;
                    switch (i = 0, r && (h = [2 & h[0], r.value]), h[0]) {
                    case 0:
                    case 1:
                      r = h;
                      break;
                    case 4:
                      return a.label++, { value: h[1], done: !1 };
                    case 5:
                      a.label++, i = h[1], h = [0];
                      continue;
                    case 7:
                      h = a.ops.pop(), a.trys.pop();
                      continue;
                    default:
                      if (r = a.trys, !((r = r.length > 0 && r[r.length - 1]) || h[0] !== 6 && h[0] !== 2)) {
                        a = 0;
                        continue;
                      }
                      if (h[0] === 3 && (!r || h[1] > r[0] && h[1] < r[3])) {
                        a.label = h[1];
                        break;
                      }
                      if (h[0] === 6 && a.label < r[1]) {
                        a.label = r[1], r = h;
                        break;
                      }
                      if (r && a.label < r[2]) {
                        a.label = r[2], a.ops.push(h);
                        break;
                      }
                      r[2] && a.ops.pop(), a.trys.pop();
                      continue;
                    }
                    h = t.call(e, a);
                  } catch (A) {
                    h = [6, A], i = 0;
                  } finally {
                    n = r = 0;
                  }
                if (5 & h[0])
                  throw h[1];
                return { value: h[0] ? h[1] : void 0, done: !0 };
              }([v, g]);
            };
          }
        }, mn = function(e, t, n) {
          if (e.keyCode === 229 && e.code === "" && e.key === "Unidentified" && t.currentMode !== "sv") {
            var i = (0, p.F9)(n);
            if (i && i.textContent.trim() === "")
              return t[t.currentMode].composingLock = !0, !1;
          }
          return !0;
        }, fn = function(e, t, n) {
          if (!(n.key === "Enter" || n.key === "Tab" || n.key === "Backspace" || n.key.indexOf("Arrow") > -1 || (0, s.yl)(n) || n.key === "Escape" || n.shiftKey || n.altKey)) {
            var i = (0, p.lG)(e.startContainer, "P") || (0, p.lG)(e.startContainer, "LI");
            if (i && (0, T.im)(i, t[t.currentMode].element, e).start === 0) {
              i.nodeValue && (i.nodeValue = i.nodeValue.replace(/\u2006/g, ""));
              var r = document.createTextNode(y.g.ZWSP);
              e.insertNode(r), e.setStartAfter(r);
            }
          }
        }, hn = function(e, t) {
          if (t === "ArrowDown" || t === "ArrowUp") {
            var n = (0, p.a1)(e.startContainer, "data-type", "math-inline") || (0, p.a1)(e.startContainer, "data-type", "html-entity") || (0, p.a1)(e.startContainer, "data-type", "html-inline");
            n && (t === "ArrowDown" && e.setStartAfter(n.parentElement), t === "ArrowUp" && e.setStartBefore(n.parentElement));
          }
        }, St = function(e, t) {
          var n = (0, T.zh)(e), i = (0, p.F9)(n.startContainer);
          i && (i.insertAdjacentHTML(t, "<p data-block=\"0\">" + y.g.ZWSP + `<wbr>
</p>`), (0, T.ib)(e[e.currentMode].element, n), ot(e), ae(e));
        }, rr = function(e) {
          var t = (0, p.lG)(e, "TABLE");
          return !(!t || !t.rows[0].cells[0].isSameNode(e)) && t;
        }, ir = function(e) {
          var t = (0, p.lG)(e, "TABLE");
          return !(!t || !t.lastElementChild.lastElementChild.lastElementChild.isSameNode(e)) && t;
        }, vn = function(e, t, n) {
          n === void 0 && (n = !0);
          var i = e.previousElementSibling;
          return i || (i = e.parentElement.previousElementSibling ? e.parentElement.previousElementSibling.lastElementChild : e.parentElement.parentElement.tagName === "TBODY" && e.parentElement.parentElement.previousElementSibling ? e.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild : null), i && (t.selectNodeContents(i), n || t.collapse(!1), (0, T.Hc)(t)), i;
        }, ht = function(e, t, n, i, r) {
          var o = (0, T.im)(i, e[e.currentMode].element, n);
          if (t.key === "ArrowDown" && i.textContent.trimRight().substr(o.start).indexOf(`
`) === -1 || t.key === "ArrowRight" && o.start >= i.textContent.trimRight().length) {
            var a = r.nextElementSibling;
            return !a || a && (a.tagName === "TABLE" || a.getAttribute("data-type")) ? (r.insertAdjacentHTML("afterend", "<p data-block=\"0\">" + y.g.ZWSP + "<wbr></p>"), (0, T.ib)(e[e.currentMode].element, n)) : (n.selectNodeContents(a), n.collapse(!0), (0, T.Hc)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, at = function(e, t, n, i, r) {
          var o = (0, T.im)(i, e[e.currentMode].element, n);
          if (t.key === "ArrowUp" && i.textContent.substr(0, o.start).indexOf(`
`) === -1 || (t.key === "ArrowLeft" || t.key === "Backspace" && n.toString() === "") && o.start === 0) {
            var a = r.previousElementSibling;
            return !a || a && (a.tagName === "TABLE" || a.getAttribute("data-type")) ? (r.insertAdjacentHTML("beforebegin", "<p data-block=\"0\">" + y.g.ZWSP + "<wbr></p>"), (0, T.ib)(e[e.currentMode].element, n)) : (n.selectNodeContents(a), n.collapse(!1), (0, T.Hc)(n)), t.preventDefault(), !0;
          }
          return !1;
        }, Lt = function(e, t, n, i) {
          i === void 0 && (i = !0);
          var r = (0, p.lG)(t.startContainer, "LI");
          if (e[e.currentMode].element.querySelectorAll("wbr").forEach(function(h) {
            h.remove();
          }), t.insertNode(document.createElement("wbr")), i && r) {
            for (var o = "", a = 0; a < r.parentElement.childElementCount; a++) {
              var d = r.parentElement.children[a].querySelector("input");
              d && d.remove(), o += "<p data-block=\"0\">" + r.parentElement.children[a].innerHTML.trimLeft() + "</p>";
            }
            r.parentElement.insertAdjacentHTML("beforebegin", o), r.parentElement.remove();
          } else if (r)
            if (n === "check")
              r.parentElement.querySelectorAll("li").forEach(function(h) {
                h.insertAdjacentHTML("afterbegin", "<input type=\"checkbox\" />" + (h.textContent.indexOf(" ") === 0 ? "" : " ")), h.classList.add("vditor-task");
              });
            else {
              r.querySelector("input") && r.parentElement.querySelectorAll("li").forEach(function(h) {
                h.querySelector("input").remove(), h.classList.remove("vditor-task");
              });
              var v = void 0;
              n === "list" ? (v = document.createElement("ul")).setAttribute("data-marker", "*") : (v = document.createElement("ol")).setAttribute("data-marker", "1."), v.setAttribute("data-block", "0"), v.setAttribute("data-tight", r.parentElement.getAttribute("data-tight")), v.innerHTML = r.parentElement.innerHTML, r.parentElement.parentNode.replaceChild(v, r.parentElement);
            }
          else {
            var g = (0, p.a1)(t.startContainer, "data-block", "0");
            g || (e[e.currentMode].element.querySelector("wbr").remove(), (g = e[e.currentMode].element.querySelector("p")).innerHTML = "<wbr>"), n === "check" ? (g.insertAdjacentHTML("beforebegin", "<ul data-block=\"0\"><li class=\"vditor-task\"><input type=\"checkbox\" /> " + g.innerHTML + "</li></ul>"), g.remove()) : n === "list" ? (g.insertAdjacentHTML("beforebegin", "<ul data-block=\"0\"><li>" + g.innerHTML + "</li></ul>"), g.remove()) : n === "ordered-list" && (g.insertAdjacentHTML("beforebegin", "<ol data-block=\"0\"><li>" + g.innerHTML + "</li></ol>"), g.remove());
          }
        }, gn = function(e, t, n) {
          var i = t.previousElementSibling;
          if (t && i) {
            var r = [t];
            Array.from(n.cloneContents().children).forEach(function(v, g) {
              v.nodeType !== 3 && t && v.textContent.trim() !== "" && t.getAttribute("data-node-id") === v.getAttribute("data-node-id") && (g !== 0 && r.push(t), t = t.nextElementSibling);
            }), e[e.currentMode].element.querySelectorAll("wbr").forEach(function(v) {
              v.remove();
            }), n.insertNode(document.createElement("wbr"));
            var o = i.parentElement, a = "";
            r.forEach(function(v) {
              var g = v.getAttribute("data-marker");
              g.length !== 1 && (g = "1" + g.slice(-1)), a += "<li data-node-id=\"" + v.getAttribute("data-node-id") + "\" data-marker=\"" + g + "\">" + v.innerHTML + "</li>", v.remove();
            }), i.insertAdjacentHTML("beforeend", "<" + o.tagName + " data-block=\"0\">" + a + "</" + o.tagName + ">"), e.currentMode === "wysiwyg" ? o.outerHTML = e.lute.SpinVditorDOM(o.outerHTML) : o.outerHTML = e.lute.SpinVditorIRDOM(o.outerHTML), (0, T.ib)(e[e.currentMode].element, n);
            var d = (0, p.O9)(n.startContainer);
            d && d.querySelectorAll(".vditor-" + e.currentMode + "__preview[data-render='2']").forEach(function(v) {
              Ce(v, e), e.currentMode === "wysiwyg" && v.previousElementSibling.setAttribute("style", "display:none");
            }), ae(e), ot(e);
          } else
            e[e.currentMode].element.focus();
        }, Wt = function(e, t, n, i) {
          var r = (0, p.lG)(t.parentElement, "LI");
          if (r) {
            e[e.currentMode].element.querySelectorAll("wbr").forEach(function(A) {
              A.remove();
            }), n.insertNode(document.createElement("wbr"));
            var o = t.parentElement, a = o.cloneNode(), d = [t];
            Array.from(n.cloneContents().children).forEach(function(A, O) {
              A.nodeType !== 3 && t && A.textContent.trim() !== "" && t.getAttribute("data-node-id") === A.getAttribute("data-node-id") && (O !== 0 && d.push(t), t = t.nextElementSibling);
            });
            var v = !1, g = "";
            o.querySelectorAll("li").forEach(function(A) {
              v && (g += A.outerHTML, A.nextElementSibling || A.previousElementSibling ? A.remove() : A.parentElement.remove()), A.isSameNode(d[d.length - 1]) && (v = !0);
            }), d.reverse().forEach(function(A) {
              r.insertAdjacentElement("afterend", A);
            }), g && (a.innerHTML = g, d[0].insertAdjacentElement("beforeend", a)), e.currentMode === "wysiwyg" ? i.outerHTML = e.lute.SpinVditorDOM(i.outerHTML) : i.outerHTML = e.lute.SpinVditorIRDOM(i.outerHTML), (0, T.ib)(e[e.currentMode].element, n);
            var h = (0, p.O9)(n.startContainer);
            h && h.querySelectorAll(".vditor-" + e.currentMode + "__preview[data-render='2']").forEach(function(A) {
              Ce(A, e), e.currentMode === "wysiwyg" && A.previousElementSibling.setAttribute("style", "display:none");
            }), ae(e), ot(e);
          } else
            e[e.currentMode].element.focus();
        }, _t = function(e, t) {
          for (var n = getSelection().getRangeAt(0).startContainer.parentElement, i = e.rows[0].cells.length, r = e.rows.length, o = 0, a = 0; a < r; a++)
            for (var d = 0; d < i; d++)
              if (e.rows[a].cells[d].isSameNode(n)) {
                o = d;
                break;
              }
          for (var v = 0; v < r; v++)
            e.rows[v].cells[o].setAttribute("align", t);
        }, zt = function(e) {
          var t = e.trimRight().split(`
`).pop();
          return t !== "" && (t.replace(/ |-/g, "") === "" || t.replace(/ |_/g, "") === "" || t.replace(/ |\*/g, "") === "") && t.replace(/ /g, "").length > 2 && !(t.indexOf("-") > -1 && t.trimLeft().indexOf(" ") === -1 && e.trimRight().split(`
`).length > 1) && t.indexOf("    ") !== 0 && t.indexOf("	") !== 0;
        }, Kt = function(e) {
          var t = e.trimRight().split(`
`);
          return (e = t.pop()).indexOf("    ") !== 0 && e.indexOf("	") !== 0 && (e = e.trimLeft()) !== "" && t.length !== 0 && (e.replace(/-/g, "") === "" || e.replace(/=/g, "") === "");
        }, ae = function(e, t) {
          t === void 0 && (t = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }), e.currentMode === "wysiwyg" ? we(e, t) : e.currentMode === "ir" ? Fe(e, t) : e.currentMode === "sv" && He(e, t);
        }, yn = function(e, t, n, i) {
          var r, o = e.startContainer, a = (0, p.lG)(o, "LI");
          if (a) {
            if (!(0, s.yl)(i) && !i.altKey && i.key === "Enter" && !i.shiftKey && n && a.contains(n) && n.nextElementSibling)
              return a && !a.textContent.endsWith(`
`) && a.insertAdjacentText("beforeend", `
`), e.insertNode(document.createTextNode(`

`)), e.collapse(!1), ae(t), i.preventDefault(), !0;
            if (!((0, s.yl)(i) || i.shiftKey || i.altKey || i.key !== "Backspace" || a.previousElementSibling || e.toString() !== "" || (0, T.im)(a, t[t.currentMode].element, e).start !== 0))
              return a.nextElementSibling ? (a.parentElement.insertAdjacentHTML("beforebegin", "<p data-block=\"0\"><wbr>" + a.innerHTML + "</p>"), a.remove()) : a.parentElement.outerHTML = "<p data-block=\"0\"><wbr>" + a.innerHTML + "</p>", (0, T.ib)(t[t.currentMode].element, e), ae(t), i.preventDefault(), !0;
            if (!(0, s.yl)(i) && !i.shiftKey && !i.altKey && i.key === "Backspace" && a.textContent.trim().replace(y.g.ZWSP, "") === "" && e.toString() === "" && ((r = a.previousElementSibling) === null || r === void 0 ? void 0 : r.tagName) === "LI")
              return a.previousElementSibling.insertAdjacentText("beforeend", `

`), e.selectNodeContents(a.previousElementSibling), e.collapse(!1), a.remove(), (0, T.ib)(t[t.currentMode].element, e), ae(t), i.preventDefault(), !0;
            if (!(0, s.yl)(i) && !i.altKey && i.key === "Tab") {
              var d = !1;
              if ((e.startOffset === 0 && (o.nodeType === 3 && !o.previousSibling || o.nodeType !== 3 && o.nodeName === "LI") || a.classList.contains("vditor-task") && e.startOffset === 1 && o.previousSibling.nodeType !== 3 && o.previousSibling.tagName === "INPUT") && (d = !0), d || e.toString() !== "")
                return i.shiftKey ? Wt(t, a, e, a.parentElement) : gn(t, a, e), i.preventDefault(), !0;
            }
          }
          return !1;
        }, Ft = function(e, t, n) {
          if (e.options.tab && n.key === "Tab")
            return n.shiftKey || (t.toString() === "" ? (t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1)) : (t.extractContents(), t.insertNode(document.createTextNode(e.options.tab)), t.collapse(!1))), (0, T.Hc)(t), ae(e), n.preventDefault(), !0;
        }, bn = function(e, t, n, i) {
          if (n) {
            if (!(0, s.yl)(e) && !e.altKey && e.key === "Enter") {
              var r = String.raw(en || (en = er(["", ""], ["", ""])), n.textContent).replace(/\\\|/g, "").trim(), o = r.split("|");
              if (r.startsWith("|") && r.endsWith("|") && o.length > 3) {
                var a = o.map(function() {
                  return "---";
                }).join("|");
                return a = n.textContent + `
` + a.substring(3, a.length - 3) + `
|<wbr>`, n.outerHTML = t.lute.SpinVditorDOM(a), (0, T.ib)(t[t.currentMode].element, i), ae(t), Te(t), e.preventDefault(), !0;
              }
              if (zt(n.innerHTML) && n.previousElementSibling) {
                var d = "", v = n.innerHTML.trimRight().split(`
`);
                return v.length > 1 && (v.pop(), d = "<p data-block=\"0\">" + v.join(`
`) + "</p>"), n.insertAdjacentHTML("afterend", d + `<hr data-block="0"><p data-block="0"><wbr>
</p>`), n.remove(), (0, T.ib)(t[t.currentMode].element, i), ae(t), Te(t), e.preventDefault(), !0;
              }
              if (Kt(n.innerHTML))
                return t.currentMode === "wysiwyg" ? n.outerHTML = t.lute.SpinVditorDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`) : n.outerHTML = t.lute.SpinVditorIRDOM(n.innerHTML + `<p data-block="0"><wbr>
</p>`), (0, T.ib)(t[t.currentMode].element, i), ae(t), Te(t), e.preventDefault(), !0;
            }
            if (i.collapsed && n.previousElementSibling && e.key === "Backspace" && !(0, s.yl)(e) && !e.altKey && !e.shiftKey && n.textContent.trimRight().split(`
`).length > 1 && (0, T.im)(n, t[t.currentMode].element, i).start === 0) {
              var g = (0, p.DX)(n.previousElementSibling);
              return g.textContent.endsWith(`
`) || (g.textContent = g.textContent + `
`), g.parentElement.insertAdjacentHTML("beforeend", "<wbr>" + n.innerHTML), n.remove(), (0, T.ib)(t[t.currentMode].element, i), !1;
            }
            return !1;
          }
        }, wn = function(e, t, n) {
          for (var i = "", r = 0; r < n.parentElement.childElementCount; r++)
            i += "<td align=\"" + n.parentElement.children[r].getAttribute("align") + "\"> </td>";
          n.tagName === "TH" ? n.parentElement.parentElement.insertAdjacentHTML("afterend", "<tbody><tr>" + i + "</tr></tbody>") : n.parentElement.insertAdjacentHTML("afterend", "<tr>" + i + "</tr>"), ae(e);
        }, En = function(e, t, n) {
          for (var i = "", r = 0; r < n.parentElement.childElementCount; r++)
            n.tagName === "TH" ? i += "<th align=\"" + n.parentElement.children[r].getAttribute("align") + "\"> </th>" : i += "<td align=\"" + n.parentElement.children[r].getAttribute("align") + "\"> </td>";
          if (n.tagName === "TH") {
            n.parentElement.parentElement.insertAdjacentHTML("beforebegin", "<thead><tr>" + i + "</tr></thead>"), t.insertNode(document.createElement("wbr"));
            var o = n.parentElement.innerHTML.replace(/<th>/g, "<td>").replace(/<\/th>/g, "</td>");
            n.parentElement.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", o), n.parentElement.parentElement.remove(), (0, T.ib)(e.ir.element, t);
          } else
            n.parentElement.insertAdjacentHTML("beforebegin", "<tr>" + i + "</tr>");
          ae(e);
        }, Ct = function(e, t, n, i) {
          i === void 0 && (i = "afterend");
          for (var r = 0, o = n.previousElementSibling; o; )
            r++, o = o.previousElementSibling;
          for (var a = 0; a < t.rows.length; a++)
            a === 0 ? t.rows[a].cells[r].insertAdjacentHTML(i, "<th> </th>") : t.rows[a].cells[r].insertAdjacentHTML(i, "<td> </td>");
          ae(e);
        }, kn = function(e, t, n) {
          if (n.tagName === "TD") {
            var i = n.parentElement.parentElement;
            n.parentElement.previousElementSibling ? t.selectNodeContents(n.parentElement.previousElementSibling.lastElementChild) : t.selectNodeContents(i.previousElementSibling.lastElementChild.lastElementChild), i.childElementCount === 1 ? i.remove() : n.parentElement.remove(), t.collapse(!1), (0, T.Hc)(t), ae(e);
          }
        }, Sn = function(e, t, n, i) {
          for (var r = 0, o = i.previousElementSibling; o; )
            r++, o = o.previousElementSibling;
          (i.previousElementSibling || i.nextElementSibling) && (t.selectNodeContents(i.previousElementSibling || i.nextElementSibling), t.collapse(!0));
          for (var a = 0; a < n.rows.length; a++) {
            var d = n.rows[a].cells;
            if (d.length === 1) {
              n.remove(), ot(e);
              break;
            }
            d[r].remove();
          }
          (0, T.Hc)(t), ae(e);
        }, Ln = function(e, t, n) {
          var i = n.startContainer, r = (0, p.lG)(i, "TD") || (0, p.lG)(i, "TH");
          if (r) {
            if (!(0, s.yl)(t) && !t.altKey && t.key === "Enter") {
              r.lastElementChild && (!r.lastElementChild || r.lastElementChild.isSameNode(r.lastChild) && r.lastElementChild.tagName === "BR") || r.insertAdjacentHTML("beforeend", "<br>");
              var o = document.createElement("br");
              return n.insertNode(o), n.setStartAfter(o), ae(e), Te(e), t.preventDefault(), !0;
            }
            if (t.key === "Tab")
              return t.shiftKey ? (vn(r, n), t.preventDefault(), !0) : ((h = r.nextElementSibling) || (h = r.parentElement.nextElementSibling ? r.parentElement.nextElementSibling.firstElementChild : r.parentElement.parentElement.tagName === "THEAD" && r.parentElement.parentElement.nextElementSibling ? r.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild : null), h && (n.selectNodeContents(h), (0, T.Hc)(n)), t.preventDefault(), !0);
            var a = r.parentElement.parentElement.parentElement;
            if (t.key === "ArrowUp") {
              if (t.preventDefault(), r.tagName === "TH")
                return a.previousElementSibling ? (n.selectNodeContents(a.previousElementSibling), n.collapse(!1), (0, T.Hc)(n)) : St(e, "beforebegin"), !0;
              for (var d = 0, v = r.parentElement; d < v.cells.length && !v.cells[d].isSameNode(r); d++)
                ;
              var g = v.previousElementSibling;
              return g || (g = v.parentElement.previousElementSibling.firstChild), n.selectNodeContents(g.cells[d]), n.collapse(!1), (0, T.Hc)(n), !0;
            }
            if (t.key === "ArrowDown") {
              var h;
              if (t.preventDefault(), !(v = r.parentElement).nextElementSibling && r.tagName === "TD")
                return a.nextElementSibling ? (n.selectNodeContents(a.nextElementSibling), n.collapse(!0), (0, T.Hc)(n)) : St(e, "afterend"), !0;
              for (d = 0; d < v.cells.length && !v.cells[d].isSameNode(r); d++)
                ;
              return (h = v.nextElementSibling) || (h = v.parentElement.nextElementSibling.firstChild), n.selectNodeContents(h.cells[d]), n.collapse(!0), (0, T.Hc)(n), !0;
            }
            if (e.currentMode === "wysiwyg" && !(0, s.yl)(t) && t.key === "Enter" && !t.shiftKey && t.altKey) {
              var A = e.wysiwyg.popover.querySelector(".vditor-input");
              return A.focus(), A.select(), t.preventDefault(), !0;
            }
            if (!(0, s.yl)(t) && !t.shiftKey && !t.altKey && t.key === "Backspace" && n.startOffset === 0 && n.toString() === "")
              return !vn(r, n, !1) && a && (a.textContent.trim() === "" ? (a.outerHTML = `<p data-block="0"><wbr>
</p>`, (0, T.ib)(e[e.currentMode].element, n)) : (n.setStartBefore(a), n.collapse(!0)), ae(e)), t.preventDefault(), !0;
            if (V("⇧⌘F", t))
              return En(e, n, r), t.preventDefault(), !0;
            if (V("⌘=", t))
              return wn(e, n, r), t.preventDefault(), !0;
            if (V("⇧⌘G", t))
              return Ct(e, a, r, "beforebegin"), t.preventDefault(), !0;
            if (V("⇧⌘=", t))
              return Ct(e, a, r), t.preventDefault(), !0;
            if (V("⌘-", t))
              return kn(e, n, r), t.preventDefault(), !0;
            if (V("⇧⌘-", t))
              return Sn(e, n, a, r), t.preventDefault(), !0;
            if (V("⇧⌘L", t)) {
              if (e.currentMode === "ir")
                return _t(a, "left"), ae(e), t.preventDefault(), !0;
              if (O = e.wysiwyg.popover.querySelector("[data-type=\"left\"]"))
                return O.click(), t.preventDefault(), !0;
            }
            if (V("⇧⌘C", t)) {
              if (e.currentMode === "ir")
                return _t(a, "center"), ae(e), t.preventDefault(), !0;
              if (O = e.wysiwyg.popover.querySelector("[data-type=\"center\"]"))
                return O.click(), t.preventDefault(), !0;
            }
            if (V("⇧⌘R", t)) {
              if (e.currentMode === "ir")
                return _t(a, "right"), ae(e), t.preventDefault(), !0;
              var O;
              if (O = e.wysiwyg.popover.querySelector("[data-type=\"right\"]"))
                return O.click(), t.preventDefault(), !0;
            }
          }
          return !1;
        }, _n = function(e, t, n, i) {
          if (n.tagName === "PRE" && V("⌘A", t))
            return i.selectNodeContents(n.firstElementChild), t.preventDefault(), !0;
          if (e.options.tab && t.key === "Tab" && !t.shiftKey && i.toString() === "")
            return i.insertNode(document.createTextNode(e.options.tab)), i.collapse(!1), ae(e), t.preventDefault(), !0;
          if (t.key === "Backspace" && !(0, s.yl)(t) && !t.shiftKey && !t.altKey) {
            var r = (0, T.im)(n, e[e.currentMode].element, i);
            if ((r.start === 0 || r.start === 1 && n.innerText === `
`) && i.toString() === "")
              return n.parentElement.outerHTML = "<p data-block=\"0\"><wbr>" + n.firstElementChild.innerHTML + "</p>", (0, T.ib)(e[e.currentMode].element, i), ae(e), t.preventDefault(), !0;
          }
          return !(0, s.yl)(t) && !t.altKey && t.key === "Enter" && (n.firstElementChild.textContent.endsWith(`
`) || n.firstElementChild.insertAdjacentText("beforeend", `
`), i.extractContents(), i.insertNode(document.createTextNode(`
`)), i.collapse(!1), (0, T.Hc)(i), (0, s.vU)() || (e.currentMode === "wysiwyg" ? kt(e, i) : ge(e, i)), Te(e), t.preventDefault(), !0);
        }, Cn = function(e, t, n, i) {
          var r = t.startContainer, o = (0, p.lG)(r, "BLOCKQUOTE");
          if (o && t.toString() === "") {
            if (n.key === "Backspace" && !(0, s.yl)(n) && !n.shiftKey && !n.altKey && (0, T.im)(o, e[e.currentMode].element, t).start === 0)
              return t.insertNode(document.createElement("wbr")), o.outerHTML = o.innerHTML, (0, T.ib)(e[e.currentMode].element, t), ae(e), n.preventDefault(), !0;
            if (i && n.key === "Enter" && !(0, s.yl)(n) && !n.shiftKey && !n.altKey && i.parentElement.tagName === "BLOCKQUOTE") {
              var a = !1;
              if (i.innerHTML.replace(y.g.ZWSP, "") === `
` || i.innerHTML.replace(y.g.ZWSP, "") === "" ? (a = !0, i.remove()) : i.innerHTML.endsWith(`

`) && (0, T.im)(i, e[e.currentMode].element, t).start === i.textContent.length - 1 && (i.innerHTML = i.innerHTML.substr(0, i.innerHTML.length - 2), a = !0), a)
                return o.insertAdjacentHTML("afterend", "<p data-block=\"0\">" + y.g.ZWSP + `<wbr>
</p>`), (0, T.ib)(e[e.currentMode].element, t), ae(e), n.preventDefault(), !0;
            }
            var d = (0, p.F9)(r);
            if (e.currentMode === "wysiwyg" && d && V("⇧⌘;", n))
              return t.insertNode(document.createElement("wbr")), d.outerHTML = "<blockquote data-block=\"0\">" + d.outerHTML + "</blockquote>", (0, T.ib)(e.wysiwyg.element, t), we(e), n.preventDefault(), !0;
            if (ht(e, n, t, o, o) || at(e, n, t, o, o))
              return !0;
          }
          return !1;
        }, Mn = function(e, t, n) {
          var i = t.startContainer, r = (0, p.fb)(i, "vditor-task");
          if (r) {
            if (V("⇧⌘J", n)) {
              var o = r.firstElementChild;
              return o.checked ? o.removeAttribute("checked") : o.setAttribute("checked", "checked"), ae(e), n.preventDefault(), !0;
            }
            if (n.key === "Backspace" && !(0, s.yl)(n) && !n.shiftKey && !n.altKey && t.toString() === "" && t.startOffset === 1 && (i.nodeType === 3 && i.previousSibling && i.previousSibling.tagName === "INPUT" || i.nodeType !== 3)) {
              var a = r.previousElementSibling;
              return r.querySelector("input").remove(), a ? ((0, p.DX)(a).parentElement.insertAdjacentHTML("beforeend", "<wbr>" + r.innerHTML.trim()), r.remove()) : (r.parentElement.insertAdjacentHTML("beforebegin", "<p data-block=\"0\"><wbr>" + (r.innerHTML.trim() || `
`) + "</p>"), r.nextElementSibling ? r.remove() : r.parentElement.remove()), (0, T.ib)(e[e.currentMode].element, t), ae(e), n.preventDefault(), !0;
            }
            if (n.key === "Enter" && !(0, s.yl)(n) && !n.shiftKey && !n.altKey) {
              if (r.textContent.trim() === "")
                if ((0, p.fb)(r.parentElement, "vditor-task")) {
                  var d = (0, p.O9)(i);
                  d && Wt(e, r, t, d);
                } else if (r.nextElementSibling) {
                  var v = "", g = "", h = !1;
                  Array.from(r.parentElement.children).forEach(function(C) {
                    r.isSameNode(C) ? h = !0 : h ? v += C.outerHTML : g += C.outerHTML;
                  });
                  var A = r.parentElement.tagName, O = r.parentElement.tagName === "OL" ? "" : " data-marker=\"" + r.parentElement.getAttribute("data-marker") + "\"", U = "";
                  g && (U = r.parentElement.tagName === "UL" ? "" : " start=\"1\"", g = "<" + A + " data-tight=\"true\"" + O + " data-block=\"0\">" + g + "</" + A + ">"), r.parentElement.outerHTML = g + `<p data-block="0"><wbr>
</p><` + A + `
 data-tight="true"` + O + " data-block=\"0\"" + U + ">" + v + "</" + A + ">";
                } else
                  r.parentElement.insertAdjacentHTML("afterend", `<p data-block="0"><wbr>
</p>`), r.parentElement.querySelectorAll("li").length === 1 ? r.parentElement.remove() : r.remove();
              else
                i.nodeType !== 3 && t.startOffset === 0 && i.firstChild.tagName === "INPUT" ? t.setStart(i.childNodes[1], 1) : (t.setEndAfter(r.lastChild), r.insertAdjacentHTML("afterend", "<li class=\"vditor-task\" data-marker=\"" + r.getAttribute("data-marker") + "\"><input type=\"checkbox\"> <wbr></li>"), document.querySelector("wbr").after(t.extractContents()));
              return (0, T.ib)(e[e.currentMode].element, t), ae(e), Te(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, Tn = function(e, t, n, i) {
          if (t.startContainer.nodeType !== 3) {
            var r = t.startContainer.children[t.startOffset];
            if (r && r.tagName === "HR")
              return t.selectNodeContents(r.previousElementSibling), t.collapse(!1), n.preventDefault(), !0;
          }
          if (i) {
            var o = i.previousElementSibling;
            if (o && (0, T.im)(i, e[e.currentMode].element, t).start === 0 && ((0, s.vU)() && o.tagName === "HR" || o.tagName === "TABLE")) {
              if (o.tagName === "TABLE") {
                var a = o.lastElementChild.lastElementChild.lastElementChild;
                a.innerHTML = a.innerHTML.trimLeft() + "<wbr>" + i.textContent.trim(), i.remove();
              } else
                o.remove();
              return (0, T.ib)(e[e.currentMode].element, t), ae(e), n.preventDefault(), !0;
            }
          }
          return !1;
        }, An = function(e) {
          (0, s.vU)() && e.startContainer.nodeType !== 3 && e.startContainer.tagName === "HR" && e.setStartBefore(e.startContainer);
        }, xn = function(e, t, n) {
          var i, r;
          if (!(0, s.vU)())
            return !1;
          if (e.key === "ArrowUp" && t && ((i = t.previousElementSibling) === null || i === void 0 ? void 0 : i.tagName) === "TABLE") {
            var o = t.previousElementSibling;
            return n.selectNodeContents(o.rows[o.rows.length - 1].lastElementChild), n.collapse(!1), e.preventDefault(), !0;
          }
          return !(e.key !== "ArrowDown" || !t || ((r = t.nextElementSibling) === null || r === void 0 ? void 0 : r.tagName) !== "TABLE") && (n.selectNodeContents(t.nextElementSibling.rows[0].cells[0]), n.collapse(!0), e.preventDefault(), !0);
        }, Mt = function(e, t, n) {
          return tr(void 0, void 0, void 0, function() {
            var i, r, o, a, d, v, g, h, A, O, U, C, R, q, D, B;
            return nr(this, function(P) {
              switch (P.label) {
              case 0:
                return e[e.currentMode].element.getAttribute("contenteditable") !== "true" ? [2] : (t.stopPropagation(), t.preventDefault(), "clipboardData" in t ? (i = t.clipboardData.getData("text/html"), r = t.clipboardData.getData("text/plain"), o = t.clipboardData.files) : (i = t.dataTransfer.getData("text/html"), r = t.dataTransfer.getData("text/plain"), t.dataTransfer.types.includes("Files") && (o = t.dataTransfer.items)), a = {}, d = function(H, G) {
                  if (!G)
                    return ["", Lute.WalkContinue];
                  var te = H.TokensStr();
                  if (H.__internal_object__.Parent.Type === 34 && te && te.indexOf("file://") === -1 && e.options.upload.linkToImgUrl) {
                    var X = new XMLHttpRequest();
                    X.open("POST", e.options.upload.linkToImgUrl), e.options.upload.token && X.setRequestHeader("X-Upload-Token", e.options.upload.token), e.options.upload.withCredentials && (X.withCredentials = !0), pn(e, X), X.setRequestHeader("Content-Type", "application/json; charset=utf-8"), X.onreadystatechange = function() {
                      if (X.readyState === XMLHttpRequest.DONE) {
                        if (X.status === 200) {
                          var ee = X.responseText;
                          e.options.upload.linkToImgFormat && (ee = e.options.upload.linkToImgFormat(X.responseText));
                          var Y = JSON.parse(ee);
                          if (Y.code !== 0)
                            return void e.tip.show(Y.msg);
                          var F = Y.data.originalURL;
                          if (e.currentMode === "sv")
                            e.sv.element.querySelectorAll(".vditor-sv__marker--link").forEach(function(ye) {
                              ye.textContent === F && (ye.textContent = Y.data.url);
                            });
                          else {
                            var re = e[e.currentMode].element.querySelector("img[src=\"" + F + "\"]");
                            re.src = Y.data.url, e.currentMode === "ir" && (re.previousElementSibling.previousElementSibling.innerHTML = Y.data.url);
                          }
                          ae(e);
                        } else
                          e.tip.show(X.responseText);
                        e.options.upload.linkToImgCallback && e.options.upload.linkToImgCallback(X.responseText);
                      }
                    }, X.send(JSON.stringify({ url: te }));
                  }
                  return e.currentMode === "ir" ? ["<span class=\"vditor-ir__marker vditor-ir__marker--link\">" + Lute.EscapeHTMLStr(te) + "</span>", Lute.WalkContinue] : e.currentMode === "wysiwyg" ? ["", Lute.WalkContinue] : ["<span class=\"vditor-sv__marker--link\">" + Lute.EscapeHTMLStr(te) + "</span>", Lute.WalkContinue];
                }, i.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/gi, "").trim() !== "<a href=\"" + r + "\">" + r + "</a>" && i.replace(/&amp;/g, "&").replace(/<(|\/)(html|body|meta)[^>]*?>/gi, "").trim() !== "<!--StartFragment--><a href=\"" + r + "\">" + r + "</a><!--EndFragment-->" || (i = ""), (v = new DOMParser().parseFromString(i, "text/html")).body && (i = v.body.innerHTML), i = Lute.Sanitize(i), e.wysiwyg.getComments(e), g = e[e.currentMode].element.scrollHeight, h = function(H, G, te) {
                  te === void 0 && (te = "sv");
                  var X = document.createElement("div");
                  X.innerHTML = H;
                  var ee = !1;
                  X.childElementCount === 1 && X.lastElementChild.style.fontFamily.indexOf("monospace") > -1 && (ee = !0);
                  var Y = X.querySelectorAll("pre");
                  if (X.childElementCount === 1 && Y.length === 1 && Y[0].className !== "vditor-wysiwyg" && Y[0].className !== "vditor-sv" && (ee = !0), H.indexOf(`
<p class="p1">`) === 0 && (ee = !0), X.childElementCount === 1 && X.firstElementChild.tagName === "TABLE" && X.querySelector(".line-number") && X.querySelector(".line-content") && (ee = !0), ee) {
                    var F = G || H;
                    return /\n/.test(F) || Y.length === 1 ? te === "wysiwyg" ? "<div class=\"vditor-wysiwyg__block\" data-block=\"0\" data-type=\"code-block\"><pre><code>" + F.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "<wbr></code></pre></div>" : "\n```\n" + F.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n```" : te === "wysiwyg" ? "<code>" + F.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</code><wbr>" : "`" + F + "`";
                  }
                  return !1;
                }(i, r, e.currentMode), (A = e.currentMode === "sv" ? (0, p.a1)(t.target, "data-type", "code-block") : (0, p.lG)(t.target, "CODE")) ? (e.currentMode === "sv" ? document.execCommand("insertHTML", !1, r.replace(/&/g, "&amp;").replace(/</g, "&lt;")) : (O = (0, T.im)(t.target, e[e.currentMode].element), A.parentElement.tagName !== "PRE" && (r += y.g.ZWSP), A.textContent = A.textContent.substring(0, O.start) + r + A.textContent.substring(O.end), (0, T.$j)(O.start + r.length, O.start + r.length, A.parentElement), !((B = A.parentElement) === null || B === void 0) && B.nextElementSibling.classList.contains("vditor-" + e.currentMode + "__preview") && (A.parentElement.nextElementSibling.innerHTML = A.outerHTML, Ce(A.parentElement.nextElementSibling, e))), [3, 8]) : [3, 1]);
              case 1:
                return h ? (n.pasteCode(h), [3, 8]) : [3, 2];
              case 2:
                return i.trim() === "" ? [3, 3] : ((U = document.createElement("div")).innerHTML = i, U.querySelectorAll("[style]").forEach(function(H) {
                  H.removeAttribute("style");
                }), U.querySelectorAll(".vditor-copy").forEach(function(H) {
                  H.remove();
                }), e.currentMode === "ir" ? (a.HTML2VditorIRDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: a }), (0, T.oC)(e.lute.HTML2VditorIRDOM(U.innerHTML), e)) : e.currentMode === "wysiwyg" ? (a.HTML2VditorDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: a }), (0, T.oC)(e.lute.HTML2VditorDOM(U.innerHTML), e)) : (a.Md2VditorSVDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: a }), ln(e, e.lute.HTML2Md(U.innerHTML).trimRight())), e.outline.render(e), [3, 8]);
              case 3:
                return o.length > 0 ? e.options.upload.url || e.options.upload.handler ? [4, Ut(e, o)] : [3, 5] : [3, 7];
              case 4:
                return P.sent(), [3, 6];
              case 5:
                C = new FileReader(), "clipboardData" in t ? (o = t.clipboardData.files, R = o[0]) : t.dataTransfer.types.includes("Files") && (o = t.dataTransfer.items, R = o[0].getAsFile()), R && R.type.startsWith("image") && (C.readAsDataURL(R), C.onload = function() {
                  var H = "";
                  e.currentMode === "wysiwyg" ? H += "<img alt=\"" + R.name + "\" src=\"" + C.result.toString() + `">
` : H += "![" + R.name + "](" + C.result.toString() + `)
`, document.execCommand("insertHTML", !1, H);
                }), P.label = 6;
              case 6:
                return [3, 8];
              case 7:
                r.trim() !== "" && o.length === 0 && ((D = (0, T.zh)(e)).toString() !== "" && e.lute.IsValidLinkDest(r) && (r = "[" + D.toString() + "](" + r + ")"), e.currentMode === "ir" ? (a.Md2VditorIRDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: a }), (0, T.oC)(e.lute.Md2VditorIRDOM(r), e)) : e.currentMode === "wysiwyg" ? (a.Md2VditorDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: a }), (0, T.oC)(e.lute.Md2VditorDOM(r), e)) : (a.Md2VditorSVDOM = { renderLinkDest: d }, e.lute.SetJSRenderers({ renderers: a }), ln(e, r)), e.outline.render(e)), P.label = 8;
              case 8:
                return e.currentMode !== "sv" && ((q = (0, p.F9)((0, T.zh)(e).startContainer)) && (D = (0, T.zh)(e), e[e.currentMode].element.querySelectorAll("wbr").forEach(function(H) {
                  H.remove();
                }), D.insertNode(document.createElement("wbr")), e.currentMode === "wysiwyg" ? q.outerHTML = e.lute.SpinVditorDOM(q.outerHTML) : q.outerHTML = e.lute.SpinVditorIRDOM(q.outerHTML), (0, T.ib)(e[e.currentMode].element, D)), e[e.currentMode].element.querySelectorAll(".vditor-" + e.currentMode + "__preview[data-render='2']").forEach(function(H) {
                  Ce(H, e);
                })), e.wysiwyg.triggerRemoveComment(e), ae(e), e[e.currentMode].element.scrollHeight - g > Math.min(e[e.currentMode].element.clientHeight, window.innerHeight) / 2 && Te(e), [2];
              }
            });
          });
        }, Hn = function(e) {
          e.hint.render(e);
          var t = (0, T.zh)(e).startContainer, n = (0, p.a1)(t, "data-type", "code-block-info");
          if (n)
            if (n.textContent.replace(y.g.ZWSP, "") === "" && e.hint.recentLanguage)
              n.textContent = y.g.ZWSP + e.hint.recentLanguage, (0, T.zh)(e).selectNodeContents(n);
            else {
              var i = [], r = n.textContent.substring(0, (0, T.im)(n, e.ir.element).start).replace(y.g.ZWSP, "");
              (e.options.preview.hljs.langs || y.g.CODE_LANGUAGES).forEach(function(o) {
                o.indexOf(r.toLowerCase()) > -1 && i.push({ html: o, value: o });
              }), e.hint.genHTML(i, r, e);
            }
        }, Fe = function(e, t) {
          t === void 0 && (t = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }), t.enableHint && Hn(e), clearTimeout(e.ir.processTimeoutId), e.ir.processTimeoutId = window.setTimeout(function() {
            if (!e.ir.composingLock) {
              var n = m(e);
              typeof e.options.input == "function" && t.enableInput && e.options.input(n), e.options.counter.enable && e.counter.render(e, n), e.options.cache.enable && (0, s.pK)() && (localStorage.setItem(e.options.cache.id, n), e.options.cache.after && e.options.cache.after(n)), e.devtools && e.devtools.renderEchart(e), t.enableAddUndoStack && e.undo.addToUndoStack(e);
            }
          }, e.options.undoDelay);
        }, vt = function(e, t) {
          var n = (0, T.zh)(e), i = (0, p.F9)(n.startContainer) || n.startContainer;
          if (i) {
            var r = i.querySelector(".vditor-ir__marker--heading");
            r ? r.innerHTML = t : (i.insertAdjacentText("afterbegin", t), n.selectNodeContents(i), n.collapse(!1)), ge(e, n.cloneRange()), ut(e);
          }
        }, Tt = function(e, t, n) {
          var i = (0, p.a1)(e.startContainer, "data-type", n);
          if (i) {
            i.firstElementChild.remove(), i.lastElementChild.remove(), e.insertNode(document.createElement("wbr"));
            var r = document.createElement("div");
            r.innerHTML = t.lute.SpinVditorIRDOM(i.outerHTML), i.outerHTML = r.firstElementChild.innerHTML.trim();
          }
        }, or = function(e, t, n, i) {
          var r = (0, T.zh)(e), o = t.getAttribute("data-type"), a = r.startContainer;
          a.nodeType === 3 && (a = a.parentElement);
          var d = !0;
          if (t.classList.contains("vditor-menu--current"))
            if (o === "quote") {
              var v = (0, p.lG)(a, "BLOCKQUOTE");
              v && (r.insertNode(document.createElement("wbr")), v.outerHTML = v.innerHTML.trim() === "" ? "<p data-block=\"0\">" + v.innerHTML + "</p>" : v.innerHTML);
            } else if (o === "link") {
              var g = (0, p.a1)(r.startContainer, "data-type", "a");
              if (g) {
                var h = (0, p.fb)(r.startContainer, "vditor-ir__link");
                h ? (r.insertNode(document.createElement("wbr")), g.outerHTML = h.innerHTML) : g.outerHTML = g.querySelector(".vditor-ir__link").innerHTML + "<wbr>";
              }
            } else
              o === "italic" ? Tt(r, e, "em") : o === "bold" ? Tt(r, e, "strong") : o === "strike" ? Tt(r, e, "s") : o === "inline-code" ? Tt(r, e, "code") : o !== "check" && o !== "list" && o !== "ordered-list" || (Lt(e, r, o), d = !1, t.classList.remove("vditor-menu--current"));
          else {
            e.ir.element.childNodes.length === 0 && (e.ir.element.innerHTML = "<p data-block=\"0\"><wbr></p>", (0, T.ib)(e.ir.element, r));
            var A = (0, p.F9)(r.startContainer);
            if (o === "line") {
              if (A) {
                var O = `<hr data-block="0"><p data-block="0"><wbr>
</p>`;
                A.innerHTML.trim() === "" ? A.outerHTML = O : A.insertAdjacentHTML("afterend", O);
              }
            } else if (o === "quote")
              A && (r.insertNode(document.createElement("wbr")), A.outerHTML = "<blockquote data-block=\"0\">" + A.outerHTML + "</blockquote>", d = !1, t.classList.add("vditor-menu--current"));
            else if (o === "link") {
              var U = void 0;
              U = r.toString() === "" ? n + "<wbr>" + i : "" + n + r.toString() + i.replace(")", "<wbr>)"), document.execCommand("insertHTML", !1, U), d = !1, t.classList.add("vditor-menu--current");
            } else if (o === "italic" || o === "bold" || o === "strike" || o === "inline-code" || o === "code" || o === "table") {
              U = void 0, r.toString() === "" ? U = n + "<wbr>" + i : (U = o === "code" ? n + `
` + r.toString() + "<wbr>" + i : o === "table" ? "" + n + r.toString() + "<wbr>" + i : "" + n + r.toString() + i + "<wbr>", r.deleteContents()), o !== "table" && o !== "code" || (U = `
` + U + `

`);
              var C = document.createElement("span");
              C.innerHTML = U, r.insertNode(C), ge(e, r), o === "table" && (r.selectNodeContents(getSelection().getRangeAt(0).startContainer.parentElement), (0, T.Hc)(r));
            } else
              o !== "check" && o !== "list" && o !== "ordered-list" || (Lt(e, r, o, !1), d = !1, u(e.toolbar.elements, ["check", "list", "ordered-list"]), t.classList.add("vditor-menu--current"));
          }
          (0, T.ib)(e.ir.element, r), Fe(e), d && ut(e);
        }, ar = function(e, t, n, i) {
          return new (n || (n = Promise))(function(r, o) {
            function a(g) {
              try {
                v(i.next(g));
              } catch (h) {
                o(h);
              }
            }
            function d(g) {
              try {
                v(i.throw(g));
              } catch (h) {
                o(h);
              }
            }
            function v(g) {
              var h;
              g.done ? r(g.value) : (h = g.value, h instanceof n ? h : new n(function(A) {
                A(h);
              })).then(a, d);
            }
            v((i = i.apply(e, [])).next());
          });
        }, sr = function(e, t) {
          var n, i, r, o, a = { label: 0, sent: function() {
            if (1 & r[0])
              throw r[1];
            return r[1];
          }, trys: [], ops: [] };
          return o = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
            return this;
          }), o;
          function d(v) {
            return function(g) {
              return function(h) {
                if (n)
                  throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (n = 1, i && (r = 2 & h[0] ? i.return : h[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, h[1])).done)
                      return r;
                    switch (i = 0, r && (h = [2 & h[0], r.value]), h[0]) {
                    case 0:
                    case 1:
                      r = h;
                      break;
                    case 4:
                      return a.label++, { value: h[1], done: !1 };
                    case 5:
                      a.label++, i = h[1], h = [0];
                      continue;
                    case 7:
                      h = a.ops.pop(), a.trys.pop();
                      continue;
                    default:
                      if (r = a.trys, !((r = r.length > 0 && r[r.length - 1]) || h[0] !== 6 && h[0] !== 2)) {
                        a = 0;
                        continue;
                      }
                      if (h[0] === 3 && (!r || h[1] > r[0] && h[1] < r[3])) {
                        a.label = h[1];
                        break;
                      }
                      if (h[0] === 6 && a.label < r[1]) {
                        a.label = r[1], r = h;
                        break;
                      }
                      if (r && a.label < r[2]) {
                        a.label = r[2], a.ops.push(h);
                        break;
                      }
                      r[2] && a.ops.pop(), a.trys.pop();
                      continue;
                    }
                    h = t.call(e, a);
                  } catch (A) {
                    h = [6, A], i = 0;
                  } finally {
                    n = r = 0;
                  }
                if (5 & h[0])
                  throw h[1];
                return { value: h[0] ? h[1] : void 0, done: !0 };
              }([v, g]);
            };
          }
        }, lr = function() {
          function e(t) {
            var n = this;
            this.splitChar = "", this.lastIndex = -1, this.fillEmoji = function(i, r) {
              n.element.style.display = "none";
              var o = decodeURIComponent(i.getAttribute("data-value")), a = window.getSelection().getRangeAt(0);
              if (r.currentMode === "ir") {
                var d = (0, p.a1)(a.startContainer, "data-type", "code-block-info");
                if (d)
                  return d.textContent = y.g.ZWSP + o.trimRight(), a.selectNodeContents(d), a.collapse(!1), Fe(r), d.parentElement.querySelectorAll("code").forEach(function(A) {
                    A.className = "language-" + o.trimRight();
                  }), Ce(d.parentElement.querySelector(".vditor-ir__preview"), r), void (n.recentLanguage = o.trimRight());
              }
              if (r.currentMode === "wysiwyg" && a.startContainer.nodeType !== 3) {
                var v = a.startContainer, g = void 0;
                if ((g = v.classList.contains("vditor-input") ? v : v.firstElementChild) && g.classList.contains("vditor-input"))
                  return g.value = o.trimRight(), a.selectNodeContents(g), a.collapse(!1), g.dispatchEvent(new CustomEvent("input", { detail: 1 })), void (n.recentLanguage = o.trimRight());
              }
              if (a.setStart(a.startContainer, n.lastIndex), a.deleteContents(), r.options.hint.parse ? r.currentMode === "sv" ? (0, T.oC)(r.lute.SpinVditorSVDOM(o), r) : r.currentMode === "wysiwyg" ? (0, T.oC)(r.lute.SpinVditorDOM(o), r) : (0, T.oC)(r.lute.SpinVditorIRDOM(o), r) : (0, T.oC)(o, r), n.splitChar === ":" && o.indexOf(":") > -1 && r.currentMode !== "sv" && a.insertNode(document.createTextNode(" ")), a.collapse(!1), (0, T.Hc)(a), r.currentMode === "wysiwyg")
                (h = (0, p.fb)(a.startContainer, "vditor-wysiwyg__block")) && h.lastElementChild.classList.contains("vditor-wysiwyg__preview") && (h.lastElementChild.innerHTML = h.firstElementChild.innerHTML, Ce(h.lastElementChild, r));
              else if (r.currentMode === "ir") {
                var h;
                (h = (0, p.fb)(a.startContainer, "vditor-ir__marker--pre")) && h.nextElementSibling.classList.contains("vditor-ir__preview") && (h.nextElementSibling.innerHTML = h.innerHTML, Ce(h.nextElementSibling, r));
              }
              ae(r);
            }, this.timeId = -1, this.element = document.createElement("div"), this.element.className = "vditor-hint", this.recentLanguage = "", t.push({ key: ":" });
          }
          return e.prototype.render = function(t) {
            var n = this;
            if (window.getSelection().focusNode) {
              var i, r = getSelection().getRangeAt(0);
              i = r.startContainer.textContent.substring(0, r.startOffset) || "";
              var o = this.getKey(i, t.options.hint.extend);
              if (o === void 0)
                this.element.style.display = "none", clearTimeout(this.timeId);
              else if (this.splitChar === ":") {
                var a = o === "" ? t.options.hint.emoji : t.lute.GetEmojis(), d = [];
                Object.keys(a).forEach(function(v) {
                  v.indexOf(o.toLowerCase()) === 0 && (a[v].indexOf(".") > -1 ? d.push({ html: "<img src=\"" + a[v] + "\" title=\":" + v + ":\"/> :" + v + ":", value: ":" + v + ":" }) : d.push({ html: "<span class=\"vditor-hint__emoji\">" + a[v] + "</span>" + v, value: a[v] }));
                }), this.genHTML(d, o, t);
              } else
                t.options.hint.extend.forEach(function(v) {
                  v.key === n.splitChar && (clearTimeout(n.timeId), n.timeId = window.setTimeout(function() {
                    return ar(n, void 0, void 0, function() {
                      var g;
                      return sr(this, function(h) {
                        switch (h.label) {
                        case 0:
                          return g = this.genHTML, [4, v.hint(o)];
                        case 1:
                          return g.apply(this, [h.sent(), o, t]), [2];
                        }
                      });
                    });
                  }, t.options.hint.delay));
                });
            }
          }, e.prototype.genHTML = function(t, n, i) {
            var r = this;
            if (t.length !== 0) {
              var o = i[i.currentMode].element, a = (0, T.Ny)(o), d = a.left + (i.options.outline.position === "left" ? i.outline.element.offsetWidth : 0), v = a.top, g = "";
              t.forEach(function(A, O) {
                if (!(O > 7)) {
                  var U = A.html;
                  if (n !== "") {
                    var C = U.lastIndexOf(">") + 1, R = U.substr(C), q = R.toLowerCase().indexOf(n.toLowerCase());
                    q > -1 && (R = R.substring(0, q) + "<b>" + R.substring(q, q + n.length) + "</b>" + R.substring(q + n.length), U = U.substr(0, C) + R);
                  }
                  g += "<button type=\"button\" data-value=\"" + encodeURIComponent(A.value) + ` "
` + (O === 0 ? "class='vditor-hint--current'" : "") + "> " + U + "</button>";
                }
              }), this.element.innerHTML = g;
              var h = parseInt(document.defaultView.getComputedStyle(o, null).getPropertyValue("line-height"), 10);
              this.element.style.top = v + (h || 22) + "px", this.element.style.left = d + "px", this.element.style.display = "block", this.element.style.right = "auto", this.element.querySelectorAll("button").forEach(function(A) {
                A.addEventListener("click", function(O) {
                  r.fillEmoji(A, i), O.preventDefault();
                });
              }), this.element.getBoundingClientRect().bottom > window.innerHeight && (this.element.style.top = v - this.element.offsetHeight + "px"), this.element.getBoundingClientRect().right > window.innerWidth && (this.element.style.left = "auto", this.element.style.right = "0");
            } else
              this.element.style.display = "none";
          }, e.prototype.select = function(t, n) {
            if (this.element.querySelectorAll("button").length === 0 || this.element.style.display === "none")
              return !1;
            var i = this.element.querySelector(".vditor-hint--current");
            if (t.key === "ArrowDown")
              return t.preventDefault(), t.stopPropagation(), i.removeAttribute("class"), i.nextElementSibling ? i.nextElementSibling.className = "vditor-hint--current" : this.element.children[0].className = "vditor-hint--current", !0;
            if (t.key === "ArrowUp") {
              if (t.preventDefault(), t.stopPropagation(), i.removeAttribute("class"), i.previousElementSibling)
                i.previousElementSibling.className = "vditor-hint--current";
              else {
                var r = this.element.children.length;
                this.element.children[r - 1].className = "vditor-hint--current";
              }
              return !0;
            }
            return !((0, s.yl)(t) || t.shiftKey || t.altKey || t.key !== "Enter" || t.isComposing) && (t.preventDefault(), t.stopPropagation(), this.fillEmoji(i, n), !0);
          }, e.prototype.getKey = function(t, n) {
            var i, r = this;
            if (this.lastIndex = -1, this.splitChar = "", n.forEach(function(v) {
              var g = t.lastIndexOf(v.key);
              r.lastIndex < g && (r.splitChar = v.key, r.lastIndex = g);
            }), this.lastIndex === -1)
              return i;
            var o = t.split(this.splitChar), a = o[o.length - 1];
            if (o.length > 1 && a.trim() === a)
              if (o.length === 2 && o[0] === "" && o[1].length < 32)
                i = o[1];
              else {
                var d = o[o.length - 2].slice(-1);
                (0, l.X)(d) === " " && a.length < 32 && (i = a);
              }
            return i;
          }, e;
        }(), cr = function() {
          function e(t) {
            this.composingLock = !1;
            var n = document.createElement("div");
            n.className = "vditor-ir", n.innerHTML = "<pre class=\"vditor-reset\" placeholder=\"" + t.options.placeholder + `"
 contenteditable="true" spellcheck="false"></pre>`, this.element = n.firstElementChild, this.bindEvent(t), It(t, this.element), sn(t, this.element), jt(t, this.element), Bt(t, this.element), Vt(t, this.element), Rt(t, this.element), Pt(t, this.element, this.copy), qt(t, this.element, this.copy);
          }
          return e.prototype.copy = function(t, n) {
            var i = getSelection().getRangeAt(0);
            if (i.toString() !== "") {
              t.stopPropagation(), t.preventDefault();
              var r = document.createElement("div");
              r.appendChild(i.cloneContents()), t.clipboardData.setData("text/plain", n.lute.VditorIRDOM2Md(r.innerHTML).trim()), t.clipboardData.setData("text/html", "");
            }
          }, e.prototype.bindEvent = function(t) {
            var n = this;
            this.element.addEventListener("paste", function(i) {
              Mt(t, i, { pasteCode: function(r) {
                document.execCommand("insertHTML", !1, r);
              } });
            }), this.element.addEventListener("scroll", function() {
              E(t, ["hint"]);
            }), this.element.addEventListener("compositionstart", function(i) {
              n.composingLock = !0;
            }), this.element.addEventListener("compositionend", function(i) {
              (0, s.vU)() || ge(t, getSelection().getRangeAt(0).cloneRange()), n.composingLock = !1;
            }), this.element.addEventListener("input", function(i) {
              if (i.inputType !== "deleteByDrag" && i.inputType !== "insertFromDrop")
                return n.preventInput ? (n.preventInput = !1, void Fe(t, { enableAddUndoStack: !0, enableHint: !0, enableInput: !0 })) : void (n.composingLock || i.data === "‘" || i.data === "“" || i.data === "《" || ge(t, getSelection().getRangeAt(0).cloneRange(), !1, i));
            }), this.element.addEventListener("click", function(i) {
              if (i.target.tagName === "INPUT")
                return i.target.checked ? i.target.setAttribute("checked", "checked") : i.target.removeAttribute("checked"), n.preventInput = !0, void Fe(t);
              var r = (0, T.zh)(t), o = (0, p.fb)(i.target, "vditor-ir__preview");
              if (o || (o = (0, p.fb)(r.startContainer, "vditor-ir__preview")), o && (o.previousElementSibling.firstElementChild ? r.selectNodeContents(o.previousElementSibling.firstElementChild) : r.selectNodeContents(o.previousElementSibling), r.collapse(!0), (0, T.Hc)(r), Te(t)), i.target.tagName === "IMG") {
                var a = i.target.parentElement.querySelector(".vditor-ir__marker--link");
                a && (r.selectNode(a), (0, T.Hc)(r));
              }
              var d = (0, p.a1)(i.target, "data-type", "a");
              if (!d || d.classList.contains("vditor-ir__node--expand")) {
                if (i.target.isEqualNode(n.element) && n.element.lastElementChild && r.collapsed) {
                  var v = n.element.lastElementChild.getBoundingClientRect();
                  i.y > v.top + v.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(y.g.ZWSP, "") === "" ? (r.selectNodeContents(n.element.lastElementChild), r.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", "<p data-block=\"0\">" + y.g.ZWSP + "<wbr></p>"), (0, T.ib)(n.element, r)));
                }
                r.toString() === "" ? j(r, t) : setTimeout(function() {
                  j((0, T.zh)(t), t);
                }), bt(i, t), ut(t);
              } else
                t.options.link.click ? t.options.link.click(d.querySelector(":scope > .vditor-ir__marker--link")) : t.options.link.isOpen && window.open(d.querySelector(":scope > .vditor-ir__marker--link").textContent);
            }), this.element.addEventListener("keyup", function(i) {
              if (!i.isComposing && !(0, s.yl)(i))
                if (i.key === "Enter" && Te(t), ut(t), i.key !== "Backspace" && i.key !== "Delete" || t.ir.element.innerHTML === "" || t.ir.element.childNodes.length !== 1 || !t.ir.element.firstElementChild || t.ir.element.firstElementChild.tagName !== "P" || t.ir.element.firstElementChild.childElementCount !== 0 || t.ir.element.textContent !== "" && t.ir.element.textContent !== `
`) {
                  var r = (0, T.zh)(t);
                  i.key === "Backspace" ? ((0, s.vU)() && r.startContainer.textContent === `
` && r.startOffset === 1 && (r.startContainer.textContent = "", j(r, t)), n.element.querySelectorAll(".language-math").forEach(function(a) {
                    var d = a.querySelector("br");
                    d && d.remove();
                  })) : i.key.indexOf("Arrow") > -1 ? (i.key !== "ArrowLeft" && i.key !== "ArrowRight" || Hn(t), j(r, t)) : i.keyCode === 229 && i.code === "" && i.key === "Unidentified" && j(r, t);
                  var o = (0, p.fb)(r.startContainer, "vditor-ir__preview");
                  if (o) {
                    if (i.key === "ArrowUp" || i.key === "ArrowLeft")
                      return o.previousElementSibling.firstElementChild ? r.selectNodeContents(o.previousElementSibling.firstElementChild) : r.selectNodeContents(o.previousElementSibling), r.collapse(!1), i.preventDefault(), !0;
                    if (o.tagName === "SPAN" && (i.key === "ArrowDown" || i.key === "ArrowRight"))
                      return o.parentElement.getAttribute("data-type") === "html-entity" ? (o.parentElement.insertAdjacentText("afterend", y.g.ZWSP), r.setStart(o.parentElement.nextSibling, 1)) : r.selectNodeContents(o.parentElement.lastElementChild), r.collapse(!1), i.preventDefault(), !0;
                  }
                } else
                  t.ir.element.innerHTML = "";
            });
          }, e;
        }(), Nn = function(e) {
          return e.currentMode === "sv" ? e.lute.Md2HTML(m(e)) : e.currentMode === "wysiwyg" ? e.lute.VditorDOM2HTML(e.wysiwyg.element.innerHTML) : e.currentMode === "ir" ? e.lute.VditorIRDOM2HTML(e.ir.element.innerHTML) : void 0;
        }, dr = J(895), Dn = J(818), ur = function() {
          function e(t) {
            this.element = document.createElement("div"), this.element.className = "vditor-outline", this.element.innerHTML = "<div class=\"vditor-outline__title\">" + t + `</div>
<div class="vditor-outline__content"></div>`;
          }
          return e.prototype.render = function(t) {
            return t.preview.element.style.display === "block" ? (0, Dn.k)(t.preview.previewElement, this.element.lastElementChild, t) : (0, Dn.k)(t[t.currentMode].element, this.element.lastElementChild, t);
          }, e.prototype.toggle = function(t, n, i) {
            var r;
            n === void 0 && (n = !0), i === void 0 && (i = !0);
            var o = (r = t.toolbar.elements.outline) === null || r === void 0 ? void 0 : r.firstElementChild;
            if (n && window.innerWidth >= y.g.MOBILE_WIDTH ? (this.element.style.display = "block", this.render(t), o == null || o.classList.add("vditor-menu--current")) : (this.element.style.display = "none", o == null || o.classList.remove("vditor-menu--current")), i && getSelection().rangeCount > 0) {
              var a = getSelection().getRangeAt(0);
              t[t.currentMode].element.contains(a.startContainer) && (0, T.Hc)(a);
            }
            ue(t);
          }, e;
        }(), pr = J(554), mr = function() {
          function e(t) {
            var n = this;
            this.element = document.createElement("div"), this.element.className = "vditor-preview", this.previewElement = document.createElement("div"), this.previewElement.className = "vditor-reset", t.options.classes.preview && this.previewElement.classList.add(t.options.classes.preview), this.previewElement.style.maxWidth = t.options.preview.maxWidth + "px", this.previewElement.addEventListener("copy", function(v) {
              if (v.target.tagName !== "TEXTAREA") {
                var g = document.createElement("div");
                g.className = "vditor-reset", g.appendChild(getSelection().getRangeAt(0).cloneContents()), n.copyToX(t, g, "default"), v.preventDefault();
              }
            }), this.previewElement.addEventListener("click", function(v) {
              var g = (0, p.lG)(v.target, "SPAN");
              if (g && (0, p.fb)(g, "vditor-toc")) {
                var h = n.previewElement.querySelector("#" + g.getAttribute("data-target-id"));
                h && (n.element.scrollTop = h.offsetTop);
              } else {
                if (v.target.tagName === "A")
                  return t.options.link.click ? t.options.link.click(v.target) : t.options.link.isOpen && window.open(v.target.getAttribute("href")), void v.preventDefault();
                v.target.tagName === "IMG" && (t.options.image.preview ? t.options.image.preview(v.target) : t.options.image.isPreview && (0, ie.E)(v.target, t.options.lang, t.options.theme));
              }
            }), this.element.appendChild(this.previewElement);
            var i = t.options.preview.actions;
            if (i.length !== 0) {
              var r = document.createElement("div");
              r.className = "vditor-preview__action";
              for (var o = [], a = 0; a < i.length; a++) {
                var d = i[a];
                if (typeof d != "object")
                  switch (d) {
                  case "desktop":
                    o.push("<button type=\"button\" class=\"vditor-preview__action--current\" data-type=\"desktop\">Desktop</button>");
                    break;
                  case "tablet":
                    o.push("<button type=\"button\" data-type=\"tablet\">Tablet</button>");
                    break;
                  case "mobile":
                    o.push("<button type=\"button\" data-type=\"mobile\">Mobile/Wechat</button>");
                    break;
                  case "mp-wechat":
                    o.push("<button type=\"button\" data-type=\"mp-wechat\" class=\"vditor-tooltipped vditor-tooltipped__w\" aria-label=\"复制到公众号\"><svg><use xlink:href=\"#vditor-icon-mp-wechat\"></use></svg></button>");
                    break;
                  case "zhihu":
                    o.push("<button type=\"button\" data-type=\"zhihu\" class=\"vditor-tooltipped vditor-tooltipped__w\" aria-label=\"复制到知乎\"><svg><use xlink:href=\"#vditor-icon-zhihu\"></use></svg></button>");
                  }
                else
                  o.push("<button type=\"button\" data-type=\"" + d.key + "\" class=\"" + d.className + "\"" + (d.tooltip ? " aria-label=\"" + d.tooltip + "\"" : "") + "\">" + d.text + "</button>");
              }
              r.innerHTML = o.join(""), r.addEventListener((0, s.Le)(), function(v) {
                var g = (0, x.S)(v.target, "BUTTON");
                if (g) {
                  var h = g.getAttribute("data-type"), A = i.find(function(O) {
                    return (O == null ? void 0 : O.key) === h;
                  });
                  A ? A.click(h) : h !== "mp-wechat" && h !== "zhihu" ? (n.previewElement.style.width = h === "desktop" ? "auto" : h === "tablet" ? "780px" : "360px", n.previewElement.scrollWidth > n.previewElement.parentElement.clientWidth && (n.previewElement.style.width = "auto"), n.render(t), r.querySelectorAll("button").forEach(function(O) {
                    O.classList.remove("vditor-preview__action--current");
                  }), g.classList.add("vditor-preview__action--current")) : n.copyToX(t, n.previewElement.cloneNode(!0), h);
                }
              }), this.element.insertBefore(r, this.previewElement);
            }
          }
          return e.prototype.render = function(t, n) {
            var i = this;
            if (clearTimeout(this.mdTimeoutId), this.element.style.display !== "none")
              if (n)
                this.previewElement.innerHTML = n;
              else if (m(t).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") !== "") {
                var r = /* @__PURE__ */ new Date().getTime(), o = m(t);
                this.mdTimeoutId = window.setTimeout(function() {
                  if (t.options.preview.url) {
                    var a = new XMLHttpRequest();
                    a.open("POST", t.options.preview.url), a.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), a.onreadystatechange = function() {
                      if (a.readyState === XMLHttpRequest.DONE)
                        if (a.status === 200) {
                          var v = JSON.parse(a.responseText);
                          if (v.code !== 0)
                            return void t.tip.show(v.msg);
                          t.options.preview.transform && (v.data = t.options.preview.transform(v.data)), i.previewElement.innerHTML = v.data, i.afterRender(t, r);
                        } else {
                          var g = t.lute.Md2HTML(o);
                          t.options.preview.transform && (g = t.options.preview.transform(g)), i.previewElement.innerHTML = g, i.afterRender(t, r);
                        }
                    }, a.send(JSON.stringify({ markdownText: o }));
                  } else {
                    var d = t.lute.Md2HTML(o);
                    t.options.preview.transform && (d = t.options.preview.transform(d)), i.previewElement.innerHTML = d, i.afterRender(t, r);
                  }
                }, t.options.preview.delay);
              } else
                this.previewElement.innerHTML = "";
            else
              this.element.getAttribute("data-type") === "renderPerformance" && t.tip.hide();
          }, e.prototype.afterRender = function(t, n) {
            t.options.preview.parse && t.options.preview.parse(this.element);
            var i = /* @__PURE__ */ new Date().getTime() - n;
            /* @__PURE__ */ new Date().getTime() - n > 2600 ? (t.tip.show(window.VditorI18n.performanceTip.replace("${x}", i.toString())), t.preview.element.setAttribute("data-type", "renderPerformance")) : t.preview.element.getAttribute("data-type") === "renderPerformance" && (t.tip.hide(), t.preview.element.removeAttribute("data-type"));
            var r = t.preview.element.querySelector(".vditor-comment--focus");
            r && r.classList.remove("vditor-comment--focus"), (0, $.O)(t.preview.previewElement, t.options.preview.hljs), (0, de.s)(t.options.preview.hljs, t.preview.previewElement, t.options.cdn), (0, ve.i)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, xe.K)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, ne.P)(t.preview.previewElement, t.options.cdn), (0, me.v)(t.preview.previewElement, t.options.cdn), (0, N.p)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, Me.P)(t.preview.previewElement, t.options.cdn, t.options.theme), (0, $e.B)(t.preview.previewElement, t.options.cdn), (0, W.Q)(t.preview.previewElement, t.options.cdn), t.options.preview.render.media.enable && (0, pr.Y)(t.preview.previewElement), t.options.customRenders.forEach(function(d) {
              d.render(t.preview.previewElement, t);
            });
            var o = t.preview.element, a = t.outline.render(t);
            a === "" && (a = "[ToC]"), o.querySelectorAll("[data-type=\"toc-block\"]").forEach(function(d) {
              d.innerHTML = a, (0, le.H)(d, { cdn: t.options.cdn, math: t.options.preview.math });
            }), (0, le.H)(t.preview.previewElement, { cdn: t.options.cdn, math: t.options.preview.math });
          }, e.prototype.copyToX = function(t, n, i) {
            i === void 0 && (i = "mp-wechat"), i !== "zhihu" ? n.querySelectorAll(".katex-html .base").forEach(function(o) {
              o.style.display = "initial";
            }) : n.querySelectorAll(".language-math").forEach(function(o) {
              o.outerHTML = "<img class=\"Formula-image\" data-eeimg=\"true\" src=\"//www.zhihu.com/equation?tex=\" alt=\"" + o.getAttribute("data-math") + "\\\" style=\"display: block; margin: 0 auto; max-width: 100%;\">";
            }), n.style.backgroundColor = "#fff", n.querySelectorAll("code").forEach(function(o) {
              o.style.backgroundImage = "none";
            }), this.element.append(n);
            var r = n.ownerDocument.createRange();
            r.selectNode(n), (0, T.Hc)(r), document.execCommand("copy"), n.remove(), t.tip.show(["zhihu", "mp-wechat"].includes(i) ? "已复制，可到" + (i === "zhihu" ? "知乎" : "微信公众号平台") + "进行粘贴" : "已复制到剪切板");
          }, e;
        }(), fr = function() {
          function e(t) {
            this.element = document.createElement("div"), this.element.className = "vditor-resize vditor-resize--" + t.options.resize.position, this.element.innerHTML = "<div><svg><use xlink:href=\"#vditor-icon-resize\"></use></svg></div>", this.bindEvent(t);
          }
          return e.prototype.bindEvent = function(t) {
            var n = this;
            this.element.addEventListener("mousedown", function(i) {
              var r = document, o = i.clientY, a = t.element.offsetHeight, d = 63 + t.element.querySelector(".vditor-toolbar").clientHeight;
              r.ondragstart = function() {
                return !1;
              }, window.captureEvents && window.captureEvents(), n.element.classList.add("vditor-resize--selected"), r.onmousemove = function(v) {
                t.options.resize.position === "top" ? t.element.style.height = Math.max(d, a + (o - v.clientY)) + "px" : t.element.style.height = Math.max(d, a + (v.clientY - o)) + "px", t.options.typewriterMode && (t.sv.element.style.paddingBottom = t.sv.element.parentElement.offsetHeight / 2 + "px");
              }, r.onmouseup = function() {
                t.options.resize.after && t.options.resize.after(t.element.offsetHeight - a), window.captureEvents && window.captureEvents(), r.onmousemove = null, r.onmouseup = null, r.ondragstart = null, r.onselectstart = null, r.onselect = null, n.element.classList.remove("vditor-resize--selected");
              };
            });
          }, e;
        }(), hr = function() {
          function e(t) {
            this.composingLock = !1, this.element = document.createElement("pre"), this.element.className = "vditor-sv vditor-reset", this.element.setAttribute("placeholder", t.options.placeholder), this.element.setAttribute("contenteditable", "true"), this.element.setAttribute("spellcheck", "false"), this.bindEvent(t), It(t, this.element), jt(t, this.element), Bt(t, this.element), Vt(t, this.element), Rt(t, this.element), Pt(t, this.element, this.copy), qt(t, this.element, this.copy);
          }
          return e.prototype.copy = function(t, n) {
            t.stopPropagation(), t.preventDefault(), t.clipboardData.setData("text/plain", ft(n[n.currentMode].element));
          }, e.prototype.bindEvent = function(t) {
            var n = this;
            this.element.addEventListener("paste", function(i) {
              Mt(t, i, { pasteCode: function(r) {
                document.execCommand("insertHTML", !1, r);
              } });
            }), this.element.addEventListener("scroll", function() {
              if (t.preview.element.style.display === "block") {
                var i = n.element.scrollTop, r = n.element.clientHeight, o = n.element.scrollHeight - parseFloat(n.element.style.paddingBottom || "0"), a = t.preview.element;
                a.scrollTop = i / r > 0.5 ? (i + r) * a.scrollHeight / o - r : i * a.scrollHeight / o;
              }
            }), this.element.addEventListener("compositionstart", function(i) {
              n.composingLock = !0;
            }), this.element.addEventListener("compositionend", function(i) {
              (0, s.vU)() || oe(t, i), n.composingLock = !1;
            }), this.element.addEventListener("input", function(i) {
              if (i.inputType !== "deleteByDrag" && i.inputType !== "insertFromDrop" && !n.composingLock && i.data !== "‘" && i.data !== "“" && i.data !== "《")
                return n.preventInput ? (n.preventInput = !1, void He(t, { enableAddUndoStack: !0, enableHint: !0, enableInput: !0 })) : void oe(t, i);
            }), this.element.addEventListener("keyup", function(i) {
              i.isComposing || (0, s.yl)(i) || (i.key !== "Backspace" && i.key !== "Delete" || t.sv.element.innerHTML === "" || t.sv.element.childNodes.length !== 1 || !t.sv.element.firstElementChild || t.sv.element.firstElementChild.tagName !== "DIV" || t.sv.element.firstElementChild.childElementCount !== 2 || t.sv.element.firstElementChild.textContent !== "" && t.sv.element.textContent !== `
` ? i.key === "Enter" && Te(t) : t.sv.element.innerHTML = "");
            });
          }, e;
        }(), On = function() {
          function e() {
            this.element = document.createElement("div"), this.element.className = "vditor-tip";
          }
          return e.prototype.show = function(t, n) {
            var i = this;
            n === void 0 && (n = 6e3), this.element.className = "vditor-tip vditor-tip--show", n === 0 ? (this.element.innerHTML = "<div class=\"vditor-tip__content\">" + t + `
<div class="vditor-tip__close">X</div></div>`, this.element.querySelector(".vditor-tip__close").addEventListener("click", function() {
              i.hide();
            })) : (this.element.innerHTML = "<div class=\"vditor-tip__content\">" + t + "</div>", setTimeout(function() {
              i.hide();
            }, n)), this.element.removeAttribute("style"), setTimeout(function() {
              i.element.getBoundingClientRect().top < 46 && (i.element.style.position = "fixed", i.element.style.top = "46px");
            }, 150);
          }, e.prototype.hide = function() {
            this.element.className = "vditor-messageElementtip", this.element.innerHTML = "";
          }, e;
        }(), Gt = function(e, t) {
          if (t.options.preview.mode !== e) {
            switch (t.options.preview.mode = e, e) {
            case "both":
              t.sv.element.style.display = "block", t.preview.element.style.display = "block", t.preview.render(t), f(t.toolbar.elements, ["both"]);
              break;
            case "editor":
              t.sv.element.style.display = "block", t.preview.element.style.display = "none", u(t.toolbar.elements, ["both"]);
            }
            t.devtools && t.devtools.renderEchart(t);
          }
        }, vr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), gr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return n.options.preview.mode === "both" && r.element.children[0].classList.add("vditor-menu--current"), r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) || (o.preventDefault(), n.currentMode === "sv" && (n.options.preview.mode === "both" ? Gt("editor", n) : Gt("both", n)));
            }), r;
          }
          return vr(t, e), t;
        }(Le), yr = function() {
          this.element = document.createElement("div"), this.element.className = "vditor-toolbar__br";
        }, In = J(312), br = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), wr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this, o = r.element.children[0], a = document.createElement("div");
            a.className = "vditor-hint" + (i.level === 2 ? "" : " vditor-panel--arrow");
            var d = "";
            return y.g.CODE_THEME.forEach(function(v) {
              d += "<button>" + v + "</button>";
            }), a.innerHTML = "<div style=\"overflow: auto;max-height:" + window.innerHeight / 2 + "px\">" + d + "</div>", a.addEventListener((0, s.Le)(), function(v) {
              v.target.tagName === "BUTTON" && (E(n, ["subToolbar"]), n.options.preview.hljs.style = v.target.textContent, (0, In.Y)(v.target.textContent, n.options.cdn), v.preventDefault(), v.stopPropagation());
            }), r.element.appendChild(a), k(n, a, o, i.level), r;
          }
          return br(t, e), t;
        }(Le), Er = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), kr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this, o = r.element.children[0], a = document.createElement("div");
            a.className = "vditor-hint" + (i.level === 2 ? "" : " vditor-panel--arrow");
            var d = "";
            return Object.keys(n.options.preview.theme.list).forEach(function(v) {
              d += "<button data-type=\"" + v + "\">" + n.options.preview.theme.list[v] + "</button>";
            }), a.innerHTML = "<div style=\"overflow: auto;max-height:" + window.innerHeight / 2 + "px\">" + d + "</div>", a.addEventListener((0, s.Le)(), function(v) {
              v.target.tagName === "BUTTON" && (E(n, ["subToolbar"]), n.options.preview.theme.current = v.target.getAttribute("data-type"), (0, Ne.Z)(n.options.preview.theme.current, n.options.preview.theme.path), v.preventDefault(), v.stopPropagation());
            }), r.element.appendChild(a), k(n, a, o, i.level), r;
          }
          return Er(t, e), t;
        }(Le), Sr = function() {
          function e(t) {
            this.element = document.createElement("span"), this.element.className = "vditor-counter vditor-tooltipped vditor-tooltipped__nw", this.render(t, "");
          }
          return e.prototype.render = function(t, n) {
            var i = n.endsWith(`
`) ? n.length - 1 : n.length;
            if (t.options.counter.type === "text" && t[t.currentMode]) {
              var r = t[t.currentMode].element.cloneNode(!0);
              r.querySelectorAll(".vditor-wysiwyg__preview").forEach(function(o) {
                o.remove();
              }), i = r.textContent.length;
            }
            typeof t.options.counter.max == "number" ? (i > t.options.counter.max ? this.element.className = "vditor-counter vditor-counter--error" : this.element.className = "vditor-counter", this.element.innerHTML = i + "/" + t.options.counter.max) : this.element.innerHTML = "" + i, this.element.setAttribute("aria-label", t.options.counter.type), t.options.counter.after && t.options.counter.after(i, { enable: t.options.counter.enable, max: t.options.counter.max, type: t.options.counter.type });
          }, e;
        }(), Lr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), _r = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.children[0].innerHTML = i.icon, r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), o.currentTarget.classList.contains(y.g.CLASS_MENU_DISABLED) || i.click(o, n);
            }), r;
          }
          return Lr(t, e), t;
        }(Le), Cr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Mr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.firstElementChild.addEventListener((0, s.Le)(), function(o) {
              var a = r.element.firstElementChild;
              a.classList.contains(y.g.CLASS_MENU_DISABLED) || (o.preventDefault(), a.classList.contains("vditor-menu--current") ? (a.classList.remove("vditor-menu--current"), n.devtools.element.style.display = "none", ue(n)) : (a.classList.add("vditor-menu--current"), n.devtools.element.style.display = "block", ue(n), n.devtools.renderEchart(n)));
            }), r;
          }
          return Cr(t, e), t;
        }(Le), Tr = function() {
          this.element = document.createElement("div"), this.element.className = "vditor-toolbar__divider";
        }, Ar = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), xr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this, o = document.createElement("div");
            o.className = "vditor-panel vditor-panel--arrow";
            var a = "";
            return Object.keys(n.options.hint.emoji).forEach(function(d) {
              var v = n.options.hint.emoji[d];
              v.indexOf(".") > -1 ? a += "<button data-value=\":" + d + ": \" data-key=\":" + d + `:"><img
data-value=":` + d + ": \" data-key=\":" + d + ":\" class=\"vditor-emojis__icon\" src=\"" + v + "\"/></button>" : a += "<button data-value=\"" + v + ` "
 data-key="` + d + "\"><span class=\"vditor-emojis__icon\">" + v + "</span></button>";
            }), o.innerHTML = "<div class=\"vditor-emojis\" style=\"max-height: " + (n.options.height === "auto" ? "auto" : n.options.height - 80) + "px\">" + a + `</div><div class="vditor-emojis__tail">
    <span class="vditor-emojis__tip"></span><span>` + (n.options.hint.emojiTail || "") + `</span>
</div>`, r.element.appendChild(o), k(n, o, r.element.firstElementChild, i.level), r.bindEvent(n), r;
          }
          return Ar(t, e), t.prototype.bindEvent = function(n) {
            var i = this;
            this.element.lastElementChild.addEventListener((0, s.Le)(), function(r) {
              var o = (0, x.S)(r.target, "BUTTON");
              if (o) {
                r.preventDefault();
                var a = o.getAttribute("data-value"), d = (0, T.zh)(n), v = a;
                if (n.currentMode === "wysiwyg" ? v = n.lute.SpinVditorDOM(a) : n.currentMode === "ir" && (v = n.lute.SpinVditorIRDOM(a)), a.indexOf(":") > -1 && n.currentMode !== "sv") {
                  var g = document.createElement("div");
                  g.innerHTML = v, v = g.firstElementChild.firstElementChild.outerHTML + " ", (0, T.oC)(v, n);
                } else
                  d.extractContents(), d.insertNode(document.createTextNode(a));
                d.collapse(!1), (0, T.Hc)(d), i.element.lastElementChild.style.display = "none", ae(n);
              }
            }), this.element.lastElementChild.addEventListener("mouseover", function(r) {
              var o = (0, x.S)(r.target, "BUTTON");
              o && (i.element.querySelector(".vditor-emojis__tip").innerHTML = o.getAttribute("data-key"));
            });
          }, t;
        }(Le), jn = function(e, t, n) {
          var i = document.createElement("a");
          "download" in i ? (i.download = n, i.style.display = "none", i.href = URL.createObjectURL(new Blob([t])), document.body.appendChild(i), i.click(), i.remove()) : e.tip.show(window.VditorI18n.downloadTip, 0);
        }, Hr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Nr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this, o = r.element.children[0], a = document.createElement("div");
            return a.className = "vditor-hint" + (i.level === 2 ? "" : " vditor-panel--arrow"), a.innerHTML = `<button data-type="markdown">Markdown</button>
<button data-type="pdf">PDF</button>
<button data-type="html">HTML</button>`, a.addEventListener((0, s.Le)(), function(d) {
              var v = d.target;
              if (v.tagName === "BUTTON") {
                switch (v.getAttribute("data-type")) {
                case "markdown":
                  (function(g) {
                    var h = m(g);
                    jn(g, h, h.substr(0, 10) + ".md");
                  })(n);
                  break;
                case "pdf":
                  (function(g) {
                    g.tip.show(window.VditorI18n.generate, 3800);
                    var h = document.querySelector("#vditorExportIframe");
                    h.contentDocument.open(), h.contentDocument.write("<link rel=\"stylesheet\" href=\"" + g.options.cdn + `/dist/index.css"/>
<script src="` + g.options.cdn + `/dist/method.min.js"><\/script>
<div id="preview" style="width: 800px"></div>
<script>
window.addEventListener("message", (e) => {
  if(!e.data) {
    return;
  }
  Vditor.preview(document.getElementById('preview'), e.data, {
    cdn: "` + g.options.cdn + `",
    markdown: {
      theme: ` + JSON.stringify(g.options.preview.theme) + `
    },
    hljs: {
      style: "` + g.options.preview.hljs.style + `"
    }
  });
  setTimeout(() => {
        window.print();
    }, 3600);
}, false);
<\/script>`), h.contentDocument.close(), setTimeout(function() {
                      h.contentWindow.postMessage(m(g), "*");
                    }, 200);
                  })(n);
                  break;
                case "html":
                  (function(g) {
                    var h = Nn(g), A = "<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"" + g.options.cdn + `/dist/index.css"/>
<script src="` + g.options.cdn + "/dist/js/i18n/" + g.options.lang + `.js"><\/script>
<script src="` + g.options.cdn + `/dist/method.min.js"><\/script></head>
<body><div class="vditor-reset" id="preview">` + h + `</div>
<script>
    const previewElement = document.getElementById('preview')
    Vditor.setContentTheme('` + g.options.preview.theme.current + "', '" + g.options.preview.theme.path + `');
    Vditor.codeRender(previewElement);
    Vditor.highlightRender(` + JSON.stringify(g.options.preview.hljs) + ", previewElement, '" + g.options.cdn + `');
    Vditor.mathRender(previewElement, {
        cdn: '` + g.options.cdn + `',
        math: ` + JSON.stringify(g.options.preview.math) + `,
    });
    Vditor.mermaidRender(previewElement, '` + g.options.cdn + "', '" + g.options.theme + `');
    Vditor.markmapRender(previewElement, '` + g.options.cdn + "', '" + g.options.theme + `');
    Vditor.flowchartRender(previewElement, '` + g.options.cdn + `');
    Vditor.graphvizRender(previewElement, '` + g.options.cdn + `');
    Vditor.chartRender(previewElement, '` + g.options.cdn + "', '" + g.options.theme + `');
    Vditor.mindmapRender(previewElement, '` + g.options.cdn + "', '" + g.options.theme + `');
    Vditor.abcRender(previewElement, '` + g.options.cdn + `');
    ` + (g.options.preview.render.media.enable ? "Vditor.mediaRender(previewElement);" : "") + `
    Vditor.speechRender(previewElement);
<\/script>
<script src="` + g.options.cdn + "/dist/js/icons/" + g.options.icon + ".js\"><\/script></body></html>";
                    jn(g, A, h.substr(0, 10) + ".html");
                  })(n);
                }
                E(n, ["subToolbar"]), d.preventDefault(), d.stopPropagation();
              }
            }), r.element.appendChild(a), k(n, a, o, i.level), r;
          }
          return Hr(t, e), t;
        }(Le), Dr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Or = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r._bindEvent(n, i), r;
          }
          return Dr(t, e), t.prototype._bindEvent = function(n, i) {
            this.element.children[0].addEventListener((0, s.Le)(), function(r) {
              r.preventDefault(), n.element.className.includes("vditor--fullscreen") ? (i.level || (this.innerHTML = i.icon), n.element.style.zIndex = "", document.body.style.overflow = "", n.element.classList.remove("vditor--fullscreen"), Object.keys(n.toolbar.elements).forEach(function(o) {
                var a = n.toolbar.elements[o].firstChild;
                a && (a.className = a.className.replace("__s", "__n"), n.options.toolbar.forEach(function(d) {
                  typeof d != "string" && d.tipPosition && d.name === a.dataset.type && (a.className = "vditor-tooltipped vditor-tooltipped__" + d.tipPosition);
                }));
              }), n.counter && (n.counter.element.className = n.counter.element.className.replace("__s", "__n"))) : (i.level || (this.innerHTML = "<svg><use xlink:href=\"#vditor-icon-contract\"></use></svg>"), n.element.style.zIndex = n.options.fullscreen.index.toString(), document.body.style.overflow = "hidden", n.element.classList.add("vditor--fullscreen"), Object.keys(n.toolbar.elements).forEach(function(o) {
                var a = n.toolbar.elements[o].firstChild;
                a && (a.className = a.className.replace("__n", "__s"));
              }), n.counter && (n.counter.element.className = n.counter.element.className.replace("__n", "__s"))), n.devtools && n.devtools.renderEchart(n), i.click && i.click(r, n), ue(n), Q(n);
            });
          }, t;
        }(Le), Ir = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), jr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this, o = document.createElement("div");
            return o.className = "vditor-hint vditor-panel--arrow", o.innerHTML = "<button data-tag=\"h1\" data-value=\"# \">" + window.VditorI18n.heading1 + " " + (0, s.ns)("&lt;⌥⌘1>") + `</button>
<button data-tag="h2" data-value="## ">` + window.VditorI18n.heading2 + " &lt;" + (0, s.ns)("⌥⌘2") + `></button>
<button data-tag="h3" data-value="### ">` + window.VditorI18n.heading3 + " &lt;" + (0, s.ns)("⌥⌘3") + `></button>
<button data-tag="h4" data-value="#### ">` + window.VditorI18n.heading4 + " &lt;" + (0, s.ns)("⌥⌘4") + `></button>
<button data-tag="h5" data-value="##### ">` + window.VditorI18n.heading5 + " &lt;" + (0, s.ns)("⌥⌘5") + `></button>
<button data-tag="h6" data-value="###### ">` + window.VditorI18n.heading6 + " &lt;" + (0, s.ns)("⌥⌘6") + "></button>", r.element.appendChild(o), r._bindEvent(n, o), r;
          }
          return Ir(t, e), t.prototype._bindEvent = function(n, i) {
            var r = this.element.children[0];
            r.addEventListener((0, s.Le)(), function(a) {
              a.preventDefault(), clearTimeout(n.wysiwyg.afterRenderTimeoutId), clearTimeout(n.ir.processTimeoutId), clearTimeout(n.sv.processTimeoutId), r.classList.contains(y.g.CLASS_MENU_DISABLED) || (r.blur(), r.classList.contains("vditor-menu--current") ? (n.currentMode === "wysiwyg" ? (Dt(n), we(n)) : n.currentMode === "ir" && vt(n, ""), r.classList.remove("vditor-menu--current")) : (E(n, ["subToolbar"]), i.style.display = "block"));
            });
            for (var o = 0; o < 6; o++)
              i.children.item(o).addEventListener((0, s.Le)(), function(a) {
                a.preventDefault(), n.currentMode === "wysiwyg" ? (wt(n, a.target.getAttribute("data-tag")), we(n), r.classList.add("vditor-menu--current")) : n.currentMode === "ir" ? (vt(n, a.target.getAttribute("data-value")), r.classList.add("vditor-menu--current")) : dn(n, a.target.getAttribute("data-value")), i.style.display = "none";
              });
          }, t;
        }(Le), Rr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Pr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), n.tip.show(`<div style="margin-bottom:14px;font-size: 14px;line-height: 22px;min-width:300px;max-width: 360px;display: flex;">
<div style="margin-top: 14px;flex: 1">
    <div>Markdown 使用指南</div>
    <ul style="list-style: none">
        <li><a href="https://ld246.com/article/1583308420519" target="_blank">语法速查手册</a></li>
        <li><a href="https://ld246.com/article/1583129520165" target="_blank">基础语法</a></li>
        <li><a href="https://ld246.com/article/1583305480675" target="_blank">扩展语法</a></li>
        <li><a href="https://ld246.com/article/1582778815353" target="_blank">键盘快捷键</a></li>
    </ul>
</div>
<div style="margin-top: 14px;flex: 1">
    <div>Vditor 支持</div>
    <ul style="list-style: none">
        <li><a href="https://github.com/Vanessa219/vditor/issues" target="_blank">Issues</a></li>
        <li><a href="https://ld246.com/tag/vditor" target="_blank">官方讨论区</a></li>
        <li><a href="https://ld246.com/article/1549638745630" target="_blank">开发手册</a></li>
        <li><a href="https://ld246.com/guide/markdown" target="_blank">演示地址</a></li>
    </ul>
</div></div>`, 0);
            }), r;
          }
          return Rr(t, e), t;
        }(Le), qr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Br = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              if (o.preventDefault(), !r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) && n.currentMode !== "sv") {
                var a = (0, T.zh)(n), d = (0, p.lG)(a.startContainer, "LI");
                d && gn(n, d, a);
              }
            }), r;
          }
          return qr(t, e), t;
        }(Le), Vr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Ur = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), n.tip.show(`<div style="max-width: 520px; font-size: 14px;line-height: 22px;margin-bottom: 14px;">
<p style="text-align: center;margin: 14px 0">
    <em>下一代的 Markdown 编辑器，为未来而构建</em>
</p>
<div style="display: flex;margin-bottom: 14px;flex-wrap: wrap;align-items: center">
    <img src="https://unpkg.com/vditor/dist/images/logo.png" style="margin: 0 auto;height: 68px"/>
    <div>&nbsp;&nbsp;</div>
    <div style="flex: 1;min-width: 250px">
        Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。
        它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。
    </div>
</div>
<div style="display: flex;flex-wrap: wrap;">
    <ul style="list-style: none;flex: 1;min-width:148px">
        <li>
        项目地址：<a href="https://b3log.org/vditor" target="_blank">b3log.org/vditor</a>
        </li>
        <li>
        开源协议：MIT
        </li>
    </ul>
    <ul style="list-style: none;margin-right: 18px">
        <li>
        组件版本：Vditor v` + y.H + " / Lute v" + Lute.Version + `
        </li>
        <li>
        赞助捐赠：<a href="https://ld246.com/sponsor" target="_blank">https://ld246.com/sponsor</a>
        </li>
    </ul>
</div>
</div>`, 0);
            }), r;
          }
          return Vr(t, e), t;
        }(Le), Wr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), zr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) || n.currentMode === "sv" || St(n, "afterend");
            }), r;
          }
          return Wr(t, e), t;
        }(Le), Kr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Fr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) || n.currentMode === "sv" || St(n, "beforebegin");
            }), r;
          }
          return Kr(t, e), t;
        }(Le), Gr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Zr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              if (o.preventDefault(), !r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) && n.currentMode !== "sv") {
                var a = (0, T.zh)(n), d = (0, p.lG)(a.startContainer, "LI");
                d && Wt(n, d, a, d.parentElement);
              }
            }), r;
          }
          return Gr(t, e), t;
        }(Le), $r = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Jr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return n.options.outline && r.element.firstElementChild.classList.add("vditor-menu--current"), r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), n.toolbar.elements.outline.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) || (n.options.outline.enable = !r.element.firstElementChild.classList.contains("vditor-menu--current"), n.outline.toggle(n, n.options.outline.enable));
            }), r;
          }
          return $r(t, e), t;
        }(Le), Xr = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), Qr = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r._bindEvent(n), r;
          }
          return Xr(t, e), t.prototype._bindEvent = function(n) {
            var i = this;
            this.element.children[0].addEventListener((0, s.Le)(), function(r) {
              r.preventDefault();
              var o = i.element.firstElementChild;
              if (!o.classList.contains(y.g.CLASS_MENU_DISABLED)) {
                var a = y.g.EDIT_TOOLBARS.concat(["both", "edit-mode", "devtools"]);
                o.classList.contains("vditor-menu--current") ? (o.classList.remove("vditor-menu--current"), n.currentMode === "sv" ? (n.sv.element.style.display = "block", n.options.preview.mode === "both" ? n.preview.element.style.display = "block" : n.preview.element.style.display = "none") : (n[n.currentMode].element.parentElement.style.display = "block", n.preview.element.style.display = "none"), w(n.toolbar.elements, a), n.outline.render(n)) : (_(n.toolbar.elements, a), n.preview.element.style.display = "block", n.currentMode === "sv" ? n.sv.element.style.display = "none" : n[n.currentMode].element.parentElement.style.display = "none", n.preview.render(n), o.classList.add("vditor-menu--current"), E(n, ["subToolbar", "hint", "popover"]), setTimeout(function() {
                  n.outline.render(n);
                }, n.options.preview.delay + 10)), ue(n);
              }
            });
          }, t;
        }(Le), Yr = function() {
          function e(t) {
            var n;
            if (this.SAMPLE_RATE = 5e3, this.isRecording = !1, this.readyFlag = !1, this.leftChannel = [], this.rightChannel = [], this.recordingLength = 0, typeof AudioContext < "u")
              n = new AudioContext();
            else {
              if (!webkitAudioContext)
                return;
              n = new webkitAudioContext();
            }
            this.DEFAULT_SAMPLE_RATE = n.sampleRate;
            var i = n.createGain();
            n.createMediaStreamSource(t).connect(i), this.recorder = n.createScriptProcessor(2048, 2, 1), this.recorder.onaudioprocess = null, i.connect(this.recorder), this.recorder.connect(n.destination), this.readyFlag = !0;
          }
          return e.prototype.cloneChannelData = function(t, n) {
            this.leftChannel.push(new Float32Array(t)), this.rightChannel.push(new Float32Array(n)), this.recordingLength += 2048;
          }, e.prototype.startRecordingNewWavFile = function() {
            this.readyFlag && (this.isRecording = !0, this.leftChannel.length = this.rightChannel.length = 0, this.recordingLength = 0);
          }, e.prototype.stopRecording = function() {
            this.isRecording = !1;
          }, e.prototype.buildWavFileBlob = function() {
            for (var t = this.mergeBuffers(this.leftChannel), n = this.mergeBuffers(this.rightChannel), i = new Float32Array(t.length), r = 0; r < t.length; ++r)
              i[r] = 0.5 * (t[r] + n[r]);
            this.DEFAULT_SAMPLE_RATE > this.SAMPLE_RATE && (i = this.downSampleBuffer(i, this.SAMPLE_RATE));
            var o = 44 + 2 * i.length, a = new ArrayBuffer(o), d = new DataView(a);
            this.writeUTFBytes(d, 0, "RIFF"), d.setUint32(4, o, !0), this.writeUTFBytes(d, 8, "WAVE"), this.writeUTFBytes(d, 12, "fmt "), d.setUint32(16, 16, !0), d.setUint16(20, 1, !0), d.setUint16(22, 1, !0), d.setUint32(24, this.SAMPLE_RATE, !0), d.setUint32(28, 2 * this.SAMPLE_RATE, !0), d.setUint16(32, 2, !0), d.setUint16(34, 16, !0);
            var v = 2 * i.length;
            this.writeUTFBytes(d, 36, "data"), d.setUint32(40, v, !0);
            for (var g = i.length, h = 44, A = 0; A < g; A++)
              d.setInt16(h, 32767 * i[A], !0), h += 2;
            return new Blob([d], { type: "audio/wav" });
          }, e.prototype.downSampleBuffer = function(t, n) {
            if (n === this.DEFAULT_SAMPLE_RATE || n > this.DEFAULT_SAMPLE_RATE)
              return t;
            for (var i = this.DEFAULT_SAMPLE_RATE / n, r = Math.round(t.length / i), o = new Float32Array(r), a = 0, d = 0; a < o.length; ) {
              for (var v = Math.round((a + 1) * i), g = 0, h = 0, A = d; A < v && A < t.length; A++)
                g += t[A], h++;
              o[a] = g / h, a++, d = v;
            }
            return o;
          }, e.prototype.mergeBuffers = function(t) {
            for (var n = new Float32Array(this.recordingLength), i = 0, r = t.length, o = 0; o < r; ++o) {
              var a = t[o];
              n.set(a, i), i += a.length;
            }
            return n;
          }, e.prototype.writeUTFBytes = function(t, n, i) {
            for (var r = i.length, o = 0; o < r; o++)
              t.setUint8(n + o, i.charCodeAt(o));
          }, e;
        }(), ei = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), ti = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return r._bindEvent(n), r;
          }
          return ei(t, e), t.prototype._bindEvent = function(n) {
            var i, r = this;
            this.element.children[0].addEventListener((0, s.Le)(), function(o) {
              if (o.preventDefault(), !r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED)) {
                var a = n[n.currentMode].element;
                if (i)
                  if (i.isRecording) {
                    i.stopRecording(), n.tip.hide();
                    var d = new File([i.buildWavFileBlob()], "record" + /* @__PURE__ */ new Date().getTime() + ".wav", { type: "video/webm" });
                    Ut(n, [d]), r.element.children[0].classList.remove("vditor-menu--current");
                  } else
                    n.tip.show(window.VditorI18n.recording), a.setAttribute("contenteditable", "false"), i.startRecordingNewWavFile(), r.element.children[0].classList.add("vditor-menu--current");
                else
                  navigator.mediaDevices.getUserMedia({ audio: !0 }).then(function(v) {
                    (i = new Yr(v)).recorder.onaudioprocess = function(g) {
                      if (i.isRecording) {
                        var h = g.inputBuffer.getChannelData(0), A = g.inputBuffer.getChannelData(1);
                        i.cloneChannelData(h, A);
                      }
                    }, i.startRecordingNewWavFile(), n.tip.show(window.VditorI18n.recording), a.setAttribute("contenteditable", "false"), r.element.children[0].classList.add("vditor-menu--current");
                  }).catch(function() {
                    n.tip.show(window.VditorI18n["record-tip"]);
                  });
              }
            });
          }, t;
        }(Le), ni = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), ri = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return _({ redo: r.element }, ["redo"]), r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) || n.undo.redo(n);
            }), r;
          }
          return ni(t, e), t;
        }(Le), ii = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), oi = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this;
            return _({ undo: r.element }, ["undo"]), r.element.children[0].addEventListener((0, s.Le)(), function(o) {
              o.preventDefault(), r.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED) || n.undo.undo(n);
            }), r;
          }
          return ii(t, e), t;
        }(Le), ai = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }(), si = function(e) {
          function t(n, i) {
            var r = e.call(this, n, i) || this, o = "<input type=\"file\"";
            return n.options.upload.multiple && (o += " multiple=\"multiple\""), n.options.upload.accept && (o += " accept=\"" + n.options.upload.accept + "\""), r.element.children[0].innerHTML = "" + (i.icon || "<svg><use xlink:href=\"#vditor-icon-upload\"></use></svg>") + o + ">", r._bindEvent(n), r;
          }
          return ai(t, e), t.prototype._bindEvent = function(n) {
            var i = this;
            this.element.children[0].addEventListener((0, s.Le)(), function(r) {
              if (i.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED))
                return r.stopPropagation(), void r.preventDefault();
            }), this.element.querySelector("input").addEventListener("change", function(r) {
              if (i.element.firstElementChild.classList.contains(y.g.CLASS_MENU_DISABLED))
                return r.stopPropagation(), void r.preventDefault();
              r.target.files.length !== 0 && Ut(n, r.target.files, r.target);
            });
          }, t;
        }(Le), li = function() {
          function e(t) {
            var n = this, i = t.options;
            this.elements = {}, this.element = document.createElement("div"), this.element.className = "vditor-toolbar", i.toolbar.forEach(function(r, o) {
              var a = n.genItem(t, r, o);
              if (n.element.appendChild(a), r.toolbar) {
                var d = document.createElement("div");
                d.className = "vditor-hint vditor-panel--arrow", d.addEventListener((0, s.Le)(), function(v) {
                  d.style.display = "none";
                }), r.toolbar.forEach(function(v, g) {
                  v.level = 2, d.appendChild(n.genItem(t, v, o + g));
                }), a.appendChild(d), k(t, d, a.children[0]);
              }
            }), t.options.toolbarConfig.hide && this.element.classList.add("vditor-toolbar--hide"), t.options.toolbarConfig.pin && this.element.classList.add("vditor-toolbar--pin"), t.options.counter.enable && (t.counter = new Sr(t), this.element.appendChild(t.counter.element));
          }
          return e.prototype.genItem = function(t, n, i) {
            var r;
            switch (n.name) {
            case "bold":
            case "italic":
            case "more":
            case "strike":
            case "line":
            case "quote":
            case "list":
            case "ordered-list":
            case "check":
            case "code":
            case "inline-code":
            case "link":
            case "table":
              r = new Le(t, n);
              break;
            case "emoji":
              r = new xr(t, n);
              break;
            case "headings":
              r = new jr(t, n);
              break;
            case "|":
              r = new Tr();
              break;
            case "br":
              r = new yr();
              break;
            case "undo":
              r = new oi(t, n);
              break;
            case "redo":
              r = new ri(t, n);
              break;
            case "help":
              r = new Pr(t, n);
              break;
            case "both":
              r = new gr(t, n);
              break;
            case "preview":
              r = new Qr(t, n);
              break;
            case "fullscreen":
              r = new Or(t, n);
              break;
            case "upload":
              r = new si(t, n);
              break;
            case "record":
              r = new ti(t, n);
              break;
            case "info":
              r = new Ur(t, n);
              break;
            case "edit-mode":
              r = new Zn(t, n);
              break;
            case "devtools":
              r = new Mr(t, n);
              break;
            case "outdent":
              r = new Zr(t, n);
              break;
            case "indent":
              r = new Br(t, n);
              break;
            case "outline":
              r = new Jr(t, n);
              break;
            case "insert-after":
              r = new zr(t, n);
              break;
            case "insert-before":
              r = new Fr(t, n);
              break;
            case "code-theme":
              r = new wr(t, n);
              break;
            case "content-theme":
              r = new kr(t, n);
              break;
            case "export":
              r = new Nr(t, n);
              break;
            default:
              r = new _r(t, n);
            }
            if (r) {
              var o = n.name;
              return o !== "br" && o !== "|" || (o += i), this.elements[o] = r.element, r.element;
            }
          }, e;
        }(), ci = J(471), di = function() {
          function e() {
            this.stackSize = 50, this.resetStack(), this.dmp = new ci();
          }
          return e.prototype.clearStack = function(t) {
            this.resetStack(), this.resetIcon(t);
          }, e.prototype.resetIcon = function(t) {
            t.toolbar && (this[t.currentMode].undoStack.length > 1 ? w(t.toolbar.elements, ["undo"]) : _(t.toolbar.elements, ["undo"]), this[t.currentMode].redoStack.length !== 0 ? w(t.toolbar.elements, ["redo"]) : _(t.toolbar.elements, ["redo"]));
          }, e.prototype.undo = function(t) {
            if (t[t.currentMode].element.getAttribute("contenteditable") !== "false" && !(this[t.currentMode].undoStack.length < 2)) {
              var n = this[t.currentMode].undoStack.pop();
              n && (this[t.currentMode].redoStack.push(n), this.renderDiff(n, t), this[t.currentMode].hasUndo = !0, E(t, ["hint"]));
            }
          }, e.prototype.redo = function(t) {
            if (t[t.currentMode].element.getAttribute("contenteditable") !== "false") {
              var n = this[t.currentMode].redoStack.pop();
              n && (this[t.currentMode].undoStack.push(n), this.renderDiff(n, t, !0));
            }
          }, e.prototype.recordFirstPosition = function(t, n) {
            if (getSelection().rangeCount !== 0 && !(this[t.currentMode].undoStack.length !== 1 || this[t.currentMode].undoStack[0].length === 0 || this[t.currentMode].redoStack.length > 0 || (0, s.vU)() && n.key === "Backspace" || (0, s.G6)())) {
              var i = this.addCaret(t);
              i.replace("<wbr>", "").replace(" vditor-ir__node--expand", "") === this[t.currentMode].undoStack[0][0].diffs[0][1].replace("<wbr>", "") && (this[t.currentMode].undoStack[0][0].diffs[0][1] = i, this[t.currentMode].lastText = i);
            }
          }, e.prototype.addToUndoStack = function(t) {
            var n = this.addCaret(t, !0), i = this.dmp.diff_main(n, this[t.currentMode].lastText, !0), r = this.dmp.patch_make(n, this[t.currentMode].lastText, i);
            r.length === 0 && this[t.currentMode].undoStack.length > 0 || (this[t.currentMode].lastText = n, this[t.currentMode].undoStack.push(r), this[t.currentMode].undoStack.length > this.stackSize && this[t.currentMode].undoStack.shift(), this[t.currentMode].hasUndo && (this[t.currentMode].redoStack = [], this[t.currentMode].hasUndo = !1, _(t.toolbar.elements, ["redo"])), this[t.currentMode].undoStack.length > 1 && w(t.toolbar.elements, ["undo"]));
          }, e.prototype.renderDiff = function(t, n, i) {
            var r;
            if (i === void 0 && (i = !1), i) {
              var o = this.dmp.patch_deepCopy(t).reverse();
              o.forEach(function(d) {
                d.diffs.forEach(function(v) {
                  v[0] = -v[0];
                });
              }), r = this.dmp.patch_apply(o, this[n.currentMode].lastText)[0];
            } else
              r = this.dmp.patch_apply(t, this[n.currentMode].lastText)[0];
            if (this[n.currentMode].lastText = r, n[n.currentMode].element.innerHTML = r, n.currentMode !== "sv" && n[n.currentMode].element.querySelectorAll(".vditor-" + n.currentMode + "__preview[data-render='2']").forEach(function(d) {
              Ce(d, n);
            }), n[n.currentMode].element.querySelector("wbr"))
              (0, T.ib)(n[n.currentMode].element, n[n.currentMode].element.ownerDocument.createRange()), Te(n);
            else {
              var a = getSelection().getRangeAt(0);
              a.setEndBefore(n[n.currentMode].element), a.collapse(!1);
            }
            Ve(n), ae(n, { enableAddUndoStack: !1, enableHint: !1, enableInput: !0 }), ot(n), n[n.currentMode].element.querySelectorAll(".vditor-" + n.currentMode + "__preview[data-render='2']").forEach(function(d) {
              Ce(d, n);
            }), this[n.currentMode].undoStack.length > 1 ? w(n.toolbar.elements, ["undo"]) : _(n.toolbar.elements, ["undo"]), this[n.currentMode].redoStack.length !== 0 ? w(n.toolbar.elements, ["redo"]) : _(n.toolbar.elements, ["redo"]);
          }, e.prototype.resetStack = function() {
            this.ir = { hasUndo: !1, lastText: "", redoStack: [], undoStack: [] }, this.sv = { hasUndo: !1, lastText: "", redoStack: [], undoStack: [] }, this.wysiwyg = { hasUndo: !1, lastText: "", redoStack: [], undoStack: [] };
          }, e.prototype.addCaret = function(t, n) {
            var i;
            if (n === void 0 && (n = !1), getSelection().rangeCount !== 0 && !t[t.currentMode].element.querySelector("wbr")) {
              var r = getSelection().getRangeAt(0);
              if (t[t.currentMode].element.contains(r.startContainer)) {
                i = r.cloneRange();
                var o = document.createElement("span");
                o.className = "vditor-wbr", r.insertNode(o);
              }
            }
            t.ir.element.cloneNode(!0).querySelectorAll(".vditor-" + t.currentMode + "__preview[data-render='1']").forEach(function(d) {
              d.firstElementChild && (d.firstElementChild.classList.contains("language-echarts") || d.firstElementChild.classList.contains("language-plantuml") || d.firstElementChild.classList.contains("language-mindmap") ? (d.firstElementChild.removeAttribute("_echarts_instance_"), d.firstElementChild.removeAttribute("data-processed"), d.firstElementChild.innerHTML = d.previousElementSibling.firstElementChild.innerHTML, d.setAttribute("data-render", "2")) : d.firstElementChild.classList.contains("language-math") && (d.setAttribute("data-render", "2"), d.firstElementChild.textContent = d.firstElementChild.getAttribute("data-math"), d.firstElementChild.removeAttribute("data-math")));
            });
            var a = t[t.currentMode].element.innerHTML;
            return t[t.currentMode].element.querySelectorAll(".vditor-wbr").forEach(function(d) {
              d.remove();
            }), n && i && (0, T.Hc)(i), a.replace("<span class=\"vditor-wbr\"></span>", "<wbr>");
          }, e;
        }(), ui = J(640), pi = function() {
          function e(t) {
            this.defaultOptions = { rtl: !1, after: void 0, cache: { enable: !0 }, cdn: y.g.CDN, classes: { preview: "" }, comment: { enable: !1 }, counter: { enable: !1, type: "markdown" }, customRenders: [], debugger: !1, fullscreen: { index: 90 }, height: "auto", hint: { delay: 200, emoji: { "+1": "👍", "-1": "👎", confused: "😕", eyes: "👀️", heart: "❤️", rocket: "🚀️", smile: "😄", tada: "🎉️" }, emojiPath: y.g.CDN + "/dist/images/emoji", extend: [], parse: !0 }, icon: "ant", lang: "zh_CN", mode: "ir", outline: { enable: !1, position: "left" }, placeholder: "", preview: { actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"], delay: 1e3, hljs: y.g.HLJS_OPTIONS, markdown: y.g.MARKDOWN_OPTIONS, math: y.g.MATH_OPTIONS, maxWidth: 800, mode: "both", theme: y.g.THEME_OPTIONS, render: { media: { enable: !0 } } }, link: { isOpen: !0 }, image: { isPreview: !0 }, resize: { enable: !1, position: "bottom" }, theme: "classic", toolbar: ["emoji", "headings", "bold", "italic", "strike", "link", "|", "list", "ordered-list", "check", "outdent", "indent", "|", "quote", "line", "code", "inline-code", "insert-before", "insert-after", "|", "upload", "record", "table", "|", "undo", "redo", "|", "fullscreen", "edit-mode", { name: "more", toolbar: ["both", "code-theme", "content-theme", "export", "outline", "preview", "devtools", "info", "help"] }], toolbarConfig: { hide: !1, pin: !1 }, typewriterMode: !1, undoDelay: 800, upload: { extraData: {}, fieldName: "file[]", filename: function(n) {
              return n.replace(/\W/g, "");
            }, linkToImgUrl: "", max: 10485760, multiple: !0, url: "", withCredentials: !1 }, value: "", width: "auto" }, this.options = t;
          }
          return e.prototype.merge = function() {
            var t, n, i, r, o, a, d, v, g;
            this.options && (this.options.toolbar ? this.options.toolbar = this.mergeToolbar(this.options.toolbar) : this.options.toolbar = this.mergeToolbar(this.defaultOptions.toolbar), !((n = (t = this.options.preview) === null || t === void 0 ? void 0 : t.theme) === null || n === void 0) && n.list && (this.defaultOptions.preview.theme.list = this.options.preview.theme.list), !((o = (r = (i = this.options.preview) === null || i === void 0 ? void 0 : i.render) === null || r === void 0 ? void 0 : r.media) === null || o === void 0) && o.enable && (this.defaultOptions.preview.render.media.enable = this.options.preview.render.media.enable), !((a = this.options.hint) === null || a === void 0) && a.emoji && (this.defaultOptions.hint.emoji = this.options.hint.emoji), this.options.comment && (this.defaultOptions.comment = this.options.comment), this.options.cdn && (!((v = (d = this.options.preview) === null || d === void 0 ? void 0 : d.theme) === null || v === void 0) && v.path || (this.defaultOptions.preview.theme.path = this.options.cdn + "/dist/css/content-theme"), !((g = this.options.hint) === null || g === void 0) && g.emojiPath || (this.defaultOptions.hint.emojiPath = this.options.cdn + "/dist/images/emoji")));
            var h = (0, ui.T)(this.defaultOptions, this.options);
            if (h.cache.enable && !h.cache.id)
              throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
            return h;
          }, e.prototype.mergeToolbar = function(t) {
            var n = this, i = [{ icon: "<svg><use xlink:href=\"#vditor-icon-export\"></use></svg>", name: "export", tipPosition: "ne" }, { hotkey: "⌘E", icon: "<svg><use xlink:href=\"#vditor-icon-emoji\"></use></svg>", name: "emoji", tipPosition: "ne" }, { hotkey: "⌘H", icon: "<svg><use xlink:href=\"#vditor-icon-headings\"></use></svg>", name: "headings", tipPosition: "ne" }, { hotkey: "⌘B", icon: "<svg><use xlink:href=\"#vditor-icon-bold\"></use></svg>", name: "bold", prefix: "**", suffix: "**", tipPosition: "ne" }, { hotkey: "⌘I", icon: "<svg><use xlink:href=\"#vditor-icon-italic\"></use></svg>", name: "italic", prefix: "*", suffix: "*", tipPosition: "ne" }, { hotkey: "⌘D", icon: "<svg><use xlink:href=\"#vditor-icon-strike\"></use></svg>", name: "strike", prefix: "~~", suffix: "~~", tipPosition: "ne" }, { hotkey: "⌘K", icon: "<svg><use xlink:href=\"#vditor-icon-link\"></use></svg>", name: "link", prefix: "[", suffix: "](https://)", tipPosition: "n" }, { name: "|" }, { hotkey: "⌘L", icon: "<svg><use xlink:href=\"#vditor-icon-list\"></use></svg>", name: "list", prefix: "* ", tipPosition: "n" }, { hotkey: "⌘O", icon: "<svg><use xlink:href=\"#vditor-icon-ordered-list\"></use></svg>", name: "ordered-list", prefix: "1. ", tipPosition: "n" }, { hotkey: "⌘J", icon: "<svg><use xlink:href=\"#vditor-icon-check\"></use></svg>", name: "check", prefix: "* [ ] ", tipPosition: "n" }, { hotkey: "⇧⌘I", icon: "<svg><use xlink:href=\"#vditor-icon-outdent\"></use></svg>", name: "outdent", tipPosition: "n" }, { hotkey: "⇧⌘O", icon: "<svg><use xlink:href=\"#vditor-icon-indent\"></use></svg>", name: "indent", tipPosition: "n" }, { name: "|" }, { hotkey: "⌘;", icon: "<svg><use xlink:href=\"#vditor-icon-quote\"></use></svg>", name: "quote", prefix: "> ", tipPosition: "n" }, { hotkey: "⇧⌘H", icon: "<svg><use xlink:href=\"#vditor-icon-line\"></use></svg>", name: "line", prefix: "---", tipPosition: "n" }, { hotkey: "⌘U", icon: "<svg><use xlink:href=\"#vditor-icon-code\"></use></svg>", name: "code", prefix: "```", suffix: "\n```", tipPosition: "n" }, { hotkey: "⌘G", icon: "<svg><use xlink:href=\"#vditor-icon-inline-code\"></use></svg>", name: "inline-code", prefix: "`", suffix: "`", tipPosition: "n" }, { hotkey: "⇧⌘B", icon: "<svg><use xlink:href=\"#vditor-icon-before\"></use></svg>", name: "insert-before", tipPosition: "n" }, { hotkey: "⇧⌘E", icon: "<svg><use xlink:href=\"#vditor-icon-after\"></use></svg>", name: "insert-after", tipPosition: "n" }, { name: "|" }, { icon: "<svg><use xlink:href=\"#vditor-icon-upload\"></use></svg>", name: "upload", tipPosition: "n" }, { icon: "<svg><use xlink:href=\"#vditor-icon-record\"></use></svg>", name: "record", tipPosition: "n" }, { hotkey: "⌘M", icon: "<svg><use xlink:href=\"#vditor-icon-table\"></use></svg>", name: "table", prefix: "| col1", suffix: ` | col2 | col3 |
| --- | --- | --- |
|  |  |  |
|  |  |  |`, tipPosition: "n" }, { name: "|" }, { hotkey: "⌘Z", icon: "<svg><use xlink:href=\"#vditor-icon-undo\"></use></svg>", name: "undo", tipPosition: "nw" }, { hotkey: "⌘Y", icon: "<svg><use xlink:href=\"#vditor-icon-redo\"></use></svg>", name: "redo", tipPosition: "nw" }, { name: "|" }, { icon: "<svg><use xlink:href=\"#vditor-icon-more\"></use></svg>", name: "more", tipPosition: "e" }, { hotkey: "⌘'", icon: "<svg><use xlink:href=\"#vditor-icon-fullscreen\"></use></svg>", name: "fullscreen", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-edit\"></use></svg>", name: "edit-mode", tipPosition: "nw" }, { hotkey: "⌘P", icon: "<svg><use xlink:href=\"#vditor-icon-both\"></use></svg>", name: "both", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-preview\"></use></svg>", name: "preview", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-align-center\"></use></svg>", name: "outline", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-theme\"></use></svg>", name: "content-theme", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-code-theme\"></use></svg>", name: "code-theme", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-bug\"></use></svg>", name: "devtools", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-info\"></use></svg>", name: "info", tipPosition: "nw" }, { icon: "<svg><use xlink:href=\"#vditor-icon-help\"></use></svg>", name: "help", tipPosition: "nw" }, { name: "br" }], r = [];
            return t.forEach(function(o) {
              var a = o;
              i.forEach(function(d) {
                typeof o == "string" && d.name === o && (a = d), typeof o == "object" && d.name === o.name && (a = Object.assign({}, d, o));
              }), o.toolbar && (a.toolbar = n.mergeToolbar(o.toolbar)), r.push(a);
            }), r;
          }, e;
        }(), mi = function() {
          function e(t) {
            var n = this;
            this.composingLock = !1, this.commentIds = [];
            var i = document.createElement("div");
            i.className = "vditor-wysiwyg", i.innerHTML = "<pre class=\"vditor-reset\" placeholder=\"" + t.options.placeholder + `"
 contenteditable="true" spellcheck="false"></pre>
<div class="vditor-panel vditor-panel--none"></div>
<div class="vditor-panel vditor-panel--none">
    <button type="button" aria-label="` + window.VditorI18n.comment + `" class="vditor-icon vditor-tooltipped vditor-tooltipped__n">
        <svg><use xlink:href="#vditor-icon-comment"></use></svg>
    </button>
</div>`, this.element = i.firstElementChild, this.popover = i.firstElementChild.nextElementSibling, this.selectPopover = i.lastElementChild, this.bindEvent(t), It(t, this.element), sn(t, this.element), jt(t, this.element), Bt(t, this.element), Vt(t, this.element), Rt(t, this.element), Pt(t, this.element, this.copy), qt(t, this.element, this.copy), t.options.comment.enable && (this.selectPopover.querySelector("button").onclick = function() {
              var r, o, a = Lute.NewNodeID(), d = getSelection().getRangeAt(0), v = d.cloneRange(), g = d.extractContents(), h = !1, A = !1;
              g.childNodes.forEach(function(C, R) {
                var q = !1;
                if (C.nodeType === 3 ? q = !0 : C.classList.contains("vditor-comment") ? C.classList.contains("vditor-comment") && C.setAttribute("data-cmtids", C.getAttribute("data-cmtids") + " " + a) : q = !0, q)
                  if (C.nodeType !== 3 && C.getAttribute("data-block") === "0" && R === 0 && v.startOffset > 0)
                    C.innerHTML = "<span class=\"vditor-comment\" data-cmtids=\"" + a + "\">" + C.innerHTML + "</span>", r = C;
                  else if (C.nodeType !== 3 && C.getAttribute("data-block") === "0" && R === g.childNodes.length - 1 && v.endOffset < v.endContainer.textContent.length)
                    C.innerHTML = "<span class=\"vditor-comment\" data-cmtids=\"" + a + "\">" + C.innerHTML + "</span>", o = C;
                  else if (C.nodeType !== 3 && C.getAttribute("data-block") === "0")
                    R === 0 ? h = !0 : R === g.childNodes.length - 1 && (A = !0), C.innerHTML = "<span class=\"vditor-comment\" data-cmtids=\"" + a + "\">" + C.innerHTML + "</span>";
                  else {
                    var D = document.createElement("span");
                    D.classList.add("vditor-comment"), D.setAttribute("data-cmtids", a), C.parentNode.insertBefore(D, C), D.appendChild(C);
                  }
              });
              var O = (0, p.F9)(v.startContainer);
              O && (r ? (O.insertAdjacentHTML("beforeend", r.innerHTML), r.remove()) : O.textContent.trim().replace(y.g.ZWSP, "") === "" && h && O.remove());
              var U = (0, p.F9)(v.endContainer);
              U && (o ? (U.insertAdjacentHTML("afterbegin", o.innerHTML), o.remove()) : U.textContent.trim().replace(y.g.ZWSP, "") === "" && A && U.remove()), d.insertNode(g), t.options.comment.add(a, d.toString(), n.getComments(t, !0)), we(t, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 }), n.hideComment();
            });
          }
          return e.prototype.getComments = function(t, n) {
            var i = this;
            if (n === void 0 && (n = !1), t.currentMode !== "wysiwyg" || !t.options.comment.enable)
              return [];
            this.commentIds = [], this.element.querySelectorAll(".vditor-comment").forEach(function(o) {
              i.commentIds = i.commentIds.concat(o.getAttribute("data-cmtids").split(" "));
            }), this.commentIds = Array.from(new Set(this.commentIds));
            var r = [];
            return n ? (this.commentIds.forEach(function(o) {
              r.push({ id: o, top: i.element.querySelector(".vditor-comment[data-cmtids=\"" + o + "\"]").offsetTop });
            }), r) : void 0;
          }, e.prototype.triggerRemoveComment = function(t) {
            var n, i, r;
            if (t.currentMode === "wysiwyg" && t.options.comment.enable && t.wysiwyg.commentIds.length > 0) {
              var o = JSON.parse(JSON.stringify(this.commentIds));
              this.getComments(t);
              var a = (n = o, i = this.commentIds, r = new Set(i), n.filter(function(d) {
                return !r.has(d);
              }));
              a.length > 0 && t.options.comment.remove(a);
            }
          }, e.prototype.showComment = function() {
            var t = (0, T.Ny)(this.element);
            this.selectPopover.setAttribute("style", "left:" + t.left + "px;display:block;top:" + Math.max(-8, t.top - 21) + "px");
          }, e.prototype.hideComment = function() {
            this.selectPopover.setAttribute("style", "display:none");
          }, e.prototype.unbindListener = function() {
            window.removeEventListener("scroll", this.scrollListener);
          }, e.prototype.copy = function(t, n) {
            var i = getSelection().getRangeAt(0);
            if (i.toString() !== "") {
              t.stopPropagation(), t.preventDefault();
              var r = (0, p.lG)(i.startContainer, "CODE"), o = (0, p.lG)(i.endContainer, "CODE");
              if (r && o && o.isSameNode(r)) {
                var a = "";
                return a = r.parentElement.tagName === "PRE" ? i.toString() : "`" + i.toString() + "`", t.clipboardData.setData("text/plain", a), void t.clipboardData.setData("text/html", "");
              }
              var d = (0, p.lG)(i.startContainer, "A"), v = (0, p.lG)(i.endContainer, "A");
              if (d && v && v.isSameNode(d)) {
                var g = d.getAttribute("title") || "";
                return g && (g = " \"" + g + "\""), t.clipboardData.setData("text/plain", "[" + i.toString() + "](" + d.getAttribute("href") + g + ")"), void t.clipboardData.setData("text/html", "");
              }
              var h = document.createElement("div");
              h.appendChild(i.cloneContents()), t.clipboardData.setData("text/plain", n.lute.VditorDOM2Md(h.innerHTML).trim()), t.clipboardData.setData("text/html", "");
            }
          }, e.prototype.bindEvent = function(t) {
            var n = this;
            this.unbindListener(), window.addEventListener("scroll", this.scrollListener = function() {
              if (E(t, ["hint"]), n.popover.style.display === "block" && n.selectPopover.style.display === "block") {
                var i = parseInt(n.popover.getAttribute("data-top"), 10);
                if (t.options.height === "auto") {
                  if (t.options.toolbarConfig.pin) {
                    var r = Math.max(i, window.scrollY - t.element.offsetTop - 8) + "px";
                    n.popover.style.display === "block" && (n.popover.style.top = r), n.selectPopover.style.display === "block" && (n.selectPopover.style.top = r);
                  }
                } else if (t.options.toolbarConfig.pin && t.toolbar.element.getBoundingClientRect().top === 0) {
                  var o = Math.max(window.scrollY - t.element.offsetTop - 8, Math.min(i - t.wysiwyg.element.scrollTop, n.element.clientHeight - 21)) + "px";
                  n.popover.style.display === "block" && (n.popover.style.top = o), n.selectPopover.style.display === "block" && (n.selectPopover.style.top = o);
                }
              }
            }), this.element.addEventListener("scroll", function() {
              if (E(t, ["hint"]), t.options.comment && t.options.comment.enable && t.options.comment.scroll && t.options.comment.scroll(t.wysiwyg.element.scrollTop), n.popover.style.display === "block") {
                var i = parseInt(n.popover.getAttribute("data-top"), 10) - t.wysiwyg.element.scrollTop, r = -8;
                t.options.toolbarConfig.pin && t.toolbar.element.getBoundingClientRect().top === 0 && (r = window.scrollY - t.element.offsetTop + r);
                var o = Math.max(r, Math.min(i, n.element.clientHeight - 21)) + "px";
                n.popover.style.top = o, n.selectPopover.style.top = o;
              }
            }), this.element.addEventListener("paste", function(i) {
              Mt(t, i, { pasteCode: function(r) {
                var o = (0, T.zh)(t), a = document.createElement("template");
                a.innerHTML = r, o.insertNode(a.content.cloneNode(!0));
                var d = (0, p.a1)(o.startContainer, "data-block", "0");
                d ? d.outerHTML = t.lute.SpinVditorDOM(d.outerHTML) : t.wysiwyg.element.innerHTML = t.lute.SpinVditorDOM(t.wysiwyg.element.innerHTML), (0, T.ib)(t.wysiwyg.element, o);
              } });
            }), this.element.addEventListener("compositionstart", function() {
              n.composingLock = !0;
            }), this.element.addEventListener("compositionend", function(i) {
              var r = (0, x.W)(getSelection().getRangeAt(0).startContainer);
              r && r.textContent === "" ? Ve(t) : ((0, s.vU)() || kt(t, getSelection().getRangeAt(0).cloneRange(), i), n.composingLock = !1);
            }), this.element.addEventListener("input", function(i) {
              if (i.inputType !== "deleteByDrag" && i.inputType !== "insertFromDrop") {
                if (n.preventInput)
                  return n.preventInput = !1, void we(t);
                if (n.composingLock || i.data === "‘" || i.data === "“" || i.data === "《")
                  we(t);
                else {
                  var r = getSelection().getRangeAt(0), o = (0, p.F9)(r.startContainer);
                  if (o || (rn(t, r), o = (0, p.F9)(r.startContainer)), o) {
                    for (var a = (0, T.im)(o, t.wysiwyg.element, r).start, d = !0, v = a - 1; v > o.textContent.substr(0, a).lastIndexOf(`
`); v--)
                      if (o.textContent.charAt(v) !== " " && o.textContent.charAt(v) !== "	") {
                        d = !1;
                        break;
                      }
                    a === 0 && (d = !1);
                    var g = !0;
                    for (v = a - 1; v < o.textContent.length; v++)
                      if (o.textContent.charAt(v) !== " " && o.textContent.charAt(v) !== `
`) {
                        g = !1;
                        break;
                      }
                    var h = (0, x.W)(getSelection().getRangeAt(0).startContainer);
                    h && h.textContent === "" && (Ve(t), h.remove()), d && o.getAttribute("data-type") !== "code-block" || g || Kt(o.innerHTML) || zt(o.innerHTML) && o.previousElementSibling ? typeof t.options.input == "function" && t.options.input(m(t)) : (i.inputType === "insertParagraph" && n.element.innerHTML === "<p><br></p><p><br></p>" && o.previousElementSibling.remove(), kt(t, r, i));
                  }
                }
              }
            }), this.element.addEventListener("click", function(i) {
              if (i.target.tagName === "INPUT") {
                var r = i.target;
                return r.checked ? r.setAttribute("checked", "checked") : r.removeAttribute("checked"), n.preventInput = !0, void we(t);
              }
              if (i.target.tagName !== "IMG" || i.target.parentElement.classList.contains("vditor-wysiwyg__preview")) {
                var o = (0, p.lG)(i.target, "A");
                if (o)
                  return t.options.link.click ? t.options.link.click(o) : t.options.link.isOpen && window.open(o.getAttribute("href")), void i.preventDefault();
                var a = (0, T.zh)(t);
                if (i.target.isEqualNode(n.element) && n.element.lastElementChild && a.collapsed) {
                  var d = n.element.lastElementChild.getBoundingClientRect();
                  i.y > d.top + d.height && (n.element.lastElementChild.tagName === "P" && n.element.lastElementChild.textContent.trim().replace(y.g.ZWSP, "") === "" ? (a.selectNodeContents(n.element.lastElementChild), a.collapse(!1)) : (n.element.insertAdjacentHTML("beforeend", "<p data-block=\"0\">" + y.g.ZWSP + "<wbr></p>"), (0, T.ib)(n.element, a)));
                }
                Qe(t);
                var v = (0, p.fb)(i.target, "vditor-wysiwyg__preview");
                v || (v = (0, p.fb)((0, T.zh)(t).startContainer, "vditor-wysiwyg__preview")), v && pt(v, t), bt(i, t);
              } else
                i.target.getAttribute("data-type") === "link-ref" ? on(t, i.target) : function(g, h) {
                  var A = g.target;
                  h.wysiwyg.popover.innerHTML = "";
                  var O = function() {
                      A.setAttribute("src", C.value), A.setAttribute("alt", q.value), A.setAttribute("title", B.value), typeof h.options.input == "function" && h.options.input(m(h));
                    }, U = document.createElement("span");
                  U.setAttribute("aria-label", window.VditorI18n.imageURL), U.className = "vditor-tooltipped vditor-tooltipped__n";
                  var C = document.createElement("input");
                  U.appendChild(C), C.className = "vditor-input", C.setAttribute("placeholder", window.VditorI18n.imageURL), C.value = A.getAttribute("src") || "", C.oninput = function() {
                    O();
                  }, C.onkeydown = function(P) {
                    De(h, P);
                  };
                  var R = document.createElement("span");
                  R.setAttribute("aria-label", window.VditorI18n.alternateText), R.className = "vditor-tooltipped vditor-tooltipped__n";
                  var q = document.createElement("input");
                  R.appendChild(q), q.className = "vditor-input", q.setAttribute("placeholder", window.VditorI18n.alternateText), q.style.width = "52px", q.value = A.getAttribute("alt") || "", q.oninput = function() {
                    O();
                  }, q.onkeydown = function(P) {
                    De(h, P);
                  };
                  var D = document.createElement("span");
                  D.setAttribute("aria-label", window.VditorI18n.title), D.className = "vditor-tooltipped vditor-tooltipped__n";
                  var B = document.createElement("input");
                  D.appendChild(B), B.className = "vditor-input", B.setAttribute("placeholder", window.VditorI18n.title), B.value = A.getAttribute("title") || "", B.oninput = function() {
                    O();
                  }, B.onkeydown = function(P) {
                    De(h, P);
                  }, Re(A, h), h.wysiwyg.popover.insertAdjacentElement("beforeend", U), h.wysiwyg.popover.insertAdjacentElement("beforeend", R), h.wysiwyg.popover.insertAdjacentElement("beforeend", D), je(h, A);
                }(i, t);
            }), this.element.addEventListener("keyup", function(i) {
              if (!i.isComposing && !(0, s.yl)(i)) {
                i.key === "Enter" && Te(t), i.key !== "Backspace" && i.key !== "Delete" || t.wysiwyg.element.innerHTML === "" || t.wysiwyg.element.childNodes.length !== 1 || !t.wysiwyg.element.firstElementChild || t.wysiwyg.element.firstElementChild.tagName !== "P" || t.wysiwyg.element.firstElementChild.childElementCount !== 0 || t.wysiwyg.element.textContent !== "" && t.wysiwyg.element.textContent !== `
` || (t.wysiwyg.element.innerHTML = "");
                var r = (0, T.zh)(t);
                if (i.key === "Backspace" && (0, s.vU)() && r.startContainer.textContent === `
` && r.startOffset === 1 && (r.startContainer.textContent = ""), rn(t, r), Qe(t), i.key === "ArrowDown" || i.key === "ArrowRight" || i.key === "Backspace" || i.key === "ArrowLeft" || i.key === "ArrowUp") {
                  i.key !== "ArrowLeft" && i.key !== "ArrowRight" || t.hint.render(t);
                  var o = (0, p.fb)(r.startContainer, "vditor-wysiwyg__preview");
                  if (!o && r.startContainer.nodeType !== 3 && r.startOffset > 0 && (d = r.startContainer).classList.contains("vditor-wysiwyg__block") && (o = d.lastElementChild), o)
                    if (o.previousElementSibling.style.display !== "none") {
                      var a = o.previousElementSibling;
                      if (a.tagName === "PRE" && (a = a.firstElementChild), i.key === "ArrowDown" || i.key === "ArrowRight") {
                        var d, v = function(h) {
                          for (var A = h; A && !A.nextSibling; )
                            A = A.parentElement;
                          return A.nextSibling;
                        }(d = o.parentElement);
                        if (v && v.nodeType !== 3) {
                          var g = v.querySelector(".vditor-wysiwyg__preview");
                          if (g)
                            return void pt(g, t);
                        }
                        if (v.nodeType === 3) {
                          for (; v.textContent.length === 0 && v.nextSibling; )
                            v = v.nextSibling;
                          r.setStart(v, 1);
                        } else
                          r.setStart(v.firstChild, 0);
                      } else
                        r.selectNodeContents(a), r.collapse(!1);
                    } else
                      i.key === "ArrowDown" || i.key === "ArrowRight" ? pt(o, t) : pt(o, t, !1);
                }
              }
            });
          }, e;
        }(), fi = /* @__PURE__ */ function() {
          var e = function(t, n) {
            return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
              i.__proto__ = r;
            } || function(i, r) {
              for (var o in r)
                r.hasOwnProperty(o) && (i[o] = r[o]);
            }, e(t, n);
          };
          return function(t, n) {
            function i() {
              this.constructor = t;
            }
            e(t, n), t.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
          };
        }();
      const hi = function(e) {
        function t(n, i) {
          var r = e.call(this) || this;
          if (r.version = y.H, typeof n == "string") {
            if (i ? i.cache ? i.cache.id || (i.cache.id = "vditor" + n) : i.cache = { id: "vditor" + n } : i = { cache: { id: "vditor" + n } }, !document.getElementById(n))
              return r.showErrorTip("Failed to get element by id: " + n), r;
            n = document.getElementById(n);
          }
          var o = new pi(i).merge();
          if (o.i18n)
            window.VditorI18n = o.i18n, r.init(n, o);
          else {
            if (!["en_US", "fr_FR", "pt_BR", "ja_JP", "ko_KR", "ru_RU", "sv_SE", "zh_CN", "zh_TW"].includes(o.lang))
              throw new Error("options.lang error, see https://ld246.com/article/1549638745630#options");
            var a = "vditorI18nScript", d = a + o.lang;
            document.querySelectorAll("head script[id^=\"vditorI18nScript\"]").forEach(function(v) {
              v.id !== d && document.head.removeChild(v);
            }), (0, c.G)(o.cdn + "/dist/js/i18n/" + o.lang + ".js", d).then(function() {
              r.init(n, o);
            }).catch(function(v) {
              r.showErrorTip("GET " + o.cdn + "/dist/js/i18n/" + o.lang + ".js net::ERR_ABORTED 404 (Not Found)");
            });
          }
          return r;
        }
        return fi(t, e), t.prototype.showErrorTip = function(n) {
          var i = new On();
          document.body.appendChild(i.element), i.show(n, 0);
        }, t.prototype.setTheme = function(n, i, r, o) {
          this.vditor.options.theme = n, pe(this.vditor), i && (this.vditor.options.preview.theme.current = i, (0, Ne.Z)(i, o || this.vditor.options.preview.theme.path)), r && (this.vditor.options.preview.hljs.style = r, (0, In.Y)(r, this.vditor.options.cdn));
        }, t.prototype.getValue = function() {
          return m(this.vditor);
        }, t.prototype.getCurrentMode = function() {
          return this.vditor.currentMode;
        }, t.prototype.focus = function() {
          this.vditor.currentMode === "sv" ? this.vditor.sv.element.focus() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.focus() : this.vditor.currentMode === "ir" && this.vditor.ir.element.focus();
        }, t.prototype.blur = function() {
          this.vditor.currentMode === "sv" ? this.vditor.sv.element.blur() : this.vditor.currentMode === "wysiwyg" ? this.vditor.wysiwyg.element.blur() : this.vditor.currentMode === "ir" && this.vditor.ir.element.blur();
        }, t.prototype.disabled = function() {
          E(this.vditor, ["subToolbar", "hint", "popover"]), _(this.vditor.toolbar.elements, y.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "false");
        }, t.prototype.enable = function() {
          w(this.vditor.toolbar.elements, y.g.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"])), this.vditor.undo.resetIcon(this.vditor), this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
        }, t.prototype.getSelection = function() {
          return this.vditor.currentMode === "wysiwyg" ? ft(this.vditor.wysiwyg.element) : this.vditor.currentMode === "sv" ? ft(this.vditor.sv.element) : this.vditor.currentMode === "ir" ? ft(this.vditor.ir.element) : void 0;
        }, t.prototype.renderPreview = function(n) {
          this.vditor.preview.render(this.vditor, n);
        }, t.prototype.getCursorPosition = function() {
          return (0, T.Ny)(this.vditor[this.vditor.currentMode].element);
        }, t.prototype.isUploading = function() {
          return this.vditor.upload.isUploading;
        }, t.prototype.clearCache = function() {
          localStorage.removeItem(this.vditor.options.cache.id);
        }, t.prototype.disabledCache = function() {
          this.vditor.options.cache.enable = !1;
        }, t.prototype.enableCache = function() {
          if (!this.vditor.options.cache.id)
            throw new Error("need options.cache.id, see https://ld246.com/article/1549638745630#options");
          this.vditor.options.cache.enable = !0;
        }, t.prototype.html2md = function(n) {
          return this.vditor.lute.HTML2Md(n);
        }, t.prototype.exportJSON = function(n) {
          return this.vditor.lute.RenderJSON(n);
        }, t.prototype.getHTML = function() {
          return Nn(this.vditor);
        }, t.prototype.tip = function(n, i) {
          this.vditor.tip.show(n, i);
        }, t.prototype.setPreviewMode = function(n) {
          Gt(n, this.vditor);
        }, t.prototype.deleteValue = function() {
          window.getSelection().isCollapsed || document.execCommand("delete", !1);
        }, t.prototype.updateValue = function(n) {
          document.execCommand("insertHTML", !1, n);
        }, t.prototype.insertValue = function(n, i) {
          i === void 0 && (i = !0);
          var r = (0, T.zh)(this.vditor);
          r.collapse(!0);
          var o = document.createElement("template");
          o.innerHTML = n, r.insertNode(o.content.cloneNode(!0)), r.collapse(!1), this.vditor.currentMode === "sv" ? (this.vditor.sv.preventInput = !0, i && oe(this.vditor)) : this.vditor.currentMode === "wysiwyg" ? i && kt(this.vditor, getSelection().getRangeAt(0)) : this.vditor.currentMode === "ir" && (this.vditor.ir.preventInput = !0, i && ge(this.vditor, getSelection().getRangeAt(0), !0));
        }, t.prototype.setValue = function(n, i) {
          var r = this;
          i === void 0 && (i = !1), this.vditor.currentMode === "sv" ? (this.vditor.sv.element.innerHTML = "<div data-block='0'>" + this.vditor.lute.SpinVditorSVDOM(n) + "</div>", He(this.vditor, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 })) : this.vditor.currentMode === "wysiwyg" ? an(this.vditor, n, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 }) : (this.vditor.ir.element.innerHTML = this.vditor.lute.Md2VditorIRDOM(n), this.vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach(function(o) {
            Ce(o, r.vditor);
          }), Fe(this.vditor, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 })), this.vditor.outline.render(this.vditor), n || (E(this.vditor, ["emoji", "headings", "submenu", "hint"]), this.vditor.wysiwyg.popover && (this.vditor.wysiwyg.popover.style.display = "none"), this.clearCache()), i && this.clearStack();
        }, t.prototype.clearStack = function() {
          this.vditor.undo.clearStack(this.vditor), this.vditor.undo.addToUndoStack(this.vditor);
        }, t.prototype.destroy = function() {
          this.vditor.element.innerHTML = this.vditor.originalInnerHTML, this.vditor.element.classList.remove("vditor"), this.vditor.element.removeAttribute("style");
          var n = document.getElementById("vditorIconScript");
          n && n.remove(), this.clearCache(), Ke(), this.vditor.wysiwyg.unbindListener();
        }, t.prototype.getCommentIds = function() {
          return this.vditor.currentMode !== "wysiwyg" ? [] : this.vditor.wysiwyg.getComments(this.vditor, !0);
        }, t.prototype.hlCommentIds = function(n) {
          if (this.vditor.currentMode === "wysiwyg") {
            var i = function(r) {
              r.classList.remove("vditor-comment--hover"), n.forEach(function(o) {
                r.getAttribute("data-cmtids").indexOf(o) > -1 && r.classList.add("vditor-comment--hover");
              });
            };
            this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(r) {
              i(r);
            }), this.vditor.preview.element.style.display !== "none" && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(r) {
              i(r);
            });
          }
        }, t.prototype.unHlCommentIds = function(n) {
          if (this.vditor.currentMode === "wysiwyg") {
            var i = function(r) {
              n.forEach(function(o) {
                r.getAttribute("data-cmtids").indexOf(o) > -1 && r.classList.remove("vditor-comment--hover");
              });
            };
            this.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(r) {
              i(r);
            }), this.vditor.preview.element.style.display !== "none" && this.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(r) {
              i(r);
            });
          }
        }, t.prototype.removeCommentIds = function(n) {
          var i = this;
          if (this.vditor.currentMode === "wysiwyg") {
            var r = function(o, a) {
              var d = o.getAttribute("data-cmtids").split(" ");
              d.find(function(v, g) {
                if (v === a)
                  return d.splice(g, 1), !0;
              }), d.length === 0 ? (o.outerHTML = o.innerHTML, (0, T.zh)(i.vditor).collapse(!0)) : o.setAttribute("data-cmtids", d.join(" "));
            };
            n.forEach(function(o) {
              i.vditor.wysiwyg.element.querySelectorAll(".vditor-comment").forEach(function(a) {
                r(a, o);
              }), i.vditor.preview.element.style.display !== "none" && i.vditor.preview.element.querySelectorAll(".vditor-comment").forEach(function(a) {
                r(a, o);
              });
            }), we(this.vditor, { enableAddUndoStack: !0, enableHint: !1, enableInput: !1 });
          }
        }, t.prototype.init = function(n, i) {
          var r = this;
          this.vditor = { currentMode: i.mode, element: n, hint: new lr(i.hint.extend), lute: void 0, options: i, originalInnerHTML: n.innerHTML, outline: new ur(window.VditorI18n.outline), tip: new On() }, this.vditor.sv = new hr(this.vditor), this.vditor.undo = new di(), this.vditor.wysiwyg = new mi(this.vditor), this.vditor.ir = new cr(this.vditor), this.vditor.toolbar = new li(this.vditor), i.resize.enable && (this.vditor.resize = new fr(this.vditor)), this.vditor.toolbar.elements.devtools && (this.vditor.devtools = new b()), (i.upload.url || i.upload.handler) && (this.vditor.upload = new Yn()), (0, c.G)(i._lutePath || i.cdn + "/dist/js/lute/lute.min.js", "vditorLuteScript").then(function() {
            r.vditor.lute = (0, dr.X)({ autoSpace: r.vditor.options.preview.markdown.autoSpace, gfmAutoLink: r.vditor.options.preview.markdown.gfmAutoLink, codeBlockPreview: r.vditor.options.preview.markdown.codeBlockPreview, emojiSite: r.vditor.options.hint.emojiPath, emojis: r.vditor.options.hint.emoji, fixTermTypo: r.vditor.options.preview.markdown.fixTermTypo, footnotes: r.vditor.options.preview.markdown.footnotes, headingAnchor: !1, inlineMathDigit: r.vditor.options.preview.math.inlineDigit, linkBase: r.vditor.options.preview.markdown.linkBase, linkPrefix: r.vditor.options.preview.markdown.linkPrefix, listStyle: r.vditor.options.preview.markdown.listStyle, mark: r.vditor.options.preview.markdown.mark, mathBlockPreview: r.vditor.options.preview.markdown.mathBlockPreview, paragraphBeginningSpace: r.vditor.options.preview.markdown.paragraphBeginningSpace, sanitize: r.vditor.options.preview.markdown.sanitize, toc: r.vditor.options.preview.markdown.toc }), r.vditor.preview = new mr(r.vditor), function(o) {
              o.element.innerHTML = "", o.element.classList.add("vditor"), o.options.rtl && o.element.setAttribute("dir", "rtl"), pe(o), (0, Ne.Z)(o.options.preview.theme.current, o.options.preview.theme.path), typeof o.options.height == "number" ? o.element.style.height = o.options.height + "px" : o.element.style.height = o.options.height, typeof o.options.minHeight == "number" && (o.element.style.minHeight = o.options.minHeight + "px"), typeof o.options.width == "number" ? o.element.style.width = o.options.width + "px" : o.element.style.width = o.options.width, o.element.appendChild(o.toolbar.element);
              var a = document.createElement("div");
              if (a.className = "vditor-content", o.options.outline.position === "left" && a.appendChild(o.outline.element), a.appendChild(o.wysiwyg.element.parentElement), a.appendChild(o.sv.element), a.appendChild(o.ir.element.parentElement), a.appendChild(o.preview.element), o.toolbar.elements.devtools && a.appendChild(o.devtools.element), o.options.outline.position === "right" && (o.outline.element.classList.add("vditor-outline--right"), a.appendChild(o.outline.element)), o.upload && a.appendChild(o.upload.element), o.options.resize.enable && a.appendChild(o.resize.element), a.appendChild(o.hint.element), a.appendChild(o.tip.element), o.element.appendChild(a), a.addEventListener("click", function() {
                E(o, ["subToolbar"]);
              }), o.toolbar.elements.export && o.element.insertAdjacentHTML("beforeend", "<iframe id=\"vditorExportIframe\" style=\"width: 100%;height: 0;border: 0\"></iframe>"), Ye(o, o.options.mode, Kn(o)), document.execCommand("DefaultParagraphSeparator", !1, "p"), navigator.userAgent.indexOf("iPhone") > -1 && window.visualViewport !== void 0) {
                var d = !1, v = function(g) {
                  d || (d = !0, requestAnimationFrame(function() {
                    d = !1;
                    var h = o.toolbar.element;
                    h.style.transform = "none", h.getBoundingClientRect().top < 0 && (h.style.transform = "translate(0, " + -h.getBoundingClientRect().top + "px)");
                  }));
                };
                window.visualViewport.addEventListener("scroll", v), window.visualViewport.addEventListener("resize", v);
              }
            }(r.vditor), i.after && i.after(), i.icon && (0, c.J)(i.cdn + "/dist/js/icons/" + i.icon + ".js", "vditorIconScript");
          });
        }, t;
      }(L.default);
    })(), Se = Se.default;
  })());
})(zn);
var Mi = zn.exports;
const Ti = /* @__PURE__ */ Ci(Mi);
function Yt(fe) {
  let he = fe.srcElement;
  he.src = "data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAY0lEQVR4Xu2TQQoAIQwD/bw/8I0L/sKTELaW5KAIkpCTnTqnltr6sh8kTnWmxCd9WWEeECCEyT7CKIwFlLGAMucFCGULcaozFlAmFeyqBbTpoe2KBTQW0NwT4LH8ZzMKYwFlBkgVqojTTfZKAAAAAElFTkSuQmCC", he.onerror = null;
}
function Ai(fe) {
  const he = new Date(fe), ke = he.getFullYear(), be = he.getMonth() + 1, J = he.getDate(), Se = /* @__PURE__ */ new Date(), Z = Se.getFullYear(), L = Se.getMonth() + 1, y = Se.getDate();
  if (Z === ke && L == be) {
    const l = y - J;
    if (l === 0)
      return "今天";
    if (l < 7)
      return l + "天前";
  }
  return Z === ke ? `${be}月${J}日` : `${ke}年${be}月${J}日`;
}
const xi = { class: "sus-comment flex flex-row w-full" }, Hi = {
    class: "sus-comment-avatar",
    title: "输入QQ邮箱自动获取头像"
  }, Ni = ["src", "onerror"], Di = { class: "sus-comment__main" }, Oi = { class: "sus-comment__info my-1" }, Ii = { class: "sus-comment__info-input" }, ji = { class: "sus-comment__info-input" }, Ri = { class: "sus-comment__info-input" }, Pi = ["id"], qi = /* @__PURE__ */ Ht({
    __name: "index",
    props: {
      vId: { default: "sus-vditor" },
      cache: { type: Boolean, default: !1 },
      reply: {},
      emoji: {}
    },
    emits: ["on-save", "on-cancel"],
    setup(fe, { emit: he }) {
      class ke {
        constructor() {
          We(this, "articleId", "");
          We(this, "userName", "");
          We(this, "userEmail", "");
          We(this, "userWebsite", "");
          We(this, "userAvatar", "");
          We(this, "content", "");
          We(this, "contentMD", "");
          We(this, "replyName", "");
          We(this, "parentId", "");
        }
      }
      const be = fe, J = he, Se = be.reply.userName, Z = yt("在此处留下你的足迹吧！（支持markdown语法）"), L = yi(new ke()), y = yt(null);
      async function l() {
        var f, w;
        if (!y.value) {
          J("on-save", L);
          return;
        }
        const s = (f = y.value) == null ? void 0 : f.getHTML(), u = (w = y.value) == null ? void 0 : w.getValue();
        if (L.userWebsite && (L.userWebsite.concat("http://") || L.userWebsite.concat("https://") || (L.userWebsite = "https://" + L.userWebsite)), localStorage.setItem("user", JSON.stringify(L)), be.reply.id != "0") {
          const _ = be.reply.parentId;
          L.parentId = _ === "0" ? be.reply.id : _, L.replyName = be.reply.userName, Z.value = "@" + Se + ":";
        }
        L.content = s, L.contentMD = u, J("on-save", L), y.value.setValue("");
      }
      function m() {
        J("on-cancel");
      }
      function c() {
        y.value = new Ti(be.vId, {
          after: () => {
          },
          placeholder: Z.value,
          theme: "classic",
          // 使用localStorage缓存
          cache: {
            enable: be.cache
          },
          icon: "material",
          // cdn: "https://s.ahzoo.cn/comment/plugin",
          // 工具栏
          toolbar: ["emoji", "link", "code", "inline-code"],
          preview: {
            hljs: {
              enable: !0,
              style: "base16-snazzy",
              langs: ["java", "html", "javascript"]
            }
          }
        });
      }
      function b() {
        var s;
        L.userEmail.trim().endsWith("@qq.com") && (L.userAvatar = "https://thirdqq.qlogo.cn/g?b=sdk&nk=" + ((s = L.userEmail) == null ? void 0 : s.replace("@qq.com", "").trim()) + "&s=140");
      }
      return Wn(() => {
        c();
        const s = localStorage.getItem("user");
        if (s) {
          const u = JSON.parse(s);
          L.userName = u.userName, L.userEmail = u.userEmail, L.userWebsite = u.userWebsite, b();
        }
      }), (s, u) => (qe(), ze("div", xi, [
        ce("div", Hi, [
          ce("img", {
            src: L.userAvatar,
            class: "sus-avatar",
            onerror: xt(Yt)
          }, null, 8, Ni)
        ]),
        ce("div", Di, [
          ce("div", Oi, [
            ce("div", Ii, [
              Jt(ce("input", {
                class: "sus-input sus-username",
                placeholder: "昵称(必填)",
                "onUpdate:modelValue": u[0] || (u[0] = (f) => L.userName = f),
                maxlength: "23"
              }, null, 512), [
                [Xt, L.userName]
              ])
            ]),
            ce("div", ji, [
              Jt(ce("input", {
                class: "sus-input sus-web",
                title: "点击昵称时可跳转",
                placeholder: "网址",
                "onUpdate:modelValue": u[1] || (u[1] = (f) => L.userWebsite = f),
                maxlength: "35"
              }, null, 512), [
                [Xt, L.userWebsite]
              ])
            ]),
            ce("div", Ri, [
              Jt(ce("input", {
                onBlur: b,
                title: "邮箱仅用于通知回复，不会公开",
                class: "sus-input sus-email",
                placeholder: "邮箱(不会公开，仅用于通知回复)",
                "onUpdate:modelValue": u[2] || (u[2] = (f) => L.userEmail = f),
                maxlength: "35"
              }, null, 544), [
                [Xt, L.userEmail]
              ])
            ])
          ]),
          ce("div", {
            id: s.vId,
            class: "sus-comment__editor h-full w-full"
          }, null, 8, Pi),
          ce("div", { class: "sus-comment__footer" }, [
            ce("div", { class: "sus-comment__footer-send flex justify-end my-2" }, [
              ce("button", {
                class: "sus-button cancel mx-2",
                onClick: m
              }, "取消"),
              ce("button", {
                class: "sus-button ok",
                onClick: l
              }, "发送")
            ])
          ])
        ])
      ]));
    }
  }), Nt = (fe, he) => {
    const ke = fe.__vccOpts || fe;
    for (const [be, J] of he)
      ke[be] = J;
    return ke;
  }, Bi = /* @__PURE__ */ Nt(qi, [["__scopeId", "data-v-f0c81316"]]), Vi = { class: "sus-item__container flex flex-row" }, Ui = { class: "sus-comment-avatar" }, Wi = ["src", "onerror"], zi = { class: "sus-item__main" }, Ki = { class: "sus-item__user leading-loose" }, Fi = ["href"], Gi = { class: "sus-item__user-date ml-5" }, Zi = { class: "sus-item__content" }, $i = {
    key: 0,
    class: "sus-item__content-name font-semibold"
  }, Ji = ["innerHTML"], Xi = { class: "sus-item__info" }, Qi = { class: "sus-item__info-ip" }, Yi = /* @__PURE__ */ wi("<svg class=\"sus-svg equipment\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 16 16\" data-v-3c1f21df><defs data-v-3c1f21df><linearGradient id=\"a2\" x1=\"50%\" x2=\"50%\" y1=\"0%\" y2=\"100%\" data-v-3c1f21df><stop offset=\"0%\" stop-color=\"#FF6680\" data-v-3c1f21df></stop><stop offset=\"100%\" stop-color=\"#E61739\" data-v-3c1f21df></stop></linearGradient><filter id=\"c2\" width=\"118.8%\" height=\"118.8%\" x=\"-9.4%\" y=\"-9.4%\" filterUnits=\"objectBoundingBox\" data-v-3c1f21df><feGaussianBlur in=\"SourceAlpha\" result=\"shadowBlurInner1\" stdDeviation=\"1\" data-v-3c1f21df></feGaussianBlur><feOffset dy=\"-1\" in=\"shadowBlurInner1\" result=\"shadowOffsetInner1\" data-v-3c1f21df></feOffset><feComposite in=\"shadowOffsetInner1\" in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\" result=\"shadowInnerInner1\" data-v-3c1f21df></feComposite><feColorMatrix in=\"shadowInnerInner1\" values=\"0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0\" data-v-3c1f21df></feColorMatrix></filter><path id=\"b2\" d=\"M8 0a8 8 0 100 16A8 8 0 008 0z\" data-v-3c1f21df></path></defs><g fill=\"none\" data-v-3c1f21df><use fill=\"url(#a2)\" xlink:href=\"#b2\" data-v-3c1f21df></use><use fill=\"black\" filter=\"url(#c2)\" xlink:href=\"#b2\" data-v-3c1f21df></use><path fill=\"white\" d=\"M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41\" data-v-3c1f21df></path></g></svg><svg class=\"sus-svg comment\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" data-v-3c1f21df><g opacity=\"1\" transform=\"translate(0 0)  rotate(0)\" data-v-3c1f21df><mask id=\"bg-comment-mask-0\" fill=\"white\" data-v-3c1f21df><use transform=\"translate(0 0)  rotate(0)\" xlink:href=\"#ahzoo_comment_0\" data-v-3c1f21df></use></mask><g mask=\"url(#bg-comment-mask-0)\" data-v-3c1f21df><g opacity=\"1\" transform=\"translate(0 0)  rotate(0)\" data-v-3c1f21df><path id=\"ah1\" fill-rule=\"evenodd\" fill=\"url(#comment_linear_0)\" opacity=\"1\" d=\"M0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0C3.58 0 0 3.58 0 8Z\" data-v-3c1f21df></path></g><g opacity=\"1\" transform=\"translate(2 2)  rotate(0)\" data-v-3c1f21df><mask id=\"bg-comment-mask-1\" fill=\"white\" data-v-3c1f21df><use transform=\"translate(0 0)  rotate(0)\" xlink:href=\"#ahzoo_comment_1\" data-v-3c1f21df></use></mask><g mask=\"url(#bg-comment-mask-1)\" data-v-3c1f21df><path id=\"ahzoo_comment_path_1\" fill-rule=\"evenodd\" style=\"fill:#FFFFFF;\" opacity=\"1\" d=\"M4.65402 2.58221C2.49402 2.58221 0.744019 3.99221 0.744019 5.73221C0.744019 6.45221 1.04402 7.11222 1.55402 7.64221L1.55402 7.65222L1.31402 8.91222C1.29402 9.01221 1.39402 9.09222 1.48402 9.06222L2.69402 8.64222L2.94402 8.55221C3.45402 8.76221 4.04402 8.87222 4.65402 8.87222C6.82402 8.87222 8.57402 7.46221 8.57402 5.73221C8.57402 3.99221 6.82402 2.58221 4.65402 2.58221Z\" data-v-3c1f21df></path><path id=\"ahzoo_comment_path_2\" fill-rule=\"evenodd\" style=\"fill:#FFFFFF;\" opacity=\"1\" d=\"M10.6503 8.36141C11.0303 7.96141 11.2603 7.47141 11.2603 6.93141C11.2603 5.74141 10.3203 4.65141 8.89029 4.51141C9.20029 4.94141 9.19029 5.55141 9.19029 6.08141C9.19029 7.37141 8.16029 8.56141 6.73029 8.97141C7.19029 9.22141 7.75029 9.27141 8.35029 9.27141C8.80029 9.27141 9.24029 9.18141 9.62029 9.03141L9.81029 9.10141L10.7003 9.41141C10.7703 9.44141 10.8503 9.37141 10.8303 9.30141L10.6603 8.37141L10.6503 8.36141Z\" data-v-3c1f21df></path></g></g></g></g><defs data-v-3c1f21df><rect id=\"ahzoo_comment_0\" x=\"0\" y=\"0\" width=\"16\" height=\"16\" data-v-3c1f21df></rect><linearGradient id=\"comment_linear_0\" x1=\"50%\" y1=\"0%\" x2=\"51%\" y2=\"100%\" gradientUnits=\"objectBoundingBox\" data-v-3c1f21df><stop offset=\"0\" stop-color=\"#1AAFFF\" stop-opacity=\"1\" data-v-3c1f21df></stop><stop offset=\"1\" stop-color=\"#0261DE\" stop-opacity=\"1\" data-v-3c1f21df></stop></linearGradient><rect id=\"ahzoo_comment_1\" x=\"0\" y=\"0\" width=\"12\" height=\"12\" data-v-3c1f21df></rect></defs></svg>", 2), eo = [
    Yi
  ], to = /* @__PURE__ */ Ht({
    __name: "item",
    props: {
      comment: {}
    },
    emits: ["on-reply"],
    setup(fe, { emit: he }) {
      const ke = fe, be = yt(), J = yt(!1), Se = he;
      function Z() {
        be.value.style.display = "block", J.value = !1;
      }
      function L() {
        be.value.clientHeight > 110 && (J.value = !0);
      }
      function y() {
        Se("on-reply", ke.comment);
      }
      return Wn(() => {
        L();
      }), (l, m) => (qe(), ze("div", Vi, [
        ce("div", Ui, [
          ce("img", {
            alt: "",
            class: "sus-avatar",
            loading: "lazy",
            decoding: "async",
            src: l.comment.userAvatar,
            onerror: xt(Yt)
          }, null, 8, Wi)
        ]),
        ce("div", zi, [
          ce("div", Ki, [
            ce("a", {
              target: "_blank",
              rel: "noreferrer noopener",
              href: l.comment.userWebsite,
              class: bi(["sus-item__user-name font-semibold ml-1", { master: l.comment.tagName === "博主" }])
            }, tt(l.comment.userName), 11, Fi),
            ce("span", Gi, tt(xt(Ai)(l.comment.createdDate)), 1)
          ]),
          ce("div", Zi, [
            l.comment.replyName ? (qe(), ze("span", $i, "@" + tt(l.comment.replyName) + "：", 1)) : nt("", !0),
            ce("span", {
              ref_key: "contentDom",
              ref: be,
              class: "sus-item__content-text",
              innerHTML: l.comment.content
            }, null, 8, Ji),
            J.value ? (qe(), ze("a", {
              key: 1,
              class: "sus-show-detail",
              onClick: Z
            }, "显示更多")) : nt("", !0)
          ]),
          ce("div", Xi, [
            ce("span", Qi, tt(l.comment.area), 1),
            ce("span", {
              onClick: y,
              class: "sus-item__info-reply",
              title: "回复"
            }, eo)
          ])
        ])
      ]));
    }
  }), Qt = /* @__PURE__ */ Nt(to, [["__scopeId", "data-v-3c1f21df"]]), no = { class: "sus-comment__item" }, ro = { class: "sus-comment__item-child" }, io = { key: 1 }, oo = { class: "sus-comment__item-footer flex justify-center w-auto" }, ao = /* @__PURE__ */ Ht({
    __name: "index",
    props: {
      comment: {}
    },
    emits: ["on-reply"],
    setup(fe, { emit: he }) {
      const ke = yt(!1), be = he;
      function J(Se) {
        be("on-reply", Se);
      }
      return (Se, Z) => {
        var L, y;
        return qe(), ze("div", no, [
          Ei(Qt, {
            comment: Se.comment,
            onOnReply: Z[0] || (Z[0] = (l) => J(Se.comment))
          }, null, 8, ["comment"]),
          ce("div", ro, [
            ((L = Se.comment.child) == null ? void 0 : L.length) > 0 ? (qe(), Un(Qt, {
              key: 0,
              onOnReply: Z[1] || (Z[1] = (l) => J(Se.comment)),
              comment: Se.comment.child[0]
            }, null, 8, ["comment"])) : nt("", !0),
            ki(" " + tt(Se.comment.showMore) + " ", 1),
            ((y = Se.comment.child) == null ? void 0 : y.length) > 1 ? (qe(), ze("div", io, [
              ce("div", oo, [
                ke.value ? nt("", !0) : (qe(), ze("button", {
                  key: 0,
                  class: "sus-load-more",
                  onClick: Z[2] || (Z[2] = (l) => ke.value = !0)
                }, " 查看更多回复 "))
              ]),
              ke.value ? (qe(!0), ze(Si, { key: 0 }, Li(Se.comment.child.slice(1), (l, m) => (qe(), Un(Qt, {
                onOnReply: Z[3] || (Z[3] = (c) => J(Se.comment)),
                key: m,
                comment: l
              }, null, 8, ["comment"]))), 128)) : nt("", !0)
            ])) : nt("", !0)
          ])
        ]);
      };
    }
  }), so = /* @__PURE__ */ Nt(ao, [["__scopeId", "data-v-7de7388c"]]), lo = { class: "sus-top-item__user flex items-center" }, co = {
    key: 0,
    class: "sus-top-item__user-avatar ml-1 mr-2"
  }, uo = ["src", "onerror"], po = { class: "sus-top-item__user-owner" }, mo = { class: "sus-top-item__user-reply ml-3 opacity-70" }, fo = ["innerHTML"], ho = /* @__PURE__ */ Ht({
    __name: "index",
    props: {
      comment: {}
    },
    emits: ["go-local"],
    setup(fe, { emit: he }) {
      const ke = he;
      function be() {
        ke("go-local");
      }
      return (J, Se) => (qe(), ze("div", {
        class: "sus-top-item p-1.5 cursor-pointer",
        onClick: be
      }, [
        ce("div", lo, [
          J.comment.userAvatar ? (qe(), ze("div", co, [
            ce("img", {
              alt: "",
              class: "sus-avatar",
              loading: "lazy",
              decoding: "async",
              src: J.comment.userAvatar,
              onerror: xt(Yt)
            }, null, 8, uo)
          ])) : nt("", !0),
          ce("div", po, tt(J.comment.userName), 1),
          ce("div", mo, tt(J.comment.replyName ? "@" + J.comment.replyName : ""), 1)
        ]),
        ce("div", {
          class: "sus-top-item__content p-1",
          innerHTML: J.comment.content
        }, null, 8, fo)
      ]));
    }
  }), vo = /* @__PURE__ */ Nt(ho, [["__scopeId", "data-v-2348efc6"]]), go = [Bi, so, vo], wo = {
    install(fe) {
      go.forEach((he) => {
        fe.component(he.name, he);
      });
    }
  };
export {
  Bi as SuSComment,
  so as SuSList,
  vo as SuSTop,
  wo as default
};
