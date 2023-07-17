export const logout = () => {
    // Display a confirmation message box
    const confirmLogout = window.confirm('Are you sure you want to log out?');
  
    if (confirmLogout) {

      // Clear the local storage or perform any necessary cleanup
      localStorage.removeItem('username');
  
      // Redirect to the login page or any other desired page
      window.location.href = '/login';
    }
  };
  