import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [students, setStudents] = useState([]);

  const handleAddStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen" style={{ background: '#1b2838' }}>


      <div style={{ background: 'linear-gradient(180deg, #1b2838 0%, #2a475e 50%, #1b2838 100%)' }}>
        <Container className="py-5">
          <Row className="g-4">
            <Col lg={4} md={12}>
              <StudentForm onAddStudent={handleAddStudent} />
            </Col>
            <Col lg={8} md={12}>
              <StudentMap students={students} />
            </Col>
          </Row>
        </Container>

        <Container className="pb-8">
          <StudentTable students={students} onDeleteStudent={handleDeleteStudent} />
        </Container>
      </div>

    </div>
  );
}

export default App;
