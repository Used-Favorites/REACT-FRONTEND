import { FaUser, FaLock } from 'react-icons/fa'

const Input = () => {

    const [username, setUsername] = useState ("");
    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState ("")

    const handleSubmit= (e) => {
        e.preventDefault();
       alert("Enviando os dados:" +username + " - " + email + " - " + password)
    }
  return (
    <div>
      <div className="Input-Nome">
        <label>Nome</label>
        <input type="text" placeholder='Digite seu nome'
        onChange={(event)=> setUsername(e.target.value)}></input>
      </div>

      <div className="Input-Email">
        <label>Endereço de email</label>
        <input type="email" placeholder='Digite seu email'
        onChange={(event)=> setEmail(e.target.value)}></input>
        <FaUser className='icon'></FaUser>
      </div>

      <div className="Input-Senha">
        <label>Senha</label>
        <input type="password" placeholder='Crie uma senha'
        onChange={(event)=> setPassword(e.target.value)}></input>
        <FaLock className='icon'></FaLock>
        <input type="password" placeholder='Confirme sua senha'
        onChange={(event)=> setPassword(e.target.value)}></input>
        <FaLock className='icon'></FaLock>
      </div>

      

    </div>
  )
}

export default Input
