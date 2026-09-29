# Liz Mutisya Portfolio

This is the Next.js application for [lizmutisya.com](https://www.lizmutisya.com).

## Private Portfolio Studio

The private Studio provides structured editors for:

- Career timeline
- Colleague recommendations
- Featured work
- Skills

Open `https://www.lizmutisya.com/studio` directly. The route is intentionally
not linked from the public site, is excluded from the sitemap, and is blocked
from search indexing.

Access requires a fine-grained GitHub personal access token owned by the
`Emutisya` account:

1. In GitHub, open **Settings > Developer settings > Personal access tokens >
   Fine-grained tokens**.
2. Limit repository access to `Emutisya/elizabeth-portfolio`.
3. Under repository permissions, set **Contents** to **Read and write**.
4. Open the Studio and paste the token into the sign-in form.

The token is retained only in the current browser tab's session storage. Sign
out when finished and revoke tokens that are no longer needed.

Each save validates the full content document and creates an auditable commit
on `main`. The connected deployment then publishes the update. If another edit
lands first, the Studio rejects the stale save and asks the editor to reload
instead of overwriting newer content.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
