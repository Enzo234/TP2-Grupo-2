const res = ['boton-4', "Consiste en un almacén de datos, pero a diferencia del data warehouse, admite cualquier tipo de datos y los conserva tal como han llegado a la nube.",
 'boton-6', ['3'], 'Data Mesh consiste en la construcción de una infraestructura de autoservicio que permite a los equipos utilizar recursos y herramientas bajo demanda, para '+
 'acceder a los datos correctos, procesarlos, prepararlos y analizarlos.', 'Dominios guardados en data lake que son manejados por profesionales con el objetivo de obtener agilidad',
  'boton-7', 'Cada dominio es dueño de sus productos de datos\nLos dominios son autónomos\nEl equipo de plataforma está enfocado en la plataforma\nEs posible plantear una adopción '+
  'incremental de este tipo de arquitecturas', 'Gobierno\nFederación\nLenguajes de consulta\nControl\nIncentivos\nConsultas entre dominios', 'boton-11', 'Es una gestión de datos mediante'+
  ' una plataforma común y un conjunto de herramientas que cualquier equipo de dominio pueda aprovechar.', 'dos', 'Un cambio de paradigma de cómo pensar sobre los datos y que '+
  'características debería tener una plataforma de datos moderna.', 'boton-13', ['2', '4']];
let selectRes = [];

window.onload = function () {
    document.getElementById('ini').click();
}

function cambiarTAB(evt, tab) {
    window.scrollTo(0, 0);
    if (tab !== 'respuestas') {
        deshabilitarRespuestas();
        document.getElementById("f-cuestionario").reset();
    }
    var i, tabcontenido, tablinks;
    tabcontenido = document.getElementsByClassName("content");
    for (i = 0; i < tabcontenido.length; i++) {
        tabcontenido[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tab).style.display = "table";
    evt.currentTarget.className += " active";
}

function deshabilitarRespuestas() {
    var resBT = document.getElementById("Bres");
    resBT.disabled = true;
    var resDiv = document.getElementById('respuestas');
    resDiv.innerHTML = '<!-- SIN HACER TRAMPA >:) -->'
}

function mostrarRespuestas() {
    if (obtenerRespuestas()) {
        copiarDiv();
        prepararRespuestas();
        var resBT = document.getElementById("Bres");
        resBT.disabled = false;
        resBT.click();
        document.getElementById("f-cuestionario").reset();
        selectRes = [];
    }
}

function copiarDiv() {
    var pDiv = document.getElementById('cuestionario');
    var sDiv = document.getElementById('respuestas');
    sDiv.innerHTML = pDiv.innerHTML;
}

function obtenerRespuestas() {
    var cudiv = document.querySelector('#cuestionario');
    var ps = cudiv.querySelectorAll('p');

    for (var i = 0; i < ps.length; i++) {
        var pId = ps[i].id.split('-');
        switch (pId[1]) {
            //Boton de resultado
            case '0':
                //nada
                break;
            //Campo de Texto
            case '1':
                var selV = ps[i].querySelector('input').value;
                if (selV === "") {
                    cancelarRespuestas(ps[i]);
                    return false;
                } else {
                    ps[i].className = ps[i].className.replace(" cue-incompleto", "");
                    selectRes[i] = selV;
                }
                break;
            //Radio botones
            case '2':
                var selV = ps[i].querySelector('input[type="radio"]:checked');
                if (!selV) {
                    cancelarRespuestas(ps[i]);
                    return false;
                } else {
                    ps[i].className = ps[i].className.replace(" cue-incompleto", "");
                    selectRes[i] = selV.id;
                }
                break;
            //Checkboxes
            case '3':
                var cbS = Array.from(ps[i].querySelectorAll('input[type="checkbox"]:checked'));
                if (cbS.length === 0) {
                    cancelarRespuestas(ps[i]);
                    return false;
                } else {
                    var v = [];
                    for (var j = 0; j < cbS.length; j++) {
                        v[j] = cbS[j].value;
                    }
                    ps[i].className = ps[i].className.replace(" cue-incompleto", "");
                    selectRes[i] = v;
                }
                break;
            //Selector
            case '4':
                var selV = ps[i].querySelector('select').value;
                if (selV === '0') {
                    cancelarRespuestas(ps[i]);
                    return false;
                } else {
                    ps[i].className = ps[i].className.replace(" cue-incompleto", "");
                    selectRes[i] = selV;
                }
                break;
            //Text Area
            case '5':
                var selV = ps[i].querySelector('textarea').value;
                if (selV === "") {
                    cancelarRespuestas(ps[i]);
                    return false;
                } else {
                    ps[i].className = ps[i].className.replace(" cue-incompleto", "");
                    selectRes[i] = selV;
                }
                break;
        }
    }
    return true;
}

function cancelarRespuestas(elemP) {
    var nPOS = elemP.getBoundingClientRect();
    window.scrollTo(nPOS.top, nPOS.left);
    elemP.className += " cue-incompleto";
    selectRes = [];
}

function prepararRespuestas() {
    //Obtenemos el div con el contenido
    var div = document.querySelector('#respuestas');

    //Titulo
    div.querySelector('h1').innerHTML = "RESPUESTAS";

    //Cambaimos el id del forum para limpiar el forum del cuestionario
    div.querySelector('form').id = "f-respuesta";

    //Obtenemos las p con las preguntas
    var pr = div.querySelectorAll('p');

    for (var i = 0; i < pr.length; i++) {
        var pId = pr[i].id.split('-');
        switch (pId[1]) {
            //Boton de resultado
            case '0':
                var btn = pr[i].querySelector('button');
                btn.type = "";
                btn.onclick = function (evt) {
                    evt.preventDefault();  //Cancela el evento originial
                    location.reload();     //Actualiza la pagina
                };
                btn.innerHTML = "VOLVER";
                break;
            //Campo de Texto
            case '1':
                var valIn = pr[i].querySelector('input');
                valIn.value = res[i];
                valIn.disabled = true;
                pr[i].className += verificarRespuesta(pId[1], i);
                break;
            //Radio botones
            case '2':
                var arb = pr[i].querySelectorAll('input');
                for (var j = 0; j < arb.length; j++) {
                    arb[j].disabled = true;
                }

                var valIn = pr[i].querySelector('#' + res[i]);
                valIn.checked = true;
                valIn.className += " cue-radio-checkbox";
                pr[i].className += verificarRespuesta(pId[1], i);
                break;
            //Checkboxes
            case '3':
                var cb = pr[i].querySelectorAll('input');
                for (var j = 0; j < cb.length; j++) {
                    cb[j].disabled = true;
                    var elem = pr[i].querySelector("input[value='" + res[i][j] + "']");
                    if (elem !== null) {
                        elem.checked = true;
                        elem.disabled = true;
                        elem.className += " cue-radio-checkbox";
                    }
                }
                pr[i].className += verificarRespuesta(pId[1], i);
                break;
            //Selector
            case '4':
                var valIn = pr[i].querySelector('select');
                valIn.value = res[i];
                valIn.disabled = true;
                pr[i].className += verificarRespuesta(pId[1], i);
                break;
            //Text Area
            case '5':
                var valIn = pr[i].querySelector('textarea');
                valIn.value = res[i];
                valIn.disabled = true;
                pr[i].className += verificarRespuesta(pId[1], i);
                break;
        }
    }
}

function verificarRespuesta(tipoPregunta, indexAct) {
    switch (tipoPregunta) {
        case '1':
        case '5':
            return " cue-texto";
        case '2':
        case '4':
            if (selectRes[indexAct] === res[indexAct]) {
                return " cue-correcto";
            } else {
                return " cue-incorrecto";
            }
        case '3':
            if (selectRes[indexAct].length === res[indexAct].length && selectRes[indexAct].every((val, index) => val === res[indexAct][index])) {
                return " cue-correcto";
            } else {
                return " cue-incorrecto";
            }
    }
}