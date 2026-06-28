# Security Headers

These headers are recommended for production deployment. Configure them at your
hosting platform (Cloudflare Pages, Vercel, Netlify, or via `_headers` /
`_redirects` files). Astro itself does not set HTTP response headers for static
output.

## Recommended Headers

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; connect-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Cloudflare Pages

Create `public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Netlify

Create `public/_headers` with the same content as above.

## Vercel

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

## GitHub Pages

GitHub Pages sets a baseline of secure headers, but you cannot customize them
without moving to Cloudflare in front of the site. Consider serving the site
via Cloudflare for full header control.