window.addEventListener("load", cargarPagina);

var mensajes = document.getElementById("mensajes");
var chat = document.getElementById("chat");
var conversacion = document.getElementById("conversacion");
var otraConversacion = document.getElementsByClassName("otraConversacion");
var foto = document.getElementById("image-profile");
var user = document.getElementById("user-profile");
var contact = document.getElementById("contact");
var msn = document.getElementsByClassName("msn");

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
			var burbuja = crearElemento("div", ["w-message", "w-message-out"]);
			burbuja.id = "posicion";

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
			document.getElementById("posicion").scrollIntoView(true);
		}
	}
}

function cambioConversacion() {

	var conversacion = this.childNodes[1];	
	var imagenCambio = conversacion.childNodes[1].src;
	foto.src = imagenCambio;

	user.style.display = "none";

	var nombreCambio = conversacion.children[1].textContent;
	contact.textContent = nombreCambio;

	for (var i = 0, longitud = msn.length; i < longitud; i++) {
		msn[i].style.display = "none";
	}

	if (this == otraConversacion[0]) {
		for (var i = 0, longitud = msn.length; i < longitud; i++) {
			msn[i].style.display = "block";
		}
		user.style.display = "block";
	} else {
		var elemento = this.firstElementChild;

		var div = crearElemento("div", ["w-message", "w-message-in"]);
		chat.appendChild(div);

		var divMessage = crearElemento("div", ["w-message-text"]);
		div.appendChild(divMessage);

		var nombre = document.createElement("h5");
		var contenido = elemento.children[1].textContent;
		nombre.textContent = contenido;
		divMessage.appendChild(nombre);

		var textoMensaje = document.createElement("p");
		var contenidoMensaje = elemento.children[2].textContent;
		textoMensaje.textContent = contenidoMensaje;
		divMessage.appendChild(textoMensaje);

		var horaMensaje = crearElemento("div", ["time"]);
		var contenidoHora = this.lastElementChild.textContent;
		horaMensaje.textContent = contenidoHora;
		divMessage.appendChild(horaMensaje);
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