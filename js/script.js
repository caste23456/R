const tarjeta = document.querySelector('#tarjeta'),
  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
  formulario = document.querySelector('#formularios');
// isótopo inicial
var $grid = $('.collection-list').isotope({
  // opcion
});
// filtrar elementos al hacer clic en el botón
$('.filter-button-group').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  resetFilterBtns();
  $(this).addClass('active-filter-btn');
  $grid.isotope({ filter: filterValue });
});

var filterBtns = $('.filter-button-group').find('button');
function resetFilterBtns() {
  filterBtns.each(function () {
    $(this).removeClass('active-filter-btn');
  });
}

/*Funcion para el modal */
(function () {
  $(function () {
    $('#btn-ventana').on('click', function () {
      $('#ventana-modal').modal();
    });
  });
})();

/*script de promocion despues del banner */
let slides = document.querySelectorAll('.slide-container');
let index = 0;

function next() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function prev() {
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
}

setInterval(next, 7000);

/*--------------------------------------------*/
/*codigo para las redes sociales*/
let toggle = document.querySelector('.toggle');
let menu = document.querySelector('.menu');
toggle.onclick = function () {
  menu.classList.toggle('active');
};
/*--------------------------------------------*/

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
  btnAbrirFormulario.classList.toggle('active');
  formulario.classList.toggle('active');
});

