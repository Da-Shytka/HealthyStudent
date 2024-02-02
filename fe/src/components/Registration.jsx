import { useState } from "react";

const Registration = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async () => {
    try {
      // Проверка на совпадение пароля и подтверждения пароля
      if (password !== confirmPassword) {
        setErrorMessage("Пароль и подтверждение пароля не совпадают");
        return;
      }

      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, email, password }),
      });

      if (response.ok) {
        console.log("Регистрация успешна!");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Произошла ошибка регистрации.");
      }
    } catch (error) {
      console.error("Произошла ошибка при выполнении регистрации", error);
      setErrorMessage("Произошла ошибка при выполнении регистрации.");
    }
  };

  return (
    <div className="registration">
      <h2 className="registration_h2">Регистрация</h2>
      <div>
        <label className="registration_label">
          Номер телефона:
          <input
            className="registration_input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="registration_label">
          Почта:
          <input
            className="registration_input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="registration_label">
          Пароль:
          <input
            className="registration_input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="registration_label">
          Подтверждение пароля:
          <input
            className="registration_input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <button className="registration_button" onClick={handleRegistration}>
        Зарегистрироваться
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Registration;