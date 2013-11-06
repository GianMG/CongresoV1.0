// Esperar a que se cargue PhoneGap
document.addEventListener("deviceready", onDeviceReady, false);

// Procesar el Resultado de Diálogo de Confirmación
function BotonConfirmacion(button) {
    alert('Selecciono el boton: ' + button);
}
// Muestra un Cuadro de Diálogo de Confirmación Personalizada
function MostrarConfirmacion() {
    navigator.notification.confirm(
    'Demo Congreso!',           // Mensaje
    BotonConfirmacion,          // Devolución de Llamada para Invocar con el Índice del Botón Presionado
    'Desarrollo Hibridas APP',  // Titulo
    'Aceptar,Salir'             // Etiquetas de los Botones
    );
}

var pictureSource;   // inicializacion de la variable para la fuente de imagen
var destinationType; // inicializacion de la variable establece el formato del valor devuelto 

// PhoneGap ya puede ser usado!
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Se llama cuando la foto se recupera satisfactoriamente
//
function onPhotoDataSuccess(imageData) {
    // Obtiene el manejador de la imagen
    var smallImage = document.getElementById('smallImage');

    // Hace visible el elemento de la imagen
    smallImage.style.display = 'block';

    // Muestra la foto capturada
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Se llama cuando la foto se recupera satisfactoriamente
//
function onPhotoURISuccess(imageURI) {
    // Obtiene el manejador de la imagen
    //
    var largeImage = document.getElementById('largeImage');

    // Hace visible el elemento de la imagen
    largeImage.style.display = 'block';

    // Muestra la foto capturada
    largeImage.src = imageURI;
}

// Un botón llamará a esta función
//
function capturePhoto() {
    // Toma la foto con la cámara del dispositivo y recuperar la imagen como una cadena codificada en base 64
    // el cual permite que una vez codificada se pueda incrustar y visualizar en el html
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}

// Un botón llamará a esta función
//
function capturePhotoEdit() {
    // Toma imágenes con la cámara del dispositivo, permite editar y recuperar la imagen 
    // como una cadena codificada en base 64
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}

// Un botón llamará a esta función
//
function getPhoto(source) {
    // Recuperar la imagen de la ruta especificada
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 80,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Mensaje si sucede un error
// 
function onFail(message) {
    alert('Error causado: ' + message);
}

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");

    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{width:auto!important}"
        )
    );

    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{height:device-height!important}"
        )
    );

    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}

