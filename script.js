/*=============== SEARCH ===============*/
const searchButton = document.getElementById('search-button'),
      searchClose = document.getElementById('search-close'),
      searchContent = document.getElementById('search-content')

/*=============== SEARCH SHOW ===============*/
// Validate if constant exists
if(searchButton){
    searchButton.addEventListener('click', () =>{
        searchContent.classList.add('show-search')
    })
}
/*=============== SEARCH HIDDEN ===============*/
// Validate if constant exists
if(searchClose){
    searchClose.addEventListener('click', () =>{
        searchContent.classList.remove('show-search')
    })
}

// Selectors for Login and Sign Up elements
const loginButton = document.getElementById('login-button');
const loginClose = document.getElementById('login-close');
const loginContent = document.getElementById('login-content');

const signupButton = document.getElementById('signup-button');
const signupClose = document.getElementById('signup-close');
const signupContent = document.getElementById('signup-content');

const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');

/*=============== SHOW LOGIN ===============*/
if (loginButton) {
    loginButton.addEventListener('click', () => {
        loginContent.classList.add('show-login');
    });
}

/*=============== HIDE LOGIN ===============*/
if (loginClose) {
    loginClose.addEventListener('click', () => {
        loginContent.classList.remove('show-login');
    });
}

// /*=============== SHOW SIGN UP ===============*/
// if (signupButton) {
//     signupButton.addEventListener('click', () => {
//         signupContent.classList.add('show-signup');
//     });
// }

/*=============== HIDE SIGN UP ===============*/
if (signupClose) {
    signupClose.addEventListener('click', () => {
        signupContent.classList.remove('show-signup');
    });
}

/*=============== SWITCH TO SIGN UP ===============*/
if (signupLink) {
    signupLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        loginContent.classList.remove('show-login');
        signupContent.classList.add('show-signup');
    });
}

/*=============== SWITCH TO LOGIN ===============*/
if (loginLink) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        signupContent.classList.remove('show-signup');
        loginContent.classList.add('show-login');
    });
}

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the shadow ...
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                       : header.classList.add('shadow-header')
    
}
window.addEventListener('scroll', shadowHeader)

/*=============== HOME SWIPER ===============*/
let swiperHome = new Swiper('.home__swiper', {
    loop: true,
    spaceBetween: -24,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },

    breakpoints: {
        1220: {
            spaceBetween: 10,
        }
    }
})
/*=============== Borno page ===============*/
// 🔹 Replace this with your actual Gemini API Key
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-prompt-btn");
    const userInputField = document.querySelector(".prompt-input");
    const chatOutput = document.querySelector(".chat__container");

    async function sendMessage() {
        const userMessage = userInputField.value.trim();
        if (!userMessage) return;
    
        // Display user message safely
        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("message", "user-message");
        userMessageElement.innerHTML = `<p class="message-text"></p>`;
        userMessageElement.querySelector("p").textContent = userMessage;
        chatOutput.appendChild(userMessageElement);
    
        userInputField.value = "";
    
        // Fetch bot response from backend
        try {
            const response = await fetch("http://localhost:5000/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            const botReply = data.reply ? data.reply : "দুঃখিত! কিছু সমস্যা হয়েছে।";
    
            // Display bot message safely
            const botMessageElement = document.createElement("div");
            botMessageElement.classList.add("message", "bot-message");
            botMessageElement.innerHTML = `<p class="message-text"></p>`;
            botMessageElement.querySelector("p").textContent = botReply;
            chatOutput.appendChild(botMessageElement);
    
            // Scroll to the latest message smoothly
            botMessageElement.scrollIntoView({ behavior: "smooth" });
    
        } catch (error) {
            console.error("Error:", error);
            const errorMessageElement = document.createElement("div");
            errorMessageElement.classList.add("message", "bot-message");
            errorMessageElement.innerHTML = `<p class="message-text">সার্ভারে সমস্যা হয়েছে!</p>`;
            chatOutput.appendChild(errorMessageElement);
        }
    }
    

    // Send message on button click
    sendButton.addEventListener("click", sendMessage);

    // Send message on Enter key press
    userInputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});





/*=============== NEW SWIPER ===============*/


/*=============== TESTIMONIAL SWIPER ===============*/


/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== DARK LIGHT THEME ===============*/ 


/*=============== SCROLL REVEAL ANIMATION ===============*/