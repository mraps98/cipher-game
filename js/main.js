document.addEventListener("DOMContentLoaded",function(){
    let menuItems = document.querySelectorAll(".menuItem");
    const urls = ["difference.html","mono.html","poly.html"]

    for(let i = 0; i <menuItems.length; i++){
        menuItems[i].addEventListener("click",function(){
            location.href = urls[i];
        },false);
    }
});