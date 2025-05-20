(async () => {
  try {
    const res = await fetch('assets/catalogue.json');
    const data = await res.json();
    const grid = document.getElementById('grid');
    if (!grid) return;
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product';
      card.innerHTML = `
        <a href="${item.url}" style="color:inherit;text-decoration:none;">
          <img loading="lazy" src="${item.image}" alt="${item.name}">
          <p>${item.name} - €${item.price}</p>
        </a>`;
      grid.appendChild(card);
      observer.observe(card);
    });
  } catch (e) {
    console.error('Failed loading catalogue', e);
  }
})();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

