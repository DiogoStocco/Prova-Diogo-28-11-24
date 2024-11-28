import { useEffect, useState } from "react";
import { Tarefa } from "../models/Tarefa";
import { Link } from "react-router-dom";

function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    consultarTarefas();
  }, []);

  function consultarTarefas() {
    fetch("http://localhost:5000/api/tarefas/listar")
      .then((resposta) => resposta.json())
      .then((tarefas) => {
        setTarefas(tarefas);
        console.table(tarefas);
      });
  }


  return (
    <div id="listarprodutos" className="container">
      <h1>Listar Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Criado em</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.criadoEm}</td>
              <td>
                <Link to={`/api/tarefas/alterar/${tarefa.tarefaId}`}>
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarTarefas;
