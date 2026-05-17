(function () {
  const config = window.VOICE_THING_CONFIG || {};
  const feedbackEmail = config.feedbackEmail || "hello@voicething.example";
  const formEndpoint = config.formEndpoint || "";
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

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    formData.append("_subject", "New VoiceThing waitlist signup");
    formData.append("source", window.location.href);

    if (!formEndpoint) {
      const mailtoBody = encodeURIComponent(
        [
          `Email: ${formData.get("email") || ""}`,
          `Role: ${formData.get("role") || ""}`,
          `Message: ${formData.get("message") || ""}`,
          `Source: ${window.location.href}`
        ].join("\n")
      );

      window.location.href = `mailto:${feedbackEmail}?subject=VoiceThing%20waitlist%20signup&body=${mailtoBody}`;
      status.textContent = "Opening your email app to send the signup.";
      return;
    }

    status.textContent = "Sending...";
    form.classList.add("is-submitting");
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("The form endpoint rejected the submission.");
      }

      form.reset();
      status.textContent = "Thanks. We got it and will follow up soon.";
    } catch (error) {
      status.textContent = `Something went wrong. Email us at ${feedbackEmail}.`;
    } finally {
      form.classList.remove("is-submitting");
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
})();
