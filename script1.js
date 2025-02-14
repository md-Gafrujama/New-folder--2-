// ahmburgguer and active ll in nav bar


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    // Menu toggle functionality
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Add staggered animation to nav items
        navItems.forEach((item, index) => {
            if (navLinks.classList.contains('active')) {
                item.style.transitionDelay = `${index * 0.1}s`;
            } else {
                item.style.transitionDelay = '0s';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});



// graph for chart and other graph visulaztion

document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded.');
        return;
    }

    // Enhanced shared configuration with interactive features
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y?.toFixed(1) || context.parsed.toFixed(1)}%`;
                    }
                }
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy'
                },
                pan: {
                    enabled: true,
                    mode: 'xy'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        },
        transitions: {
            active: {
                animation: {
                    duration: 400
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    const charts = {};
    const extendedLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    try {
        // Enhanced Advertising Chart with multiple datasets
        const advertisingCtx = document.getElementById('syedAdvertisingChart')?.getContext('2d');
        if (advertisingCtx) {
            charts.advertising = new Chart(advertisingCtx, {
                type: 'line',
                data: {
                    labels: extendedLabels,
                    datasets: [{
                        label: 'Social Media',
                        data: [65, 75, 85, 92, 88, 95, 97, 93, 96, 98, 94, 99],
                        borderColor: '#00ff9d',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(0, 255, 157, 0.1)'
                    }, {
                        label: 'Display Ads',
                        data: [55, 65, 75, 82, 78, 85, 87, 83, 86, 88, 84, 89],
                        borderColor: '#ff9d00',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(255, 157, 0, 0.1)'
                    }]
                },
                options: commonOptions
            });
        }

        // Enhanced Marketing Chart with stacked bars
        const marketingCtx = document.getElementById('syedMarketingChart')?.getContext('2d');
        if (marketingCtx) {
            charts.marketing = new Chart(marketingCtx, {
                type: 'bar',
                data: {
                    labels: extendedLabels,
                    datasets: [{
                        label: 'Email Conversions',
                        data: [45, 55, 65, 78, 82, 88, 92, 86, 90, 94, 89, 96],
                        backgroundColor: '#00ff9d',
                        borderRadius: 5,
                        stack: 'stack0'
                    }, {
                        label: 'Social Conversions',
                        data: [35, 45, 55, 68, 72, 78, 82, 76, 80, 84, 79, 86],
                        backgroundColor: '#ff9d00',
                        borderRadius: 5,
                        stack: 'stack0'
                    }]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        ...commonOptions.scales,
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Enhanced Leads Chart with comparison
        const leadsCtx = document.getElementById('syedLeadsChart')?.getContext('2d');
        if (leadsCtx) {
            charts.leads = new Chart(leadsCtx, {
                type: 'line',
                data: {
                    labels: extendedLabels,
                    datasets: [{
                        label: 'Qualified Leads',
                        data: [35, 45, 55, 65, 75, 85, 95, 88, 92, 96, 90, 98],
                        borderColor: '#00ff9d',
                        backgroundColor: 'rgba(0, 255, 157, 0.2)',
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'Conversion Rate',
                        data: [25, 35, 45, 55, 65, 75, 85, 78, 82, 86, 80, 88],
                        borderColor: '#ff9d00',
                        backgroundColor: 'rgba(255, 157, 0, 0.2)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'percentage'
                    }]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        percentage: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
        }

        // Enhanced Data Chart with interactive segments
        const dataCtx = document.getElementById('syedDataChart')?.getContext('2d');
        if (dataCtx) {
            charts.data = new Chart(dataCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Processed', 'Pending', 'Failed', 'In Review', 'Archived'],
                    datasets: [{
                        data: [45, 20, 5, 15, 15],
                        backgroundColor: [
                            '#00ff9d',
                            '#00cc7a',
                            '#009959',
                            '#ff9d00',
                            '#cc7a00'
                        ],
                        hoverBackgroundColor: [
                            '#00e88d',
                            '#00b86e',
                            '#008549',
                            '#e88d00',
                            '#b86e00'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true
                    },
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const segment = elements[0];
                            const label = charts.data.data.labels[segment.index];
                            const value = charts.data.data.datasets[0].data[segment.index];
                            console.log(`Selected ${label}: ${value}%`);
                            // You can add custom click handling here
                        }
                    }
                }
            });
        }

    } catch (error) {
        console.error('Error initializing charts:', error);
    }

    // Enhanced wave data generation with trends
    function generateWaveData(currentData, baselineIncrease = 0.5, volatility = 1) {
        const timestamp = Date.now() / 1000;
        return currentData.map((value, index) => {
            const trend = Math.sin(timestamp * 0.2 + index * 0.5) * 5 * volatility;
            const wave = Math.sin(timestamp * 0.5 + index) * 3 * volatility;
            const noise = (Math.random() - 0.5) * 2 * volatility;
            let newValue = value + baselineIncrease + trend + wave + noise;
            return Math.min(Math.max(newValue, value - 10), 100);
        });
    }

    // Enhanced chart update with smoother transitions
    function updateChartData(chart, newData) {
        if (chart && chart.data && chart.data.datasets) {
            chart.data.datasets.forEach((dataset, index) => {
                const volatility = index === 0 ? 1 : 0.8;
                dataset.data = generateWaveData(dataset.data, 0.3, volatility);
            });
            chart.update('active');
        }
    }

    // Enhanced auto-update with dynamic intervals
    function startAutoUpdate() {
        let updateCount = 0;
        
        const updateInterval = setInterval(() => {
            try {
                updateCount++;
                
                Object.entries(charts).forEach(([type, chart]) => {
                    if (type === 'data') {
                        // Update doughnut chart with subtle variations
                        const baseData = chart.data.datasets[0].data;
                        const newData = baseData.map(value => {
                            const change = (Math.random() - 0.5) * 2;
                            return Math.min(Math.max(value + change, 0), 100);
                        });
                        
                        // Normalize to ensure total is 100%
                        const total = newData.reduce((a, b) => a + b, 0);
                        const normalizedData = newData.map(value => (value / total) * 100);
                        
                        updateChartData(chart, normalizedData);
                    } else {
                        updateChartData(chart, chart.data.datasets[0].data);
                    }
                });
            } catch (error) {
                console.error('Error updating charts:', error);
                clearInterval(updateInterval);
            }
        }, 2000);

        // Add resize handler for better responsiveness
        window.addEventListener('resize', () => {
            Object.values(charts).forEach(chart => chart.resize());
        });
    }

    // Initialize animations and updates
    startAutoUpdate();
    animateMetrics();
});


// web design 
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('syedWebDesignChart');
    if (!canvas) {
        console.error('Chart canvas element not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    let chart;

    // Function to generate random data
    function generateRandomData(min, max, length) {
        return Array.from({ length }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    // Function to update chart data
    function updateChartData() {
        const projectsData = generateRandomData(15, 50, 6);
        const satisfactionData = generateRandomData(90, 100, 6);

        chart.data.datasets[0].data = projectsData;
        chart.data.datasets[1].data = satisfactionData;
        chart.update('none'); // Update without animation for smooth transition
    }

    // Function to add new data point
    function addNewDataPoint() {
        const labels = chart.data.labels;
        const currentMonth = new Date().getMonth();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Remove first data point and label
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => dataset.data.shift());

        // Add new data point
        chart.data.labels.push(months[(currentMonth + 1) % 12]);
        chart.data.datasets[0].data.push(Math.floor(Math.random() * (50 - 15 + 1)) + 15);
        chart.data.datasets[1].data.push(Math.floor(Math.random() * (100 - 90 + 1)) + 90);

        chart.update('none');
    }

    // Create initial chart configuration
    const chartConfig = {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Projects Completed',
                data: generateRandomData(15, 50, 6),
                borderColor: '#2563eb',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.1)'
            }, {
                label: 'Client Satisfaction',
                data: generateRandomData(90, 100, 6),
                borderColor: '#10b981',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(16, 185, 129, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Web Design Performance Metrics'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + (this.chart.data.datasets[1].data.includes(value) ? '%' : '');
                        }
                    }
                }
            },
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            },
            transitions: {
                active: {
                    animation: {
                        duration: 300
                    }
                }
            }
        }
    };

    // Create the chart
    try {
        chart = new Chart(ctx, chartConfig);
    } catch (error) {
        console.error('Error creating chart:', error);
        return;
    }

    // Add hover effects for interactivity
    canvas.addEventListener('mousemove', (event) => {
        const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (points.length) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    });

    // Metrics animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.syed-metric-value').forEach(metric => {
                    animateMetric(metric);
                });
            }
        });
    }, { threshold: 0.5 });

    function animateMetric(metric) {
        const target = metric.innerText;
        const duration = 2000;
        const startTime = performance.now();

        function updateValue(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            if (target.includes('%')) {
                const value = Math.floor(progress * parseInt(target));
                metric.innerText = `${value}%`;
            } else if (target.includes('M')) {
                const value = (progress * parseFloat(target)).toFixed(1);
                metric.innerText = `${value}M`;
            } else if (target.includes('+')) {
                const value = Math.floor(progress * parseInt(target));
                metric.innerText = `${value}+`;
            }

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }

        requestAnimationFrame(updateValue);
    }

    // Observe metric containers
    document.querySelectorAll('.syed-service-container').forEach(container => {
        observer.observe(container);
    });

    // Set up automatic data updates
    setInterval(addNewDataPoint, 5000); // Add new data point every 5 seconds
    setInterval(updateChartData, 30000); // Refresh all data every 30 seconds
});