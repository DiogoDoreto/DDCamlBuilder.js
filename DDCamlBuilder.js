// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  (function() {
    var c, caml, v, _fn, _fn1, _fn2, _fn3, _global, _i, _j, _k, _l, _len, _len1, _len2, _len3, _previousCaml, _ref, _ref1, _ref2, _ref3;
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
        return "" + ind + "<" + this.comparator + ">\n" + (this.field.toString(level + 1)) + (this.value != null ? '\n' + this.value.toString(level + 1) : '') + "\n" + ind + "</" + this.comparator + ">";
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

        this.add.apply(this, comparators);
      }

      Condition.prototype.toString = function(level) {
        var i, ind;
        if (level == null) {
          level = 0;
        }
        if (this.side_b == null) {
          return this.side_a.toString(level);
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
          this.side_b = new caml.Condition(this.condition, this.side_b, comparator);
        }
        return this;
      };

      return Condition;

    })();
    caml.Query = (function() {

      Query.prototype.orderByFields = [];

      function Query(condition, orderByFields) {
        this.condition = condition;
        this.addOrderBy = __bind(this.addOrderBy, this);

        this.toString = __bind(this.toString, this);

        this.addOrderBy(orderByFields);
      }

      Query.prototype.toString = function(level) {
        var i, ind, orderByQuery, whereQuery;
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
        whereQuery = '';
        if (this.condition != null) {
          whereQuery = "\n" + ind + "  <Where>\n" + (this.condition.toString(level + 2)) + "\n" + ind + "  </Where>";
        }
        orderByQuery = '';
        if (this.orderByFields.length > 0) {
          orderByQuery = "\n" + ind + "  <OrderBy>\n" + ind + "    " + (this.orderByFields.join('\n    ' + ind)) + "\n" + ind + "  </OrderBy>";
        }
        return "" + ind + "<Query>" + whereQuery + orderByQuery + "\n" + ind + "</Query>";
      };

      Query.prototype.addOrderBy = function(_orderByFields) {
        var f;
        if (_orderByFields == null) {
          _orderByFields = [];
        }
        if (Object.prototype.toString.call(_orderByFields) !== '[object Array]') {
          _orderByFields = [_orderByFields];
        }
        _orderByFields = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = _orderByFields.length; _i < _len; _i++) {
            f = _orderByFields[_i];
            if (f instanceof caml.Field) {
              _results.push(f);
            } else {
              _results.push(new caml.Field(f));
            }
          }
          return _results;
        })();
        return this.orderByFields = this.orderByFields.concat(_orderByFields);
      };

      return Query;

    })();
    _ref = ['And', 'Or'];
    _fn = function(c) {
      return caml[c] = function() {
        var comparators;
        comparators = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(caml.Condition, [c].concat(__slice.call(comparators)), function(){});
      };
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      _fn(c);
    }
    _ref1 = ['BeginsWith', 'Contains', 'DateRangesOverlap', 'Eq', 'Geq', 'Gt', 'Includes', 'Leq', 'Lt', 'Neq', 'NotIncludes'];
    _fn1 = function(c) {
      return caml[c] = function(field, value) {
        if (!(field instanceof caml.Field)) {
          field = new caml.Field(field);
        }
        return new caml.Comparator(c, field, value);
      };
    };
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      c = _ref1[_j];
      _fn1(c);
    }
    _ref2 = ['IsNotNull', 'IsNull'];
    _fn2 = function(c) {
      return caml[c] = function(field) {
        if (!(field instanceof caml.Field)) {
          field = new caml.Field(field);
        }
        return new caml.Comparator(c, field);
      };
    };
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      c = _ref2[_k];
      _fn2(c);
    }
    _ref3 = ['Integer', 'Text', 'Note', 'DateTime', 'Counter', 'Choice', 'Lookup', 'Boolean', 'Number', 'Currency', 'URL', 'Computed', 'Threading', 'Guid', 'MultiChoice', 'GridChoice', 'Calculated', 'File', 'Attachments', 'User', 'Recurrence', 'CrossProjectLink', 'ModStat', 'ContentTypeId', 'PageSeparator', 'ThreadIndex', 'WorkflowStatus', 'AllDayEvent', 'WorkflowEventType'];
    _fn3 = function(v) {
      return caml[v] = function(val) {
        return new caml.Value(val, v);
      };
    };
    for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
      v = _ref3[_l];
      _fn3(v);
    }
    if (typeof module !== "undefined" && module !== null) {
      return module.exports = caml;
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
