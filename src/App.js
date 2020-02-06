import React, {useState} from 'react';
import 'typeface-roboto';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import'./media.css';
import { LinearProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';

function App() { 
  const [text,setText]= useState('')
  const [memes,setMemes]=useState([])
  const [loading, setLoading] = useState(false)

  async function getMemes() {

    const key = 'i4Kz4pGhXifWvCqLZ7M8upMpFAOEpYf8'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    // adding to , cant be const
    url += 'api_key='+ key
    url += '&q=' + text
    const r = await fetch(url)
    // fetch:build in browser
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)

  }


  return (
    <div className="App">
      <header className="App-header"> 
        <div className="input-wrap">
          <TextField  id="outlined-basic" fullWidth label="search memes!" variant="outlined" 
          value={text}
          onChange={e=>setText(e.target.value)}
          onKeyPress={e=>{
            //=>generate new function
            if(e.key==='Enter')getMemes()
          }

          }
          />

          <Button  variant="contained" color="primary" href="#contained-buttons"
          onClick={getMemes}>
          <Search className="search"/>
           
          </Button>
        </div>
        <div className="Memes"> 
        {memes.map((meme,i)=><Meme key={i} {...meme}/>)}
        </div>

        </header>
      
        {loading && <LinearProgress />}
    </div>
  )
}

function Meme({images, title}){
  const url = images.fixed_height.url

  return <div className="meme"
   onClick={()=>window.open(url, '_blank')}>
    <div className="meme-title">{title}</div>
    {<img alt="meme" src={url} />}
  </div>
}




export default App;
