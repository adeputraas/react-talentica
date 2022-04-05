import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [listParticipants, setParticipants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isActionEdit, setActionEdit] = useState(false);
  const [uuid, setUUID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [z, setZ] = useState('');
  const [w, setW] = useState('');

  const handleClose = () => setShowForm(false);
  const handleShow = () => setShowForm(true);

  const resetForm = () => {
    setName("");
    setEmail("");
    setX("");
    setY("");
    setZ("");
    setW("");
    setUUID("");
    setActionEdit(false);
  }

  const removeParticipants = (id) => {
    axios.delete(`http://localhost:8080/api/participants/${id}`).then(response => {
      if(!response.data.error){
        toast.success(response.data.response);
        getListParticipants();
      }else{
        toast.error(response.data.response);
      }
    }).catch(e => toast.error(e))
  
}

  const createNewParticipants = () => {
      const dtoObject = {
        name: name,
        email: email,
        valueX: x,
        valueY: y,
        valueZ: z,
        valueW: w
      };
      axios.post('http://localhost:8080/api/participants', dtoObject).then(response => {
        if(!response.data.error){
          toast.success(response.data.response);
          getListParticipants();
          handleClose();
          resetForm()
        }else{
          toast.error(response.data.response);
        }
      }).catch(e => toast.error(e))
    
  }

  const editParticipants = () => {
    const dtoObject = {
      name: name,
      email: email,
      valueX: x,
      valueY: y,
      valueZ: z,
      valueW: w
    };
    axios.put(`http://localhost:8080/api/participants/${uuid}`, dtoObject).then(response => {
      if(!response.data.error){
        toast.success(response.data.response);
        getListParticipants();
        handleClose();
        resetForm()
      }else{
        toast.error(response.data.response);
      }
    }).catch(e => toast.error(e))
  
}

  const setEditForm = (value) => {
    setUUID(value.id);
    setName(value.name);
    setEmail(value.email);
    setX(value.x);
    setY(value.y);
    setZ(value.z);
    setW(value.w);

    setActionEdit(true);
    handleShow();
  }

  const getListParticipants = () => {
    axios.get('http://localhost:8080/api/participants').then(response => {
      setParticipants(response.data.response);
    }).catch(e => toast.error(e.response));
  }

  useEffect(() => {
    getListParticipants();
  }, []);

  return (
    <div class="table-responsive-sm">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th colSpan={4} style={{textAlign:'center'}}>Nilai</th>
            <th></th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
            <th>W</th>
            <th style={{textAlign:'center'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {listParticipants.map((participant => {
            return (
              <tr>
                <td>{participant.name}</td>
                <td>{participant.email}</td>
                <td>{participant.x}</td>
                <td>{participant.y}</td>
                <td>{participant.z}</td>
                <td>{participant.w}</td>
                <td style={{textAlign:'center'}}>
                  <Link to={`/detail-user/${participant.id}`}>Detail</Link>
                  <Button onClick={() => setEditForm(participant)}>Edit</Button> &nbsp;
                  <Button onClick={() => removeParticipants(participant.id)}>Delete</Button> &nbsp;
                </td>
              </tr>
            )
          }))}
        </tbody>
      </Table>

      <Button onClick={handleShow}>Add Participants</Button>

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Participants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form.Control
              type="text"
              placeholder="Input name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <Form.Control
              type="text"
              placeholder="Input email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Form.Control
              type="text"
              placeholder="Input x.."
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
            <br />
            <Form.Control
              type="text"
              placeholder="Input y.."
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
            <br />
            <Form.Control
              type="text"
              placeholder="Input z.."
              value={z}
              onChange={(e) => setZ(e.target.value)}
            />
            <br />
            <Form.Control
              type="text"
              placeholder="Input w.."
              value={w}
              onChange={(e) => setW(e.target.value)}
            />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={isActionEdit ? editParticipants : createNewParticipants}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
