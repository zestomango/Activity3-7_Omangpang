import { Table, Badge, Button, Card } from 'react-bootstrap';

function getBadgeColor(course) {
  const colors = {
    BSCS: '#66c0f4', BSIT: '#5c7e10', BSIS: '#9b59b6',
    BSCpE: '#c0392b', BSCE: '#d4a017', BSEE: '#1abc9c',
    BSME: '#e74c3c', BSA: '#4a90d9', BSBA: '#27ae60',
    BSN: '#e84393', BSED: '#e67e22', BEED: '#3498db',
  };
  return colors[course] || '#8f98a0';
}

function StudentTable({ students, onDeleteStudent }) {
  const steam = {
    cardBg: '#16202d',
    headerBg: 'linear-gradient(135deg, #2a475e 0%, #1b2838 100%)',
    rowBg: '#1b2838',
    rowHoverBg: '#1e3a50',
    border: 'rgba(255,255,255,0.05)',
    textPrimary: '#c6d4df',
    textSecondary: '#8f98a0',
    textMuted: '#d0d6daff',
    accent: '#66c0f4',
  };

  return (
    <Card className="border-0 overflow-hidden" style={{ background: steam.cardBg, borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      
      <Card.Header className="py-3.5 px-4 border-b flex items-center justify-between" style={{ background: steam.headerBg, borderColor: steam.border }}>
        <div>
          <h5 className="mb-0 font-semibold flex items-center gap-2 text-sm uppercase tracking-wider" style={{ color: steam.textPrimary }}>
            Student Records
          </h5>
          <small style={{ color: steam.textMuted }}>All registered students.</small>
        </div>
        <span
          className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded"
          style={{ background: 'rgba(102,192,244,0.15)', color: steam.accent, border: `1px solid rgba(102,192,244,0.3)` }}
        >
          {students.length} Record{students.length !== 1 ? 's' : ''}
        </span>
      </Card.Header>

      <Card.Body className="p-0">
        {students.length === 0 ? (
          <div className="text-center py-14" style={{ color: steam.textMuted }}>
            <p className="text-lg mb-2 opacity-50" style={{ color: steam.textSecondary }}>—</p>
            <p className="font-medium text-sm" style={{ color: steam.textSecondary }}>No students registered yet.</p>
            <p className="text-xs">Use the form above to add a student.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table variant="dark" responsive className="mb-0 align-middle m-0" style={{ color: steam.textPrimary, '--bs-table-bg': 'transparent', '--bs-table-striped-bg': 'transparent' }}>
              <style>
                {`
                  .table-dark { --bs-table-bg: transparent; }
                  .table-dark th, .table-dark td { background-color: transparent !important; }
                `}
              </style>
              <thead>
                <tr style={{ background: 'rgba(42,71,94,0.5)', borderBottom: `1px solid ${steam.border}` }}>
                  <th className="font-semibold text-xs uppercase tracking-wider px-4 py-3 border-0" style={{ color: steam.textSecondary }}>#</th>
                  <th className="font-semibold text-xs uppercase tracking-wider px-4 py-3 border-0" style={{ color: steam.textSecondary }}>Student</th>
                  <th className="font-semibold text-xs uppercase tracking-wider px-4 py-3 border-0" style={{ color: steam.textSecondary }}>Course</th>
                  <th className="font-semibold text-xs uppercase tracking-wider px-4 py-3 border-0" style={{ color: steam.textSecondary }}>Email</th>
                  <th className="font-semibold text-xs uppercase tracking-wider px-4 py-3 border-0" style={{ color: steam.textSecondary }}>Address</th>
                  <th className="font-semibold text-xs uppercase tracking-wider px-4 py-3 border-0" style={{ color: steam.textSecondary }}>Coordinates</th>
                  <th className="font-semibold text-xs uppercase tracking-wider px-4 py-3 border-0" style={{ color: steam.textSecondary }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student.id}
                    className="transition-colors duration-150"
                    style={{ background: index % 2 === 0 ? steam.rowBg : 'rgba(42,71,94,0.2)', borderBottom: `1px solid ${steam.border}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = steam.rowHoverBg; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? steam.rowBg : 'rgba(42,71,94,0.2)'; }}
                  >
                    <td className="px-4 py-3 font-medium border-0" style={{ color: steam.accent }}>
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-semibold border-0" style={{ color: steam.textPrimary }}>
                      {student.firstname} {student.lastname}
                    </td>
                    <td className="px-4 py-3 border-0">
                      <span
                        className="inline-block px-2.5 py-1 rounded text-xs font-bold text-white"
                        style={{ backgroundColor: getBadgeColor(student.course) }}
                      >
                        {student.course}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border-0" style={{ color: steam.textSecondary }}>
                      {student.email}
                    </td>
                    <td className="px-4 py-3 text-sm border-0" style={{ color: steam.textSecondary }}>
                      {student.address}
                    </td>
                    <td className="px-4 py-3 text-xs border-0" style={{ color: steam.textMuted }}>
                      <span className="block">Lat: {student.lat.toFixed(5)}</span>
                      <span className="block">Lng: {student.lng.toFixed(5)}</span>
                    </td>
                    <td className="px-4 py-3 border-0">
                      <button
                        onClick={() => onDeleteStudent(student.id)}
                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer"
                        style={{
                          background: 'rgba(220,53,69,0.15)',
                          color: '#e74c3c',
                          border: '1px solid rgba(220,53,69,0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(220,53,69,0.3)';
                          e.currentTarget.style.borderColor = 'rgba(220,53,69,0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(220,53,69,0.15)';
                          e.currentTarget.style.borderColor = 'rgba(220,53,69,0.3)';
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default StudentTable;
