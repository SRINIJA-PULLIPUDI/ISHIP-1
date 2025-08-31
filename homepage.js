function reload(){
    document.getElementsByTagName("header")[0].style = "transform:translateY(0px)";
    document.getElementsByClassName("heroQuote")[0].style="transform:translateY(0px);opacity:1;";
    document.getElementsByClassName("heroImage")[0].style="transform:translateX(0px);opacity:1;";
}

function Fix() {
    var header = document.getElementById("Header");
    var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

const userIcon = document.getElementById('user');
const sidebar = document.getElementsByClassName('profile')[0];
const closeArrow = document.getElementsByClassName('back')[0];

userIcon.addEventListener('click', () => {
    sidebar.classList.add('hidden10');
});

closeArrow.addEventListener('click', () => {
    sidebar.classList.remove('hidden10');
});

document.addEventListener('click', (e) => {
    if (
    !sidebar.contains(e.target) && 
    !userIcon.contains(e.target)
    ) {
    sidebar.classList.remove('hidden10');
    }
});

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('show');
    }
});
}, {
threshold: 0.4
});

const observer1 = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('show1');
    }
});
}, {
threshold: 0.5
});

const observer2 = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('show2');
    }
});
}, {
threshold: 0.4
});

document.querySelectorAll('.maincont').forEach(ele => {
    observer.observe(ele);
});

document.querySelectorAll('.pic').forEach(ele => {
    observer1.observe(ele);
});

document.querySelectorAll('.card').forEach(ele => {
    observer2.observe(ele);
});

const img = document.querySelector('.heroImage');
img.classList.add('float');

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.card .number');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 750;
        let startTime = null;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                const current = Math.floor(progress * target);
                counter.textContent = current;
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    };

    const observer5 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer5.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer5.observe(counter);
    });
});

function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

function displayUserInfo(usernameId, emailId) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    window.location.href = 'login.html';
    return;
  }else{
    if (usernameId) document.getElementsByClassName('name')[0].innerText = user.username;
    if (emailId) document.getElementsByClassName('email')[0].innerText = user.email;
    if (usernameId) document.getElementsByClassName('welcomeuser')[0].innerText = user.username;
  }
}


