document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("loginForm");
  
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const data = new FormData(form);
  
      const obj = {};
  
      data.forEach((value, key) => obj[key] = value);
  
      fetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        if (result.status === 200) {
          result.json().then(json => {
            const userRole = json.payload.role;
            
            if (userRole === 'admin') {
              window.location.replace('/adminProfile');
            } else {
              window.location.replace('/userProfile');
            }
          });
        } else {
          // Handle unsuccessful login here
          console.error('Login failed');
        }
      }).catch(error => {
        console.error('Error occurred during login:', error);
      });
    });
  });