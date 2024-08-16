document.getElementById("accessForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validateAccess();
});

const allowedNIEs = [
    "4267837", "3850952", "3851018", "5032035", "19806181", 
    "6297536", "2608724", "6262810", "4267838", "20162435", 
    "3850923", "19806209", "4267828", "3850942"
];

function validateAccess() {
    const nie = document.getElementById("nie").value.trim();
    const name = document.getElementById("name").value.trim();
    
    if (allowedNIEs.includes(nie)) {
        document.getElementById("access").style.display = "none";
        document.getElementById("content").style.display = "block";
    } else {
        document.getElementById("error").style.display = "block";
    }
}

function generateChart() {
    const formData = new FormData(document.getElementById('surveyForm'));
    const results = [];
    const recommendations = [];

    for (let i = 1; i <= 20; i++) {
        const value = parseInt(formData.get(`q${i}`));
        results.push(value);

        if (value === 1) {
            recommendations.push(`En la pregunta ${i}: Necesita mejorar. ${generateRecommendation(i, 'mejorar')}`);
        } else if (value === 2) {
            recommendations.push(`En la pregunta ${i}: Bueno. ${generateRecommendation(i, 'bueno')}`);
        }
    }

    // Generar gráfico de barras
    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.map((_, index) => `Pregunta ${index + 1}`),
            datasets: [{
                label: 'Resultado',
                data: results,
                backgroundColor: results.map(value => {
                    switch(value) {
                        case 1: return 'rgba(255, 99, 132, 0.2)'; // Rojo para "Necesita mejorar"
                        case 2: return 'rgba(255, 159, 64, 0.2)'; // Naranja para "Bueno"
                        case 3: return 'rgba(75, 192, 192, 0.2)'; // Verde para "Muy Bueno"
                        case 4: return 'rgba(54, 162, 235, 0.2)'; // Azul para "Excelente"
                    }
                }),
                borderColor: results.map(value => {
                    switch(value) {
                        case 1: return 'rgba(255, 99, 132, 1)';
                        case 2: return 'rgba(255, 159, 64, 1)';
                        case 3: return 'rgba(75, 192, 192, 1)';
                        case 4: return 'rgba(54, 162, 235, 1)';
                    }
                }),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) { 
                            const labels = ['Necesita mejorar', 'Bueno', 'Muy Bueno', 'Excelente'];
                            return labels[value - 1]; 
                        }
                    }
                }
            }
        }
    });

    // Mostrar recomendaciones en la página
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = ''; // Limpiar recomendaciones anteriores
    if (recommendations.length > 0) {
        recommendationsContainer.innerHTML = '<h3>Recomendaciones Psicológicas:</h3><ul>' + recommendations.map(rec => `<li>${rec}</li>`).join('') + '</ul>';
    } else {
        recommendationsContainer.innerHTML = '<h3>No hay recomendaciones específicas. ¡Sigue así!</h3>';
    }
}

function generateRecommendation(questionNumber, category) {
    const recommendations = {
        1: {
            mejorar: 'Es importante identificar las áreas de tu vida que te causan insatisfacción. Considera trabajar con un terapeuta para explorar estas áreas y desarrollar estrategias que te ayuden a mejorar tu bienestar general.',
            bueno: 'Aunque te sientes generalmente satisfecho, siempre hay espacio para mejorar. Reflexiona sobre lo que podría elevar tu satisfacción a un nivel "Muy Bueno" o "Excelente" y establece metas claras para alcanzarlo.'
        },
        2: {
            mejorar: 'Sentirse fuera de control puede ser una fuente significativa de estrés. Te recomiendo trabajar en la gestión del tiempo y la planificación diaria. La terapia cognitiva puede ayudarte a cambiar tu perspectiva y ganar más control.',
            bueno: 'Mantén y fortalece las áreas en las que te sientes en control. Considera técnicas como la priorización y la planificación estratégica para aumentar tu sensación de control.'
        },
        3: {
            mejorar: 'El estrés frecuente puede ser debilitante. Te sugiero aprender y practicar técnicas de manejo del estrés, como la meditación, el ejercicio regular o la terapia cognitiva.',
            bueno: 'Aunque tu nivel de estrés es manejable, puedes beneficiarte al aprender nuevas técnicas de relajación o al mejorar tu capacidad para anticipar y evitar situaciones estresantes.'
        },
        4: {
            mejorar: 'El apoyo social es crucial para el bienestar emocional. Trabaja en fortalecer tus relaciones o busca nuevas conexiones a través de actividades sociales o grupos de apoyo.',
            bueno: 'Asegúrate de mantener y nutrir las relaciones que tienes. Puedes mejorar aún más tu red de apoyo al ser proactivo en comunicarte y compartir con amigos y familiares.'
        },
        5: {
            mejorar: 'Experimentar pocas emociones positivas puede ser un signo de depresión o anhedonia. Considera la terapia para explorar la causa subyacente y desarrollar estrategias para aumentar las experiencias positivas en tu vida.',
            bueno: 'Aumentar la frecuencia de emociones positivas puede ser posible al practicar la gratitud diaria, participar en actividades que disfrutas, y rodearte de personas que te hagan sentir bien.'
        },
        6: {
            mejorar: 'La falta de paz interior puede ser un indicador de conflicto interno o estrés no resuelto. Trabaja en desarrollar una mayor autoaceptación y explora técnicas de mindfulness o meditación.',
            bueno: 'Si bien te sientes en paz frecuentemente, podrías trabajar en mantener esta paz durante los momentos más difíciles. La práctica regular de mindfulness puede ayudarte a mantener la calma en situaciones estresantes.'
        },
        7: {
            mejorar: 'Manejar mal los conflictos emocionales puede llevar a relaciones tensas y estrés. Trabaja en desarrollar habilidades de comunicación y resolución de conflictos con la ayuda de un terapeuta.',
            bueno: 'Mejorar en la gestión de conflictos emocionales puede ser clave para relaciones más saludables. Considera aprender nuevas técnicas de comunicación asertiva y manejo emocional.'
        },
        8: {
            mejorar: 'La falta de motivación puede estar relacionada con depresión o falta de claridad en tus objetivos. Trabaja en definir metas claras y alcanzables, y considera buscar apoyo para superar cualquier barrera emocional.',
            bueno: 'Aunque tienes un nivel de motivación razonable, podrías beneficiarte al crear un plan de acción más detallado para alcanzar tus metas y establecer hitos para mantenerte enfocado.'
        },
        9: {
            mejorar: 'Sentirse incomprendido puede ser frustrante y llevar al aislamiento. Trabaja en mejorar tus habilidades de comunicación y busca entornos donde te sientas más escuchado y valorado.',
            bueno: 'Aumentar la frecuencia con la que te sientes comprendido puede requerir mejorar la forma en que expresas tus sentimientos y pensamientos a los demás.'
        },
        10: {
            mejorar: 'La inestabilidad emocional puede ser indicativa de trastornos de ánimo o problemas de manejo del estrés. Considera la terapia para desarrollar herramientas que te ayuden a estabilizar tus emociones.',
            bueno: 'Continuar fortaleciendo tu estabilidad emocional es importante. Trabaja en identificar y reducir factores estresantes que puedan desestabilizarte.'
        },
        11: {
            mejorar: 'La ansiedad frecuente puede requerir intervención psicológica. Aprende técnicas de manejo de la ansiedad, como la respiración profunda, la meditación y la reestructuración cognitiva.',
            bueno: 'Aunque tu ansiedad no es excesiva, puedes trabajar en reducirla aún más mediante el ejercicio regular, técnicas de relajación, y cambios en el estilo de vida.'
        },
        12: {
            mejorar: 'La incapacidad para expresar emociones puede llevar a la acumulación de tensión y estrés. Trabaja en desarrollar habilidades de comunicación emocional a través de la terapia o talleres de desarrollo personal.',
            bueno: 'Aunque te sientes capaz, mejorar tus habilidades de expresión emocional puede ayudarte a comunicarte más claramente y a mejorar tus relaciones.'
        },
        13: {
            mejorar: 'La insatisfacción en las relaciones personales puede ser un indicador de problemas de comunicación o expectativas no cumplidas. Trabaja en fortalecer tus relaciones actuales y considera terapia de pareja o familiar si es necesario.',
            bueno: 'Fortalecer y mejorar tus relaciones personales puede llevar a una mayor satisfacción. Trabaja en la comunicación abierta y en pasar tiempo de calidad con tus seres queridos.'
        },
        14: {
            mejorar: 'Si te cuesta manejar el estrés, es importante que aprendas técnicas de manejo del estrés y consideres la terapia para desarrollar un enfoque más resiliente.',
            bueno: 'Puedes mejorar tu capacidad de manejo del estrés al practicar técnicas de relajación regularmente y al mejorar tu capacidad de anticipar y planificar situaciones estresantes.'
        },
        15: {
            mejorar: 'La falta de felicidad puede ser un signo de depresión o insatisfacción en varias áreas de la vida. Trabaja en identificar y abordar los factores que contribuyen a este sentimiento y considera la terapia para apoyo adicional.',
            bueno: 'Aumentar tu felicidad puede requerir una mayor dedicación a actividades que disfrutas y una práctica diaria de la gratitud.'
        },
        16: {
            mejorar: 'La indecisión o arrepentimiento constante puede ser un signo de baja autoconfianza. Trabaja en mejorar tu proceso de toma de decisiones y considera la terapia para explorar las causas subyacentes.',
            bueno: 'Fortalecer la paz con tus decisiones puede requerir una mayor claridad en tus valores y prioridades, así como la práctica de la autoaceptación.'
        },
        17: {
            mejorar: 'La dificultad para adaptarse al cambio puede generar ansiedad y estrés. Trabaja en desarrollar una mentalidad más flexible y considera la terapia para manejar la resistencia al cambio.',
            bueno: 'Mejorar tu adaptación al cambio puede ser clave para tu crecimiento personal. Practica la aceptación y busca oportunidades de aprendizaje en cada cambio.'
        },
        18: {
            mejorar: 'Si sientes falta de apoyo social, es fundamental que busques construir o fortalecer tu red de apoyo. Participa en actividades sociales o grupos que te permitan conectar con personas que te apoyen.',
            bueno: 'Mantén y nutre las relaciones que ya tienes, y sigue buscando formas de expandir tu red social para sentirte aún más apoyado.'
        },
        19: {
            mejorar: 'Un mal equilibrio entre trabajo y vida puede llevar a agotamiento y estrés. Trabaja en establecer límites claros y en priorizar el autocuidado.',
            bueno: 'Mejorar este equilibrio puede requerir ajustes en tu rutina diaria y una mayor atención a tus necesidades personales fuera del trabajo.'
        },
        20: {
            mejorar: 'Si dudas de tu capacidad para mantener un bienestar emocional, es crucial que explores las barreras que te impiden lograrlo y consideres la terapia para desarrollar estrategias a largo plazo.',
            bueno: 'Mantén el enfoque en tu bienestar emocional y sigue desarrollando hábitos saludables que te ayuden a mantenerlo en el tiempo.'
        }
    };

    return recommendations[questionNumber][category];
}
