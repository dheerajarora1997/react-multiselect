import React, { useState, useRef, useEffect } from 'react';

export default function App() {

  const dummyData = {
    "name": "select-",
    "options": [
      {
        "value": "Shiv",
        "selected": false,
        "disabled": false
      },
      {
        "value": "Vishnu",
        "selected": false,
        "disabled": false
      },
      {
        "value": "Bharama",
        "selected": false,
        "disabled": false
      },
      {
        "value": "Ram",
        "selected": false,
        "disabled": false
      },
      {
        "value": "Krishna",
        "selected": false,
        "disabled": false
      }
    ]
  }

  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    dummyData.name = `select-${counter}`
    setData([dummyData])
    localStorage.setItem('completeData', '')
    localStorage.setItem('dataCounter', counter)
  }, [])

  useEffect(() => {
    localStorage.setItem('completeData', JSON.stringify(data))
    setCounter(data.length)
    localStorage.setItem('dataCounter', counter)
  }, [data])

  const selectRef = useRef([]);
  selectRef.current = data.map((element, i) => selectRef[i] ?? React.createRef());

  let addMore = () => {
    let newData = [...data];
    newData.push({ ...dummyData });
    newData[counter].name = `select-${counter}`;
    setData(newData)
  }

  let removeElement = (element) => {
    const newData = [...data];
    newData.splice([element], 1);
    setData(newData)
  }

  let selectChange = (select, ind) => {
    console.log(select.current.options)
    // debugger;
    // var selectedOptions = select.current.options;
    // var values = [];
    // console.log(select, options)
    // const updatedData = [...data];
    // console.log(selectedOptions)
    // for (var i = 0, l = options.length; i < l; i++) {
    //   if (options[i].selected) {
    //     updatedData[ind].options[i].selected = true;
    //     values.push(options[i].value);
    //   }
    //   else {
    //     updatedData[ind].options[i].selected = false;
    //   }
    // }
    // console.log(values)
    // setData(updatedData)
  }



  return (
    <main>
      <div className="container">
        <div className="row">
          {data.map((ele, ind) => {
            return (
              <div className="col-3" key={ind}>
                <div className="form-group mb-3 text-end">
                  {ind}
                  <select className="form-control" ref={selectRef.current[ind]} id={ele.name} onChange={() => { selectChange(selectRef.current[ind], ind) }} multiple>
                    {
                      ele.options.map((opt, i) => {
                        return (
                          <option key={i} defaultValue={opt.value}>{opt.value}</option>
                        )
                      })
                    }
                  </select>
                  {ind > 0 ? <button className="bg-danger bg-opacity-50 border-0 mt-2 rounded text-danger" onClick={() => { removeElement(ind) }}> x Remove</button> : ''}
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={() => { addMore() }}>+ Add More</button>
          </div>
          <pre>{JSON.stringify(data)} <br /> {counter}</pre>
        </div>
      </div>
    </main>
  )
}
