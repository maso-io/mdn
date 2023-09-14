const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const photos = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];
/* Declaring the alternative text for each image file */
const altText = ['xx-1','xx-2','xx-3','xx-4','xx-5'];
/* Looping through images */
for (const photo of photos){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${photo}`);
    newImage.setAttribute('alt', altText[photo[3]]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', (e) => {
        displayedImage.setAttribute('src', e.target.getAttribute('src'));
        displayedImage.setAttribute('alt', e.target.getAttribute('alt'));
    })
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', (e) => {
    const node = e.target;
    const context = e.target.getAttribute('class');

    if (context === 'dark'){
        node.setAttribute('class', 'light');
        node.textContent = 'Ligthen'
        node.style.backgroundcolor = "rgba(0,0,0,0.5)"      
    }else{
        node.setAttribute('class', 'dark')
        node.textContent = 'Darken'
        node.style.backgroundcolor = "rgba(0,0,0,0)"
    }
})