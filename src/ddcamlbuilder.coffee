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
    orderByFields: []
    constructor: (@condition, orderByFields) ->
      @addOrderBy orderByFields
    toString: (level = 0) =>
      ind = (' ' for i in [0...level*2]).join('')

      whereQuery = ''
      if @condition?
        whereQuery = """
          \n#{ind}  <Where>
          #{@condition.toString(level+2)}
          #{ind}  </Where>
          """

      orderByQuery = ''
      if @orderByFields.length > 0
        orderByQuery = """
          \n#{ind}  <OrderBy>
          #{ind}    #{@orderByFields.join('\n    '+ind)}
          #{ind}  </OrderBy>
          """

      """
      #{ind}<Query>#{whereQuery}#{orderByQuery}
      #{ind}</Query>
      """
    addOrderBy: (_orderByFields = []) =>
      if Object::toString.call(_orderByFields) isnt '[object Array]'
        _orderByFields = [_orderByFields]

      _orderByFields = for f in _orderByFields
        if f instanceof caml.Field then f else new caml.Field f
      @orderByFields = @orderByFields.concat _orderByFields



  # Condition helpers
  for c in ['And', 'Or']
    do (c) -> caml[c] = (comparators...) -> new caml.Condition c, comparators...

  # Comparator helpers
  for c in ['BeginsWith', 'Contains', 'DateRangesOverlap', 'Eq', 'Geq', 'Gt',
      'Includes', 'Leq', 'Lt', 'Neq', 'NotIncludes']
    do (c) ->
      caml[c] = (field, value) ->
        field = new caml.Field(field) unless field instanceof caml.Field
        new caml.Comparator c, field, value
  for c in ['IsNotNull', 'IsNull']
    do (c) ->
      caml[c] = (field) ->
        field = new caml.Field(field) unless field instanceof caml.Field
        new caml.Comparator c, field

  # Value helpers
  for v in ['Integer', 'Text', 'Note', 'DateTime', 'Counter', 'Choice', 'Lookup',
    'Boolean', 'Number', 'Currency', 'URL', 'Computed', 'Threading', 'Guid',
    'MultiChoice', 'GridChoice', 'Calculated', 'File', 'Attachments', 'User',
    'Recurrence', 'CrossProjectLink', 'ModStat', 'ContentTypeId', 'PageSeparator',
    'ThreadIndex', 'WorkflowStatus', 'AllDayEvent', 'WorkflowEventType']
    do (v) -> caml[v] = (val) -> new caml.Value val, v

  if module?
    # Node.js exports
    module.exports = caml
  else
    # Browsers
    _global = this
    _previousCaml = _global.caml
    caml.noConflict = ->
      _global.caml = _previousCaml
      caml
    _global.caml = caml
