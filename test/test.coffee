caml = require '../DDCamlBuilder'
assert = require 'assert'

## Test core classes ##

value = new caml.Value 'my_value', 'Text'
assert.equal value.toString(), '<Value Type=\'Text\'>my_value</Value>', 'Test caml.Value'

field = new caml.Field 'fieldname'
assert.equal field.toString(), '<FieldRef Name=\'fieldname\' />', 'Test caml.Field'

field_opt = new caml.Field 'fieldname', opt: 'value'
assert.equal field_opt.toString(), '<FieldRef Name=\'fieldname\' opt="value" />', 'Test caml.Field with option'

comp = new caml.Comparator 'Eq', field, value
assert.equal comp.toString(), '''
  <Eq>
    <FieldRef Name=\'fieldname\' />
    <Value Type=\'Text\'>my_value</Value>
  </Eq>
  ''', 'Test caml.Comparator'

cond = new caml.Condition 'Or', comp, comp
assert.equal cond.toString(), '''
  <Or>
    <Eq>
      <FieldRef Name='fieldname' />
      <Value Type='Text'>my_value</Value>
    </Eq>
    <Eq>
      <FieldRef Name='fieldname' />
      <Value Type='Text'>my_value</Value>
    </Eq>
  </Or>
  ''', 'Test caml.Condition with 2 items'

cond = new caml.Condition 'Or', comp, comp, comp
assert.equal cond.toString(), '''
  <Or>
    <Eq>
      <FieldRef Name='fieldname' />
      <Value Type='Text'>my_value</Value>
    </Eq>
    <Or>
      <Eq>
        <FieldRef Name='fieldname' />
        <Value Type='Text'>my_value</Value>
      </Eq>
      <Eq>
        <FieldRef Name='fieldname' />
        <Value Type='Text'>my_value</Value>
      </Eq>
    </Or>
  </Or>
  ''', 'Test caml.Condition with 3 items'

cond_and = new caml.Condition 'And', cond, cond
assert.equal cond_and.toString(), '''
  <And>
    <Or>
      <Eq>
        <FieldRef Name='fieldname' />
        <Value Type='Text'>my_value</Value>
      </Eq>
      <Or>
        <Eq>
          <FieldRef Name='fieldname' />
          <Value Type='Text'>my_value</Value>
        </Eq>
        <Eq>
          <FieldRef Name='fieldname' />
          <Value Type='Text'>my_value</Value>
        </Eq>
      </Or>
    </Or>
    <Or>
      <Eq>
        <FieldRef Name='fieldname' />
        <Value Type='Text'>my_value</Value>
      </Eq>
      <Or>
        <Eq>
          <FieldRef Name='fieldname' />
          <Value Type='Text'>my_value</Value>
        </Eq>
        <Eq>
          <FieldRef Name='fieldname' />
          <Value Type='Text'>my_value</Value>
        </Eq>
      </Or>
    </Or>
  </And>
  ''', 'Test caml.Condition with 2 other conditions'

console.log 'Ok.'
