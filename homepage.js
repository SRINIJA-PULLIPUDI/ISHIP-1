function reload(){
    document.getElementsByTagName("header")[0].style = "transform:translateY(0px)";
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