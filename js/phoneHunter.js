const loadPhones = async (searchValue, dataLimits) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimits);
};

const displayPhones = (phones, dataLimits) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phones-container');

    phoneContainer.innerText = '';

    const showAllButton = document.getElementById('showAll');
    if (dataLimits && phones.length > 15) {
        phones = phones.slice(0, 15);
        showAllButton.classList.remove('d-none');
    }
    else {
        showAllButton.classList.add('d-none');
    }

    const displayNon = document.getElementById('display-non');
    if (phones.length === 0) {
        displayNon.classList.remove('d-none');
    }
    else {
        displayNon.classList.add('d-none');
    }

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6>${phone.brand}</h6>
                <p class="card-text"></p>
                <button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary d-flex mx-auto" data-bs-toggle="modal" data-bs-target="#PhoneDetailsModal">
                Show Details
            </button>
            </div>
         </div>
        `;

        phoneContainer.appendChild(div);
    });

    // stop spin
    spinner(false);
};

const searchLimits = (dataLimits) => {
    // start spin
    spinner(true);
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    loadPhones(searchValue, dataLimits);
};

document.getElementById('search-btn').addEventListener('click', () => {
    searchLimits(15);
});

// press enter to search
document.getElementById('search-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        searchLimits(15);
    }
});

document.getElementById('showAll').addEventListener('click', () => {
    searchLimits();
});

const spinner = isadded => {
    const toggle = document.getElementById('toggle-spinner');
    if (isadded) {
        toggle.classList.remove('d-none');
    } else {
        toggle.classList.add('d-none');
    }
};

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
};

const displayPhoneDetails = phone => {
    // console.log(phone);
    const mobileTitle = document.getElementById('PhoneDetailsModalLabel');
    mobileTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML =  `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "Not Sure"}</p>
        <p>Chip Set: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : "Not Sure"}</p>
        <p>Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : "Not Sure"}</p>
        <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : "Not Sure"}</p>
        <p>Display Size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : "Not Sure"}</p>
    `;
};