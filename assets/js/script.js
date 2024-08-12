// Función constructora para Proyecto
function Proyecto(nombre, fechaInicio, fechaTermino) {
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.fechaTermino = fechaTermino;
    this.trabajadores = [];
}

// Función constructora para Trabajador
function Trabajador(nombre, rut, cargo) {
    var _nombre = nombre;
    var _rut = rut;
    var _cargo = cargo;

    // Getters
    this.getNombre = function() {
        return _nombre;
    };
    this.getRut = function() {
        return _rut;
    };
    this.getCargo = function() {
        return _cargo;
    };
}

// Método para buscar trabajador por nombre
Proyecto.prototype.buscarTrabajadorPorNombre = function(nombre) {
    return this.trabajadores.filter(function(trabajador) {
        return trabajador.getNombre().toLowerCase().includes(nombre.toLowerCase());
    });
};

// Variable global para almacenar el proyecto actual
var proyectoActual;

// Manejador de evento para crear proyecto
document.getElementById('proyectoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var nombre = document.getElementById('nombreProyecto').value;
    var fechaInicio = document.getElementById('fechaInicio').value;
    var fechaTermino = document.getElementById('fechaTermino').value;

    if (new Date(fechaInicio) >= new Date(fechaTermino)) {
        alert('La fecha de término debe ser posterior a la fecha de inicio.');
        return;
    }
    
    proyectoActual = new Proyecto(nombre, fechaInicio, fechaTermino);
    alert('Proyecto creado: ' + nombre);
    mostrarProyecto(proyectoActual);
});

// Función para mostrar el proyecto actual
function mostrarProyecto(proyecto) {
    var projectInfoDiv = document.getElementById('projectInfo');
    projectInfoDiv.innerHTML = '<h3>Proyecto Actual</h3>' +
                               '<p>Nombre: ' + proyecto.nombre + '</p>' +
                               '<p>Fecha de Inicio: ' + proyecto.fechaInicio + '</p>' +
                               '<p>Fecha de Término: ' + proyecto.fechaTermino + '</p>';
}

// Manejador de evento para agregar trabajador
document.getElementById('trabajadorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!proyectoActual) {
        alert('Primero cree un proyecto');
        return;
    }
    
    var nombre = document.getElementById('nombreTrabajador').value;
    var rut = document.getElementById('rutTrabajador').value;
    var cargo = document.getElementById('cargoTrabajador').value;
    
    if (!validarRut(rut)) {
        alert('RUT inválido. Asegúrese de seguir el formato correcto.');
        return;
    }
    
    var trabajador = new Trabajador(nombre, rut, cargo);
    proyectoActual.trabajadores.push(trabajador);
    alert('Trabajador agregado: ' + nombre);
    mostrarTrabajadores(proyectoActual.trabajadores);
});

// Función para validar el formato del RUT
function validarRut(rut) {
    var regex = /^\d{7,8}-[kK0-9]$/;
    return regex.test(rut);
}

// Función para mostrar la lista de trabajadores
function mostrarTrabajadores(trabajadores) {
    var workerListDiv = document.getElementById('workerList');
    workerListDiv.innerHTML = '<h3>Trabajadores</h3>';
    
    if (trabajadores.length === 0) {
        workerListDiv.innerHTML += '<p>No hay trabajadores en el proyecto.</p>';
        return;
    }

    var lista = document.createElement('ul');
    trabajadores.forEach(function(trabajador) {
        var item = document.createElement('li');
        item.textContent = 'Nombre: ' + trabajador.getNombre() + 
                           ', RUT: ' + trabajador.getRut() + 
                           ', Cargo: ' + trabajador.getCargo();
        lista.appendChild(item);
    });

    workerListDiv.appendChild(lista);
}

// Manejador de evento para buscar trabajador
document.getElementById('buscarButton').addEventListener('click', function() {
    if (!proyectoActual) {
        alert('No hay proyecto creado');
        return;
    }

    var nombre = document.getElementById('buscarNombre').value;
    var resultados = proyectoActual.buscarTrabajadorPorNombre(nombre);
    mostrarResultados(resultados);
});

// Función para mostrar resultados
function mostrarResultados(trabajadores) {
    var resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    if (trabajadores.length === 0) {
        resultadosDiv.innerHTML = '<p>No se encontraron trabajadores.</p>';
        return;
    }

    var lista = document.createElement('ul');
    trabajadores.forEach(function(trabajador) {
        var item = document.createElement('li');
        item.textContent = 'Nombre: ' + trabajador.getNombre() + 
                           ', RUT: ' + trabajador.getRut() + 
                           ', Cargo: ' + trabajador.getCargo();
        lista.appendChild(item);
    });

    resultadosDiv.appendChild(lista);
}