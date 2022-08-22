/* jshint esversion: 6*/

// Global Variables:
const fragement = document.createDocumentFragment();
const sections = [...document.querySelectorAll('section')];
const nav = document.querySelector('#navbar__list');

// Functions
function addNavItems(){
    sections.map(function (section){
        const secName = section.getAttribute('data-nav');
        const secId = section.getAttribute('id');
        const li = document.createElement('li');
        //li.classList.add("nav__item");
        li.innerHTML = `<a class = 'menu__link' href = '#${secId}'> ${secName} </a>`;
        fragement.appendChild(li);
    });
    nav.appendChild(fragement);
}

addNavItems();