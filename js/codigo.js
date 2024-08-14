function encriptar() {
    let textoUsuario = document.getElementById("textarea").value;
    textoUsuario = validarTexto(textoUsuario);
    if (textoUsuario !== undefined) {
        const textoEncriptado = encriptarTexto(textoUsuario);
        mostrarTextoEncriptado(textoEncriptado);
        limpiarCaja();
    }
}

function encriptarTexto(texto) {
    const reglas = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    }

    let textoEncriptado = '';
    for (let char of texto) {
        textoEncriptado += reglas[char] || char;
    }

    return textoEncriptado;
}

function mostrarTextoEncriptado(texto) {
    const divEncriptado = document.getElementById("encriptado");
    divEncriptado.innerHTML = `
    <p class="texto__estilizado" id="textoEncriptado">${texto}</p>
    <button class="copiar__boton" onclick="copiarTexto()">Copiar texto</button>
    `;
}

function desencriptar() {
    let textoUsuario = document.getElementById("textarea").value;
    textoUsuario = validarTexto(textoUsuario);
    if (textoUsuario !== undefined) {
        const textoDesencriptado = desencriptarTexto(textoUsuario);
        mostrarTextoDesencriptado(textoDesencriptado);
        limpiarCaja();
    }
}

function desencriptarTexto(texto) {
    const reglas = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    }

    let textoDesencriptado = texto;

    for (let [encriptado, desencriptado] of Object.entries(reglas)) {
        textoDesencriptado = textoDesencriptado.split(encriptado).join(desencriptado);
    }

    return textoDesencriptado;
}

function mostrarTextoDesencriptado(texto) {
    const divEncriptado = document.getElementById("encriptado");
    divEncriptado.innerHTML = `
    <p class="texto__estilizado" id="textoDesencriptado">${texto}</p>
    <button id="copiar" class="copiar__boton" onclick="copiarTexto()">Copiar texto</button>
    `;
}

function limpiarCaja() {
    document.querySelector("#textarea").value = ""; 
}

function copiarTexto() {
    const texto = document.querySelector("#encriptado p").textContent;
    navigator.clipboard.writeText(texto).then(() => {
      

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Texto copiado exitosamente!!",
            showConfirmButton: false,
            timer: 1500
          });

        limpiarDesencriptado();
    }).catch(err => {
        alert("Error al copiar el texto: " + err);
    });
}

function limpiarDesencriptado() {
    document.getElementById("encriptado").innerHTML = `
            <img class="desencriptador__imagen" src="imagenes/busqueda.png" alt="Busquedad">
            <h2 class="desencriptador__subtitulo">Ningun mensaje fue encontrado</h2>
            <p class="desencriptador__texto">Ingresa el texto que deseas encriptar o desencriptar.</p>   
    `;
}

function validarTexto(texto) {
    let str = document.getElementById("textarea");
    if (str.value.trim() === ""){
       
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No has ingresado algun Texto!!",
            showConfirmButton: false,
            timer: 1500
          });





        return;
    }
    if (/[^a-z\s]/.test(texto)) {
      
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "El texto solo debe contener letras minúsculas y sin acentos.!!",
            showConfirmButton: false,
            timer: 1500
          });
        limpiarCaja();
        return undefined;
    }
    return texto;
}