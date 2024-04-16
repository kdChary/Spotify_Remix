import {Link} from 'react-router-dom'

import './index.css'

const CategoryItem = props => {
  const {itemData} = props
  const {id, name, imageUrl, tracks} = itemData

  return (
    <Link to={`/playlist/${id}`} className="link-item">
      <li className="category-item">
        <img className="category-item-image" src={imageUrl} alt="category" />
        <div className="category-details-sm">
          <p className="category-name">{name}</p>
          <p className="tracks">{tracks} Tracks</p>
        </div>
        <div className="category-details-lg">
          <p className="category-name">{name}</p>
          <p className="tracks">{tracks} Tracks</p>
        </div>
      </li>
    </Link>
  )
}

export default CategoryItem
