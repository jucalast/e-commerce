// Obtém os elementos do HTML
const cardsWrapper = document.querySelector('.cards-wrapper');
const cards = Array.from(document.querySelectorAll('.card'));
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const modal = document.getElementById('myModal');
const modalTitle = document.getElementById('modalTitle');
const modalDetails = document.getElementById('modalDetails');
const filterModal = document.getElementById('filterModal');
const applyFilterButton = document.querySelector('.modal-content1 button');
const filterButton = document.querySelector('.filter-button');
const closeModalButton = document.getElementById('closeModalButton');

let currentIndex = 0;

// Função para navegar entre os cartões
function navigateCards(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  } else if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  const cardWidth = cards[0].offsetWidth;
  const distanceToMove = -currentIndex * cardWidth;

  cardsWrapper.style.transform = `translateX(${distanceToMove}px)`;

  updateCurrentCardClass();
}

function updateCurrentCardClass() {
  cards.forEach((card, index) => {
    card.classList.toggle('current-item', index === currentIndex);
  });
}

cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    showModal(card);
  });
  card.setAttribute('data-index', index);
});

function showModal(card) {
  const title = card.getAttribute('data-title');
  const description = card.getAttribute('data-description');
  const filters = [
    card.getAttribute('data-filtro1'),
    card.getAttribute('data-filtro2'),
    card.getAttribute('data-filtro3')
  ];

  modalTitle.textContent = title;
  modalDetails.textContent = `Descrição: ${description}\nFiltros: ${filters.join(', ')}`;
  modal.style.display = 'block';
}

filterButton.addEventListener('click', () => {
  openFilterModal();
});

function clearCardsWrapper() {
  cardsWrapper.innerHTML = '';
}

// ...

function filtrarCards() {
  const selectedFilters = Array.from(filterModal.querySelectorAll('input:checked'));
  const selectedFilterValues = selectedFilters.map(filter => filter.value);

  let filteredCount = 0;
  const marginTop = 20; // Defina a margem superior desejada
  const marginRight = 20; // Defina o espaço entre os cartões

  cards.forEach((card) => {
    const cardFilters = [
      card.getAttribute('data-filtro1'),
      card.getAttribute('data-filtro2'),
      card.getAttribute('data-filtro3')
    ];

    const isCardMatching = selectedFilterValues.every(filter => cardFilters.includes(filter));

    if (isCardMatching) {
      card.style.display = 'block';
      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;

      const positionTop = filteredCount * (cardHeight + marginTop);
      const positionRight = 0; // Alinhar à direita

      card.style.top = `${positionTop}-10px`;
      card.style.right = `${positionRight}px`;

      filteredCount++;

      card.addEventListener('click', () => {
        showModal(card);
      });
    } else {
      card.style.display = 'none';
    }

    card.classList.remove('filtered');
  });

  currentIndex = 0;
  updateCurrentCardClass();
  closeFilterModal();
}

// ...


applyFilterButton.addEventListener('click', () => {
  filtrarCards();
});

function openFilterModal() {
  filterModal.style.display = 'block';
}

function closeFilterModal() {
  filterModal.style.display = 'none';
}

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

updateCurrentCardClass();