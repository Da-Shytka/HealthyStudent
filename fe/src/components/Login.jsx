import { useState } from "react";

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleLogin = async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailOrPhone, password }),
        });
  
        if (response.ok) {
          // Успешный вход, можете выполнить дополнительные действия, например, перенаправить пользователя на другую страницу
          console.log("Успешный вход!");
        } else {
          const data = await response.json();
          setErrorMessage(data.message || "Произошла ошибка входа.");
        }
      } catch (error) {
        console.error("Произошла ошибка при выполнении входа", error);
        setErrorMessage("Произошла ошибка при выполнении входа.");
      }
    };
  
    return (
      <div className="login">
        <h2 className="login_h2">Вход</h2>
        <div>
          <label className="login_label">
            Номер телефона или почта:
            <input
              className="login_input"
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="login_lable">
            Пароль:
            <input
              className="login_input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className="login_button" onClick={handleLogin}>Войти</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    );
  };
  
  export default Login;
