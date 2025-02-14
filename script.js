let highestZ = 1;
class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  init(paper) {
    let highestZ = 1;
  
    document.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Evita o comportamento padrão (como rolagem)
      const touch = e.touches[0]; // Pega o primeiro toque
  
      if (!this.rotating) {
        this.touchX = touch.clientX;
        this.touchY = touch.clientY;
        this.velX = this.touchX - this.prevTouchX;
        this.velY = this.touchY - this.prevTouchY;
      }
  
      const dirX = touch.clientX - this.touchStartX;
      const dirY = touch.clientY - this.touchStartY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (180 * angle / Math.PI + 360) % 360;
  
      if (this.rotating) {
        this.rotation = degrees;
      }
  
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevTouchX = this.touchX;
        this.prevTouchY = this.touchY;
  
        // Aplica a transformação
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });
  
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Evita o comportamento padrão
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
  
      const touch = e.touches[0]; // Pega o primeiro toque
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;
  
      // Verifica se é um toque com dois dedos (para rotação)
      if (e.touches.length >= 2) {
        this.rotating = true;
      }
    });
  
    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});



