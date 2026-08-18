import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function FitBounds({ students }) {
  const map = useMap();

  useEffect(() => {
    if (students.length > 0) {
      const bounds = L.latLngBounds(students.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  }, [students, map]);

  return null;
}

function getBadgeColor(course) {
  const colors = {
    BSCS: '#66c0f4', BSIT: '#5c7e10', BSIS: '#9b59b6',
    BSCpE: '#c0392b', BSCE: '#d4a017', BSEE: '#1abc9c',
    BSME: '#e74c3c', BSA: '#4a90d9', BSBA: '#27ae60',
    BSN: '#e84393', BSED: '#e67e22', BEED: '#3498db',
  };
  return colors[course] || '#8f98a0';
}

function StudentMap({ students }) {
  const defaultCenter = [14.5995, 120.9842];
  const center = students.length > 0
    ? [students[students.length - 1].lat, students[students.length - 1].lng]
    : defaultCenter;

  return (
    <div
      className="overflow-hidden relative h-100"
      style={{
        borderRadius: '8px',
        boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
        border: '1px solid #2a475e',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3)',
          borderRadius: '8px',
        }}
      />
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', minHeight: '340px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {students.map((student) => (
          <Marker key={student.id} position={[student.lat, student.lng]}>
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <div style={{ background: 'linear-gradient(135deg, #2a475e, #1b2838)', margin: '-13px -20px 10px', padding: '10px 14px', borderRadius: '2px 2px 0 0' }}>
                  <p className="font-bold text-sm mb-0" style={{ color: '#c6d4df' }}>
                    {student.firstname} {student.lastname}
                  </p>
                </div>
                <p className="mb-1">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-white text-xs font-bold"
                    style={{ backgroundColor: getBadgeColor(student.course) }}
                  >
                    {student.course}
                  </span>
                </p>
                <p className="text-xs mb-0.5" style={{ color: '#555' }}>{student.email}</p>
                <p className="text-xs mb-0.5" style={{ color: '#555' }}>{student.address}</p>
                <p className="text-xs mt-1" style={{ color: '#999' }}>
                  Lat: {student.lat.toFixed(5)}, Lng: {student.lng.toFixed(5)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        {students.length > 0 && <FitBounds students={students} />}
      </MapContainer>

      {students.length === 0 && (
        <div
          className="absolute bottom-4 left-4 z-20 px-3 py-2 rounded-lg text-xs flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.7)', color: '#8f98a0', backdropFilter: 'blur(8px)' }}
        >
          <span style={{ color: '#66c0f4' }}>i</span> Register a student to see markers on the map
        </div>
      )}
    </div>
  );
}

export default StudentMap;
