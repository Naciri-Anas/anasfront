import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './villeshow.css';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

class villeshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      villes: [],
      searchValue: '', // State to store the search value
    };
    this.remove = this.remove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/ville')
      .then(response => response.json())
      .then(data => this.setState({ villes: data }));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/ville/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      let updatedvilles = [...this.state.villes].filter(i => i.id !== id);
      this.setState({ villes: updatedvilles });
    });
  }

  handleSearch(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const { villes, isLoading, searchValue } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    // Filter the villes based on the search value
    const filteredVilles = villes.filter(ville =>
      ville.nom.toLowerCase().includes(searchValue.toLowerCase())
    );

    const clientList = filteredVilles.map(ville => {
      return (
        <tr key={ville.id}>
          <td style={{ whiteSpace: 'nowrap', minWidth: '100px' }}>{ville.villeid}</td>
          <td>{ville.nom}</td>
          <td>
          <ButtonGroup>
  <a size="sm" color="primary" className="btn btn-primary" href={"/villes/" + ville.villeid}>
    <AiFillEdit className="btn-icon" />
  </a>
  <Button
    size="sm"
    color="danger"
    onClick={() => {
      this.remove(ville.villeid);
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
      <div>
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
            <h3>Gestion ville</h3>
            <a
  size="sm"
  className="btn btn-success"
  tag={Link}
  href={"/villes/new"}
  style={{ textDecoration: 'none', color: '#fff', padding: '8px 16px', borderRadius: '4px', backgroundColor: '#28a745' }}
>
  <FaPlus className="btn-icon" />
</a>
          </div>
          <Table className="modern-table">
  <thead>
    <tr>
      <th width="30%">N²</th>
      <th width="30%">Nom De La Ville</th>
      <th width="40%">Actions</th>
    </tr>
  </thead>
  <tbody>
    {clientList}
  </tbody>
</Table>

        </Container>
      </div>
    );
  }
}

export default villeshow;