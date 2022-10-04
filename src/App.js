import './App.css'
import { useEffect } from 'react'
import { useGrids } from './hooks/useGrid'
import { Controls } from './components/Controls'

function App() {
  const [data, grid] = useGrids()

  useEffect(() => {
    
  }, [data.grid])

  return (
    <div className="App">
      <Controls grid={data.grid} rows={data.rows} cols={data.cols} onMakeNoise={grid.updateGrid} onNextClick={grid.nextState}/>
      <div id="gridContainer">
        {grid.renderTable()}
      </div>
    </div>
  );
}

export default App;
