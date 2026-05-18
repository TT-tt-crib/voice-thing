(function () {
  const config = window.VOICE_THING_CONFIG || {};
  const feedbackEmail = config.feedbackEmail || "voicethingteam@gmail.com";
  const tallyFormUrl = config.tallyFormUrl || "";
  const form = document.querySelector("#waitlist-form");
  const status = document.querySelector("[data-form-status]");
  const emailLink = document.querySelector("[data-feedback-email]");

  if (emailLink) {
    emailLink.href = `mailto:${feedbackEmail}`;
    emailLink.textContent = feedbackEmail;
  }

  if (!form || !status) {
    return;
  }

  function openEmailFallback(formData) {
    const mailtoBody = encodeURIComponent(
      [
        `Email: ${formData.get("email") || ""}`,
        `Role: ${formData.get("role") || ""}`,
        `Message: ${formData.get("message") || ""}`,
        `Source: ${window.location.href}`
      ].join("\n")
    );

    window.location.href = `mailto:${feedbackEmail}?subject=VoiceThing%20waitlist%20signup&body=${mailtoBody}`;
  }

  function openTallyForm(formData) {
    const tallyUrl = new URL(tallyFormUrl);
    tallyUrl.searchParams.set("email", formData.get("email") || "");
    tallyUrl.searchParams.set("role", formData.get("role") || "");
    tallyUrl.searchParams.set("message", formData.get("message") || "");
    tallyUrl.searchParams.set("source", window.location.href);
    window.location.href = tallyUrl.toString();
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);

    if (!tallyFormUrl) {
      openEmailFallback(formData);
      status.textContent = "Opening your email app to send the signup.";
      return;
    }

    status.textContent = "Opening the feedback form...";
    form.classList.add("is-submitting");
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      openTallyForm(formData);
    } catch (error) {
      openEmailFallback(formData);
      status.textContent = `We could not open the form, so we opened an email draft to ${feedbackEmail}.`;
    } finally {
      form.classList.remove("is-submitting");
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
})();
