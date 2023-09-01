const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


const displayPhones = (phones, dataLimit) => {
    // start display show all button and 10 phones 
    const showAllBtn = document.getElementById('show_all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAllBtn.classList.remove('d-none')
    }
    else {
        showAllBtn.classList.add('d-none')
    }

    // start error message
    const errorMessage = document.getElementById('warning_message');
    if (phones.length === 0) {
        errorMessage.classList.remove('d-none');
    }
    else {
        errorMessage.classList.add('d-none');
    }
    // end error message
    console.log(phones);
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.textContent = "";
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card w-75 p-1">
          <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
           <div class="card-body text-center">
             <h5 class="card-title">phone name: ${phone.phone_name}</h5>
          </div>
          <button onclick="phonesDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">details</button>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })
    // end loader
    isLoading(false)
}

// enter key event handler
document.getElementById("searchField").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        processSearch(10);
    }
});

// 
const processSearch = (dataLimit) => {
    const searchField = document.getElementById('searchField');
    // searchField.value = '';
    const searchValue = searchField.value;
    loadPhone(searchValue, dataLimit)
    isLoading(true)
}
document.getElementById('search_btn').addEventListener('click', function () {
    processSearch(10)
})

const isLoading = (spinner) => {
    const loader = document.getElementById('loading');
    if (spinner) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }

}

document.getElementById('btn_show_all').addEventListener('click', function () {
    processSearch()
})

// pones details
const phonesDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);
};

const displayPhonesDetails = phone => {
    const { name, image, mainFeatures, releaseDate,
    } = phone;
    const { memory, displaySize, chipSet, storage } = mainFeatures;

    const container = document.getElementById('modal_container');
    container.innerHTML = `
    <div class="modal-header p-3">
       <h1 class="modal-title fs-5" id="phoneModalLabel"> Phone name: ${name}</h1>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="card p-3">
  <img src="${image ? image : ' image N/a'}" class="card-img-top w-full" alt="...">
  <div class="card-body">
  <p>Release Date: ${releaseDate ? releaseDate : 'no releaseDate'}</p>
  <p>memory: ${memory ? memory : 'memory N/a'}</p>
  <p>displaySize: ${displaySize}</p>
  <p>storage: ${storage}</p>
  </div>
</div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
   </div>
</div>
    `
    // console.log(phone);
}

loadPhone('apple')





