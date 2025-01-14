document.getElementById('details').addEventListener('submit', async function () {

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

    try {
        const response = await fetch('http://localhost:3000/addData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ personalInfo, education, workExperience, skills, brief_description })
        });

        if (!response.ok) {
            const result = await response.json();
            console.log('Server response:', result);
            document.getElementById('emailerr').textContent = result.error;
            throw new Error('Submission failed');
        }

        const result = await response.json();
        console.log('Submission successful:', result);
        alert('Form submitted successfully!');
        window.open('../views/index.html');
        document.getElementById('details').reset();
    } catch (error) {
        console.error(error);
    }
});
