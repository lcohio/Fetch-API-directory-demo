// Closures for use in fetchData
let employeeData;
let renderedData = [];
let indexOfModal;


// Append Search bar UI to DOM
$('.search-container').append(`
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>`
);


// Dynamic search function shows and hide matched persons from the fetch below
$('#search-input').on('input', () => {
    let $searchInput = $('#search-input').val();
    $searchInput = $searchInput.toLowerCase();
    $('.card').each(function(){
        if($(this).html().toLowerCase().includes($searchInput)) {
            $(this).css('display', '');
        } else {
            $(this).css('display', 'none');
        }
    });
});


// Get 12 employees from randomuser.me and handle response
const fetchData = fetch('https://randomuser.me/api/?results=12&nat=us')
.then(response => response.json());

// Render data cards to DOM
fetchData.then(function(data) {
    employeeData = data.results;
    renderedData.push(...employeeData);
    employeeData.forEach(employee => {
        $('#gallery').append(`
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`);
    });
})
// Then loop through each employee DOM node and attach event listener that calls generateModalUi() below
.then(() => {
    document.querySelectorAll('.card').forEach((currentCard, i) => {
        currentCard.addEventListener('click', (e) => {
            e.preventDefault();
            generateModalUi(renderedData, i);
        });
    });
});

// Generate Modal UI and append to end of #gallery div
const generateModalUi = (data, i) => {
    indexOfModal = i;
    let galleryDiv = document.getElementById('gallery');
    galleryDiv.insertAdjacentHTML('beforeend',
    `
        <div class="modal-container">
            <div class="modal">
                <button onClick="removeModalUi()" type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="modal-email">${data[i].email}</p>
                    <p class="modal-text cap" id="city">${employeeData[i].location.city}</p>
                    <hr>
                    <p class="modal-text" id="phone">${employeeData[i].phone}</p>
                    <p class="modal-text" id="address">${employeeData[i].location.street} ${employeeData[i].location.city}, ${employeeData[i].location.state}</p>
                    <p class="modal-text" id="dob">${employeeData[i].dob.date}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev<button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `);
    if(indexOfModal === 0) {
        document.querySelector('#modal-prev').disabled = true;
    } else if(indexOfModal === 11) {
        document.querySelector('#modal-next').disabled = true;
    }

    document.querySelector('#modal-prev').addEventListener('click', () => {
        cycleModalContent(renderedData, i - 1);
    });

    document.querySelector('#modal-next').addEventListener('click', () => {
        cycleModalContent(renderedData, i + 1);
    });
};

// Remove current modal UI from #gallery 
// NOTE: This function is called from the onClick prop of the modal close button
const removeModalUi = () => {
    document.getElementById('gallery').removeChild(document.querySelector('.modal-container'));
};

// Insert modal data at next index respective to the current index being passed at generateModalUi()
const cycleModalContent = (data, i) => {
    indexOfModal = i;
    document.querySelector('.modal-container').remove();
    document.getElementById('gallery').insertAdjacentHTML('beforeend',
    `
        <div class="modal-container">
            <div class="modal">
                <button onClick="removeModalUi()" type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="modal-email">${data[i].email}</p>
                    <p class="modal-text cap" id="city">${data[i].location.city}</p>
                    <hr>
                    <p class="modal-text" id="phone">${data[i].phone}</p>
                    <p class="modal-text" id="address">${data[i].location.street} ${data[i].location.city}, ${data[i].location.state}</p>
                    <p class="modal-text" id="dob">${data[i].dob.date}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev<button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `);
    if(indexOfModal === 0) {
        document.querySelector('#modal-prev').disabled = true;
    } else if(indexOfModal === 11) {
        document.querySelector('#modal-next').disabled = true;
    }

    document.querySelector('#modal-prev').addEventListener('click', () => {
        cycleModalContent(renderedData, i - 1);
    });

    document.querySelector('#modal-next').addEventListener('click', () => {
        cycleModalContent(renderedData, i + 1);
    });
}
