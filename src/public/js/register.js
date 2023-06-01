const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);
  fetch('/api/session/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(result => result.json())
  .then(json => {
    if (json.status === 'success') {
      const userRole = json.payload.role;

      if (userRole === 'admin') {
        window.location.replace('/adminProfile');
      } else {
        window.location.replace('/userProfile');
      }
    } else {
      console.log(json.error);
    }
  })
  .catch(error => console.error('Error occurred during registration:', error));
});