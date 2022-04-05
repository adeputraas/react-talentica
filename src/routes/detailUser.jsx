import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function DetailUser() {
  const params = useParams();
  const [listParticipants, setParticipants] = useState([]);

  const getListParticipants = () => {
    axios.get(`http://localhost:8080/api/participants/${params.id}`).then(response => {
      setParticipants(response.data.response);
    }).catch(e => toast.error(e.response));
  }

  useEffect(() => {
    getListParticipants();
  });

  return (
    
    <div class="table-responsive-sm">
      {listParticipants.map((participant) => {
        return (
          <div>
            <Form.Label>Name: {participant.name}</Form.Label> <br/>
            <Form.Label>Email: {participant.email}</Form.Label>

            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Aspek</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                </tr>
              </thead>
              <tbody>
                {participant.aspect.map((aspect => {
                  return (
                    <tr>
                      <td>{aspect.name}</td>
                      <td>{aspect.row === 1 ? 'V' : ""}</td>
                      <td>{aspect.row === 2 ? 'V' : ""}</td>
                      <td>{aspect.row === 3 ? 'V' : ""}</td>
                      <td>{aspect.row === 4 ? 'V' : ""}</td>
                      <td>{aspect.row === 5 ? 'V' : ""}</td>
                    </tr>
                  )
                }))}
              </tbody>
            </Table>
          </div>
        )
      })}
    </div>
  );
}

export default DetailUser;
