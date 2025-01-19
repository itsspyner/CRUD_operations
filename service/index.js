function Submit() {
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching response")
            }
            return response.json();
        })
        .then(result => {
            const tb = document.getElementById('tableBody');
            const data = result;
            let tab = '';
            data.forEach(function (user) {

                tab += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button class="view"><a href='view.html?id=${user.id}'>View</a></button>
                            <button class="details"><a href='http://localhost:3000/download?id=${user.id}'>Download</a></button>
                            <button class="update"><a href='edit.html?id=${user.id}'>Update</a></button>
                            <button class="delete"><a href='delete.html?id=${user.id}'>Delete</a></button>
                        </td>
                    </tr>
                    `;
            })
            tb.innerHTML = tab;
        })
        .catch(error => {
            console.error('Error submitting the form:', error);
            alert('Failed to submit the form. Please try again.'); // User feedback
        });


}
