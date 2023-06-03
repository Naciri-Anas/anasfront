import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from 'react-icons/ai';


class specialiteshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialites: [],
    };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/specialite')
      .then(response => response.json())
      .then(data => this.setState({ specialites: data }));
  }

  async remove(id) {
    await fetch(`http://localhost:8080/specialite/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      let updatedspecialites = [...this.state.specialites].filter(i => i.id !== id);
      this.setState({ specialites: updatedspecialites });
    });
  }

  render() {
    const { specialites, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const specialiteList = specialites.map(specialite => {
      return (
        <tr key={specialite.id}>
          <td style={{ whiteSpace: 'nowrap', minWidth: '100px' }}>{specialite.specialiteid}</td>
          <td>{specialite.nom}</td>
          <td>
            <ButtonGroup>
              <a
                size="sm"
                color="primary"
                className="btn btn-primary"
                href={"/specialite/" + specialite.specialiteid}
              >
                <AiFillEdit className="btn-icon" />
              </a>
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  this.remove(specialite.specialiteid);
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Gestion spécialité</h3>
            <a
              size="sm"
              className="btn btn-success"
              tag={Link}
              href={"/specialite/new"}
              style={{
                textDecoration: 'none',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#28a745',
              }}
            >
              <FaPlus className="btn-icon" />
            </a>
          </div>
          <Table className="modern-table">
            <thead>
              <tr>
                <th width="30%">N²</th>
                <th width="30%">Nom De La Spécialité</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {specialiteList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default specialiteshow;
