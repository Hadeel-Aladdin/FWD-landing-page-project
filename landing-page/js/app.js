/* jshint esversion: 6*/

// Global Variables:
const fragement = document.createDocumentFragment();
const sections = [...document.querySelectorAll('section')];
const navUl = document.querySelector('#navbar__list');

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
    navUl.appendChild(fragement);
}

function smoothScrolling (){
    //navUl.childElementCount
    const listItems = [...navUl.querySelectorAll('li')];
    listItems.map(function(listItem){
        const link = listItem.querySelector('a');
        const linkId = link.getAttribute('href');
        const clickedSection = document.querySelector(linkId);
        console.log(yOffset);
        link.addEventListener('click', function (event){
            event.preventDefault();
            clickedSection.scrollIntoView({behavior: "smooth"});
        });
    });

}

document.addEventListener('DOMContentLoaded', function callAllFuncs(){
    addNavItems();
    smoothScrolling();
});