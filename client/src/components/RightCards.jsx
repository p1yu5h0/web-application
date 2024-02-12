import {
  Button,
  Card,
  CardGroup,
  Container,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { OurCards } from "./Card";

export function RightCards({name}) {
  return (
    <>
      <Row className="row-cols-2 row-cols-md-2 g-4 py-2">
        <Col>
          <OurCards name={name} />
        </Col>
        <Col>
          <OurCards name={name} />
        </Col>
        <Col>
          <OurCards name={name} />
        </Col>
        <Col>
          <OurCards name={name} />
        </Col>
        <Col>
          <OurCards name={name} />
        </Col>
        <Col>
          <OurCards name={name} />
        </Col>
      </Row>
    </>
  );
}
