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
            recommendations.push(`En la pregunta ${i}: Necesita mejorar`);
        } else if (value === 2) {
            recommendations.push(`En la pregunta ${i}: Bueno`);
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
}
