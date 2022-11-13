tigre = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrU4oEWfBqnTtuq5iAzeMQy_BwfkisXqpuZg&usqp=CAU'
perro = 'https://static.dw.com/image/45953099_303.jpg';
ardilla = 'https://t1.ev.ltmcdn.com/es/posts/6/7/4/animales_de_la_ciudad_3476_orig.jpg';
vaca = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWF4tOY6QZjGgqw2kBNSWXrRxwzQi4EnAxw&usqp=CAU';
gato = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQl4fMI2XmW1_BhOT1BwIWnGz5fJ1W2dLTg&usqp=CAU';

var currentphoto = undefined
var beforephoto = undefined;
var intervalo;
var aciertos= 0;
var imagenes = [[tigre,2], [perro,2], [ardilla,2], [vaca,2], [gato,2]];
var posiciones = [0,1,2,3,4,5,6,7,8,9];


// function escogerCartaAleatoria(){
//     let posicion = Math.floor(Math.random() * posiciones.length);
//     imagenes.splice(posicion,1);
//     return posicion;
// }

function escogerImagenAleatoria(){
    let imagen = Math.floor(Math.random() * imagenes.length);
    if(imagenes[imagen][1] == 0){
        imagenes.splice(imagen,1);
        return escogerImagenAleatoria();
    }
    else{
        imagenes[imagen][1]--;
        return imagenes[imagen][0];
    }
}

function crono() {
    if(intervalo) return false;
    let seg = document.getElementById("segundos");
    let min = document.getElementById("minutos");
    let hor = document.getElementById("horas");
    let segundos = parseInt(seg.innerHTML);
    let minutos = parseInt(min.innerHTML);
    let horas = parseInt(hor.innerHTML);
    intervalo = setInterval(()=>{
        seg.innerHTML =+ segundos < 10? '0' + segundos: segundos;
        min.innerHTML =+ minutos < 10? '0' + minutos: minutos;
        hor.innerHTML =+ horas < 10? '0' + horas: horas;
        segundos++;
        if(segundos == 61){
            segundos = 0;
            minutos++;
        }
        if(minutos == 61){
            minutos = 0;
            horas++;
        }

    },1000);
}




function settear(){
    game=document.getElementById("game");
    veces = 2*imagenes.length;
    for(let i=0; i<veces; i++){
        card = document.createElement("div");
        card.className = "card";
        card.setAttribute("id",i);
        imagen = document.createElement("img");
        imagen.setAttribute("src",escogerImagenAleatoria());
        game.appendChild(card);
        card.appendChild(imagen);
        card.addEventListener("click", (e) => {
            crono();

            if(e.target.className == "card" || e.target.className == 'card shake'){
                e.target.setAttribute('class',"card clicked");
                if(beforephoto == undefined)
                beforephoto = [e.target.firstChild.getAttribute("src"), e.target.id];
                else
                currentphoto = [e.target.firstChild.getAttribute("src"), e.target.id];
                
                if(currentphoto != undefined && beforephoto[0] == currentphoto[0]){
                    document.getElementById(beforephoto[1]).setAttribute('class',"card checked");
                    e.target.setAttribute('class',"card checked");
                    beforephoto = undefined;
                    currentphoto = undefined;
                    aciertos++;
                    if(aciertos == imagenes.length){
                        clearInterval(intervalo);
                    }
                }
                else if(currentphoto != undefined && beforephoto[0] != currentphoto[0]){
                    setTimeout(()=>{
                        document.getElementById(beforephoto[1]).setAttribute('class',"card shake");
                        e.target.setAttribute('class',"card shake");
                        beforephoto = undefined;
                        currentphoto = undefined;
                    },1000);    
                }
            }
            });
    }
}

window.onload = () => {
    settear();
};