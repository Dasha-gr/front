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

// Функция для вывода каталога на страницу
async function see_catalog() {
    const catalog_menu = document.querySelector('.catalog_menu');

    let url = `http://localhost/myserver/get`;
    
    let response = await fetch(url);  // Выполняем GET-запрос к серверу
    let data = await response.json();  // Преобразуем ответ сервера из JSON-формата в JavaScript-объект

     // Перебираем каждый элемент массива data
    for (let item of data) {
    const newLi = document.createElement('li');
    newLi.textContent = item.name_catalog
    catalog_menu.appendChild(newLi); // Добавляем созданный <li> внутрь <ul>
}
}

// Вызов при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    see_catalog();
});