import { useEffect, useState, useRef } from "react";
import "./style.css";
import { IoTrashOutline } from "react-icons/io5";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/users");

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    if (
      !inputName.current.value ||
      !inputAge.current.value ||
      !inputEmail.current.value
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await api.post("/users", {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });

      getUsers();

      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Verifique o console.");
    }
  }

  async function deleteUsers(id) {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await api.delete(`/users/${id}`);
        getUsers();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuário. Verifique o console.");
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de usuários</h1>
          <input
            placeholder="Nome"
            className="name"
            type="text"
            ref={inputName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createUsers();
              }
            }}
          />
          <input
            placeholder="Idade"
            className="age"
            type="number"
            ref={inputAge}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createUsers();
              }
            }}
          />
          <input
            placeholder="E-mail"
            className="email"
            type="email"
            ref={inputEmail}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createUsers();
              }
            }}
          />
          <button type="button" onClick={createUsers}>
            Cadastrar
          </button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                E-mail: <span>{user.email}</span>
              </p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <IoTrashOutline />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
