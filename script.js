(function () {
  const config = window.VOICE_THING_CONFIG || {};
  const feedbackEmail = config.feedbackEmail || "voicethingteam@gmail.com";
  const formEndpoint = config.formEndpoint || "";
  const formAccessKey = config.formAccessKey || "";
  const form = document.querySelector("#waitlist-form");
  const status = document.querySelector("[data-form-status]");

  if (!form || !status) {
    return;
  }

  function openEmailFallback(formData) {
    const mailtoBody = encodeURIComponent(
      [
        `Email: ${formData.get("email") || ""}`,
        `Source: ${window.location.href}`
      ].join("\n")
    );

    window.location.href = `mailto:${feedbackEmail}?subject=VoiceThing%20waitlist%20signup&body=${mailtoBody}`;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const email = (formData.get("email") || "").toString().trim();

    formData.set("subject", `VoiceThing waitlist · ${email}`);
    formData.set("message", [
      `Email: ${email}`,
      `Source: ${window.location.href}`
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
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
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
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
})();
