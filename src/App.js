
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {

  const { register, handleSubmit } = useForm();
  const [transaction, setTransaction] = useState(0);
  // const [description, setDescription] = useState(''); 
  const [expense, setExpense] = useState(0);
  const [history, setHistory] = useState([]);

  function addExpense(data) {

    const formData = {
      description: data.description,
      transaction: data.transaction
    }

    history.push(formData)
    setHistory([...history]);

    if (data.transaction < 0) {
      setExpense(prevexpense => prevexpense + Number(data.transaction))
      // setTransaction(prevtransaction => prevtransaction + expense)
      // setTransaction(prevtransaction => prevtransaction + Number(data.transaction))

    } else {
      setTransaction(prevtransaction => prevtransaction + Number(data.transaction))

    }


  }

  return (
    <div id='main'>


      <h1 id='head' >Expense tracker</h1>




      <div id='currentBalance'>
        <h2 className='hone'>Current Balance</h2>
        <h1 className='hone'>{`$${transaction + expense }.00`}</h1>
      </div>

      <div id='income'>

        <div className='box'>
          <span>Income</span>
          <span style={{ color: 'green' }}>{`${transaction}.00`}</span>
        </div>
        <div id='hrline'></div>
        <div className='box'>
          <span>Expense</span>
          <span style={{ color: 'red' }}>{`${expense}.00`}</span>
        </div>

      </div>

      <div id='historydiv'>
        <h2>Transaction history</h2>
        <div className='historyhrline'></div>
        {history?.map((abc , index) => {
          return (
            <div id='historymain'>
              <img src="del.png" alt="" onClick={() => {
                history.splice(index, 1);
                setHistory([...history]);
                // abc.transaction < 0 ?
                //  setExpense(prevexpense => prevexpense - abc.transaction)
                // :
                //  setTransaction(prevtransaction => prevtransaction - abc.transaction)

              }} />
              <div id='history'>
                <div>{abc.description}</div>

                <div className={transaction < 0 ? 'red': 'green'}  > 
                {/* <div {...abc.transaction < 0 ? className = 'red' : className = "green"} >  */}
                {`$${abc.transaction}`}
                </div>
              </div>


            </div>
          )
        })}
      </div>

      <div id='form'>

        <h2>Add new Transaction</h2>
        <div className='historyhrline'></div>
        <form id='myForm' onSubmit={handleSubmit(addExpense)}>
          <label htmlFor="">Description</label>
          <input {...register('description')} type="text" placeholder='Detail of Transaction' required />
          <label htmlFor="">Transaction Amount</label>
          <input {...register('transaction')} type="number" placeholder='Dollar value of Transaction Amount' required />
          <button >Add Transaction</button>
        </form>

      </div>

    </div>

  );
}

export default App;
