import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ss from './image/ss.png'

class zonecrud extends Component {
  emptyItem = {
    zoneid: '',
    nom: '',
    ville: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem,
      values: [],
      validationError: '',
      zones: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const zones = await fetch('http://localhost:8080/ville')
    .then(res => res.json())
    .catch(error => console.error(error));

    this.setState({ zones });

    const { id } = this.props.match.params;

    if (id !== 'new') {
      const zoneResponse = await fetch(`http://localhost:8080/zone/Byid/${id}`);
      const zone = await zoneResponse.json();
      this.setState({ item: zone });
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
  
    await fetch('http://localhost:8080/zone' + (item.zoneid ? '/' + item.zoneid : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...item,
       // ville: JSON.parse(item.ville)
       ville: item.ville ? JSON.parse(item.ville) : null

      }),
    });
    this.props.history.push('/zone');
    window.location.reload();
  }
  
  





  render() {
    const { item, values } = this.state;
    const title = <h2>{item.zoneid ? 'Edit Zone' : 'ZONE AJOUTE'}</h2>;

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
              <Input type="text" name="nom" id="nom" value={item.nom || ''}
                     onChange={this.handleChange} autoComplete="nom" />
            </FormGroup>
            <FormGroup>
              <Label for="ville">City</Label>
              <select id="ville-select" name="ville" onChange={this.handleChange}>
                    {this.state.zones.map((ville) => (
                        <option key={ville.id} value={JSON.stringify(ville)}>{ville.nom}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" href="/zone">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(zonecrud);
