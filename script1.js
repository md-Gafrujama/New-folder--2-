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
    // Shared configuration for all charts
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
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
        }
    };

    // Initial chart setups remain the same
    const advertisingCtx = document.getElementById('syedAdvertisingChart').getContext('2d');
    const advertisingChart = new Chart(advertisingCtx, {
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
        options: commonOptions
    });

    const marketingCtx = document.getElementById('syedMarketingChart').getContext('2d');
    const marketingChart = new Chart(marketingCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Conversions',
                data: [45, 55, 65, 78, 82, 88],
                backgroundColor: '#00ff9d',
                borderRadius: 5
            }]
        },
        options: commonOptions
    });

    const leadsCtx = document.getElementById('syedLeadsChart').getContext('2d');
    const leadsChart = new Chart(leadsCtx, {
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

    const dataCtx = document.getElementById('syedDataChart').getContext('2d');
    const dataChart = new Chart(dataCtx, {
        type: 'doughnut',
        data: {
            labels: ['Processed', 'Pending', 'Failed'],
            datasets: [{
                data: [75, 20, 5],
                backgroundColor: [
                    '#00ff9d',
                    '#00cc7a',
                    '#009959'
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
                        padding: 20
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // New function to generate wave-like data with overall upward trend
    function generateWaveData(currentData, baselineIncrease = 0.5) {
        return currentData.map((value, index) => {
            // Calculate wave effect
            const wave = Math.sin(Date.now() / 1000 + index) * 5; // Wave amplitude of 5
            
            // Add small random variation
            const noise = (Math.random() - 0.5) * 2;
            
            // Combine baseline increase, wave effect, and noise
            let newValue = value + baselineIncrease + wave + noise;
            
            // Ensure values stay within reasonable bounds
            newValue = Math.max(newValue, value - 10); // Don't decrease too much
            newValue = Math.min(newValue, 100); // Cap at 100
            newValue = Math.max(newValue, 0); // Keep above 0
            
            return newValue;
        });
    }

    // Function to update chart data with animation
    function updateChartData(chart, newData) {
        chart.data.datasets[0].data = newData;
        chart.update('active');
    }

    // Modified auto-update function with wave pattern
    function startAutoUpdate() {
        let updateCount = 0;
        
        setInterval(() => {
            updateCount++;
            
            // Calculate baseline increase based on update count
            const baselineIncrease = Math.max(0.5 - (updateCount * 0.01), 0.1);
            
            // Generate new wave-like data for each chart
            const newAdvertisingData = generateWaveData(advertisingChart.data.datasets[0].data, baselineIncrease);
            const newMarketingData = generateWaveData(marketingChart.data.datasets[0].data, baselineIncrease);
            const newLeadsData = generateWaveData(leadsChart.data.datasets[0].data, baselineIncrease);
            
            // Special handling for doughnut chart
            const newDataSolutionsData = [
                Math.min(75 + Math.sin(Date.now() / 1000) * 5, 85),
                Math.max(20 + Math.sin(Date.now() / 1000) * 3, 10),
                Math.max(5 + Math.sin(Date.now() / 1000) * 2, 5)
            ];

            // Update each chart with new data
            updateChartData(advertisingChart, newAdvertisingData);
            updateChartData(marketingChart, newMarketingData);
            updateChartData(leadsChart, newLeadsData);
            updateChartData(dataChart, newDataSolutionsData);
        }, 2000); // Update every 2 seconds
    }

    // Start automatic updates
    startAutoUpdate();

    // Keep existing scroll animation
    const cards = document.querySelectorAll('[data-aos]');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Keep existing metrics counter animation
    const metrics = document.querySelectorAll('.syed-metric-value');
    metrics.forEach(metric => {
        const value = parseFloat(metric.textContent);
        let current = 0;
        const increment = value / 50;
        const updateCount = () => {
            if (current < value) {
                current += increment;
                metric.textContent = current.toFixed(1) + (metric.textContent.includes('M') ? 'M' : '%');
                requestAnimationFrame(updateCount);
            } else {
                metric.textContent = value.toFixed(1) + (metric.textContent.includes('M') ? 'M' : '%');
            }
        };
        updateCount();
    });
});