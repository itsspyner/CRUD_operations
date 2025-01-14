function view() {
    const url = document.URL;
    let splitted = url.split('?')[1];
    let query = new URLSearchParams(splitted);
    let id = 0;
    for (let value of query.entries()) {
        id = value[1];
    }


    fetch(`http://localhost:3000/view/${id}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
    })
        .then(response => {
            if (!response) {
                throw new Error("Error fetching response");
            }
            return response.json();
        })
        .then(result => {
            const data = document.getElementById('view');
            let tab = '';
            result.forEach(element => {
                tab += `
Name : ${element.name},
Email : ${element.email},
Phone : ${element.phone},
Address : ${element.address},
Brief_Description : ${element.brief_description},
Skills : ${element.skills},

Education details{
    School Name : ${element.education.school}
    Level : ${element.education.level},
    Year : ${element.education.year},
},
                    
Work Details{
    Company : ${element.experience.company},
    Position : ${element.experience.position},
    Duties : ${element.experience.duties},
    Work Year : ${element.experience.work_year},
}
                 `;
            });
            data.innerText = tab;
        })
        .catch(error => {
            console.error('Error submitting the form:', error);
            alert('Failed to submit the form. Please try again.');
        });
}