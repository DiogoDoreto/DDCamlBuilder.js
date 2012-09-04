DDCamlBuilder.js
================

A self-contained script for generating CAML queries.

Complex example
---------------

    data1 =
      field1: 'value1'
      field2: 'value2'
      field3: 'value3'
      field4: 'value4'

    data2=
      f1: 'v1'
      f2: 'v2'
      f3: 'v3'

    comps1 = (caml.Eq(k, caml.Text v) for own k, v of data1)
    comps2 = (caml.Eq(k, caml.Text v) for own k, v of data2)

    q = new caml.Query()
    q.condition = caml.And (caml.Or comps1...), (caml.Or comps2...)

    console.log q.toString()

Todo
----

 - More helper functions
 - More tests
 - Documentation
 - Examples
