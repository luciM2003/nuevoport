class BlobCursor {
  constructor(options = {}) {
    this.options = {
      blobType: options.blobType || 'circle',
      fillColor: options.fillColor || '#FF4D21',
      trailCount: options.trailCount || 3,
      sizes: options.sizes || [15, 28, 18],
      innerSizes: options.innerSizes || [5, 9, 6],
      innerColor: options.innerColor || '#dad7d7',
      opacities: options.opacities || [0.7, 0.6, 0.5],
      shadowColor: options.shadowColor || 'rgba(200, 120, 9, 0.3)',
      shadowBlur: options.shadowBlur || 25,
      shadowOffsetX: options.shadowOffsetX || 0,
      shadowOffsetY: options.shadowOffsetY || 0,
      filterId: options.filterId || 'blob',
      filterStdDeviation: options.filterStdDeviation || 90,
      useFilter: options.useFilter !== false,
      zIndex: options.zIndex || 100
    };

    this.blobs = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    // Create container
    const container = document.createElement('div');
    container.className = 'blob-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = this.options.zIndex;
    document.body.appendChild(container);

    // Add SVG filter for smooth blob effect
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '0';
    svg.style.height = '0';
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', this.options.filterId);
    filter.setAttribute('x', '-100%');
    filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '300%');
    filter.setAttribute('height', '300%');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('in', 'SourceGraphic');
    feGaussianBlur.setAttribute('stdDeviation', this.options.filterStdDeviation);
    feGaussianBlur.setAttribute('result', 'blur');
    
    const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    feOffset.setAttribute('in', 'blur');
    feOffset.setAttribute('result', 'offset');
    
    const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood');
    feFlood.setAttribute('flood-color', '#c87809');
    feFlood.setAttribute('flood-opacity', '0.5');
    feFlood.setAttribute('result', 'color');
    
    const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite.setAttribute('in', 'color');
    feComposite.setAttribute('in2', 'offset');
    feComposite.setAttribute('operator', 'in');
    feComposite.setAttribute('result', 'shadow');
    
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'shadow');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feOffset);
    filter.appendChild(feFlood);
    filter.appendChild(feComposite);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);
    container.appendChild(svg);

    // Create blobs
    for (let i = 0; i < this.options.trailCount; i++) {
      const blob = document.createElement('div');
      blob.style.position = 'fixed';
      blob.style.width = this.options.sizes[i] + 'px';
      blob.style.height = this.options.sizes[i] + 'px';
      blob.style.borderRadius = '50%';
      blob.style.backgroundColor = this.options.fillColor;
      blob.style.opacity = this.options.opacities[i];
      blob.style.boxShadow = `0 0 30px rgba(200, 120, 9, 0.25), 0 0 15px rgba(200, 120, 9, 0.15)`;
      blob.style.pointerEvents = 'none';
      blob.style.willChange = 'transform';
      blob.style.filter = `url(#${this.options.filterId}) blur(${1 + i * 0.5}px)`;
      blob.style.transition = i === 0 ? 'none' : 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)';
      blob.style.transform = 'translate(-50%, -50%)';
      blob.style.zIndex = 100 - i;

      container.appendChild(blob);
      this.blobs.push({
        element: blob,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
      });
    }

    this.attachEvents();
    this.animate();
  }

  attachEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
      }
    });
  }

  animate() {
    // First blob follows cursor closely
    this.blobs[0].targetX = this.mouseX;
    this.blobs[0].targetY = this.mouseY;

    // Update each blob position
    this.blobs.forEach((blob, index) => {
      if (index > 0) {
        // Trailing blobs follow the blob in front with easing
        blob.targetX += (this.blobs[index - 1].x - blob.targetX) * 0.22;
        blob.targetY += (this.blobs[index - 1].y - blob.targetY) * 0.22;
      }

      // Smooth movement
      blob.x += (blob.targetX - blob.x) * 0.45;
      blob.y += (blob.targetY - blob.y) * 0.45;

      blob.element.style.transform = `translate(${blob.x}px, ${blob.y}px) translate(-50%, -50%)`;
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    const container = document.querySelector('.blob-container');
    if (container) {
      container.remove();
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new BlobCursor({
    blobType: 'circle',
    fillColor: '#c87809',
    trailCount: 3,
    sizes: [15, 28, 18],
    innerSizes: [5, 9, 6],
    innerColor: '#dad7d7',
    opacities: [0.8, 0.7, 0.6],
    shadowColor: 'rgba(200, 120, 9, 0.3)',
    shadowBlur: 25,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    filterStdDeviation: 90,
    useFilter: true,
    zIndex: 100
  });
});
