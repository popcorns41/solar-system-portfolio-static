import emailjs from '@emailjs/browser';

emailjs.init("ACoKUgfKR7FJkFXTT");

export function emailHandler(live = false) {
  const form = document.getElementById("contactForm");
  const button = form.querySelector(".infoButton");

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
      // Use sendForm with explicit form element
      await emailjs.sendForm(
        "service_3dr8znx",
        "template_wpa42ci",
        form
      );
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