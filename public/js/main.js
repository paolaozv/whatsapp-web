window.addEventListener("load", cargarPagina);

var mensajes = document.getElementById("mensajes");
var chat = document.getElementById("chat");
var otraConversacion = document.getElementsByClassName("otraConversacion");
var foto = document.getElementById("image-profile");
var user = document.getElementById("user-profile");
var contact = document.getElementById("contact");
var msn = document.getElementsByClassName("msn");
var contador = 1;

var plantilla = '<div class="w-message w-message-in msn">' +
	  				'<div class="w-message-text">' +
	  					'<h5 class="blue-1">{{nombre}}</h5>' +
	  					'<p>{{mensaje}}</p>' +
	  					'<div class="time">{{hora}}</div>' +
	  				'</div>' +
	  			'</div>' +
	  			'<div id="conversacion"></div>';

var nombrePlantilla = '<span>{{name}}</span>';

function cargarPagina() {
		
	mensajes.focus();
	mensajes.addEventListener("keyup", enviarMensaje);
	for (var i = 0, longitud = otraConversacion.length; i < longitud; i++) {
		otraConversacion[i].addEventListener("click", cambioConversacion);
	}
}

function enviarMensaje(e) {
	
	var texto = mensajes.value.trim();
	if (e.keyCode == 13) {

		if (existeMensaje(mensajes.value)) {
			var conversacion = document.getElementById("conversacion");
			var burbuja = crearElemento("div", ["w-message", "w-message-out"]);
			burbuja.id = "posicion" + contador;

			var box = crearElemento("div", ["w-message-text"]);

			var parrafo = document.createElement("p");
			parrafo.textContent = texto;

			conversacion.appendChild(burbuja);
			burbuja.appendChild(box);
			box.appendChild(parrafo);

			var hora = crearElemento("div", ["time"]);
			var mostrarHora = horaActual();
			hora.textContent = mostrarHora;
			box.appendChild(hora);
			
			mensajes.value = "";
			document.getElementById("posicion" + contador).scrollIntoView(true);
		}
	contador++;
	}
}

function horaActual() {
	var f = new Date();
	var h = f.getHours();
	var m = f.getMinutes();
	if (m < 10) {
		m = "0" + m;
	}
	var hora = h + ":" + m;
	return hora;
}

function existeMensaje(mensaje) {
	mensaje = mensaje.trim();
	if (mensaje.length == 0) {
		return false;
	} else {
		return true;
	}
}

function crearElemento(etiqueta, clases = []) {
	var elemento = document.createElement(etiqueta);
	var l = clases.length;
	if(l > 0) {
		for(var i = 0; i < l; i++) {
			elemento.classList.add(clases[i]);
		}
	}
	return elemento;
}

function cambioConversacion() {
	var self = this;
	$.ajax({
		url: window.location.href + "demo.json",
		type: "GET",
		success: function(response) {
			var data = $(self).attr("data");
			$("#chat").html(plantilla.replace("{{nombre}}", response.conversaciones[data].contacto)
									 .replace("{{mensaje}}", response.conversaciones[data].ultimaConversacion)
									 .replace("{{hora}}", response.conversaciones[data].hora));
			$("#image-profile").attr("src", response.conversaciones[data].imagen);
			$("#user-profile").html(nombrePlantilla.replace("{{name}}", response.conversaciones[data].contacto));
		},
		error: function(error) {
			console.log(error);
		}
	});
}