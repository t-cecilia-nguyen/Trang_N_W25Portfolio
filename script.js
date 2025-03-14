document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more");
    const hiddenProjects = document.querySelectorAll(".hidden-project");
    let isExpanded = false;

    showMoreBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent scrolling
        showMoreBtn.disabled = true; // Disable button during animation

        if (!isExpanded) {
            hiddenProjects.forEach((project, index) => {
                project.style.display = "flex"; // Visible before animation
                
                // Show header & paragraph after fade-in starts
                setTimeout(() => {
                    project.classList.add("visible");
                    project.querySelector(".card-header").style.display = "flex";
                    project.querySelector("p").style.display = "block";
                }, index * 150);
            });

            showMoreBtn.innerHTML = "<span>Show Less</span>";
        } else {
            [...hiddenProjects].reverse().forEach((project, index) => {
                setTimeout(() => {
                    project.classList.remove("visible");
                    project.querySelector(".card-header").style.display = "none";
                    project.querySelector("p").style.display = "none";
                }, index * 150);
                
                setTimeout(() => {
                    project.style.display = "none"; // Hide after animation completes
                }, hiddenProjects.length * 150 + 500);
            });

            showMoreBtn.innerHTML = "<span>Show More</span>";
        }

        setTimeout(() => {
            showMoreBtn.disabled = false; // Re-enable button after animation
        }, hiddenProjects.length * 150 + 500);

        isExpanded = !isExpanded;
    });

    // Hamburger menu + navigation
    const hamburger = document.getElementById('hamburger');
    const secondaryNav = document.getElementById('secondary-nav');

    hamburger.addEventListener('click', () => {
        event.stopPropagation();
        secondaryNav.classList.toggle('active'); // Toggle visibility of secondary nav
    });

    // Close nav when clicking outside
    document.addEventListener('click', (event) => {
        if (secondaryNav.classList.contains('active') && !secondaryNav.contains(event.target)) {
            secondaryNav.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Hide the secondary nav if the window is resized larger
            secondaryNav.classList.remove('active');
        }
    }); 
});

function updateDescriptionHeight() {
    const desc = document.querySelector(".description-project");
    const height = desc.offsetHeight; // Get height of description
    document.documentElement.style.setProperty('--desc-height', `${height}px`);
}

window.addEventListener("load", updateDescriptionHeight);
window.addEventListener("resize", updateDescriptionHeight);