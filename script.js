document.addEventListener('DOMContentLoaded', function() {
    const timers = document.querySelectorAll('.timer');

    timers.forEach(timer => {
        const timeBoxes = timer.querySelectorAll('.time-box');
        const daysBox = timeBoxes[0];
        const hoursBox = timeBoxes[1];
        const minutesBox = timeBoxes[2];
        const secondsBox = timeBoxes[3];

        // Set the end date for the countdown (example: 24 hours from now)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 0);
        endDate.setHours(endDate.getHours() + 12);
        endDate.setMinutes(endDate.getMinutes() + 0);
        endDate.setSeconds(endDate.getSeconds() + 0);

        function updateCountdown() {
            const now = new Date();
            const timeRemaining = endDate - now;

            if (timeRemaining < 0) {
                clearInterval(countdownInterval);
                timer.innerHTML = "Hết hạn!";
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            daysBox.innerHTML = `${days}<br>Ngày`;
            hoursBox.innerHTML = `${hours}<br>Giờ`;
            minutesBox.innerHTML = `${minutes}<br>Phút`;
            secondsBox.innerHTML = `${seconds}<br>Giây`;
        }

        // Update the countdown every 1 second
        const countdownInterval = setInterval(updateCountdown, 1000);

        // Initial call to display the countdown immediately
        updateCountdown();
    });
});

// Lucky Wheel functionality
document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.querySelector('.wheel');
    const spinButton = document.querySelector('.wheel-button');
    const segments = document.querySelectorAll('.wheel-segment');

    // Define prizes (corresponding to the order of segments in HTML)
    const prizes = [
        'Tặng thêm 1 chai',
        'Giảm giá 10%',
        'Giảm giá 15%',
        'Giảm giá 30%',
        'Giảm giá 5%',
        'Tặng thêm 2 chai'
    ];

    const segmentAngle = 360 / segments.length; // Angle for each segment

    spinButton.addEventListener('click', () => {
        // Disable the button while spinning
        spinButton.disabled = true;

        // Determine a random winning segment index
        const winningSegmentIndex = Math.floor(Math.random() * segments.length);

        // Calculate the rotation needed for the winning segment
        // We want the needle to point to the middle of the segment.
        // The segments are rotated such that the right edge is at the calculated angle.
        // To point to the middle, we need to rotate an additional half segment angle.
        const baseRotation = winningSegmentIndex * segmentAngle;
        const randomOffset = Math.random() * (segmentAngle - 10) + 5; // Add a random offset within the segment

        // Calculate total rotation (spin multiple times for effect)
        const totalRotation = 360 * 5 + baseRotation + randomOffset; // 5 full spins + target angle

        // Apply the rotation
        wheel.style.transform = `rotate(${totalRotation}deg)`;

        // Listen for the end of the transition
        wheel.addEventListener('transitionend', () => {
            // Re-enable the button
            spinButton.disabled = false;

            // Get the final rotation value to determine the landed segment more accurately if needed
            // For now, we'll use the predetermined winningSegmentIndex

            // Alert the user of their prize
            alert(`Chúc mừng! Bạn đã nhận được: ${prizes[winningSegmentIndex]}`);

            // Reset the wheel's rotation for the next spin (optional, but can prevent weird behavior)
            // Need to set transition to none before resetting, then restore it
            wheel.style.transition = 'none';
            wheel.style.transform = `rotate(${totalRotation % 360}deg)`;
            // A small timeout is needed to allow the non-transitioned transform to apply
            setTimeout(() => {
                wheel.style.transition = 'transform 5s cubic-bezier(0.1, 0.7, 1, 0.1)';
            }, 10);

        }, { once: true }); // Use { once: true } to automatically remove the event listener after it fires
    });
});

// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-slide-up');
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target); // Stop observing once it's animated
            } else {
                // Optionally, add 'hidden' back if you want the animation to repeat on scroll up
                // entry.target.classList.remove('fade-in-slide-up');
                // entry.target.classList.add('hidden');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        section.classList.add('hidden'); // Initially hide sections
        observer.observe(section);
    });
});

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Image Slider Animation
function initImageSlider() {
    const images = document.querySelectorAll('.product-images-slider img');
    let currentIndex = 0;

    // Position all images off-screen except the first one
    images.forEach((img, index) => {
        if (index === 0) {
            img.style.transform = 'translateX(0%)';
        } else {
            img.style.transform = 'translateX(100%)'; /* Initially off-screen to the right */
        }
        img.style.transition = 'transform 1s ease-in-out';
    });

    function showNextImage() {
        images[currentIndex].style.transform = 'translateX(-100%)'; /* Slide current out to left */
        images[currentIndex].style.opacity = '0'; /* Make it invisible quickly after sliding */

        currentIndex = (currentIndex + 1) % images.length;

        images[currentIndex].style.transform = 'translateX(100%)'; /* Position next image off-screen right */
        images[currentIndex].style.opacity = '1'; /* Make it visible before sliding in */

        // Force a reflow to ensure the transform takes effect before animating
        void images[currentIndex].offsetWidth;

        images[currentIndex].style.transform = 'translateX(0%)'; /* Slide next image into view */
    }

    
    // Change image every 3 seconds
    setInterval(showNextImage, 3000);
}

// Initialize all animations when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initImageSlider();
});



