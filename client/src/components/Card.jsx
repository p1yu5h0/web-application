import { Card, Button } from "react-bootstrap"

export function OurCards({name}){
    return (
        <Card className="flex flex-row">
            <Card.Body>
              <Card.Title className="">
                Hi {name}
              </Card.Title>
              <Card.Text>
                You have done 72% 🤩 more sales today. Check your new raising
                badge in your profile.
              </Card.Text>
              <Button variant="secondary" size="sm">
                Click Here!
              </Button>
            </Card.Body>
          </Card>
    )
}