function createPoll() {
    // Save settings in localStorage
    const answers = {
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
        isLightTheme: document.querySelector('#light-theme').checked,
        font: document.querySelector('#font').value,
        pictureUrl: document.querySelector('#picture-url').value,
        allAttendantesMode: document.querySelector('#attendants-required-true').checked,
    }
    localStorage.pollSettings = JSON.stringify(answers);

    // Show confirmation
    Swal.fire({
        title: 'Poll created!',
        text: 'To share, simply copy and paste the url of the next page',
        icon: 'success',
        confirmButtonText: 'Go to poll',
        confirmButtonColor: 'black',
        allowOutsideClick: false // can not be dismissed by clicking on background
    }).then(() => location.href='date-voting.html');
}