import emailjs from '@emailjs/browser';

emailjs.init("ACoKUgfKR7FJkFXTT");

export function emailHandler(container, live = false) {
  const form = container.querySelector("#contactForm");
  const button = form?.querySelector(".infoButton");
  if (!form || !button) return;

  // Prevent double-binding if you re-render the section
  if (form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = "Sending...";

    if (!live) {
      showToast("✅ Fake Message sent! I will get back to you soon.");
      button.textContent = "Sent 🚀";
      setTimeout(() => {
        form.reset();
        button.disabled = false;
        button.textContent = "Send Message";
      }, 3000);
      return;
    }

    try {
      await emailjs.sendForm("service_3dr8znx", "template_wpa42ci", form);
      showToast("✅ Message sent! I will get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("FAILED...", error);
      alert("Message failed to send. Please try again later.");
    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
    }
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}