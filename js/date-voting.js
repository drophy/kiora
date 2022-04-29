///// POLL SETTINGS /////
const pollSettings = JSON.parse(localStorage.pollSettings);

if(pollSettings.name != '') document.querySelector('#event-name').textContent = pollSettings.name;
else document.querySelector('#event-name').remove();

if(pollSettings.description != '') document.querySelector('#event-description').textContent = pollSettings.description;
else document.querySelector('#event-description').remove();

if(pollSettings.pictureUrl != '') document.querySelector('#banner-img').style.backgroundImage = `url(${pollSettings.pictureUrl})`;
else {
    document.querySelector('#banner-img').remove();
    document.querySelector('#fullpage-container').classList.remove('has-banner');
}


///// CALENDAR /////
// Create calendar instance
const enabledDates = JSON.parse(localStorage.selectedDates);

const flatpickrConfig = {
    inline: true,
    mode: "multiple",

    minDate: 'today',
    enable: enabledDates,

    altInput: true,
    altFormat: 'Y-M-j',
    dateFormat: "Y-m-d" // is this the format in which it's given to us?
};

const htmlCalendar = flatpickr("#calendar", flatpickrConfig);

///// FUNCTIONS /////
function submitVote() {
    // Validate at least one date is selected
    if(htmlCalendar.selectedDates.length < 1) {
        Swal.fire({
            title: 'No dates selected',
            // text: 'Make sure to select at least 2 dates for people to vote for!',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'black',
        });
        return;
    }

    // Validate name is not empty
    const displayName = document.querySelector('#display-name').value;
    if(displayName == '') {
        Swal.fire({
            title: 'No display name specified',
            text: 'Please provide a name so others can see who has voted',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'black',
        });
        return;
    }

    // TODO: check if person had already voted, and warn them that their vote will be overwritten (in case it's someone else)

    // Save in localStorage
    localStorage.voted = 'true';
    
    localStorage.displayName = displayName;

    const dates = htmlCalendar.selectedDates.map(d => flatpickr.formatDate(d, 'Y-m-d'));
    localStorage.votedDates = JSON.stringify(dates);

    // Go to results page
    location.href='date-results.html';
}