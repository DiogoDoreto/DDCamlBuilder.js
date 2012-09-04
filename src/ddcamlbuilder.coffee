do ->
  caml = {}

  class caml.Value
    constructor: (@value, @type) ->
    toString: (level = 0) =>
      ind = (' ' for i in [0...level*2]).join('')
      "#{ind}<Value Type='#{@type}'>#{@value}</Value>"

  class caml.Field
    constructor: (@name, @options = {}) ->
    getOptionsString: =>
      ("#{k}=\"#{v}\" " for own k, v of @options).join('')
    toString: (level = 0) =>
      ind = (' ' for i in [0...level*2]).join('')
      "#{ind}<FieldRef Name='#{@name}' #{@getOptionsString()}/>"

  class caml.Comparator
    constructor: (@comparator, @field = null, @value = null) ->
    toString: (level = 0) =>
      ind = (' ' for i in [0...level*2]).join('')
      """
      #{ind}<#{@comparator}>
      #{@field.toString(level+1)}#{if @value? then '\n'+@value.toString(level+1) else ''}
      #{ind}</#{@comparator}>
      """

  class caml.Condition
    constructor: (@condition, comparators...) ->
      @add comparators...
    toString: (level = 0) =>
      return @side_a.toString(level) unless @side_b?

      ind = (' ' for i in [0...level*2]).join('')
      """
      #{ind}<#{@condition}>
      #{@side_a.toString(level+1)}
      #{@side_b.toString(level+1)}
      #{ind}</#{@condition}>
      """
    add: (comparators...) =>
      for comparator in comparators
        unless @side_a?
          @side_a = comparator
          continue
        unless @side_b?
          @side_b = comparator
          continue
        @side_b = new caml.Condition @condition, @side_b, comparator
      return this

  class caml.Query
    constructor: (@condition = null) ->
    toString: (level = 0) =>
      ind = (' ' for i in [0...level*2]).join('')
      """
      #{ind}<Query>
      #{ind}  <Where>
      #{@condition.toString(level+2)}
      #{ind}  </Where>
      #{ind}</Query>
      """

  # Condition helpers
  caml.Or  = (comparators...) -> new caml.Condition 'Or', comparators...
  caml.And = (comparators...) -> new caml.Condition 'And', comparators...

  # Comparator helpers
  caml.Eq = (field, value) ->
    field = new caml.Field(field) unless field instanceof caml.Field
    new caml.Comparator 'Eq', field, value

  # Value helpers
  caml.Text = (val) -> new caml.Value val, 'Text'

  if module?
    # Node.js exports
    module?.exports = caml
  else
    # Browsers
    _global = this
    _previousCaml = _global.caml
    caml.noConflict = ->
      _global.caml = _previousCaml
      caml
    _global.caml = caml
