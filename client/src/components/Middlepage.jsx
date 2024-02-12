import { Formex } from "./Navbar"
import { Col, Row } from "react-bootstrap"
import { NameCard } from "./NameCard"

export function MiddlePage() {
    const [toggle, setToggle] = useState(true);
    const Toggle = () => {
        setToggle(!toggle);
    };
    return(
        <div>
        <Formex Toggle={Toggle} />
            <Row>
              <Col sm={6}>
                <NameCard />
              </Col>
              <Col sm={6}>
                <RightCards />
              </Col>
            </Row>
            </div>
    )
}