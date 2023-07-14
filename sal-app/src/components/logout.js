export const logout = () => {
    // Perform any additional logout operations if needed
    // ...
  
    // Clear the local storage or perform any necessary cleanup
    localStorage.removeItem('username');
  
    // Redirect to the login page or any other desired page
    window.location.href = '/login';
  };
  