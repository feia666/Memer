import React, {useState} from 'react';
import 'typeface-roboto';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import'./media.css';

function App() { 
  const [text,setText]= useState('')
  const [memes,setMemes]=useState([])

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

          <Button variant="contained" color="primary" href="#contained-buttons"
          onClick={getMemes}>
          
            GO
          </Button>
        </div>
        <div className="Memes"> 
        {memes.map((meme,i)=><Meme key={i} {...meme}/>)}
        </div>

        </header>
      

    </div>
  )
}

function Meme({title,images}){

  return <div className="meme">
  <img src={images.fixed_height.url} alt="meme"/>
  <div className="meme-title"> {title} </div>
  <div className="meme-title">{title}</div>
  </div> 

}

export default App;
