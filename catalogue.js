window.addEventListener('DOMContentLoaded', () => {
  fetch('collection.json')
    .then(r => r.json())
    .then(products => {
      const container = document.getElementById('products');
      if (!container) return;
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        const price = parseFloat(p.price).toFixed(2);
        div.innerHTML = `<img src="${p.image}" alt="${p.title}"><p>${p.title} - €${price}</p>`;
        container.appendChild(div);
      });
    })
    .catch(err => console.error('Erro ao carregar colecção:', err));
});

