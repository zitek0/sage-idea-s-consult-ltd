    // Sends the form to Formspree without leaving the page.
    // If JavaScript is off, the form still works as a normal POST.
    const form = document.getElementById("quote-form");
    const statusEl = document.getElementById("form-status");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      statusEl.className = "form-status";
      statusEl.textContent = "";
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          form.reset();
          statusEl.classList.add("success");
          statusEl.textContent = "Thanks! Your message has been sent.";
        } else {
          statusEl.classList.add("error");
          statusEl.textContent = "Something went wrong. Please try again.";
        }
      } catch (error) {
        statusEl.classList.add("error");
        statusEl.textContent = "Network error. Please check your connection and try again.";
      } finally {
        submitBtn.disabled = false;
      }
    });
