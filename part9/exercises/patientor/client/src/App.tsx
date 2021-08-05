import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { useStateValue } from "./state";

import PatientListPage from "./PatientListPage";

import { useParams } from "react-router-dom";

import patientService from './services/patients';

const PatientDetails = () => {
  const [patients, ] = useStateValue();
  const id = useParams<{id?: string}>().id;
  const patient = Object.values(patients.patients).find(p => Number(p.id) == Number(id));
  if (patient) {
    return (
      <div>{Object.values(patient).map((el,idx) => 
        <p key={idx}>{Object.keys(patient)[idx]}: {el}</p>)}
      </div>
    );
  }
  return <p>null</p>;
};

const App = () => {
  const [, dispatch] = useStateValue();
  
  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const patientListFromApi = await patientService.getAll();
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        //dispatch(setPatientList(patientListFromApi))
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>Home</Button>
          <Button as={Link} to="/wat" primary>Whathever</Button>

          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientDetails />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
