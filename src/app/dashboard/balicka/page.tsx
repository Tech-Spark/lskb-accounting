'use client';
import React, { FormEvent, useContext } from 'react';
import UserContext from '@/store/userContext';
import Axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function Balicka() {
  const [loading, setLoading] = React.useState(false);
  const { loginUser, branchName }: any = useContext(UserContext);
  const d = new Date();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  const currentDate = `${month}/${day}/${year}`;
  const router = useRouter();

  const [kapAcco, setKapAcco] = React.useState({
    Date: currentDate,
    Card_machine: '',
    Glovo_online: '',
    Pyszne_online: '',
    Bolt_online: '',
    UberEats_online: '',
    Cash_Card_OnlineApp_Notes: '',
    Kasa_Cash: '',
    Glovo_Cash: '',
    Cost_from_CashBox: '',
    CashBox_Remain: '',
    Hard_Cash: '',
    Retail_Cost: '',
    Faktura: '',
    Input_by: loginUser,
    branchName: branchName,
  });

  const SaveInSheet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginUser) {
      router.push('/');
      return;
    }
    try {
      setLoading(true);
      const response = await Axios.post('/api/users/googleSheets', kapAcco);
      setKapAcco({
        ...kapAcco,
        Card_machine: '',
        Glovo_online: '',
        Pyszne_online: '',
        Bolt_online: '',
        UberEats_online: '',
        Cash_Card_OnlineApp_Notes: '',
        Kasa_Cash: '',
        Glovo_Cash: '',
        Cost_from_CashBox: '',
        CashBox_Remain: '',
        Hard_Cash: '',
        Retail_Cost: '',
        Faktura: '',
      });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          <h1 className="m-6 text-2xl">Kebab Balicka Accounting</h1>
          <form className="form border-2 p-2" onSubmit={SaveInSheet}>
            <div className="py-2 mb-4 px-1">
              <label className="form-label px-2">Card_machine:</label>
              <input
                id="Card-machine"
                type="number"
                value={kapAcco.Card_machine}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Card_machine: e.target.value })
                }
                name="Card-machine"
                placeholder="Card-machine"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Glovo_online:</label>
              <input
                id="Glovo_online"
                type="number"
                value={kapAcco.Glovo_online}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Glovo_online: e.target.value })
                }
                name="Glovo_online"
                placeholder="Glovo_online"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Pyszne_online:</label>
              <input
                id="Pyszne_online"
                type="number"
                value={kapAcco.Pyszne_online}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Pyszne_online: e.target.value })
                }
                name="Pyszne_online"
                placeholder="Pyszne_online"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Bolt_online:</label>
              <input
                id="Bolt_online"
                type="number"
                value={kapAcco.Bolt_online}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Bolt_online: e.target.value })
                }
                name="Bolt_online"
                placeholder="Bolt_online"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">UberEats_online:</label>
              <input
                id="UberEats_online"
                type="number"
                value={kapAcco.UberEats_online}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, UberEats_online: e.target.value })
                }
                name="UberEats_online"
                placeholder="UberEats_online"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">
                Cash_Card_OnlineApp_Notes:
              </label>
              <textarea
                id="Cash_Card_OnlineApp_Notes"
                value={kapAcco.Cash_Card_OnlineApp_Notes}
                onChange={(e) =>
                  setKapAcco({
                    ...kapAcco,
                    Cash_Card_OnlineApp_Notes: e.target.value,
                  })
                }
                name="Cash_Card_OnlineApp_Notes"
                placeholder="Write Notes"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Kasa_Cash:</label>
              <input
                id="Kasa_Cash"
                type="number"
                value={kapAcco.Kasa_Cash}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Kasa_Cash: e.target.value })
                }
                name="Kasa_Cash"
                placeholder="Kasa_Cash"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Glovo_Cash:</label>
              <input
                id="Glovo_Cash"
                type="number"
                value={kapAcco.Glovo_Cash}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Glovo_Cash: e.target.value })
                }
                name="Glovo_Cash"
                placeholder="Glovo_Cash"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Cost_from_CashBox:</label>
              <input
                id="Cost_from_CashBox"
                type="number"
                value={kapAcco.Cost_from_CashBox}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Cost_from_CashBox: e.target.value })
                }
                name="Cost_from_CashBox"
                placeholder="Cost_from_CashBox"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">CashBox_Remain:</label>
              <input
                id="CashBox_Remain"
                type="number"
                value={kapAcco.CashBox_Remain}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, CashBox_Remain: e.target.value })
                }
                name="CashBox_Remain"
                placeholder="CashBox_Remain"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Hard_Cash:</label>
              <input
                id="Hard_Cash"
                type="number"
                value={kapAcco.Hard_Cash}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Hard_Cash: e.target.value })
                }
                name="Hard_Cash"
                placeholder="Hard_Cash"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Retail_Cost:</label>
              <input
                id="Retail_Cost"
                type="number"
                value={kapAcco.Retail_Cost}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Retail_Cost: e.target.value })
                }
                name="Retail_Cost"
                placeholder="Retail_Cost"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="py-2 mb-4">
              <label className="form-label px-2">Faktura:</label>
              <input
                id="Faktura"
                type="number"
                value={kapAcco.Faktura}
                onChange={(e) =>
                  setKapAcco({ ...kapAcco, Faktura: e.target.value })
                }
                name="Faktura"
                placeholder="Faktura"
                className="bg-gray-500 px-2"
              />
              <div className="invalid-feedback text-xs"></div>
            </div>
            <div className="btn">
              <button
                type="submit"
                className="btn btn-primary bg-black px-4 py-2 rounded hover:text-amber-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Balicka;
