import { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const courseOptions = [
    'BSCS', 'BSIT', 'BSCpE',
    'BSA', 'BSBA', 'BSN',
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required.';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required.';
    if (!formData.course) newErrors.course = 'Please select a course.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const coords = await geocodeAddress(formData.address);
      if (!coords) {
        setSubmitError('Could not find the address. Please enter a more specific location.');
        setLoading(false);
        return;
      }
      const student = { id: Date.now(), ...formData, lat: coords.lat, lng: coords.lng };
      onAddStudent(student);
      setFormData({ firstname: '', lastname: '', course: '', email: '', address: '' });
      setErrors({});
    } catch {
      setSubmitError('Failed to geocode address. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: '#1b2838',
    border: '1px solid #2a475e',
    color: '#c6d4df',
    borderRadius: '4px',
    fontSize: '13px',
    padding: '8px 10px',
  };

  return (
    <div
      className="overflow-hidden h-100"
      style={{
        background: '#16202d',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        className="py-3 px-4"
        style={{ background: 'linear-gradient(135deg, #2a475e 0%, #1b2838 100%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <h6 className="mb-0 font-semibold flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: '#c6d4df' }}>
          Register Student
        </h6>
      </div>

      <div className="p-4">
        {submitError && (
          <Alert variant="danger" dismissible onClose={() => setSubmitError('')} className="text-xs border-0 py-2 px-3" style={{ background: 'rgba(220,53,69,0.15)', color: '#f8d7da' }}>
            {submitError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-2.5">
            <Form.Group>
              <Form.Label className="font-medium mb-1" style={{ color: '#8f98a0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                First Name
              </Form.Label>
              <Form.Control
                type="text" name="firstname" placeholder="Juan"
                value={formData.firstname} onChange={handleChange}
                isInvalid={!!errors.firstname} style={inputStyle}
              />
              <Form.Control.Feedback type="invalid" className="text-xs">{errors.firstname}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-medium mb-1" style={{ color: '#8f98a0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Last Name
              </Form.Label>
              <Form.Control
                type="text" name="lastname" placeholder="Dela Cruz"
                value={formData.lastname} onChange={handleChange}
                isInvalid={!!errors.lastname} style={inputStyle}
              />
              <Form.Control.Feedback type="invalid" className="text-xs">{errors.lastname}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group className="mt-2.5">
            <Form.Label className="font-medium mb-1" style={{ color: '#8f98a0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Course
            </Form.Label>
            <Form.Select
              name="course" value={formData.course} onChange={handleChange}
              isInvalid={!!errors.course} style={inputStyle}
            >
              <option value="">-- Select Course --</option>
              {courseOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="text-xs">{errors.course}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-2.5">
            <Form.Label className="font-medium mb-1" style={{ color: '#8f98a0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Email
            </Form.Label>
            <Form.Control
              type="email" name="email" placeholder="juan@gmail.com"
              value={formData.email} onChange={handleChange}
              isInvalid={!!errors.email} style={inputStyle}
            />
            <Form.Control.Feedback type="invalid" className="text-xs">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-2.5">
            <Form.Label className="font-medium mb-1" style={{ color: '#8f98a0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Address
            </Form.Label>
            <Form.Control
              as="textarea" rows={2} name="address"
              placeholder="Pasay City, Philippines"
              value={formData.address} onChange={handleChange}
              isInvalid={!!errors.address} style={inputStyle}
            />
            <Form.Control.Feedback type="invalid" className="text-xs">{errors.address}</Form.Control.Feedback>
            <p className="mt-1 mb-0" style={{ color: '#556772', fontSize: '10px' }}>
              Address will be converted into map coordinates.
            </p>
          </Form.Group>

          <div className="mt-3.5">
            <Button
              type="submit" disabled={loading}
              className="w-full py-2 font-bold text-xs uppercase tracking-widest border-0 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #5c7e10 0%, #4a6a0c 100%)',
                borderRadius: '4px',
                color: '#d2efa9',
                boxShadow: '0 2px 8px rgba(92,126,16,0.3)',
              }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="mr-2" />
                  Locating...
                </>
              ) : (
                'Register Student'
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default StudentForm;
