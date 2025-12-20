document.addEventListener('DOMContentLoaded', function () {

  const nameInput = document.querySelector('input[name="fullname"]');
  const phoneInput = document.querySelector('input[name="phone"]');
  const form = document.querySelector('.contact-form');

  // SAFETY CHECK
  if (!nameInput || !phoneInput || !form) {
    console.error('Form elements not found');
    return;
  }

  // ✅ Name: only alphabets + space
  nameInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
  });

  // ✅ Phone: only numbers
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  // ✅ Submit validation
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!/^[A-Za-z\s]+$/.test(name)) {
      showToast('Name should contain only alphabets', 'danger');
      return;
    }

    if (!/^[0-9]+$/.test(phone)) {
      showToast('Phone should contain only numbers', 'danger');
      return;
    }

    const formData = new FormData(form);

    fetch('submit.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      showToast(data.message, data.status === 'success' ? 'success' : 'danger');
      if (data.status === 'success') form.reset();
    })
    .catch(() => showToast('Server Error', 'danger'));
  });

});

// Toast function OUTSIDE
function showToast(message, type) {
  const toastEl = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  toastEl.className = `toast text-bg-${type} border-0`;
  toastText.innerText = message;

  new bootstrap.Toast(toastEl).show();
}