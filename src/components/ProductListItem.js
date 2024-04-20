import React from 'react'
import Ratings from './Ratings'


export default function ProductListItem(props) {
  return (
    <div className="d-flex mt-2 align-items-center justify-content">
      <img
        src={props.thumbnail}
        height={180}
        width={150}
        alt={props.title}
        className="border-radius-9 me-4"
      />
      <h5 className="card-title me-4">{props.title}</h5>
      <h6 className="mt-2 me-4">Price: {`$${props.price}`}</h6>
      <h6 className="mt-2 me-4">Discount: {`$${props.discountPercentage}`}%</h6>
      <h6 className='mt-2 d-flex align-items-center justify-content-center'>Rating:
        <Ratings value={props.rating} />
      </h6>

      <button className="btn btn-success ms-3" onClick={props.incrementItem}>+</button>
      <span className="ms-3">Quantity{props.count}</span>
      <button className="btn btn-danger ms-3" onClick={props.decrementItem}>-</button>
      <button className="btn btn-danger ms-3" onClick={props.removeItem}>Remove</button>
    </div>
  );
}
