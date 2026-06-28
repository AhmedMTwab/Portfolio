---
title: Upgrading SQL Server Express to Enterprise on a live production server

description: What I learned migrating a production SQL Server from Express to Enterprise without taking the system offline.

pubDate: 2026-06-20

tags:
  - SQL Server
  - Production
  - DevOps
---

# Why this was scary

Upgrading SQL Server in place is one of those operations where you only really know if it
worked after the fact. The Express edition had been running our Visitor Management System
in production for years, and we had hit its limits — memory ceiling, database size cap,
and missing features we needed for the next phase. Enterprise was the answer, but the
question was how to get there without downtime.

# The upgrade path that actually worked

1. **Snapshot the VM.** Non-negotiable. If the upgrade fails, you roll back, full stop.
2. **Inventory SQL Server Agent jobs.** Agent jobs live in `msdb` and the upgrade preserves
   them, but any job that depends on Express-only features will silently fail afterward.
3. **Check SSIS, SSRS, and any other SQL components.** They are tied to the major version
   and need to match the new SQL Server edition.
4. **Run the in-place upgrade during a low-traffic window.** Even with a snapshot, you do
   not want this to happen during peak hours.
5. **Verify Agent jobs, scheduled tasks, and login permissions immediately after the
   upgrade completes.**

# What went wrong

The upgrade itself completed cleanly, but two things broke afterward:

- A SQL Server Agent job that depended on an Express-only feature silently stopped
  firing. We caught it within an hour because we had a dashboard.
- The new Enterprise instance needed a higher minimum memory configuration, and the
  default value starved the system until we tuned it.

# Lessons learned

The lesson is that the upgrade is the easy part. The hard part is everything that depends
on the upgrade — jobs, integrations, dashboards, and connection strings. Treat the upgrade
itself as a single line item on a much longer checklist.