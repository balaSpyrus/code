import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Container, Row, Col} from 'react-grid-system';
import Chip from 'material-ui/Chip';

const jobcard={
  fontSize: "20px",
  fontWeight: "bold",
  textAlign:"left"
}
const card={
  width:700,
  marginTop:50
};
const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};
export default class DocResultCard extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (

      <Container>
      <Row>
      <Col lg={12}>
      <Card style={card}>
      <CardHeader style={jobcard}
      titleStyle={{"fontSize":"16pt"}}
      subtitleStyle={{"fontSize":"14pt","marginTop":30}}
      title="title"
      />
      <CardText style={{textAlign: "left"}}>
      <p style={{color:"gray"}}><b>Description : </b>tis is the discriptionn</p>
      <p style={{color:"gray"}}>
      <b>Link : </b>
      <a href={"#"} target="_blank">
      www.wwww.wwww.www.wwww.www.ww
      </a></p>
      </CardText>
      <div style={styles.wrapper}>
      <Chip style={styles.chip}>Basic:</Chip>
      <Chip style={styles.chip}>Tutorial:</Chip>
      <Chip style={styles.chip}>Example:</Chip>
      <Chip style={styles.chip}>Manual:</Chip>
      <Chip style={styles.chip}>CompleteReference:</Chip>
      </div>
      </Card>
      </Col>
      </Row>
      </Container>
      );
  }
}

