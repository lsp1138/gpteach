// A flex box with tables inside for a responsive output
// of conjugation tables

export default function FlexTable({ columns }) {
  return (
    <div className="d-flex flex-wrap">
      {columns.map((column, indexCol) => (
        <div key={indexCol} className="p-1">
          <table>
            <thead>
              <tr>
                <th colSpan="2">{column.heading}</th>
              </tr>
            </thead>
            <tbody>
              {column.rows.map((row, indexRow) => (
                <tr key={indexRow}>
                  <td>
                    <i>{row[0]}</i>
                  </td>
                  <td>
                    <>{row[1]}</>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
