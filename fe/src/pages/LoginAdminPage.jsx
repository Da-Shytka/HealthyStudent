import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdminPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // fetch data

    navigate("/admin/home");
  };

  return (
    <div>
      <h1>Авторизация</h1>
      <form>
        <label htmlFor="login">Логин</label>
        <input
          name="login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor="password">Пароль</label>
        <input
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="button" value="Войти" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default LoginAdminPage;