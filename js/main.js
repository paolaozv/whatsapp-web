window.addEventListener("load", cargarPagina);

var mensajes = document.getElementById("mensajes");
var chat = document.getElementById("chat");
var conversacion = document.getElementById("conversacion");
var otraConversacion = document.getElementsByClassName("otraConversacion");
var foto = document.getElementById("image-profile");
var user = document.getElementById("user-profile");
var contact = document.getElementById("contact");

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
			var burbuja = document.createElement("div");
			burbuja.classList.add("w-message", "w-message-out");
			burbuja.id = "posicion";

			var box = document.createElement("div");
			box.classList.add("w-message-text");

			var parrafo = document.createElement("p");
			parrafo.textContent = texto;

			conversacion.appendChild(burbuja);
			burbuja.appendChild(box);
			box.appendChild(parrafo);

			var hora = document.createElement("div");
			hora.classList.add("time");
			var mostrarHora = horaActual();
			hora.textContent = mostrarHora;
			box.appendChild(hora);
			
			mensajes.value = "";
			document.getElementById("posicion").scrollIntoView(true);
		}
	}
}

function cambioConversacion() {
	var imagenCambio = this.childNodes[1].childNodes[1].getAttribute("src");
	foto.setAttribute("src", imagenCambio);
	user.style.display = "none";
	var nombreCambio = this.childNodes[1].children[1].textContent;
	contact.textContent = nombreCambio;
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