console.log(`___________.__               _____              __                 __                      ___________.__                                                 __    __                  .__                    __  .__.__           .__          __         .__             
\__    ___/|  |__   ____   _/ ____\____   _____/  |_  ____   _____/  |_  ____   ______     \__    ___/|  |__   ____ ___.__.___  __ ____      ____   _____/  |__/  |_  ____   ____   |  |__   ____  _______/  |_|__|  |   ____   |  | _____ _/  |_  ____ |  | ___.__.    
  |    |   |  |  \_/ __ \  \   __\/  _ \ /  _ \   __\/    \ /  _ \   __\/ __ \ /  ___/       |    |   |  |  \_/ __ <   |  |\  \/ // __ \    / ___\ /  _ \   __\   __\/ __ \ /    \  |  |  \ /  _ \/  ___/\   __\  |  | _/ __ \  |  | \__  \\   __\/ __ \|  |<   |  |    
  |    |   |   Y  \  ___/   |  | (  <_> |  <_> )  | |   |  (  <_> )  | \  ___/ \___ \        |    |   |   Y  \  ___/\___  | \   /\  ___/   / /_/  >  <_> )  |  |  | \  ___/|   |  \ |   Y  (  <_> )___ \  |  | |  |  |_\  ___/  |  |__/ __ \|  | \  ___/|  |_\___  |    
  |____|   |___|  /\___  >  |__|  \____/ \____/|__| |___|  /\____/|__|  \___  >____  > /\    |____|   |___|  /\___  > ____|  \_/  \___  >  \___  / \____/|__|  |__|  \___  >___|  / |___|  /\____/____  > |__| |__|____/\___  > |____(____  /__|  \___  >____/ ____| /\ 
                \/     \/                                \/                 \/     \/  \/                  \/     \/\/                \/  /_____/                        \/     \/       \/           \/                    \/            \/          \/     \/      \/ `);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el));

class FilmGrainOverlay {
  constructor() {
    this.canvas = document.getElementById('noiseCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    this.animate();
    window.addEventListener('resize', () => this.setupCanvas());
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  generateNoise() {
    const imageData = this.ctx.createImageData(this.width, this.height);
    const data = imageData.data;
    const grain = 1;
    const intensity = 0.55;

    for (let y = 0; y < this.height; y += grain) {
      for (let x = 0; x < this.width; x += grain) {
        if (Math.random() < intensity) {
          const brightness = Math.floor(Math.random() * 255);
          for (let dy = 0; dy < grain && y + dy < this.height; dy++) {
            for (let dx = 0; dx < grain && x + dx < this.width; dx++) {
              const index = ((y + dy) * this.width + (x + dx)) * 4;
              data[index] = brightness;
              data[index + 1] = brightness;
              data[index + 2] = brightness;
              data[index + 3] = 255;
            }
          }
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.generateNoise();
    setTimeout(() => requestAnimationFrame(() => this.animate()), 30);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FilmGrainOverlay();
});
