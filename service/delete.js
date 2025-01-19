const url = document.URL;
const splittedEmail = url.split('?')[1];
const idSearch = new URLSearchParams(splittedEmail);
let id = 0;
for (let key of idSearch.entries()) {
    id = key[1];
}
fetch(`http://localhost:3000/delete/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
})
    .then(response => {
        if (!response.ok) {
            console.log("Error deleting data")
        }
        return response.json()
    })
    .then(result => {
        console.log("Data deleted successfully", result);
        window.location.href = "../views/index.html"
    })
    .catch(error => {
        console.error('Error submitting the form:', error);
        alert('Failed to submit the form. Please try again.');
    });
