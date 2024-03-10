import React, { useContext, useEffect } from 'react';
import UserContext from '@/store/userContext';
import Axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Popupwindow() {
  const { setPinWin, branchName, userId }: any = useContext(UserContext);
  const [pinCode, setPinCode] = React.useState('');
  const [pinValiSucc, setPinValiSucc] = React.useState(false);
  const router = useRouter();

  async function checkPin(e: any) {
    e.preventDefault();
    try {
      const res = await Axios.post('/api/users/pin', {
        pinCode,
        branchName,
        userId,
      });
      let pinValidation = res.data.success;
      if (pinValidation) {
        router.push(`/dashboard/${branchName}`);
      }
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPinWin(false);
    }
  }

  return (
    <div>
      <form onSubmit={checkPin} className="description-popup">
        <div className="">
          <h3 className="title-pop">{branchName}</h3>
          <div className="close-pop" onClick={() => setPinWin(false)}>
            X
          </div>
          <label htmlFor="pin">Enter your pin</label>
          <input
            className="bg-stone-900 px-2"
            type="number"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            name="pin"
          />
        </div>
        <div>
          <button type="submit" className="send-btn">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Popupwindow;
