(function(){
    const sparksBack = document.querySelector('.sparks-back');
    const witcher = document.querySelector('.witcher');
    const sparksFront = document.querySelector('.sparks-front');
    const copyCodeBtn = document.querySelector('.copy-code-btn');
    const promoCodeValue = document.querySelector('.promo-code-value');

    window.addEventListener('mousemove', (e) => {
        sparksBack.style.transform = `translate(${e.screenY * 0.10}px, ${e.screenX * 0.10}px)`;
        witcher.style.transform = `translate(${e.screenY * 0.03}px, ${e.screenX * 0.03}px)`;
        sparksFront.style.transform = `translate(${e.screenY * 0.05}px, ${e.screenX * 0.05}px)`;
    });

    copyCodeBtn.addEventListener('click', (e) => {
        navigator.clipboard.writeText(promoCodeValue.textContent)
    });
})();