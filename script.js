(function () {
  const config = window.VOICE_THING_CONFIG || {};
  const feedbackEmail = config.feedbackEmail || "voicethingteam@gmail.com";
  const formEndpoint = config.formEndpoint || "";
  const formAccessKey = config.formAccessKey || "";
  const forms = document.querySelectorAll("form.signup");
  const emailLink = document.querySelector("[data-feedback-email]");
  const mastheadDate = document.querySelector("[data-masthead-date]");
  const evidenceDate = document.querySelector("[data-evidence-date]");

  const now = new Date();
  if (mastheadDate) {
    mastheadDate.textContent = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }
  if (evidenceDate) {
    const iso = now.toISOString().slice(0, 10);
    const hh = String(now.getUTCHours()).padStart(2, "0");
    const mm = String(now.getUTCMinutes()).padStart(2, "0");
    evidenceDate.textContent = `${iso} · ${hh}:${mm} UTC`;
  }

  if (emailLink) {
    emailLink.href = `mailto:${feedbackEmail}`;
    emailLink.textContent = feedbackEmail;
  }

  function openEmailFallback(formData) {
    const mailtoBody = encodeURIComponent(
      [
        `Email: ${formData.get("email") || ""}`,
        `Context: ${formData.get("context") || "(none provided)"}`,
        `Source: ${window.location.href}`
      ].join("\n")
    );

    window.location.href = `mailto:${feedbackEmail}?subject=VoiceThing%20waitlist%20signup&body=${mailtoBody}`;
  }

  function attachHandler(form) {
    const status = form.querySelector("[data-form-status]");
    if (!status) return;

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const submitButton = form.querySelector("button[type='submit']");
      const formData = new FormData(form);
      const email = (formData.get("email") || "").toString().trim();
      const context = (formData.get("context") || "").toString().trim();

      formData.set("subject", `VoiceThing waitlist · ${email}`);
      formData.set("message", [
        `Email: ${email}`,
        `Context: ${context || "(none provided)"}`,
        `Source: ${window.location.href}`,
        `Form: ${form.id || "(unknown)"}`
      ].join("\n"));

      if (formAccessKey) {
        formData.append("access_key", formAccessKey);
      }

      if (!formEndpoint) {
        openEmailFallback(formData);
        status.textContent = "Opening your email app to send the signup.";
        return;
      }

      status.textContent = "Sending...";
      form.classList.add("is-submitting");
      if (submitButton) submitButton.disabled = true;

      try {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 8000);
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
          signal: controller.signal
        });
        window.clearTimeout(timeout);

        if (!response.ok) {
          throw new Error("The form endpoint rejected the submission.");
        }

        form.reset();
        status.textContent = "Thanks. You are on the list.";
      } catch (error) {
        openEmailFallback(formData);
        status.textContent = `The signup service is slow, so we opened an email draft to ${feedbackEmail}.`;
      } finally {
        form.classList.remove("is-submitting");
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  forms.forEach(attachHandler);
})();
