// Оголошення Enum з трьома кольорами
enum Colors {
    LIGHT_BLUE = "lightblue",
    LIGHT_GREEN = "lightgreen",
    LIGHT_CORAL = "lightcoral"
}

// Змінні різних типів
let userName: string = "";
let userAge: number = 0;
let userHobby: string = "";
let userExperience: number = 0;

// Функція привітання
function createGreeting(name: string, age: number, hobby: string, experience: number): string {
    let experienceMessage: string;
    
    if (experience > 5) {
        experienceMessage = `Вау, ти справжній експерт у ${hobby}!`;
    } else if (experience >= 1 && experience <= 5) {
        experienceMessage = `Чудово, ти вже маєш досвід у ${hobby}.`;
    } else {
        experienceMessage = `Все попереду! Починати нове хобі — це цікаво.`;
    }
    
    return `Привіт, ${name}! Тобі ${age} років. Твоє хобі — ${hobby}. ${experienceMessage}`;
}

// Функція для заповнення select опціями з Enum
function populateColorSelect(): void {
  const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;
  
  for (const colorKey in Colors) {
    if (isNaN(Number(colorKey))) {
      const option = document.createElement('option');
      option.value = Colors[colorKey as keyof typeof Colors];
      option.textContent = ucfirst(colorKey.toLowerCase().replace('_', ' '));
      colorSelect.appendChild(option);
    }
  }
}

// Допоміжна функція для форматування тексту
function ucfirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Функція для виведення значень Enum у вигляді списку
function displayColorsList(): void {
    const colorsList = document.getElementById('colorsList') as HTMLDivElement;
    const title = document.createElement('h3');
    title.textContent = 'Доступні кольори:';
    colorsList.appendChild(title);
    
    const list = document.createElement('ul');
    
    for (const colorKey in Colors) {
        if (isNaN(Number(colorKey))) {
            const listItem = document.createElement('li');
            listItem.textContent = `${colorKey}: ${Colors[colorKey as keyof typeof Colors]}`;
            list.appendChild(listItem);
        }
    }
    
    colorsList.appendChild(list);
}

// Обробник події натискання на кнопку
function handleButtonClick(): void {
    // Отримання значень з полів вводу
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const ageInput = document.getElementById('ageInput') as HTMLInputElement;
    const hobbyInput = document.getElementById('hobbyInput') as HTMLInputElement;
    const experienceInput = document.getElementById('experienceInput') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;
    
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
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
    
    // Заповнення select кольорами
    populateColorSelect();
    
    // Виведення списку кольорів
    displayColorsList();
    
    // Додавання обробника події для кнопки
    submitBtn.addEventListener('click', handleButtonClick);
    
    // Додавання обробника для миттєвої зміни кольору при виборі з select
    const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;
    colorSelect.addEventListener('change', function() {
        if (this.value) {
            document.body.style.backgroundColor = this.value;
        }
    });
});