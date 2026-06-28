---
title: Visitor Management System

subtitle: "Egyptian Media Production City · Oct 2024 – present"

featured: true

company: EMPC

order: 1

date: 2025-01-01

summary: >
  The original VMS was vendor-built and then abandoned — no documentation,
  no source handover, just a running production database. I reverse-engineered
  7 core business modules through stakeholder interviews and database analysis,
  then rebuilt the entire system from zero in Clean Architecture with CQRS,
  serving 2,300+ employees, 700+ daily visitors, and 150+ tenant companies.

badges:
  - Featured
  - Company Project

highlights:
  - 2,300+ employees
  - 700+ daily visitors
  - 150+ tenant companies
  - 7 core modules rebuilt

tech:
  - ASP.NET Core
  - EF Core
  - SQL Server
  - Clean Architecture
  - CQRS
  - MediatR
  - JWT
  - ASP.NET Core Identity
  - IIS

bullets:
  - label: "Zero-documentation reverse engineering:"
    text: "mapped business workflows entirely from stakeholder interviews and live database analysis — no spec, no codebase, no handover from the original vendor"
  - label: "Clean Architecture foundation:"
    text: "established centralized exception handling, CQRS command/query separation via MediatR, and a layered structure that reduced onboarding friction for new contributors"
  - label: "Database migration with zero downtime:"
    text: "migrated and restructured a corrupted legacy database into a new normalized schema without interrupting operations for 2,300+ employees"
  - label: "Dynamic RBAC:"
    text: "implemented role and permission system using ASP.NET Core Identity with custom claims, replacing a hardcoded access model that couldn't scale across 150+ tenant companies"
  - label: "Production IIS deployment:"
    text: "handled full SSL setup (PFX binding, URL Rewrite HTTP→HTTPS redirect, app pool identity SQL permissions) on subdomain.empc.eg"
---

# Overview

The Visitor Management System at Egyptian Media Production City is the platform that handles
every visitor, contractor, and tenant access for the production complex. When I joined EMPC
in October 2024, the system had been built by an external vendor and then completely
abandoned — there was no source code, no documentation, and no handover. What remained was
a running production database and a long list of stakeholders who depended on it every day.

# Challenge

- **Zero documentation, zero source code:** the original vendor left behind a working
  database and nothing else. Every business rule had to be inferred from the data and
  reconstructed from stakeholder interviews.
- **Live production pressure:** the system could not be taken down. It was actively used by
  2,300+ employees, 700+ daily visitors, and 150+ tenant companies.
- **Corrupted legacy schema:** the existing database had structural problems that
  affected query performance and reporting accuracy.
- **Hardcoded access control:** the original role system could not scale across
  150+ tenant organizations with different permission needs.

# Solution

- **Reverse-engineered 7 core business modules** end-to-end through stakeholder
  interviews, live database analysis, and observation of real workflows.
- **Rebuilt the system from zero in Clean Architecture with CQRS and MediatR**, including
  centralized exception handling and a layered structure that reduced onboarding friction
  for new contributors.
- **Migrated the corrupted legacy database** to a new normalized schema with zero
  downtime, sustaining live operations throughout the cutover.
- **Implemented a dynamic RBAC system** using ASP.NET Core Identity with custom claims,
  replacing the hardcoded access model with one that scales across tenant companies.
- **Owned the full production IIS deployment:** PFX certificate binding, HTTP→HTTPS
  redirect via URL Rewrite, app pool identity SQL permissions, and debugging 500.30
  startup errors.

# Lessons Learned

The biggest lesson was that documentation is not a luxury — it is infrastructure. When the
vendor left, every piece of institutional knowledge left with them. The work of
reconstructing that knowledge from the database and from stakeholders is what consumed the
first half of the project, and it is now what I write down first on every new system I
touch.