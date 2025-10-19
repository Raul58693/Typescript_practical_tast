"use strict";
// Оголошення Enum з трьома кольорами
var Colors;
(function (Colors) {
    Colors["LIGHT_BLUE"] = "lightblue";
    Colors["LIGHT_GREEN"] = "lightgreen";
    Colors["LIGHT_CORAL"] = "lightcoral";
})(Colors || (Colors = {}));
// Змінні різних типів
let userName = "";
let userAge = 0;
let userHobby = "";
let userExperience = 0;
// Функція привітання
function createGreeting(name, age, hobby, experience) {
    let experienceMessage;
    if (experience > 5) {
        experienceMessage = `Вау, ти справжній експерт у ${hobby}!`;
    }
    else if (experience >= 1 && experience <= 5) {
        experienceMessage = `Чудово, ти вже маєш досвід у ${hobby}.`;
    }
    else {
        experienceMessage = `Все попереду! Починати нове хобі — це цікаво.`;
    }
    return `Привіт, ${name}! Тобі ${age} років. Твоє хобі — ${hobby}. ${experienceMessage}`;
}
// Функція для заповнення select опціями з Enum
function populateColorSelect() {
    const colorSelect = document.getElementById('colorSelect');
    for (const colorKey in Colors) {
        if (isNaN(Number(colorKey))) {
            const option = document.createElement('option');
            option.value = Colors[colorKey];
            option.textContent = ucfirst(colorKey.toLowerCase().replace('_', ' '));
            colorSelect.appendChild(option);
        }
    }
}
// Допоміжна функція для форматування тексту
function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// Функція для виведення значень Enum у вигляді списку
function displayColorsList() {
    const colorsList = document.getElementById('colorsList');
    const title = document.createElement('h3');
    title.textContent = 'Доступні кольори:';
    colorsList.appendChild(title);
    const list = document.createElement('ul');
    for (const colorKey in Colors) {
        if (isNaN(Number(colorKey))) {
            const listItem = document.createElement('li');
            listItem.textContent = `${colorKey}: ${Colors[colorKey]}`;
            list.appendChild(listItem);
        }
    }
    colorsList.appendChild(list);
}
// Обробник події натискання на кнопку
function handleButtonClick() {
    // Отримання значень з полів вводу
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const hobbyInput = document.getElementById('hobbyInput');
    const experienceInput = document.getElementById('experienceInput');
    const resultDiv = document.getElementById('result');
    const colorSelect = document.getElementById('colorSelect');
    userName = nameInput.value;
    userAge = parseInt(ageInput.value) || 0;
    userHobby = hobbyInput.value;
    userExperience = parseInt(experienceInput.value) || 0;
    // Перевірка заповненості обов'язкових полів
    if (!userName || !userAge || !userHobby) {
        resultDiv.innerHTML = '<p style="color: red;">Будь ласка, заповніть всі обов\'язкові поля: ім\'я, вік та хобі.</p>';
        return;
    }
    // Виведення привітання
    const greeting = createGreeting(userName, userAge, userHobby, userExperience);
    resultDiv.innerHTML = `<p>${greeting}</p>`;
    // Зміна кольору фону
    if (colorSelect.value) {
        document.body.style.backgroundColor = colorSelect.value;
    }
}
// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    // Заповнення select кольорами
    populateColorSelect();
    // Виведення списку кольорів
    displayColorsList();
    // Додавання обробника події для кнопки
    submitBtn.addEventListener('click', handleButtonClick);
    // Додавання обробника для миттєвої зміни кольору при виборі з select
    const colorSelect = document.getElementById('colorSelect');
    colorSelect.addEventListener('change', function () {
        if (this.value) {
            document.body.style.backgroundColor = this.value;
        }
    });
});
