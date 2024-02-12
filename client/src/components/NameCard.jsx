import { Button, Card, Image, Row, Col} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";


export function NameCard({name, image}) {
  const notify = () => toast("No badges found");
  return (
    <div className="flex flex-col d-block">
      <Card className="p-3 m-1 mt-2 flex flex-row">
        <Card.Body>
          <Card.Title className="float-left">Congratulation {name} 🎉</Card.Title>
          <Card.Text>
            You have done 72% 🤩 more sales today. Check your new raising badge
            in your profile.
          </Card.Text>
          <Button type="button" variant="btn btn-secondary" size="sm" onClick={notify}>
            VIEW BADGES
          </Button>
          <ToastContainer />
        </Card.Body>
        {/* <Card.Img className="d-none d-lg-block" style = {{width: "14em", height: "10em"}} src="./img/john.png" /> */}
        <img src={`http://localhost:3000/app/v1/user/Images/` + image + ".jpeg"} style = {{width: "14em", height: "10em"}} alt="image"/>
      </Card>
      
    </div>
  );
}
