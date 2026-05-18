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
- Add a real form endpoint in `config.js` to collect submissions without opening email.
- This is intentionally dependency-free so it can be deployed on GitHub Pages, Netlify, Vercel, or any static host.

## Feedback inbox and form setup

The feedback inbox is `voicethingteam@gmail.com`.

For one-field, in-place waitlist signup, use a form backend such as Web3Forms
or Formspree. If no endpoint is configured, the form falls back to a prefilled
email draft.

Example `config.js`:

```js
window.VOICE_THING_CONFIG = {
  feedbackEmail: "voicethingteam@gmail.com",
  formEndpoint: "https://api.web3forms.com/submit",
  formAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY"
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
