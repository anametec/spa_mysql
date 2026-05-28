import { useEffect, useState } from "react"
import axios from 'axios'

function App(){
  const [alunos, setAlunos] = useState([])

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")

  const [editando, setEditando] = useState(false)
  const [idAtual, setIdAtual] = useState(null)

  async function buscarAlunos()
  {
    const resposta = await axios.get("https://super-dollop-7v4r779pxvgpcvw-3001.app.github.dev/alunos");
    setAlunos(resposta.data)
  }
  useEffect(() => {
    buscarAlunos();
  }, [])

  async function salvar(e) 
  {
    e.preventDefault()
    const aluno = [nome, email, curso];
    if(editando) {
      await axios.put(`https://super-dollop-7v4r779pxvgpcvw-3001.app.github.dev/${idAtual}`, aluno)
     setEditando(false)
      setIdAtual(null)
    } else {
      await axios.post("https://super-dollop-7v4r779pxvgpcvw-3001.app.github.dev/alunos", aluno);
      
    }
    limparFormulario()
    buscarAlunos()
    
  }
    
    async function excluir(id) {
      await axios.delete(`https://super-dollop-7v4r779pxvgpcvw-3001.app.github.dev/alunos/${id}`)
      buscarAlunos()//  atualiza a lista de alunos após a exclusão
    } 
    function limparFormulario() {
      setNome("")
      setEmail("")
      setCurso("")
    }
    function editar(aluno) {
      setNome(aluno.nome)
      setEmail(aluno.email)
      setCurso(aluno.curso)
      setIdAtual(aluno.id)
      setEditando(true)
    }
  
  return (// aqui vai o código JSX para renderizar a interface do usuário
    <div style={{padding:20}}>
      <h1>CRUD de Alunos</h1>
      <form onSubmit={salvar}>
        <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e)=>setNome(e.target.value)} // atualiza o estado do nome conforme o usuário digita
        />  
        <br/>
        <input
        type="email"
        placeholder="E-mail"
        value={email} // atualiza o estado do email conforme o usuário digita
        onChange={(e)=>setEmail(e.target.value)}
        />  
        <br/>
        <input // campo para o curso do aluno
        type="text"
        placeholder="Curso"
        value={curso}
        onChange={(e)=>setCurso(e.target.value)}
        />  
        <br/>
        <br/>
        <button type="submit">
          {editando ? "Atualizar" : "Cadastrar"}
        </button>
   
        
      </form>
           < hr/>
           {
            alunos.map((aluno) =>(

              <div key={aluno.id}>
                <h3>{aluno.nome}</h3> 
                <p>{aluno.email}</p> // exibe o email do aluno
                <p>{aluno.curso}</p>
                <button onClick={()=> editar(aluno)}>Editar</button>
                <button onClick={()=> excluir(aluno.id)}>Excluir</button>
                <hr/>
              </div>
            ))
           }
    </div>
  )
}

export default App