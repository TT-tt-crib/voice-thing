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
- Add a real `formEndpoint` in `config.js` to collect submissions without opening email.
- This is intentionally dependency-free so it can be deployed on GitHub Pages, Netlify, Vercel, or any static host.

## Feedback inbox and form setup

Create a real inbox first, for example `voicething.feedback@gmail.com` or
`hello@yourdomain.com`.

For a static GitHub Pages site, the easiest working form options are:

- Formspree: create a form and paste its endpoint into `formEndpoint`.
- Tally: create a form and link to it from the page.
- FormSubmit: set `formEndpoint` to `https://formsubmit.co/ajax/YOUR_EMAIL` and confirm the activation email after the first test submission.

Example `config.js`:

```js
window.VOICE_THING_CONFIG = {
  feedbackEmail: "hello@yourdomain.com",
  formEndpoint: "https://formsubmit.co/ajax/hello@yourdomain.com"
};
```

## GitHub Pages

This repo includes a GitHub Pages workflow at
`.github/workflows/deploy-pages.yml`.

In GitHub, open the repo settings and set:

- Settings -> Pages -> Build and deployment -> Source: `GitHub Actions`

After the next push to `main`, the site should publish at:

```text
https://taerim-codes.github.io/voice-thing/
```
