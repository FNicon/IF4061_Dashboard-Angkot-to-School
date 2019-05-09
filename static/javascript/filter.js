var kapasitas = 10;

function setKapasitas(inputValue) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            kapasitas = parseInt(this.responseText);
            console.log(kapasitas);
            document.getElementById("kapasitas").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("POST","/kapasitas", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("kapasitas="+inputValue);
}

function setSD(inputValue) {

}

function setSMP(inputValue) {

}

function setSMA(inputValue) {

}

function setSMK(inputValue) {

}

function setSLB(inputValue) {

}