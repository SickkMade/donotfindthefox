import PropTypes from "prop-types"
import '../css/tiles.css'

function Tiles({tileLength}) {
  const tiles = []
  for(let i = 0; i < tileLength; i++){
    tiles.push(<div key={i} className="tiles--tile"></div>)
  }
  return (
    <div className="tiles">
      {tiles}
    </div>
  )
}

Tiles.propTypes = {
  tileLength: PropTypes.number,
}

export default Tiles