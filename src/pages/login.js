import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

const Login = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [submit, setSubmit] = useState(false);
    const [mode, setMode] = useState('Login');
    const [authenticated, setAuthenticated] = useState(true);

    const updateUsername = (event) => {
       setUsername(event.target.value);
    }
    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const auth = async (username, password) => {
        const response = await fetch('http://localhost:8079/' + username + '/' + password);
        if (response.status === 200) {
            return true;
        } else if (response.status === 403) {
            return false;
        }
    }

    const create = async (username, password) => {
        const response = await fetch('http://localhost:8079/create/' + username + '/' + password);
        console.log(response.statusText);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(true);
    }

    const handleAuth = (authenticated) => {
        if (authenticated) {
            setAuthenticated(true);
            navigate('/' + username);
        } else {
            setAuthenticated(false);
        }
    }

    const changeMode = (event) => {
        event.preventDefault();
        if (mode === 'Login') setMode('Create Account'); 
        else setMode('Login');
    }

    useEffect(()=> {
        if (!submit) return;

        const call = async () => {
            if (mode === 'Login') {
                const authenticated = await auth(username, password);
                console.log(authenticated);
                handleAuth(authenticated);
            } else {
                await create(username, password);
                navigate('/' + username);
            }
        }
        
        call();
        setSubmit(false);
    }, [submit, username, password, mode])

    return (
      <div className="page">
          <h1>{mode}</h1>
          <form onSubmit={handleSubmit}>
              <label for="username">Enter username: </label>
              <input type="text" id="username" name="username" value={username} onChange={updateUsername}></input><br></br>
              <label for="password" >Enter password: </label>
              <input type="text" id="password" name="password" value={password} onChange={updatePassword}></input><br></br>
              <input type="submit" id="submit" name="submit"></input>
          </form>
          <p>{!authenticated && "Incorrect username or password. Please try again."}</p>
          <form>
            <button  onClick={changeMode}>{mode === 'Login' ? 'Create Account' : 'Login'}</button>
          </form>
      </div>
    );
};

export default Login;
