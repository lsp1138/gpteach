// A flex box with tables inside for a responsive output
// of conjugation tables

function TableChoice(body) {
  console.log("body is", body);

  return (
    <div className="flexTable d-md-flex">
      {body.columns.map((column, indexCol) => (
        <div key={"columns-" + indexCol} className="p-1">
          <table>
            <tr>
              <th colspan="2">{column.heading}</th>
            </tr>
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
          </table>
        </div>
      ))}
    </div>
  );
}

export default TableChoice;
