//Créer une galerie d'images avec une liste d'images
//Cette galerie est contenu dans une simple DIV
//On ne voit qu'un fichier à la fois
//Un boutton permet de faire défiler les fichiers

var app =(function app() {
    "use strict";
    var gallery = [];
    var html = {};
    
    const createGalery = function () {
        gallery.push('./img/Bird.jpg');
        gallery.push('./img/Bureau.jpg');
        gallery.push('./img/Creation.jpg');
        gallery.push('./img/Galaxy.jpg');
        gallery.push('./img/I-m-singing-in-the-rain.jpeg');
    };
    
    const displayImageGalery = function (url_img) {
        html.img.src = url_img;
        html.img.classList.add("imgAnim");
        setTimeout(function(){
            html.img.classList.remove("imgAnim");
        },2000);
    };
    
    const nextPic = function () {
        html.cur_img++;
        if(html.cur_img >= gallery.length){
            html.cur_img = 0;
        }
        displayImageGalery(gallery[html.cur_img]);
    };
    const prevPic = function () {
        html.cur_img--;
        if(html.cur_img < 0){
            html.cur_img = gallery.length - 1;
        }
        displayImageGalery(gallery[html.cur_img]);
    };
    
    const handleEvents = function () {
        html.next_img.onclick = function () {
            html.runner = false;
            clearInterval(html.timeoutID);
            html.play_img.classList.replace("fa-pause", "fa-play");
            nextPic();
        }
        html.prev_img.onclick = function () {
            html.runner = false;
            clearInterval(html.timeoutID);
            html.play_img.classList.replace("fa-pause", "fa-play");
            prevPic();
        };
        html.play_img.onclick = function () {
            if(html.runner === false){
                html.runner = true;
                html.play_img.classList.replace("fa-play", "fa-pause");
                autoRun();
            } else if(html.runner === true){
                html.runner = false;
                clearInterval(html.timeoutID);
                html.play_img.classList.replace("fa-pause", "fa-play");
            }
        };
        html.input.onchange = handleFiles;
        html.input_btn.onclick = function () {
            html.input.click();
        };
        document.onkeydown = function (e) {
            if(!html.next_img.classList.contains("is-hidden")){
                // left arrow
                if (e.keyCode == '37') {html.prev_img.click();}
                // right arrow
                if (e.keyCode == '39') {html.next_img.click();}
                // space
                if (e.keyCode == '32') {html.play_img.click();}
            }
        };
        
    };
    const handleFiles = function (evt) {
        const src = evt.srcElement || evt.target;
        
        for(var i = 0; i < src.files.length; i++){
            const reader = new FileReader();
            
            var ext = src.files.item(i).name.split('.')[1];
            if(ext === 'jpg' || ext === 'jpeg' || ext === 'JPG' ||ext === 'png' || ext === 'gif'){
                reader.onload = function getFile(evt) {
                    const src = evt.srcElement || evt.target;
                    gallery.push(src.result);
                    if(gallery.length > 0){
                        img.classList.remove("is-hidden");
                        displayImageGalery(gallery[html.cur_img]);
                    }
                    if(gallery.length > 1){
                        html.next_img.classList.remove("is-hidden");
                        html.prev_img.classList.remove("is-hidden");
                        html.play_img.classList.remove("is-hidden");
                    }
                };
                reader.readAsDataURL(src.files[i]);
            } else{
                alert("Ceci n'est pas une image : " + src.files.item(i).name);
            }
        }
        html.runner = true;
//        autoRun();
    };

    var autoRun = function(){
        html.timeoutID = setInterval(function(){
            if(html.runner === true && gallery.length > 0){
                nextPic();
            }
            if(html.runner === false && gallery.length > 0){
                clearInterval(html.timeoutID);
            }
        }, 2500);
    };
    
    const getHTMLrefs = function () {
        return {
            cur_img: 0,
            img: document.getElementById('img'),
            next_img: document.getElementById('move_next'),
            prev_img: document.getElementById('move_previous'),
            play_img: document.getElementById('play'),
            input: document.getElementById("file_upload"),
            input_btn: document.getElementById("file_upload_btn"),
            runner: true,
            timeoutID: ""
        }
    };
    
    var start = function () {
        html = getHTMLrefs();
        handleEvents();
        autoRun();
//        createGalery();
//        displayImageGalery(gallery[html.cur_img]);
    };
    
    window.addEventListener("DOMContentLoaded", start);
}());
