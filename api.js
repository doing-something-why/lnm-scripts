// api.js

export async function fetchGeolocationData() {
    try {
      const response = await fetch(`https://ipinfo.io?token=a3e2e26d91aed3`);
      return response.json();
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
      return null;
    }
  }
  
  export async function fetchSearchResults(requestBody) {
    try {
      const response = await fetch('https://findresale.onrender.com/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  