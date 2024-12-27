import { basket } from "./displayDishes.js";

// Функция для показа уведомления
function showNotification(message) {
  const notification = document.getElementById("notification");
  const messageElem = document.getElementById("notification-message");
  
  messageElem.textContent = message;
  
  notification.classList.remove("hidden");
}

// Обработчик нажатия на кнопку "Окей"
document.getElementById("notification-ok").addEventListener("click", () => {
  const notification = document.getElementById("notification");
  
  notification.classList.add("hidden");
});

// Функция для проверки заказа
function checkOrder() {
  // Получаем текущий набор блюд из корзины
  const selectedDishes = {
    soup: basket.soup.name !== "",
    "main-course": basket["main-course"].name !== "",
    salad: basket.salad.name !== "",
    drink: basket.drink.name !== "",
    dessert: basket.dessert.name !== ""
  };



  if (!selectedDishes.soup && !selectedDishes["main-course"] && !selectedDishes.salad && !selectedDishes.drink && !selectedDishes.dessert) {
    return "Ничего не выбрано. Выберите блюда для заказа";
  }
  
  if (selectedDishes.dessert && !selectedDishes.soup && !selectedDishes["main-course"] && !selectedDishes.salad && !selectedDishes.drink) {
    return "Только десерт заказать нельзя. Выберите другие блюда.";
  }
  
  if (!selectedDishes.drink) {
    return "Выберите напиток";
  }
  
  // Позволяем выбрать суп и салат без основного блюда
  if (selectedDishes.soup && !selectedDishes["main-course"] && !selectedDishes.salad) {
    return "Выберите главное блюдо или добавьте салат";
  }
  
  // Позволяем выбрать салат и суп вместе
  if (selectedDishes.salad && (!selectedDishes.soup && !selectedDishes["main-course"])) {
    return "Выберите суп или главное блюдо";
  }
  
  // Условие для основного блюда
  if (!selectedDishes["main-course"] && (selectedDishes.soup || selectedDishes.salad)) {
    return "Выберите главное блюдо";
  }
  
// Если все условия соблюдены, возвращаем null
return null;

}

// Обработчик отправки формы
document.querySelector("form").addEventListener("submit", (event) => {
  const errorMessage = checkOrder();
  
  if (errorMessage) {
    event.preventDefault(); // Отменяем отправку формы
    showNotification(errorMessage); // Показываем уведомление
  }
});


  