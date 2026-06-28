---
title: Eliminating N+1 queries in EF Core — what I found in production

description: A real N+1 in production, what it cost, and the fix that did not require rewriting the query layer.

pubDate: 2026-06-25

tags:
  - EF Core
  - Performance
  - .NET
---

# The symptom

A page that loaded in under 200ms in development took 8 seconds in production. The dataset
was bigger than I had on my machine, but not 40x bigger — the difference was elsewhere.

# The diagnosis

The page rendered a list of visitors, and for each visitor we displayed the name of the
host employee. The code looked like this:

```csharp
var visitors = await db.Visitors
    .OrderByDescending(v => v.CheckInAt)
    .Take(50)
    .ToListAsync();

return visitors.Select(v => new VisitorDto {
    Name = v.Name,
    Host = db.Employees.Find(v.HostEmployeeId).Name
});
```

`Find` is lazy. For every visitor in the list, EF Core issued a separate `SELECT` against
the Employees table. 50 visitors meant 51 queries.

# The fix

Two options, and the right one depends on what the page actually needs:

- **`.Include(v => v.Host)`** if the relationship is navigable. This is the idiomatic fix
  and produces a single SQL query with a join.
- **Projection with `.Select`** if you only need a few columns from the related entity.
  This avoids materializing full entities and keeps the query tight.

I used `.Include` here because the host entity had more fields than just the name, and we
needed them elsewhere in the same DTO.

# Lessons learned

The lesson is that EF Core makes N+1 queries easy to write and hard to spot. The code
reads cleanly, runs fine on small datasets, and degrades invisibly in production. The
single best habit I took away from this was to check the SQL EF Core generates for any
list endpoint — `.ToQueryString()` in EF Core 8+ makes this trivial.