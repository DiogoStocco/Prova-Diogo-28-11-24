import { useEffect, useState } from "react";
import { Tarefa } from "../models/Tarefa";


function CadastrarTarefa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(0);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [status, setStatus] = useState("Não iniciado");

  useEffect(() => {
    fetch("http://localhost:5000/api/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias) => {
        setCategorias(categorias);
        console.table(categorias);
      });
  }, []);

  function enviarTarefa(e: any) {
    const Tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      categoriaId: categoriaId,
    };

    //AXIOS - Biblioteca para requisições HTTP - Recomendação

    fetch("http://localhost:5000/api/tarefas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Tarefa),
    })
      .then((resposta) => resposta.json())
      .then((tarefa) => {
        console.log(tarefa);
      });
    e.preventDefault();
  }

  return (
    <div id="cadastro-tarefa">
            <form onSubmit={enviarTarefa}>
        <div>
          <label htmlFor="titulo">Titulo</label>
          <input
            onChange={(e: any) => setTitulo(e.target.value)}
            type="text"
            id="titulo"
            name="titulo"
            required
            placeholder="Digite o titulo da tarefa"
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            onChange={(e: any) => setDescricao(e.target.value)}
            id="descricao"
            name="descricao"
            required
            placeholder="Digite a descrição do tarefa"
          ></textarea>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input
            onChange={(e: any) => setStatus(e.target.value)}
            type="string"
            id="status"
            name="status"
            required
            placeholder="Digite a status da tarefa"
          />
        </div>

        <div>
          <label htmlFor="categorias">Categorias</label>
          <select
            id="categoria"
            onChange={(e: any) => setCategoriaId(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">Cadastrar Tarefas</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarTarefa;
