// A flex box with tables inside for a responsive output
// of conjugation tables

function TableChoice(body) {
  console.log("body is", body);

  return (
    <div className="d-flex flex-wrap">
      {body.columns.map((column, indexCol) => (
        <div key={"columns-" + indexCol} className="p-1">
          <table>
            <thead>
              <tr>
                <th colSpan="2">{column.heading}</th>
              </tr>
            </thead>
            <tbody>
              {column.rows.map((row, indexRow) => (
                <tr>
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

export default TableChoice;
