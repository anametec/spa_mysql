import { useEffect, useState } from "react"
import axios from 'axios'

function App(){
  const [alunos, setAlunos] = useState([])

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")

  const [editando, setEditando] = useState(false)
  const [idAtual, setIdAtual] = useState(null)

  return (
    <div style={{padding:20}}>
      <h1>CRUD de Alunos</h1>
      <form onSubmit={salvar}>
        <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
        />  
        <br/>
        <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />  
        <br/>
        <input
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
    </div>
  )
}

export default App