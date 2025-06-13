//Se ejecutará nada más cargue el DOM de la página
$(document).ready(function () {

    //cogemos el contenedor donde vamos a insertar las noticias 
    const contenedor = $('#cont-noticias'); 
    var cuenta = 0; 

    //Hacemos la llamada al documento 
    $.ajax({
        url: 'https://gnews.io/api/v4/search?q=inmobiliaria&lang=es&country=es&max=10&apikey=3b43d422bb78918b23192a8dcd2924b1',
        method: 'GET',
        success: function (data) {  //Una vez la "conexión sea correcta"<
                data.articles.forEach(noticia => {
                    if(cuenta <= 5){
                    const div = $('<div id="tarjetas" class="border20" ></div>'); //añadimos un nuevo div dentro del contenedor 
                    //cambiamos el formato de la fecha antes de añadirlo 
                    var fecha = new Date(`${noticia.publishedAt}`).toLocaleDateString();
                    
                    //escribimos el codigo que queremos insertar en el nuevo div
                    const nuevoCod = ` 
                        <div class="tamImg">
                        <img src="${noticia.image}" alt="Foto noticia" class="border20" onerror="this.onerror=null; this.src='../imagenes/noticias.png'; "> 
                        </div> 
                        <div>    
                        <h3>${noticia.title}</h3>
                        <p>${fecha}</p>
                        <hr>
                        <p>${noticia.description}</p>
                        </div>
                        <p><a href="${noticia.url}" target="_blank">Saber más +</a></p>
                    `;
                    div.html(nuevoCod);

                    //Añadimos el nuevo div a su contenedor 
                    contenedor.append(div);
                        cuenta ++; 
                }
                });
           
        },
        error: function (xhr, status, error) {
            console.error("Error en la petición AJAX:", error);
            contenedor.append('<p>Error al cargar noticias.</p>');
        }
    });
});

