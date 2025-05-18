
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate()
    const BackButton = WebApp.BackButton;
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();
    });
    WebApp.onEvent('backButtonClicked', function() {
        navigate('/')
    });
    return (
        <>
        </>
    )
}