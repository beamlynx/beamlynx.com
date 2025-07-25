# Group Operation

The group operation (`:group` or `g:`) is used to group the results of a query by a given column.

```pine
table_name | group: column_name => function
```

e.g. if you want to  results of the `users` table by the `age` column, you can do:

```pine
users | group: age => count
```

This will return the number of users in each age group.

## What about other functions?

This feature is new and being worked on. Your feedback is welcome.