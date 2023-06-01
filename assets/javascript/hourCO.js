// Función para obtener la hora actual de Colombia desde la API de WorldTime
function obtenerHoraColombia() {
    var url = 'https://worldtimeapi.org/api/timezone/America/Bogota';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var horaColombia = new Date(data.datetime);
        var horaActual = new Date();
        var diferenciaSegundos = (horaColombia - horaActual) / 1000;
  
        // Calcular la diferencia de tiempo hasta las 9:20 PM
        var horaObjetivo = 21; // 9 PM en formato de 24 horas
        var minutosObjetivo = 20;
        var diferenciaHoras = horaObjetivo - horaColombia.getHours();
        var diferenciaMinutos = minutosObjetivo - horaColombia.getMinutes();
  
        // Convertir la diferencia de minutos a segundos
        diferenciaSegundos = diferenciaHoras * 3600 + diferenciaMinutos * 60 + diferenciaSegundos;
  
        // Función para formatear los segundos a dos dígitos
        function formatearSegundos(segundos) {
          return segundos < 10 ? "0" + segundos : segundos;
        }
  
        // Función para actualizar el contador cada segundo
        function actualizarContador() {
          if (diferenciaSegundos > 0) {
            diferenciaSegundos--;
            var horasRestantes = Math.floor(diferenciaSegundos / 3600);
            var minutosRestantes = Math.floor((diferenciaSegundos % 3600) / 60);
            var segundosRestantes = Math.floor(diferenciaSegundos % 60);
  
            // Actualizar el elemento de visualización del contador
            document.getElementById("contador").innerHTML = horasRestantes + "h : " + minutosRestantes + "m : " + formatearSegundos(segundosRestantes) + "s";
  
            // Llamar a la función nuevamente después de un segundo
            setTimeout(actualizarContador, 1000);
          } else {
            // Si ya ha pasado las 9:20 PM, mostrar un mensaje
            document.getElementById("contador").innerHTML = "Ya ha pasado las 9:20 PM.";
          }
        }
  
        actualizarContador();
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  function toggleMute() {
    var audio = document.getElementById("music");
    if (audio.muted) {
      audio.muted = false;
      document.getElementById("muteButton").innerHTML = "Mute";
    } else {
      audio.muted = true;
      document.getElementById("muteButton").innerHTML = "Unmute";
    }
  }
  