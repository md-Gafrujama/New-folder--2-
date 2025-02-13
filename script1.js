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

// Wait for DOM content and Chart.js to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Please check the script inclusion.');
        return;
    }

    // Enhanced shared configuration
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return `Value: ${context.parsed.y.toFixed(1)}`;
                    }
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
        hover: {
            mode: 'nearest',
            intersect: false
        }
    };

    // Chart initialization with error handling
    const charts = {};
    
    try {
        // Advertising Chart
        const advertisingCtx = document.getElementById('syedAdvertisingChart')?.getContext('2d');
        if (advertisingCtx) {
            charts.advertising = new Chart(advertisingCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Performance',
                        data: [65, 75, 85, 92, 88, 95],
                        borderColor: '#00ff9d',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(0, 255, 157, 0.1)'
                    }]
                },
                options: {
                    ...commonOptions,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        }

        // Marketing Chart
        const marketingCtx = document.getElementById('syedMarketingChart')?.getContext('2d');
        if (marketingCtx) {
            charts.marketing = new Chart(marketingCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Conversions',
                        data: [45, 55, 65, 78, 82, 88],
                        backgroundColor: '#00ff9d',
                        borderRadius: 5,
                        hoverBackgroundColor: '#00cc7a'
                    }]
                },
                options: commonOptions
            });
        }

        // Leads Chart
        const leadsCtx = document.getElementById('syedLeadsChart')?.getContext('2d');
        if (leadsCtx) {
            charts.leads = new Chart(leadsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Leads Generated',
                        data: [35, 45, 55, 65, 75, 85],
                        borderColor: '#00ff9d',
                        backgroundColor: 'rgba(0, 255, 157, 0.2)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: commonOptions
            });
        }

        // Data Chart
        const dataCtx = document.getElementById('syedDataChart')?.getContext('2d');
        if (dataCtx) {
            charts.data = new Chart(dataCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Processed', 'Pending', 'Failed'],
                    datasets: [{
                        data: [75, 20, 5],
                        backgroundColor: [
                            '#00ff9d',
                            '#00cc7a',
                            '#009959'
                        ],
                        hoverBackgroundColor: [
                            '#00e88d',
                            '#00b86e',
                            '#008549'
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
                    }
                }
            });
        }

    } catch (error) {
        console.error('Error initializing charts:', error);
    }

    // Enhanced wave data generation
    function generateWaveData(currentData, baselineIncrease = 0.5) {
        const timestamp = Date.now() / 1000;
        return currentData.map((value, index) => {
            const wave = Math.sin(timestamp * 0.5 + index) * 5;
            const noise = (Math.random() - 0.5) * 2;
            let newValue = value + baselineIncrease + wave + noise;
            return Math.min(Math.max(newValue, value - 10), 100);
        });
    }

    // Enhanced chart update function
    function updateChartData(chart, newData) {
        if (chart && chart.data && chart.data.datasets) {
            chart.data.datasets[0].data = newData;
            chart.update('active');
        }
    }

    // Enhanced auto-update function
    function startAutoUpdate() {
        let updateCount = 0;
        
        const updateInterval = setInterval(() => {
            try {
                updateCount++;
                const baselineIncrease = Math.max(0.3 - (updateCount * 0.005), 0.1);
                
                // Update each chart if it exists
                Object.entries(charts).forEach(([type, chart]) => {
                    if (type === 'data') {
                        const newData = [
                            Math.min(75 + Math.sin(Date.now() / 2000) * 3, 85),
                            Math.max(20 + Math.sin(Date.now() / 2000) * 2, 10),
                            Math.max(5 + Math.sin(Date.now() / 2000), 5)
                        ];
                        updateChartData(chart, newData);
                    } else {
                        const newData = generateWaveData(chart.data.datasets[0].data, baselineIncrease);
                        updateChartData(chart, newData);
                    }
                });
            } catch (error) {
                console.error('Error updating charts:', error);
                clearInterval(updateInterval);
            }
        }, 2000);
    }

    // Enhanced scroll animation
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    // Trigger chart animation when visible
                    const chartId = entry.target.querySelector('canvas')?.id;
                    if (chartId && charts[chartId.replace('syed', '').toLowerCase()]) {
                        charts[chartId.replace('syed', '').toLowerCase()].update();
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-aos]').forEach(card => {
            observer.observe(card);
        });
    }

    // Enhanced metrics animation
    function animateMetrics() {
        document.querySelectorAll('.syed-metric-value').forEach(metric => {
            const value = parseFloat(metric.textContent);
            if (isNaN(value)) return;

            let current = 0;
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            const interval = duration / steps;
            const suffix = metric.textContent.includes('M') ? 'M' : '%';

            const animation = setInterval(() => {
                current += increment;
                if (current >= value) {
                    clearInterval(animation);
                    current = value;
                }
                metric.textContent = current.toFixed(1) + suffix;
            }, interval);
        });
    }

    // Start all animations
    startAutoUpdate();
    animateMetrics();
});