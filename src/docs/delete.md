# Delete

Operations that have a side-effect are suffixed with `!`.

Delete operation is a side-effect operation.

```pine
table_name | operation1: args | delete!
```

e.g. if you want to delete the user 'John Doe' from the `users` table, you can do:

```pine
users | where: name = 'John Doe' | delete!
```