import './App.css';
import {useState, useEffect} from 'react'
import WordsStack from './Components/wordsStack';
import Keyboard from './Components/keyboard';
import sorteador from './words';
import PopUp from './Components/popUp';
import Label from './Components/label';




function App() {
      // Função para fazer a requisição à API
      async function fetchRandomTerm() {
        const response = await fetch(`localhost/api/termo/id/1`);
 
        
        console.log(response);
        };

      fetchRandomTerm();
  const emptypalavraArray = [{content: "", submitted: false}, {content: "", submitted: false},{content: "", submitted: false},{content: "", submitted: false},{content: "", submitted: false}, {content: "", submitted: false}]; 
  
  const [palavraArray, setpalavraArray] = useState( JSON.parse(window.localStorage.getItem('storedArray')) || emptypalavraArray); 
  const [solution, setSolution]= useState(JSON.parse(window.localStorage.getItem('storedSolution')) || sorteador[Math.floor(Math.random() * sorteador.length)]); 
  const [currentIndex, setCurrentIndex]= useState(JSON.parse(window.localStorage.getItem('storedIndex'))||0);
  const [isRunning, setIsRunning] = useState(palavraArray.map(word=> word.content).filter(w=> w=== solution).length === 0 && currentIndex <=5? true: false); 
  const [enteredLetters, setEnteredLetters] = useState(JSON.parse(window.localStorage.getItem('storedEntries')) || {right: [], semiRight:[], wrong: []}); 
  const [currentStreak, setCurrentStreak] = useState(JSON.parse(window.localStorage.getItem('currentStreak')) || 0);
  const [maxStreak, setMaxStreak] = useState(JSON.parse(window.localStorage.getItem('maxStreak')) || 0);
  const [gamesPlayed, setGamesPlayed] = useState(JSON.parse(window.localStorage.getItem('gamesPlayed')) || 0);
  const [isViewingLabel, setIsViewingLabel] = useState(false);
  const [labelText, setLabelText] = useState(''); 
  



  /// sincronizar o localStorage 
  useEffect(()=>{
    if(window.localStorage.getItem('storedArray')){
      setpalavraArray(JSON.parse(window.localStorage.getItem('storedArray')).map(storedWord=> storedWord.submitted? storedWord: {content: "", submitted: false})); 
      setSolution(JSON.parse(window.localStorage.getItem('storedSolution'))); 
      setCurrentIndex(JSON.parse(window.localStorage.getItem('storedIndex'))); 
      setIsRunning(JSON.parse(window.localStorage.getItem('storedStatus')));
      setCurrentStreak(JSON.parse(window.localStorage.getItem('currentStreak')));
      setMaxStreak(JSON.parse(window.localStorage.getItem('maxStreak')));
      setGamesPlayed(JSON.parse(window.localStorage.getItem('gamesPlayed')));
    }
  },[]);

  /// pegar as palavra localStorage
  useEffect(()=>{
    window.localStorage.setItem('storedArray', JSON.stringify(palavraArray)); 
    window.localStorage.setItem('storedSolution', JSON.stringify(solution)); 
    window.localStorage.setItem('storedIndex', JSON.stringify(currentIndex)); 
    window.localStorage.setItem('storedStatus', JSON.stringify(isRunning));
    window.localStorage.setItem('storedEntries', JSON.stringify(enteredLetters));
    window.localStorage.setItem('currentStreak', JSON.stringify(currentStreak));
    window.localStorage.setItem('maxStreak', JSON.stringify(maxStreak));
    window.localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed));
  }); 

  /// coloca teclado do PC, foi mais falciol do que eu pensava
useEffect(()=>{
  document.addEventListener('keydown', keypressed)
  return function cleanup(){
    document.removeEventListener('keydown', keypressed)
  }
})

const keypressed = (e)=>{
  e.stopImmediatePropagation();
  if (e.key === 'Enter' || e.key === 'Backspace' || 'qwertyuiopasdfghjklzxcvbnm'.split('').includes(e.key)){
    handleKeyboardClick(e.key.toLowerCase());
  }
}

/// Verificar o negocio da letra, se a palavra ta certa
const handleKeyboardClick = (keyLetter)=> {
  let lastEntry = ''; 
  if (isRunning){
    let currentpalavraArray = [...palavraArray]; 
    if (!currentpalavraArray[currentIndex].submitted) {
      if (keyLetter === 'enter'){
   
        if (currentpalavraArray[currentIndex].content.trim().length < 5){
          ViewLabel('Letras insuficientes' , 6000); 
        } else {
          lastEntry = currentpalavraArray[currentIndex].content;
          if(sorteador.includes(lastEntry)){
            currentpalavraArray.splice(currentIndex, 1, {content:lastEntry, submitted: true });
            lastEntry.split('').forEach(letter=> letterStateProcess(letter));
            setCurrentIndex(currentIndex +1);
            if(currentIndex>=5 || lastEntry === solution){
              setIsRunning(false); 
            }
            if (lastEntry === solution){
              setCurrentStreak(currentStreak + 1); 
              setMaxStreak(currentStreak +1 > maxStreak? currentStreak + 1: maxStreak); 
              setGamesPlayed(gamesPlayed +1);
              
            }else if (currentIndex>=5){
              setCurrentStreak(0);
              setGamesPlayed(gamesPlayed + 1);
              ViewLabel( solution.toUpperCase(), 30000)
            }

          }else{
            ViewLabel('Palavra Inválida', 6000);
          }
          
        }
      }else if (keyLetter === 'backspace'){
        // remover uma letra (seta de apagar)
          let updatedWord = currentpalavraArray[currentIndex].content.trim();
          updatedWord = updatedWord.split('');
          updatedWord.pop();
          updatedWord = updatedWord.join(''); 
          currentpalavraArray.splice(currentIndex, 1, {content: updatedWord, submitted: false})
      }else {
        // adicionar letras
        if (currentpalavraArray[currentIndex].content.trim().length < 5){
          let updatedWord = currentpalavraArray[currentIndex].content.trim();
          updatedWord += keyLetter; 
          currentpalavraArray.splice(currentIndex, 1, {content: updatedWord, submitted: false})
        }
      }
    }
    setpalavraArray(currentpalavraArray);
  }
}


/// pra mudar a cor das letras do teclado isso foi dificil pra k7
const letterStateProcess = (letter)=>{
  if (!enteredLetters.right.includes(letter)) {
    let currentEnteredLetters = {...enteredLetters};
  if(solution[palavraArray[currentIndex].content.indexOf(letter)] === letter){
    currentEnteredLetters.right.push(letter); 
  }else if (solution.includes(letter)){
    currentEnteredLetters.semiRight.push(letter); 
  }else {
    currentEnteredLetters.wrong.push(letter); 
  }


  /// remover letras repetidas. 
  currentEnteredLetters.right = Array.from(new Set(currentEnteredLetters.right));  
  currentEnteredLetters.semiRight = Array.from(new Set(currentEnteredLetters.semiRight));  
  currentEnteredLetters.wrong = Array.from(new Set(currentEnteredLetters.wrong));  
  setEnteredLetters(currentEnteredLetters); 
  }
}


/// Nova palavra
const handleNewWordle = ()=> {
  setpalavraArray(emptypalavraArray);
  setCurrentIndex(0);
  setEnteredLetters({right: [], semiRight:[], wrong: []});
  setSolution(sorteador[Math.floor(Math.random() * sorteador.length)]);
  setIsRunning(true);
  setIsViewingLabel(false);
}


const ViewLabel =  (text, delay)=> {
  setIsViewingLabel(false); 
  setLabelText(text); 
  setIsViewingLabel(true); 
  setTimeout(()=> setIsViewingLabel(false), delay)  // mensagem do label por 2 segundos , eu n faço a minima ideia de como isso ta funcionando
}



// setar valores, pq eu nao escoli publi pqp
const Initialize = ()=>{
  setpalavraArray(emptypalavraArray);
  setSolution(sorteador[Math.floor(Math.random() * sorteador.length)]);
  setCurrentIndex(0);
  setIsRunning(true);
  setEnteredLetters({right: [], semiRight:[], wrong: []});
  setCurrentStreak(0);
  setGamesPlayed(0); 
  setMaxStreak(0);

}


  return (
    <div className="App">

      {isViewingLabel && <Label text={labelText}></Label>}
      <PopUp handleNewWordle={handleNewWordle} isRunning={isRunning} currentStreak={currentStreak} maxStreak={maxStreak} gamesPlayed={gamesPlayed} />
      <h2>TERMO DOS AMOSTRADINHOS</h2>
      <WordsStack solution={solution} palavraArray={palavraArray}/>
      <Keyboard handleKeyboardClick={handleKeyboardClick} enteredLetters={enteredLetters}/> 
    </div>
  );
}

export default App;
