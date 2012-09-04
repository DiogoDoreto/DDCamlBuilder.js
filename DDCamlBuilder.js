// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  (function() {
    var caml, _global, _previousCaml;
    caml = {};
    caml.Value = (function() {

      function Value(value, type) {
        this.value = value;
        this.type = type;
        this.toString = __bind(this.toString, this);

      }

      Value.prototype.toString = function(level) {
        var i, ind;
        if (level == null) {
          level = 0;
        }
        ind = ((function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = level * 2; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(' ');
          }
          return _results;
        })()).join('');
        return "" + ind + "<Value Type='" + this.type + "'>" + this.value + "</Value>";
      };

      return Value;

    })();
    caml.Field = (function() {

      function Field(name, options) {
        this.name = name;
        this.options = options != null ? options : {};
        this.toString = __bind(this.toString, this);

        this.getOptionsString = __bind(this.getOptionsString, this);

      }

      Field.prototype.getOptionsString = function() {
        var k, v;
        return ((function() {
          var _ref, _results;
          _ref = this.options;
          _results = [];
          for (k in _ref) {
            if (!__hasProp.call(_ref, k)) continue;
            v = _ref[k];
            _results.push("" + k + "=\"" + v + "\" ");
          }
          return _results;
        }).call(this)).join('');
      };

      Field.prototype.toString = function(level) {
        var i, ind;
        if (level == null) {
          level = 0;
        }
        ind = ((function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = level * 2; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(' ');
          }
          return _results;
        })()).join('');
        return "" + ind + "<FieldRef Name='" + this.name + "' " + (this.getOptionsString()) + "/>";
      };

      return Field;

    })();
    caml.Comparator = (function() {

      function Comparator(comparator, field, value) {
        this.comparator = comparator;
        this.field = field != null ? field : null;
        this.value = value != null ? value : null;
        this.toString = __bind(this.toString, this);

      }

      Comparator.prototype.toString = function(level) {
        var i, ind, _ref;
        if (level == null) {
          level = 0;
        }
        ind = ((function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = level * 2; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(' ');
          }
          return _results;
        })()).join('');
        return "" + ind + "<" + this.comparator + ">\n" + (this.field.toString(level + 1)) + "\n" + ((_ref = this.value) != null ? _ref.toString(level + 1) : void 0) + "\n" + ind + "</" + this.comparator + ">";
      };

      return Comparator;

    })();
    caml.Condition = (function() {

      function Condition() {
        var comparators, condition;
        condition = arguments[0], comparators = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        this.condition = condition;
        this.add = __bind(this.add, this);

        this.toString = __bind(this.toString, this);

        this.side_a = null;
        this.side_b = null;
        this.add.apply(this, comparators);
      }

      Condition.prototype.toString = function(level) {
        var i, ind;
        if (level == null) {
          level = 0;
        }
        ind = ((function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = level * 2; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(' ');
          }
          return _results;
        })()).join('');
        return "" + ind + "<" + this.condition + ">\n" + (this.side_a.toString(level + 1)) + "\n" + (this.side_b.toString(level + 1)) + "\n" + ind + "</" + this.condition + ">";
      };

      Condition.prototype.add = function() {
        var comparator, comparators, _i, _len;
        comparators = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        for (_i = 0, _len = comparators.length; _i < _len; _i++) {
          comparator = comparators[_i];
          if (this.side_a == null) {
            this.side_a = comparator;
            continue;
          }
          if (this.side_b == null) {
            this.side_b = comparator;
            continue;
          }
          if (this.side_b instanceof caml.Comparator) {
            this.side_b = new caml.Condition(this.condition, this.side_b, comparator);
            continue;
          }
          if (this.side_b instanceof caml.Condition) {
            this.side_b.add(comparator);
            continue;
          }
        }
        return this;
      };

      return Condition;

    })();
    caml.Query = (function() {

      function Query(condition) {
        this.condition = condition != null ? condition : null;
        this.toString = __bind(this.toString, this);

      }

      Query.prototype.toString = function(level) {
        var i, ind;
        if (level == null) {
          level = 0;
        }
        ind = ((function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = level * 2; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(' ');
          }
          return _results;
        })()).join('');
        return "" + ind + "<Query>\n" + ind + "  <Where>\n" + (this.condition.toString(level + 2)) + "\n" + ind + "  </Where>\n" + ind + "</Query>";
      };

      return Query;

    })();
    caml.Or = function() {
      var comparators;
      comparators = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(caml.Condition, ['Or'].concat(__slice.call(comparators)), function(){});
    };
    caml.And = function() {
      var comparators;
      comparators = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(caml.Condition, ['And'].concat(__slice.call(comparators)), function(){});
    };
    caml.Eq = function(field, value) {
      if (!(field instanceof caml.Field)) {
        field = new caml.Field(field);
      }
      return new caml.Comparator('Eq', field, value);
    };
    caml.Text = function(val) {
      return new caml.Value(val, 'Text');
    };
    if (typeof module !== "undefined" && module !== null) {
      return typeof module !== "undefined" && module !== null ? module.exports = caml : void 0;
    } else {
      _global = this;
      _previousCaml = _global.caml;
      caml.noConflict = function() {
        _global.caml = _previousCaml;
        return caml;
      };
      return _global.caml = caml;
    }
  })();

}).call(this);