$(document).ready(function () {
    const contenedor = $('#cont-noticias'); 
    let cuenta = 0; 

    $.ajax({
        url: 'https://gnews.io/api/v4/search?q=inmobiliaria&lang=es&country=es&max=10&apikey=3b43d422bb78918b23192a8dcd2924b1',
        method: 'GET',
        success: function (data) {
            console.log(data); // Para ver la estructura real
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(noticia => {
                    if(cuenta < 5){
                        const div = $('<div id="tarjetas" class="border20"></div>');
                        var fecha = new Date(noticia.publishedAt).toLocaleDateString();
                        const imgUrl = noticia.image ? noticia.image.replace('http://', 'https://') : '../imagenes/noticias.png';

                        const nuevoCod = ` 
                            <div class="tamImg">
                                <img src="${imgUrl}" alt="Foto noticia" class="border20" onerror="this.onerror=null; this.src='../imagenes/noticias.png';"> 
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
                        contenedor.append(div);
                        cuenta++;
                    }
                });
            } else {
                contenedor.append('<p>No hay noticias disponibles.</p>');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la petición AJAX:", error);
            contenedor.append('<p>Error al cargar noticias.</p>');
        }
    });
});
