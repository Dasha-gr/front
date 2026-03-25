// Форма заявки в БД

async function fetchData(fam, name, ote, phone, email) {
    let url = `http://localhost/myserver/?fam=${fam}&name=${name}&ote=${ote}&phone=${phone}&email=${email}`
        let response = await fetch(url,{
            method: 'GET',
            headers: { Accept: 'application/json'},
        })
}

function get_form(){
    const btn_form = document.querySelector('#btn_form')
    btn_form.addEventListener('click', event => {

        //шаблоны для проверки полей
        const shablon_fam = /[а-яА-Я]/
        const shablon_name = /[а-яА-Я]/
        const shablon_ote= /[а-яА-Я]/
        const shablon_phone = /[0-9]/
        const shablon_email = /\S+@\S+\.\S+/ //шаблон для символа "@"" и "."и без пробелов


        const fam = documents.querySelector('#fam').value
        const name = document.querySelector('#name').value
        const ote = document.querySelector('#ote').value
        const phone = document.querySelector('#phone').value
        const email = document.querySelector('#email').value
        

        if (shablon_fam.test(fam) && shablon_name.test(name) && shablon_ote.test(ote) && shablon_phone.test(phone) && shablon_email.test(email)) {
            console.log('Успешно')
            fetchData(fam, name, ote, phone, email)
        } else {
            console.log('Ошибка')
        }

        event.preventDefault()
    })
}

document.addEventListener('DOMContentLoaded', function () {
	get_form()
})
