document.getElementById('details').addEventListener('submit',
    async function edit() {
        const url = document.URL;
        const splitted = url.split('?')[1];
        const query = new URLSearchParams(splitted);
        let id = 0;
        for (let value of query.entries()) {
            id = value[1];
        }

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const school = document.getElementById('school').value;
        const level = document.getElementById('level').value;
        const year = document.getElementById('year').value;
        const company = document.getElementById('company').value;
        const position = document.getElementById('position').value;
        const duties = document.getElementById('duties').value;
        const work_year = document.getElementById('work-year').value;
        const skills = document.getElementById('skills').value;
        const brief_description = document.getElementById('brief_description').value;

        const errField = ['phoneerr', 'emailerr'];
        errField.forEach(element => {
            document.getElementById(element).textContent = '';
        });

        if (phone.length < 10) {
            document.getElementById('phoneerr').textContent = "Not a valid phone number";
            return;
        }

        if (!email.includes('@gmail.com')) {
            document.getElementById('emailerr').textContent = "Not a valid email";
            return;
        }

        const personalInfo = { name, address, phone, email };
        const education = { school, level, year };
        const workExperience = { company, position, duties, work_year };


        const response = await fetch(`http://localhost:3000/edit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ personalInfo, education, workExperience, skills, brief_description })
        });
        const result = await response.json();
        if (response.ok) {
            console.log('Updated successfully:', result.message);
            alert('Form Updated successfully!');

            window.open('../views/index.html', '_blank');

            var link = document.createElement('a')
            link.href = `../routes/resume_${id}.pdf`;
            link.download = `resume_${id}.pdf`
            link.click();
            document.body.removeChild(link);
        } else {
            console.log('Error:', result);
            console.log(result.err1)
            document.getElementById('emailerr').textContent = result.error;
        }
    });

