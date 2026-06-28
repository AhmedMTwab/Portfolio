---
title: Celiac Association Management System

subtitle: "Graduation project · Team Lead & Backend Developer · Grade: Excellent"

featured: false

order: 4

date: 2024-06-01

summary: >
  A two-application healthcare platform for a celiac patient association: an admin
  management system and a member-facing mobile app backend. Led the backend team through
  the full delivery — architecture decisions, task breakdown, API design, and final
  integration.

badges:
  - Open Source

highlights:
  - Two-app architecture
  - Full RBAC across both apps
  - Led backend team of 4

tech:
  - ASP.NET Core
  - EF Core
  - SQL Server
  - RBAC

bullets:
  - label: "Two-app architecture:"
    text: "separate admin system and member mobile app backend, sharing domain logic but with distinct access models and API surfaces"
  - label: "Full feature coverage:"
    text: "inventory management, appointment scheduling, insurance processing, and an e-commerce module with role-based access control across both apps"
  - label: "Team lead:"
    text: "responsible for backend architecture decisions, task delegation, and integration — first time leading a team under academic deadline pressure"
---

# Overview

This was my graduation project at Modern Academy: a two-application platform for a celiac
patient association. One application handled association operations — inventory,
appointments, insurance, and an e-commerce module — and the other served members through
a mobile app. Both shared domain logic but exposed different APIs and access models.

# Challenge

- **Two applications, shared domain:** the admin system and the member app needed
  different access models and API surfaces while sharing the same underlying logic.
- **Wide feature surface:** inventory, appointment scheduling, insurance processing, and
  e-commerce all had to ship under a single academic deadline.
- **First time leading a team:** I was responsible for backend architecture decisions,
  task delegation, and integration across four backend developers.

# Solution

- **Two-app architecture with a shared domain layer** so the admin system and the member
  app could evolve independently without duplicating business logic.
- **Role-based access control across both apps**, with permissions defined centrally and
  enforced consistently.
- **End-to-end delivery:** architecture decisions, task breakdown, API design, and
  integration — graded Excellent by the review committee.

# Lessons Learned

Leading a team under an academic deadline was the real education here. The technical work
was well within reach, but coordinating four developers, agreeing on contracts, and
integrating at the end without surprises was something I had to learn by doing. It is the
reason I now default to writing interfaces and contracts before code.
