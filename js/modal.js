document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn_form');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.querySelector('.close-btn');

    // Показать окно при отправке формы
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Не перезагружаем страницу
        modal.classList.remove('hidden');
    });

    // Закрыть по крестику
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Закрыть по клику на фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});