# VoiceThing

A lightweight landing page for validating an early product idea: identity monitoring for your voice.

## Preview locally

Open `index.html` in a browser, or run a tiny static server:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Notes

- The waitlist form reads from `config.js`.
- Replace `hello@voicething.example` with the real feedback inbox before sharing.
- Add a real Tally share URL in `config.js` to collect submissions without opening email.
- This is intentionally dependency-free so it can be deployed on GitHub Pages, Netlify, Vercel, or any static host.

## Feedback inbox and form setup

The feedback inbox is `voicethingteam@gmail.com`.

Create a Tally form with fields for:

- Email
- Role
- Message

Then paste the public Tally share URL into `tallyFormUrl`. The landing page
opens Tally with the visitor's email, role, message, and source page as URL
parameters. If no Tally URL is configured, it falls back to a prefilled email.

Example `config.js`:

```js
window.VOICE_THING_CONFIG = {
  feedbackEmail: "voicethingteam@gmail.com",
  tallyFormUrl: "https://tally.so/r/YOUR_FORM_ID"
};
```

## GitHub Pages

In GitHub, open the repo settings and set:

- Settings -> Pages -> Build and deployment -> Source: `Deploy from a branch`
- Branch: `gh-pages`
- Folder: `/ (root)`

After saving, the site should publish at:

```text
https://taerim-codes.github.io/voice-thing/
```
