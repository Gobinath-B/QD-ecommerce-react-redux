import { Avatar, Button, CardHeader, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
import { addItem } from "../redux/reducer/cart";
import firebase from '../config/firebase'
import toast from "react-hot-toast";
import { setProducts } from "../redux/reducer/products";



export default function Product() {
  const ProductList = useSelector((state) => state.products.products);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let props = ProductList.find(
    (element) => element.id === parseInt(params.id)
  );

  const [alert, setAlert] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: "",
  });
  const list = useSelector((state) => state.cart.list);

  const element = list.find((item) => item.id === props.id)

  const addTocart = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
    dispatch(addItem(props))
    //  console.log("clicked");
  }

  const handleReviews = async () => {
    const reviewedItem = {
      id: props.reviews ? props.reviews.length + 1 : 1,
      rating: reviewData.rating,
      review: reviewData.review,
      date: new Date().toLocaleDateString(),
    }
    let item = {
      review: props?.review,
      ...props,
    }
    if (item.review) {
      let existing = [...item.review]
      existing.push(reviewedItem)
      item.review = existing
    } else {
      item.review = [reviewedItem]
    }
    if (reviewedItem.review.length > 0) {
      const index = ProductList.indexOf(props)
      const db = firebase.firestore()
      const docId = await ((await db.collection('products').get()).docs.map((doc) => doc.id))[index]
      await db.collection('products').doc(docId).set(item).then(() => {
        toast.success("Review added successfully")
      }).finally(async () => {
        await dispatch(setProducts([...ProductList.slice(0, index), item, ...ProductList.slice(index + 1)]))
        props = item
      })

    }

  }

  const handleReviewData = (key, value) => {
    setReviewData({
      ...reviewData,
      [key]: value,
    });
  }

  return (
    <div className="container" >
      <div className="card mt-2 ">
        {alert && <span className="alert alert-success">Item added to the cart</span>}
        <div className="mt-2">
          <img
            src={props?.thumbnail}
            height={350}
            width={400}
            alt={props?.title}
            className="border-radius-9"
          />
        </div>
        <div className="card-body mt-3">
          <div className="card-title">{props?.title}</div>
          <h6 className="mt-2">Price: {`$${props?.price}`}</h6>
          <h6 className="mt-2">Discount: {`$${props?.discountPercentage}`}%</h6>
          <h6 className="mt-2">Rating: {`$${props?.rating}`}/5</h6>
          <div className="mt-3">
            {props?.stock > 0 ? (
              <>
                <button className="btn btn-success" onClick={() => {
                  navigate(`/checkout/${props?.id}`);
                }}>Buy Now</button>
                {element?.count > 0 ? (<button className="ms-3 btn btn-outline-warning" onClick={() => { navigate("/cart") }}>Go to cart</button>)
                  : (<button className="ms-3 btn btn-success" onClick={addTocart}>Add to cart</button>)}
              </>

            ) : (
              <button className="btn btn-outline-danger">Out Of Stock</button>
            )}
          </div>
        </div>
      </div>
      <div className="card mt-2 p-4" >
        <h6>Reviews and Ratings</h6>
        <div className="row gap-5 d-flex align-items-start justify-content-between" >
          <div className="col-5  p-2" >
            {
              props?.review && props?.review.length > 0 ?
                props?.review?.map((item, index) => (
                  <CardHeader
                    avatar={
                      <Avatar sx={{}} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title={item.review}
                    subheader={item.date}
                    action={<Ratings value={item.rating} readOnly />}
                  />
                )) : <h6>No Reviews</h6>
            }

          </div>
          <div className="col-5 p-2 d-flex flex-column gap-3 " >
            <Ratings value={reviewData.rating}
              onChange={(value) => handleReviewData('rating', value)}
            />
            <TextField
              label="Add your review"
              value={reviewData.review}
              onChange={(e) => handleReviewData('review', e.target.value)}
              fullWidth
              multiline
              minRows={4}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleReviews()}
              centerRipple
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
