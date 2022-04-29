console.log('date-picker.js is running');

// Create calendar instance (config can be specified inside obj)

const flatpickrConfig = {
    inline: true,
    mode: "multiple",

    minDate: 'today',

    altInput: true,
    altFormat: 'Y-M-j',
    dateFormat: "Y-m-d" // is this the format in which it's given to us?
};

const htmlCalendar = flatpickr("#calendar", flatpickrConfig);

function getSelectedDates() {
    return htmlCalendar.selectedDates;
}

function printDates() {
    const dates = getSelectedDates();
    dates.forEach(d => {
        console.log(flatpickr.formatDate(d, "Y-M-j"));
    });
}

function next() {
    // Validate at least 2 dates were selected
    if(htmlCalendar.selectedDates.length < 2) {
        Swal.fire({
            title: 'Not enough dates selected',
            text: 'Make sure to select at least 2 dates for people to vote for!',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'black',
        });
        return;
    }

    // Save dates in local storage
    const dates = htmlCalendar.selectedDates.map(d => flatpickr.formatDate(d, 'Y-m-d'));
    localStorage.selectedDates = JSON.stringify(dates);

    // Move to next page
    location.href='settings.html';
}