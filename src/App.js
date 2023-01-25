import React, { useState, useRef, useEffect } from 'react';
import './App.css'
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
  const [counter, setCounter] = useState(0);
  let selectedValues = [];
  let unSelected = [];

  useEffect(() => {
    dummyData.name = `select-${counter}`
    setData([dummyData])
    localStorage.setItem('completeData', '')
    localStorage.setItem('dataCounter', counter)
    console.log(selectedValues)
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
    console.log(element)
    debugger;
    const newData = [...data];
    newData.splice([element], 1);
    setData(newData)
    console.log(newData)
  }

  const mapAllChecked = (selectID) => {
    Array.from(document.querySelectorAll('select option:checked')).map((el, index) => {
      if (!selectedValues.includes(el.value)) {
        selectedValues.push(el.value)
        selectedValues.sort()
      }
    })
    Array.from(document.querySelectorAll(`select#${selectID} option:not(:checked):not(:disabled)`)).map((unEl, ind) => {
      selectedValues.map((eleArr, indexArr) => {
        if (unEl.value == eleArr) {
          console.log(eleArr,indexArr)
          selectedValues.splice(indexArr, 1) 
        }
      })
    })
    console.log(selectedValues)
  }

  const disableOption = (selectID) => {
    Array.from(document.querySelectorAll(`select:not(#${selectID})`)).map((sel, ind) => {
      // console.log(sel)
      // console.log(sel.getElementsByTagName('option'), typeof (sel.getElementsByTagName('option')))
      Array.from(sel.getElementsByTagName('option')).map((element, index) => {
        if (selectedValues.includes(element.value) && !element.selected) {
          element.disabled = true;
        }
        else {
          element.disabled = false;
        }
      })
    })
  }


  let selectChange = (select, ind) => {
    let selectID = selectRef.current[ind].current.id
    // console.log(selectID)
    mapAllChecked(selectID);
    disableOption(selectID);
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
                  <select className="form-control" ref={selectRef.current[ind]} id={`select-${ind}`} onChange={() => { selectChange(selectRef.current[ind], ind) }} multiple>
                    {
                      ele.options.map((opt, i) => {
                        return (
                          <option key={i} defaultValue={opt.value}>{opt.value}</option>
                        )
                      })
                    }
                  </select>
                  {data.length > 1 ? <button className="bg-danger bg-opacity-50 border-0 mt-2 rounded text-danger" onClick={() => { removeElement(ind) }}> x Remove</button> : ''}
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={() => { addMore() }}>+ Add More</button>
          </div>
          <pre>{selectedValues}</pre>
          <pre>{JSON.stringify(data)} <br /> {counter}</pre>
        </div>
      </div>
    </main>
  )
}
