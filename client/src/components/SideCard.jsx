import { Card } from "react-bootstrap";

export function SideCard ({title}) {
    return (
        <div>
            <Card className="flex justify-center mt-2 text-center p-3 d-none d-md-block">
                <Card.Title>{title}</Card.Title>
            </Card>
        </div>
    )
}