/* jshint esversion: 6*/

/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/*
 * Define Global Variables
*/

// Create document fragement to avoid lots of reflow and repaint
const fragement = document.createDocumentFragment();
const sections = [...document.querySelectorAll('section')];
const navUl = document.querySelector('#navbar__list');
const navIcon = document.querySelector('.menu__icon');

/*
 * End Global Variables
 * Begin Main Functions
*/

// Build the nav
function addNavItems(){
    sections.map(function (section){
        // Get the name to refer to the section
        const secName = section.getAttribute('data-nav');
        // Get the section id to link to it
        const secId = section.getAttribute('id');
        // Create the list item to hold all these information inside the navbar
        const li = document.createElement('li');
        li.classList.add("nav__item");
        li.innerHTML = `<a class = 'menu__link' href = '#${secId}'> ${secName} </a>`;
        // Append method doesn't cause document reflow or repaint
        fragement.appendChild(li);
    });
    // Reflow and repaint once
    navUl.appendChild(fragement);
}

// Scroll to anchor ID in a smooth movement
function smoothScrolling (){
    const listItems = [...navUl.querySelectorAll('li')];
    listItems.map(function(listItem){
        // Get the <a> element
        const link = listItem.querySelector('a');
        // Get the id of clicked link (desired section)
        const linkId = link.getAttribute('href');
        // Store desired section
        const clickedSection = document.querySelector(linkId);
        link.addEventListener('click', function (event){
            event.preventDefault();
            // Make scrolling smooth process
            clickedSection.scrollIntoView({behavior: "smooth"});
        });
    });

}

// Add class 'active' to section when near top of viewport
function activeSection() {
    window.addEventListener('scroll', function (){
        sections.map(function (section){
            // Get the distance between the top of the window and the top of the section
            const sectionTop = section.getBoundingClientRect().top;
            // Get the section height
            const sectionHeight = section.getBoundingClientRect().height;
            // Check that the amount of section's content that appears is at least 60% of its height
            // The 'smaller than' sign here because the inverse relationship between sectionTop and the amount of section's content that appears
            if (sectionTop <= 0.60*sectionHeight){
                if (!section.classList.contains("your-active-class")){
                        section.classList.add("your-active-class");
                }
            } else{
                // Check that not every section is set to be the active one while it isn't in the view
                section.classList.remove("your-active-class");
            }
        });
    });
}

function footerCopyrights (){
  const footerSpan = document.getElementById('copyright');
  footerSpan.innerHTML = new Date().getFullYear();
}

/*
 * End Main Functions
 * Begin Events
*/

document.addEventListener('DOMContentLoaded', function callAllFuncs(){
    // Build menu
    addNavItems();
    // Scroll to section on link click
    smoothScrolling();
    // Set sections as active
    activeSection();
    footerCopyrights();
});

// Make a responsive Navigation bar
navIcon.addEventListener('click', function() {
    navIcon.classList.toggle("clicked");
    navUl.classList.toggle("clicked");
    
});
