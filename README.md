# VoiceThing

VoiceThing is a lightweight landing page for validating an early product idea:
identity monitoring for your voice.

Live site:

```text
https://voice-thing.vercel.app
```

## What It Does

- Explains the VoiceThing concept.
- Collects waitlist emails with a one-field signup form.
- Sends signups to `voicethingteam@gmail.com` through Web3Forms.
- Falls back to a prefilled email draft if the form backend is unavailable.

## Project Structure

```text
index.html       Main landing page markup
styles.css       Responsive page styling
script.js        Waitlist form behavior
config.js        Feedback inbox and form backend config
LAUNCH_POSTS.md  Draft posts for Reddit, X, and founder communities
```

## Run Locally

Start a static server:

```sh
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Waitlist Form

The waitlist form is configured in `config.js`:

```js
window.VOICE_THING_CONFIG = {
  feedbackEmail: "voicethingteam@gmail.com",
  formEndpoint: "https://api.web3forms.com/submit",
  formAccessKey: "WEB3FORMS_ACCESS_KEY"
};
```

The current user flow is:

1. Visitor enters email.
2. Visitor clicks `Request Access`.
3. The page submits to Web3Forms without redirecting.
4. The visitor sees `Thanks. You are on the list.`

## Deploy

The site is deployed on Vercel from the GitHub repo.

For this static site, Vercel should use:

```text
Framework Preset: Other
Build Command: empty
Output Directory: .
Install Command: empty
```

Pushing to `main` triggers a Vercel redeploy.

## Notes

- There is no build step and no package manager dependency.
- Do not commit private credentials beyond public client-side form keys.
- If the form backend changes, update `config.js` and test locally before pushing.
