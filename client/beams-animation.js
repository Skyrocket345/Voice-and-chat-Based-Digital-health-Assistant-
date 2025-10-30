// Beams Animation using Canvas
class BeamsAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.beams = [];
        this.beamCount = 15;
        this.speed = 2;
        this.noiseIntensity = 1.75;
        
        this.resize();
        this.init();
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    init() {
        this.beams = [];
        const spacing = this.width / (this.beamCount + 1);
        
        for (let i = 0; i < this.beamCount; i++) {
            this.beams.push({
                x: spacing * (i + 1),
                width: 2 + Math.random() * 2,
                height: 0,
                maxHeight: this.height * (0.5 + Math.random() * 0.5),
                speed: this.speed * (0.5 + Math.random() * 1.5),
                phase: Math.random() * Math.PI * 2,
                opacity: 0.1 + Math.random() * 0.2,
                growing: true,
                delay: Math.random() * 2000
            });
        }
    }
    
    // Simplified noise function
    noise(x, y, time) {
        const value = Math.sin(x * 0.01 + time * 0.002) * 
                     Math.cos(y * 0.01 + time * 0.003) * 
                     Math.sin((x + y) * 0.005 + time * 0.001);
        return value * this.noiseIntensity;
    }
    
    draw(time) {
        // Clear with black background
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.beams.forEach((beam, index) => {
            // Skip if in delay period
            if (time < beam.delay) return;
            
            const adjustedTime = time - beam.delay;
            
            // Animate beam height
            const cycle = Math.sin(adjustedTime * 0.001 * beam.speed + beam.phase);
            beam.height = beam.maxHeight * (0.5 + cycle * 0.5);
            
            // Calculate noise offset
            const noiseOffset = this.noise(beam.x, adjustedTime, adjustedTime) * 20;
            
            // Draw beam with gradient
            const gradient = this.ctx.createLinearGradient(
                beam.x, 
                this.height, 
                beam.x, 
                this.height - beam.height
            );
            
            gradient.addColorStop(0, `rgba(255, 255, 255, ${beam.opacity * 0.1})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${beam.opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                beam.x + noiseOffset - beam.width / 2,
                this.height - beam.height,
                beam.width,
                beam.height
            );
            
            // Add glow effect
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = `rgba(19, 136, 8, ${beam.opacity * 0.5})`;
            this.ctx.fillRect(
                beam.x + noiseOffset - beam.width / 2,
                this.height - beam.height,
                beam.width,
                beam.height
            );
            this.ctx.shadowBlur = 0;
        });
        
        // Add subtle noise overlay
        this.addNoiseOverlay(time);
    }
    
    addNoiseOverlay(time) {
        const noiseData = this.ctx.createImageData(this.width, this.height);
        const data = noiseData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 10;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 5;
        }
        
        this.ctx.putImageData(noiseData, 0, 0);
    }
    
    animate() {
        const loop = (time) => {
            this.draw(time);
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('beamsCanvas');
    if (canvas) {
        new BeamsAnimation(canvas);
    }
});
