---
title: How I deployed ASP.NET Core to IIS with SSL from scratch

description: A real-work walkthrough of setting up HTTPS, app pools, and SQL permissions on a production IIS box.

pubDate: 2026-06-15

tags:
  - ASP.NET Core
  - IIS
  - SSL
  - DevOps
---

# Why this post exists

When I first had to deploy an ASP.NET Core application to IIS with a real SSL certificate,
none of the tutorials covered the exact combination of things I needed to do: PFX
binding, HTTP→HTTPS redirect via URL Rewrite, app pool identity SQL permissions, and
debugging 500.30 startup errors. This post collects what I learned so I never have to
re-derive it from scratch.

# The minimal checklist

1. **Install the .NET Core Hosting Bundle** on the server. Without it, IIS will return a
   500.30 error the moment you hit the site.
2. **Create the App Pool** as `No Managed Code`. The .NET runtime handles your app
   outside IIS; the App Pool only needs to host the worker process.
3. **Bind the PFX certificate** to the site, then add a URL Rewrite rule that redirects
   all HTTP traffic to HTTPS.
4. **Grant the App Pool identity SQL access** — the most common silent failure. The
   identity that runs your app pool needs explicit login and database permissions.
5. **Verify with `curl -I`** that the redirect works, that the certificate is valid, and
   that the app actually responds.

# The 500.30 trap

500.30 — "An error occurred during startup" — is the most common IIS deployment failure
for ASP.NET Core, and almost every cause is environment-related, not code-related. The
three things to check first:

- Is the .NET Core Hosting Bundle installed and matches the runtime version your app targets?
- Does the App Pool identity have read access to the application folder?
- Does the connection string work from the App Pool identity?

# Lessons learned

The single biggest lesson is that IIS deployment is mostly about identity and permissions,
not configuration syntax. Once you understand that every layer (the app pool, the SQL
login, the file system ACL) needs to be aligned, the rest of the work is mechanical.