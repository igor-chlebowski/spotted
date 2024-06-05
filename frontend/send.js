document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `message=${encodeURIComponent(message)}`
    })
    .then(response => response.text())
    .then(data => {
        
        document.getElementById('message').value = '';
        alert("Wiadomość wysłana!");
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
});