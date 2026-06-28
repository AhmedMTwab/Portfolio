---
title: Grocery Store Delivery Portal

subtitle: Delivery Scheduling API with Dynamic Slot Generation

featured: false

order: 2

date: 2025-03-15

demo: https://grocerystoretask.tryasp.net/swagger/index.html

github: https://github.com/AhmedMTwab/GroceryStoreTask

summary: >
  A production-deployed REST API that handles delivery scheduling with complex business
  rules: category-specific time windows, day restrictions, per-slot capacity limits, and
  real-time availability — all computed on demand rather than persisted, so the data never
  goes stale.

badges:
  - Live
  - Open Source

highlights:
  - Live production deployment
  - On-demand slot generation
  - Comprehensive xUnit coverage

tech:
  - ASP.NET Core (.NET 8)
  - EF Core
  - SQL Server
  - CQRS
  - MediatR
  - xUnit

bullets:
  - label: "Domain-driven business rules:"
    text: "encoded category-specific time windows, day restrictions, and capacity limits directly into the domain layer — maintainable and independently testable without touching the database"
  - label: "On-demand slot generation engine:"
    text: "computes delivery slot availability per product category in real time, automatically filters at-capacity slots, and returns only valid options — no pre-generation, no stale data"
  - label: "CQRS with MediatR:"
    text: "full command/query separation on a personal project, proving the pattern without a team forcing it"
  - label: "Comprehensive test coverage:"
    text: "xUnit tests across the entire application layer, not just happy paths — validates business rule enforcement under edge cases"
  - label: "Live production deployment:"
    text: "deployed to a public endpoint with full Swagger documentation; API is callable right now"
---

# Overview

The Grocery Store Delivery Portal is a public REST API that lets customers book delivery
slots for grocery orders. The interesting part is not the CRUD — it is the scheduling
engine. Each product category has its own time windows, day restrictions, and per-slot
capacity, and availability has to be accurate at the moment of the request.

# Challenge

- **Complex, interleaving business rules:** different product categories had different
  allowed days, time windows, and capacity limits, and these rules could not be expressed
  with a single shared model.
- **No stale data:** slots could not be pre-generated and persisted, because any change to
  a rule or an order would immediately invalidate them.
- **Solo project, full stack:** the goal was to ship a real, deployable system end-to-end
  without a team to lean on.

# Solution

- **Encoded business rules in the domain layer** — category-specific time windows, day
  restrictions, and capacity limits all live in pure domain logic, independently testable
  without touching the database.
- **Built an on-demand slot generation engine** that computes availability per product
  category in real time and automatically filters at-capacity slots.
- **Applied CQRS with MediatR** as a personal discipline, proving the pattern is worth it
  even on a one-person project.
- **Wrote comprehensive xUnit tests** across the entire application layer, including edge
  cases for rule interactions.
- **Deployed the API publicly** with full Swagger documentation so anyone can hit it and
  inspect the contract.

# Lessons Learned

The biggest takeaway was that complex domain logic should not touch the database. By
keeping all of the scheduling rules in the domain layer and computing availability on
demand, the system stayed simple to reason about and trivial to test. Persistence became
an implementation detail, not a design constraint.