---
title: Purchase & Sales Analytics API

subtitle: High-throughput bulk data ingestion and analytics

featured: true

order: 3

date: 2025-05-20

github: https://github.com/AhmedMTwab/Purchase-Sales-Analysis-Task

summary: >
  An analytics API built around one hard constraint: ingest large Excel/CSV uploads fast
  and cleanly, without corrupting the live dataset if the file is malformed. The ingestion
  pipeline went through three iterations before hitting 1M+ rows in 0.35 seconds.

badges:
  - Open Source

highlights:
  - 1M+ rows in 0.35 s
  - 20K-row batch processing
  - Pre-write schema validation

tech:
  - ASP.NET Core (.NET 8)
  - EF Core
  - SQL Server
  - EFCore.BulkExtensions
  - CsvHelper
  - EPPlus

bullets:
  - label: "Pre-write schema validation:"
    text: "validates every uploaded Excel/CSV file against the expected schema before a single row touches the database — prevents data corruption against live production datasets under tight deadlines"
  - label: "1M+ rows in 0.35 s:"
    text: "achieved through streaming parsing (CsvHelper), 20K-row batching, and SqlBulkCopy via EFCore.BulkExtensions — not a single approach but a pipeline where each layer handles a different bottleneck"
  - label: "Analytics endpoints:"
    text: "profit reporting, top/bottom-performing product rankings, and parameterized product search — designed for real business queries, not toy examples"
---

# Overview

The Purchase & Sales Analytics API ingests bulk purchase and sales data from Excel and CSV
uploads, then exposes analytics endpoints for profit reporting, top/bottom product
rankings, and parameterized product search. The hard part is not the analytics — it is
the ingestion. A malformed upload must never reach the live dataset, and the pipeline has
to stay fast even at scale.

# Challenge

- **Hard constraint on data integrity:** a malformed Excel or CSV file could corrupt the
  live production dataset, so validation has to happen before a single row is written.
- **Performance under load:** the target was to ingest files with millions of rows without
  timing out or exhausting memory.
- **Three bottlenecks, one pipeline:** parsing, batching, and bulk write each contributed
  their own bottleneck, and no single optimization was enough.

# Solution

- **Pre-write schema validation:** every uploaded file is validated against the expected
  schema before any row touches the database, protecting the live dataset under tight
  deadlines.
- **Streaming parsing with CsvHelper** to avoid loading the entire file into memory.
- **20K-row batching** to balance round-trip overhead against transaction size.
- **SqlBulkCopy via EFCore.BulkExtensions** for the final write, pushing past EF Core's
  per-row insertion cost.
- **Analytics endpoints** for profit reporting, top/bottom product rankings, and
  parameterized product search, designed for real business queries rather than toy
  examples.

# Lessons Learned

The lesson here is that performance is a pipeline problem, not a single-knob problem.
Streaming parsing fixed memory. Batching fixed round-trip overhead. Bulk insert fixed
EF Core's per-row cost. None of the three on its own would have hit 1M+ rows in 0.35s,
and the engineering work was identifying which layer was the current bottleneck at each
iteration.