//Se ejecutará nada más cargue el DOM de la página
$(document).ready(function () {

    //cogemos el contenedor donde vamos a insertar las noticias 
    const contenedor = $('#cont-noticias'); 
    var cuenta = 0; 

    //Hacemos la llamada al documento 
    $.ajax({
        url: 'https://newsapi.org/v2/everything?q=(inmobiliaria||alquileres)&language=es&pageSize=5&sortBy=publishedAt&apiKey=9bcb56f5472d4bbf818a731abf22d8dc',
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
                        <img src="${noticia.urlToImage}" alt="Foto noticia" class="border20" onerror="this.onerror=null; this.src='../imagenes/noticias.png'; "> 
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

