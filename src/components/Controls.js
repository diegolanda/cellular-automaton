import { makeNoise } from '../utils/controls'

export const Controls = (props) => {
  const { grid, cols, rows, onMakeNoise, onNextClick } = props

  const handleNoiseClick = () => {
    onMakeNoise(makeNoise(grid, rows, cols))
  }

  return (
    <div className="controls">
      <button onClick={handleNoiseClick}><span>Noise</span></button>
      <button onClick={onNextClick}><span>Next</span></button>
    </div>
  );
}
