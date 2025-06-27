// Función para mostrar la actividad seleccionada
function mostrarActividad(numero) {
    document.querySelectorAll('.actividad-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`actividad${numero}`).style.display = 'block';

    // Ocultar feedback al cambiar de actividad
    document.querySelectorAll('.feedback-messages div').forEach(feedbackDiv => {
        feedbackDiv.style.display = 'none';
    });
}

// Mostrar Actividad 1 al cargar
document.addEventListener('DOMContentLoaded', () => {
    mostrarActividad(1);
    setupActivity1();
    setupActivity2();
    setupActivity3();
});

// --- Lógica para Actividad 1: Orden de Operaciones ---
function setupActivity1() {
    const problemasAct1 = document.querySelectorAll('.problema-act1');
    const feedbackAct1 = document.getElementById('feedback-act1');
    const correctoAct1 = feedbackAct1.querySelector('.correcto');
    const incorrectoAct1 = feedbackAct1.querySelector('.incorrecto');

    problemasAct1.forEach(problema => {
        const opciones = problema.querySelectorAll('.opciones-act1 button');
        opciones.forEach(button => {
            button.addEventListener('click', (event) => {
                // Deseleccionar cualquier opción previamente seleccionada en este problema
                opciones.forEach(btn => btn.classList.remove('selected'));
                event.target.classList.add('selected');
                checkActivity1Completion();
            });
        });
    });

    document.querySelector('.reiniciar[data-activity="1"]').addEventListener('click', resetActivity1);

    function checkActivity1Completion() {
        let allAnswered = true;
        let allCorrect = true;

        problemasAct1.forEach(problema => {
            const selectedButton = problema.querySelector('.opciones-act1 button.selected');
            if (!selectedButton) {
                allAnswered = false;
            } else {
                if (selectedButton.dataset.option !== problema.dataset.correctOption) {
                    allCorrect = false;
                }
            }
        });

        if (allAnswered) {
            if (allCorrect) {
                correctoAct1.style.display = 'flex';
                incorrectoAct1.style.display = 'none';
            } else {
                correctoAct1.style.display = 'none';
                incorrectoAct1.style.display = 'flex';
            }
        } else {
            // Ocultar feedback si no todas están respondidas
            correctoAct1.style.display = 'none';
            incorrectoAct1.style.display = 'none';
        }
    }

    function resetActivity1() {
        problemasAct1.forEach(problema => {
            const opciones = problema.querySelectorAll('.opciones-act1 button');
            opciones.forEach(btn => btn.classList.remove('selected'));
        });
        correctoAct1.style.display = 'none';
        incorrectoAct1.style.display = 'none';
    }
}


// --- Lógica para Actividad 2: Operaciones Combinadas (Drag & Drop) ---
let draggedItem = null;

function setupActivity2() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    const dropTargets = document.querySelectorAll('.drop-target');
    const pasosOriginales = document.getElementById('pasos-originales-act2');
    const feedbackAct2 = document.getElementById('feedback-act2');
    const correctoAct2 = feedbackAct2.querySelector('.correcto');
    const incorrectoAct2 = feedbackAct2.querySelector('.incorrecto');

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            e.target.classList.add('dragging');
            // Permite copiar el ID del elemento arrastrado
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        item.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
            draggedItem = null;
            checkActivity2Completion();
        });
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permite soltar
            target.classList.add('hovered');
        });

        target.addEventListener('dragleave', () => {
            target.classList.remove('hovered');
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('hovered');

            const data = e.dataTransfer.getData('text/plain');
            const droppedElement = document.getElementById(data);

            if (droppedElement && !target.hasChildNodes()) {
                target.appendChild(droppedElement);
                checkActivity2Completion();
            } else if (droppedElement && target.hasChildNodes()) {
                 // Si el drop target ya tiene un hijo, intercambiar
                 const existingChild = target.firstChild;
                 pasosOriginales.appendChild(existingChild); // Mover el existente de vuelta al original
                 target.appendChild(droppedElement);
                 checkActivity2Completion();
            }
        });
    });

    document.querySelector('.reiniciar[data-activity="2"]').addEventListener('click', resetActivity2);

    function checkActivity2Completion() {
        let allAnswered = true;
        let allCorrect = true;

        dropTargets.forEach(target => {
            if (!target.hasChildNodes()) {
                allAnswered = false;
            } else {
                const droppedOrder = target.firstChild.dataset.orden;
                const expectedOrder = target.dataset.expectedOrder;
                if (droppedOrder !== expectedOrder) {
                    allCorrect = false;
                }
            }
        });

        if (allAnswered) {
            if (allCorrect) {
                correctoAct2.style.display = 'flex';
                incorrectoAct2.style.display = 'none';
            } else {
                correctoAct2.style.display = 'none';
                incorrectoAct2.style.display = 'flex';
            }
        } else {
            correctoAct2.style.display = 'none';
            incorrectoAct2.style.display = 'none';
        }
    }

    function resetActivity2() {
        dropTargets.forEach(target => {
            if (target.hasChildNodes()) {
                pasosOriginales.appendChild(target.firstChild);
            }
        });
        // Volver a añadir los eventos de drag para los elementos que regresan
        draggableItems.forEach(item => {
            item.draggable = true;
        });
        correctoAct2.style.display = 'none';
        incorrectoAct2.style.display = 'none';
    }
}


// --- Lógica para Actividad 3: Ley de Signos ---
function setupActivity3() {
    const problemasSignos = document.querySelectorAll('.problema-signos');
    const feedbackAct3 = document.getElementById('feedback-act3');
    const correctoAct3 = feedbackAct3.querySelector('.correcto');
    const incorrectoAct3 = feedbackAct3.querySelector('.incorrecto');

    problemasSignos.forEach(problema => {
        const signosButtons = problema.querySelectorAll('.signo');
        signosButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                // Deseleccionar cualquier opción previamente seleccionada en este problema
                signosButtons.forEach(btn => btn.classList.remove('selected'));
                event.target.classList.add('selected');
                checkActivity3Completion();
            });
        });
    });

    document.querySelector('.reiniciar[data-activity="3"]').addEventListener('click', resetActivity3);

    function checkActivity3Completion() {
        let allAnswered = true;
        let allCorrect = true;

        problemasSignos.forEach(problema => {
            const selectedSign = problema.querySelector('.signo.selected');
            if (!selectedSign) {
                allAnswered = false;
            } else {
                if (selectedSign.dataset.sign !== problema.dataset.correctSign) {
                    allCorrect = false;
                }
            }
        });

        if (allAnswered) {
            if (allCorrect) {
                correctoAct3.style.display = 'flex';
                incorrectoAct3.style.display = 'none';
            } else {
                correctoAct3.style.display = 'none';
                incorrectoAct3.style.display = 'flex';
            }
        } else {
            correctoAct3.style.display = 'none';
            incorrectoAct3.style.display = 'none';
        }
    }

    function resetActivity3() {
        problemasSignos.forEach(problema => {
            const signosButtons = problema.querySelectorAll('.signo');
            signosButtons.forEach(btn => btn.classList.remove('selected'));
        });
        correctoAct3.style.display = 'none';
        incorrectoAct3.style.display = 'none';
    }
}