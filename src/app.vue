created() {
    fetch('http://localhost:3000/api/lessons')  // Update this URL
      .then(response => response.json())
      .then(data => {
        console.log('Lessons:', data);
        // Update your Vue.js app state with the fetched data
      })
      .catch(error => console.error('Error fetching lessons:', error));
  }