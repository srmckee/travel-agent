import logo from './logo.svg';
import './App.css';
import React from 'react';
//import prompt from './prompts/mvp.js';

function App() {
  const [dest, setDest] = React.useState("");
  const [source, setSource] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [interest, setInterest] = React.useState("");
  const [itinerary, setItinerary] = React.useState("");
  async function getGptData(data) {
    const result = await fetch(`https://api.openai.com/v1/completions`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '},
        body: JSON.stringify({"model": "text-davinci-003", "prompt": data, "temperature": 0, "max_tokens": 100})
      });
    return result.json();
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(source, dest, duration, interest);
    const prompt2 = "Say this is a test";
    const prompt = `plan me a ${duration} day trip in ${dest} from ${source} with scheduled ${interest} activities at specific times including flight times and hotel check-in times`;
    console.log(prompt);
    const gptData = await getGptData(prompt);
    console.log('gptData', gptData);
    const itinerary = gptData.choices[0].text;
    console.log(itinerary);
    setItinerary(itinerary);
  }

  const handleChangeDest = (event) => {
    setDest(event.target.value);
  }
  const handleChangeSource = (event) => {
    setSource(event.target.value);
  }

  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  }

  const handleChangeInterest = (event) => {
    setInterest(event.target.value);
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
        <label >Starting Point</label>
          <input type="text" onChange={handleChangeSource}></input>
          <label >Destination</label>
          <input type="text" onChange={handleChangeDest}></input>
          <label >Duration</label>
          <br/>
          <input type="text" onChange={handleChangeDuration}></input>
          <label >Interest</label>
          <br/>
          <input type="text" onChange={handleChangeInterest}></input>
          <input type="submit"></input>
        </form>
        <br/>
        {itinerary.split('\n').map((text) => <p>{text}</p>)}
      </header>
    </div>
  );
}

export default App;
