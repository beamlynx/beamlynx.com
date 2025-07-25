# Join Operation

Pine Lang automatically handles joins based on foreign key relationships.
Simply pipe tables together to create joins.

Basic join:

```sql
company | employee
```

Multi-table join:

```sql
company | employee | document
```

Join with schema qualification:

```sql
x.company | y.employee | z.document
```

Join with context:

```sql
company as c | employee | from: c | document
```

## What about left / right joins?

Pine-lang supports operation modifiers which can be appended to the arguements to change the behaviour of the join.

In order to specify the type of a join, you can append the `left` or `right` modifier to the join operation e.g. if you want all the documents along with the employees (if they exist) then you need a left join. Using the modified `:left` modifier, you can specify a left join.

```pine
document | employee :left
```

## What about parent child relationships?

Similar to using the modifier for type of join, you can use the `:parent` or `:child`. Imagine you want to find parent folders, you can do:

```pine
folder | folder :parent
```