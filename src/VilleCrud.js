import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ss from './image/ss.png'

class VilleCrud extends Component {
  emptyItem = {
    villeid: '',
    nom: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const ville = await (
        await fetch(`http://localhost:8080/ville/Byid/${this.props.match.params.id}`)
      ).json();
      this.setState({ item: ville });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
  
    await fetch('http://localhost:8080/ville' + (item.id ? '/' + item.id : ''), {
      method: item.id ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
  
    this.props.history.push("/villes");
    window.location.reload();
  }
  

  render() {
    const { item } = this.state;
    const title = <h2>{item.villeid ? 'Edit Ville' : 'VILLE AJOUTE'}</h2>;

    return (
      <div
       style={{
          backgroundImage: `url(${ss})`, // Apply the background image
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="nom">Name</Label>
              <Input
                type="text"
                name="nom"
                id="nom"
                value={item.nom || ''}
                onChange={this.handleChange}
                autoComplete="nom"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" href={"/villes"}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(VilleCrud);
