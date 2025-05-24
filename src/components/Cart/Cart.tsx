
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate() // Хук для программной навигации
    const BackButton = WebApp.BackButton;
    BackButton.show(); // Показываем кнопку "Назад" Telegram
    BackButton.onClick(function() {
        BackButton.hide(); // Прячем кнопку при клике
    });
    WebApp.onEvent('backButtonClicked', function() {
        navigate('/') // При нажатии аппаратной кнопки Telegram — возвращаемся на главную
    });
    return (
        <>
        </>
    )
}