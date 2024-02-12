import { Button, ButtonGroup, Card, Container, Image } from "react-bootstrap";

class ChartsPage extends React.Component {
    state = {
      dataLine: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(225, 204,230, .3)",
            borderColor: "rgb(205, 130, 158)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(205, 130,1 58)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(184, 185, 210, .3)",
            borderColor: "rgb(35, 26, 136)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(35, 26, 136)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      }
    };
  
    render() {
      return (
        <Container>
          <h3 className="mt-5">Line chart</h3>
          <Line data={this.state.dataLine} options={{ responsive: true }} />
        </Container>
      );
    }
  }

export function TotalRevenue() {
  return (
    <div className="flex flex-col">
      <Card className="p-3 m-2 flex">
        <Card.Title>Total Revenue</Card.Title>
        <ButtonGroup size="sm" >
            <Button variant="outline-secondary">2022</Button>
            <Button variant="outline-secondary">2023</Button>
        </ButtonGroup>
      </Card>
      <ChartsPage />
    </div>
  );
}
