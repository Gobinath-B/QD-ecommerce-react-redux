import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Ratings from "../components/Ratings";
import { useNavigate } from "react-router-dom";

export function ProductCard(props) {
  const navigate = useNavigate();
  return (
    <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={props?.thumbnail}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {props?.title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {`$${props?.price}`}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          {props?.stock > 0 ? <button className='btn btn-success'>Available</button> : <button className='btn btn-outline-danger'>Out of stock</button>}
          <Ratings value={props?.rating} readOnly />
        </div>

      </CardBody>
      <CardFooter className="pt-0">

        <Button
          onClick={() => { navigate(`/product/${props.id}`) }}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          View
        </Button>
      </CardFooter>
    </Card >
  );
}