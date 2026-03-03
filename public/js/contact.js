document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      // Show submitting loader
      let loader = document.createElement('div');
      loader.className = 'form-loader';
      loader.innerText = 'Submitting...';
      form.appendChild(loader);

      const inputs = form.querySelectorAll('input, textarea');
      const data = {};
      inputs.forEach(input => {
        if (input.name) {
          data[input.name] = input.value;
        }
      });
      const payload = {
        name: data['name'] || '',
        email: data['email'] || '',
        contact_number: data['contact_number'] || '',
        company: data['company'] || '',
        message: data['message'] || ''
      };
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();
        form.removeChild(loader);
        if (result.success) {
          alert('Thank you for contacting us!');
          form.reset();
        } else {
          alert('Error: ' + (result.error || 'Submission failed'));
        }
      } catch (err) {
        form.removeChild(loader);
        alert('Error: Could not submit form');
      }
    });
  }
});
