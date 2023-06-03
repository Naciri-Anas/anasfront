import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';



class restaushow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restos: [],
      isLoading: true,
      searchValue: '', // State to store the search value
    };
    this.remove = this.remove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/resto')
      .then(response => response.json())
      .then(data => this.setState({ restos: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/resto/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      let updatedRestos = [...this.state.restos].filter(i => i.id !== id);
      this.setState({ restos: updatedRestos });
    });
  }

  handleSearch(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const { restos, isLoading, searchValue } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    // Filter the restos based on the search value
    const filteredRestos = restos.filter(resto =>
      resto.nom.toLowerCase().includes(searchValue.toLowerCase())
    );

    const restoList = filteredRestos.map(resto => {
      return (
        <tr key={resto.id}>
          <td style={{ whiteSpace: 'nowrap' }}>{resto.restoid}</td>
          <td>{resto.nom}</td>
          <td>{resto.adresse}</td>
          <td>{resto.zone.nom}</td>
          <td>{resto.zone.ville.nom}</td>
          <td>{resto.serie.nom}</td>
          <td>
            <ButtonGroup>
              <a
                size="sm"
                color="primary"
                className="btn btn-primary"
                href={`/resto/${resto.restoid}`}
              >
                <AiFillEdit className="btn-icon" />
              </a>
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  this.remove(resto.restoid);
                  window.location.reload();
                }}
              >
                <AiFillDelete className="btn-icon" />
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div >
        <AppNavbar />
        <Container fluid className="table-container">
          <div className="search-bar">
            <Input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={this.handleSearch}
            />
            <button type="button">
              <AiOutlineSearch />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Gestion restaurant</h3>
            <a
              size="sm"
              className="btn btn-success btn-add"
              tag={Link}
              href="/resto/new"
            >
              <FaPlus className="btn-icon" />
            </a>
          </div>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">N²</th>
                <th width="30%">Nom</th>
                <th width="30%">Adresse</th>
                <th width="30%">Zone</th>
                <th width="30%">City</th>
                <th width="30%">Serie</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>{restoList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default restaushow;
