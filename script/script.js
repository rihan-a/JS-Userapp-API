let usersUL = document.querySelector("#users-list");
let firstTab = document.querySelector("#tab-first");
let previousTab = document.querySelector("#tab-previous");
let nextTab = document.querySelector("#tab-next");
let lastTab = document.querySelector("#tab-last");
let tabsContainer = document.querySelector(".tabs-container");
let pageNumberPrint = document.querySelector("#page-number");
let searchInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let cancelBtn = document.querySelector("#cancel-btn");

let pageNumber = 1;
let usersPerPage = 3;

// fetch users data from server

function fetchUsers(cb) {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((userData) => cb(userData))
        .catch((err) => console.log(err));
}

fetchUsers(function cb(userData) {
    // printing a page into Html
    let totalPages = Math.ceil(userData.length / usersPerPage);

    function printUsers(pageNumber, userData) {
        console.log(userData);
        let pageStart = pageNumber * usersPerPage - usersPerPage;
        let pageEnd = pageNumber * usersPerPage;
        usersUL.innerHTML = "";
        for (i = pageStart; i < pageEnd; i++) {
            usersUL.innerHTML += `<li class="user"> 
            <span> <span class="title"> Name:</span> ${userData[i].name} </span> 
             <span> <span class="title"> Email:</span> ${userData[i].email} </span> 
             <span> <span class="title"> Phone:</span> ${userData[i].phone} </span>
              <span> <span class="title"> Website:</span> ${userData[i].website} </span>
               <span class="title"> Adress:</span> ${userData[i].address.street},
        ${userData[i].address.city},
        ${userData[i].address.zipcode}
       </span> <span class="title"> Company:</span> ${userData[i].company.name} </span>
        </li>`;
            let totalPages = Math.ceil(userData.length / usersPerPage);
            pageNumberPrint.innerHTML = `${pageNumber} of ${totalPages} `;
        }
    }

    printUsers(pageNumber, userData);

    // Search Users

    let filteredUsers = [];

    function searchUsers() {
        let searchValue = searchInput.value;
        usersUL.innerHTML = "";
        searchInput.value = " ";
        filteredUsers = [];

        for (let i = 0; i < userData.length; i++) {
            if (
                userData[i].name
                .trim()
                .toLowerCase()
                .includes(searchValue.trim().toLowerCase())
            ) {
                filteredUsers.push(userData[i]);

                printUsers(pageNumber, filteredUsers);
            }
        }
    }
    searchBtn.addEventListener("click", searchUsers);
    cancelBtn.addEventListener("click", refreshUsers);

    function refreshUsers() {
        printUsers(pageNumber, userData);
    }

    // Navigation tabs
    nextTab.addEventListener("click", nextP);
    previousTab.addEventListener("click", prevP);
    firstTab.addEventListener("click", firstP);
    lastTab.addEventListener("click", lastP);

    // Navigation functions

    function nextP() {
        if (pageNumber >= 1 && pageNumber < totalPages) {
            pageNumber++;
            printUsers(pageNumber, userData);
        }
    }

    function prevP() {
        if (pageNumber > 1 && pageNumber <= totalPages) {
            pageNumber--;
            printUsers(pageNumber, userData);
        } else {
            pageNumber = 1;
        }
    }

    function firstP() {
        pageNumber = 1;
        printUsers(pageNumber, userData);
    }

    function lastP() {
        pageNumber = totalPages;
        printUsers(pageNumber, userData);
    }
});