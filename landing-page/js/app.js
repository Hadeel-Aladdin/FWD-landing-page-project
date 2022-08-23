/* jshint esversion: 6*/


// Global Variables:

// Create document fragement to avoid lots of reflow and repaint
const fragement = document.createDocumentFragment();
const sections = [...document.querySelectorAll('section')];
const navUl = document.querySelector('#navbar__list');


// FUNCTIONS

// Function That build the dynamic navbar items
function addNavItems(){
    sections.map(function (section){
        // Get the name to refer to the section
        const secName = section.getAttribute('data-nav');
        // Get the section id to link to it
        const secId = section.getAttribute('id');
        // Create the list item to hold all these information inside the navbar
        const li = document.createElement('li');
        //li.classList.add("nav__item");
        li.innerHTML = `<a class = 'menu__link' href = '#${secId}'> ${secName} </a>`;
        // Append method doesn't cause document reflow or repaint
        fragement.appendChild(li);
    });
    // Reflow and repaint once
    navUl.appendChild(fragement);
}

// Function to make the scroll smooth
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

// Function to check if the section is near to the top of the window or not
function activeSection() {
    window.addEventListener('scrollTO', function (){
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

document.addEventListener('DOMContentLoaded', function callAllFuncs(){
    addNavItems();
    smoothScrolling();
    activeSection();
});
