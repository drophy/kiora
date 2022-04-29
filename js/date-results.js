///// POLL SETTINGS /////
const pollSettings = JSON.parse(localStorage.pollSettings);

if(pollSettings.name != '') document.querySelector('#event-name').textContent = pollSettings.name;
else document.querySelector('#event-name').remove();

if(pollSettings.pictureUrl != '') document.querySelector('#banner-img').style.backgroundImage = `url(${pollSettings.pictureUrl})`;
else {
    document.querySelector('#banner-img').remove();
    document.querySelector('#fullpage-container').classList.remove('has-banner');
}

///// ADD VOTE /////
if(localStorage.voted == 'true')
{
    localStorage.voted = 'false';
    
    // VOTERS
    let voters = [];
    voters.push(localStorage.displayName);
    
    const htmlVoterList = document.querySelector('#voter-list');
    voters.forEach(v => htmlVoterList.insertAdjacentHTML('beforeEnd', `<li>${v}</li>`));

    // TOP DATES
    const htmlDateList = document.querySelector('#top-dates-div');
    let dates = JSON.parse(localStorage.votedDates);
    dates.sort(); // the default ASCII sort works fine for YYYY-MM-DD
    // TODO: should sort by number of votes first, and then ASCII order, but no point in doing that atm
    
    // Make dates more readable
    dates = dates.map(d => {
        let dateObj = flatpickr.parseDate(d, 'Y-m-d');
        // return flatpickr.formatDate(dateObj, 'l, F J, Y');
        return flatpickr.formatDate(dateObj, 'F J (D), Y');
    });

    // Insert in html
    dates.forEach(d => htmlDateList.insertAdjacentHTML('beforeEnd', `
        <div class="vote-item"> <div>${d}</div> <div>1 vote</div> </div>
    `));
}
