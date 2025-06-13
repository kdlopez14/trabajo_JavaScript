
//Galería: lo que ofrecemos 
const data = {
    rapido: {
        title: "Rápido",
        text: "Mudanzas que no te harán perder el tiempo. ¡Nosotros nos encargamos de todo!",
        image: "../imagenes/fotos_gal/gal_fto11-rapido.jpg"
    },
    facil: {
        title: "Fácil",
        text: "Nos ocupamos de todo para que tu mudanza sea sencilla y sin estrés.",
        image: "../imagenes/fotos_gal/gal_fto12-facil.jpg"
    },
    divertido: {
        title: "Divertido",
        text: "Hacemos que la experiencia de mudanza sea positiva y sin preocupaciones.",
        image: "../imagenes/fotos_gal/gal_fto7_divertido.jpg"
    },
    seguro: {
        title: "Seguro",
        text: "Tus pertenencias están protegidas en cada paso del proceso.",
        image: "../imagenes/fotos_gal/gal_fto8-seguro.jpg"
    },
    economico: {
        title: "Económico",
        text: "Precios justos y sin sorpresas, para que mudarte no sea un problema.",
        image: "../imagenes/fotos_gal/gal_fto9_eco.jpg"
    }
}; 

//controlar los titulos y las imagenes
const buttons = document.querySelectorAll(".lista_menu button");
const contentArea = document.getElementById("contenido_din");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        //animacion remove
        contentArea.classList.remove("animacion");

        const category = button.getAttribute("data-category");

        contentArea.innerHTML = `
                <div class="txt" >
                    <h3>${data[category].title}</h3>
                    <p>${data[category].text}</p>
                </div>
                <div class="fto_menu">
                    <img src="${data[category].image}" alt="Imagen de ${data[category].title}" width="500px">
                </div>
            `;

        //Forzar reflow para reiniciar la animación
        void contentArea.offsetWidth;

        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        //animacion add
        contentArea.classList.add("animacion");
    });
});

//JavaScript que controla el menú en pantallas pequeñas
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menu-icon').addEventListener('click', function () {
        const navList = document.querySelector('.lista_nav');
        navList.classList.toggle('active');
    });
});

