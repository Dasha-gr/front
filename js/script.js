// Форма заявки в БД
async function fetchData(d) {
    let url = `http://localhost/myserver/post`
        let response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams(d).toString(),
	})
}

function post_form(){
    const btn_form = document.querySelector('#btn_form')
    btn_form.addEventListener('click', event => {
        //шаблоны для проверки полей
        const shablon_fam = /^[А-Я][а-я]*$/;
        const shablon_name = /^[А-Я][а-я]*$/;
        const shablon_ote= /^[А-Я][а-я]*$/;
        const shablon_phone = /[0-9]{11}/
        const shablon_email = /\S+@\S+\.\S+/ //шаблон для символа "@"" и "."и без пробелов

        const fam = document.querySelector('#fam').value
        const name = document.querySelector('#name').value
        const ote = document.querySelector('#ote').value
        const phone = document.querySelector('#phone').value
        const email = document.querySelector('#email').value
        
        d = { fam: fam, name: name, ote: ote, phone: phone, email: email}
        console.log(d)

        if (shablon_fam.test(fam) && shablon_name.test(name) && shablon_ote.test(ote) && shablon_phone.test(phone) && shablon_email.test(email)) {
            alert('Данные успешно добавлены')
            fetchData(d)
        } else {
            console.log('Ошибка')
            if (!shablon_fam.test(fam)) alert('Пожалуйста, заполните поле или проверьте написание фамилии.')
            if (!shablon_name.test(name)) alert('Пожалуйста, заполните поле или проверьте написание имени.');
            if (!shablon_ote.test(ote)) alert('Пожалуйста, заполните поле или проверьте написание отчества.');
            if (!shablon_phone.test(phone)) alert('Пожалуйста, заполните поле или проверьте написание номера телефона.');
            if (!shablon_email.test(email)) alert('Пожалуйста, заполните поле или проверьте написание электронной почты.');
            
        }

        event.preventDefault()
    })
}

document.addEventListener('DOMContentLoaded', function () {
	post_form()
})


// Функция для загрузки категорий и товаров
async function loadCatalogAndTodos() {
    const catalogMenu = document.querySelector('.catalog_menu');
    const cardsContainer = document.querySelector('.cards');

    try {
        let response = await fetch(`http://localhost/myserver/get.php`); // Уточнил расширение .php
        let data = await response.json();

        // Очистка контейнера карточек
        cardsContainer.innerHTML = '';

        // Создание категорий
        for (let category of data.categories) {
            const newLi = document.createElement('li');
            newLi.className = 'category-item';
            newLi.dataset.categoryId = category.id;
            newLi.textContent = category.name_catalog;
            catalogMenu.appendChild(newLi);

            // Добавление события клика на категорию
            newLi.addEventListener('click', () => showCategoryTodos(cardsContainer, data, category.id));
        }

        // Показываем все товары по умолчанию
        showCategoryTodos(cardsContainer, data, null);

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Функция для отображения товаров по категории
async function see_catalog_and_tovar() {
    const catalogMenu = document.querySelector('.catalog_menu');
    const cardsContainer = document.querySelector('.cards');

    try {
        let response = await fetch(`http://localhost/myserver/get.php`);
        let data = await response.json();

        // Очистка контейнера карточек
        cardsContainer.innerHTML = '';

        // Создание категорий
        for (let category of data.categories) {
            const newLi = document.createElement('li');
            newLi.className = 'category-item';
            newLi.dataset.categoryId = category.id;
            newLi.textContent = category.name_catalog;
            catalogMenu.appendChild(newLi);

            // Добавление события клика на категорию
            newLi.addEventListener('click', () => showCategoryTodos(cardsContainer, data, category.id));
        }

        // Показываем все товары по умолчанию
        showCategoryTodos(cardsContainer, data, null);

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Функция для отображения товаров по категории
function showCategoryTodos(cardsContainer, data, categoryId) {
    // Очищаем контейнер карточек
    cardsContainer.innerHTML = '';

    // Отображение товаров выбранной категории
    if (categoryId !== null && data.todos.hasOwnProperty(categoryId.toString())) {
        data.todos[categoryId.toString()].forEach(todo => {
            createCard(todo, cardsContainer);
        });
    } else {
        // Показываем все товары, если категория не выбрана
        Object.values(data.todos).flat().forEach(todo => {
            createCard(todo, cardsContainer);
        });
    }
}

// Функция для создания карточки товара
function createCard(todo, cardsContainer) {
    const card = document.createElement('div');
    card.className = 'card';

    // Картинка товара (исправлённый путь!)
    const img = document.createElement('img');
    img.src = `./${todo.picture_tovar}`; // Убедись, что путь корректный!
    img.alt = todo.name_tovar;

    // Название товара
    const title = document.createElement('p');
    title.textContent = todo.name_tovar;

    // Собираем карточку
    card.appendChild(img);
    card.appendChild(title);

    // Вставляем карточку в контейнер
    cardsContainer.appendChild(card);
}

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', see_catalog_and_tovar);


// Слайдеры
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        
        // Если нет слайдов — выходим (защита от ошибок)
        if (!slides || !prevBtn || !nextBtn) return;

        const totalSlides = slides.children.length;
        let currentSlide = 0;

        // Функция перемещения
        const moveSlide = () => {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        // Кнопка "назад"
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) currentSlide--;
            moveSlide();
        });

        // Кнопка "вперёд"
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) currentSlide++;
            moveSlide();
        });
    });
});