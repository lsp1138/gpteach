function TableChoice(body) {
  console.log("body is", body);

  return (
    <div className="container">
      <div className="row">
        {body.columns.map((column, indexCol) => (
          <div key={"columns-" + indexCol} className="col">
            <div className="row">
              <b>{column.heading}</b>
            </div>
            <div className="row border-right">
              {column.rows.map((row, indexRow) => (
                <div key={"row" + indexRow} className="row">
                  {row.map((rowContent, indexRowContent) => (
                    <div
                      key={"row-content-" + indexRowContent}
                      className="col-6"
                    >
                      {rowContent}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableChoice;
