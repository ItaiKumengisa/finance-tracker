import { useState } from 'react';
import useFirestore from '../../hooks/useFirestore';
const TransactionForm = (props) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { addDocument, response } = useFirestore('transaction')

    const submitHandler = (e) => {
        e.preventDefault();
        addDocument({
            name,
            amount,
            uid: props.uid
        })
    }

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Transaction name</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => { setAmount(e.target.value) }}
                        value={amount}
                    />
                </label>
                <button>Add Transaction</button>
            </form>
        </>
    )
}

export default TransactionForm;